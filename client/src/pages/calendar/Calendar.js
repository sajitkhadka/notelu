import React from "react";
import AddEventSidebar from "./AddEventSidebar";
// import AddEventButton from "./AddEventButton";
import { Card, CardBody, Button, ButtonGroup } from "reactstrap";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import { connect } from "react-redux";
import {
  fetchEvents,
  handleSidebar,
  addEvent,
  handleSelectedEvent,
  updateEvent,
  updateDrag,
  updateResize,
  removeAvailability,
  fetchCategories,
} from "../../redux/actions/calendar/index";
import { ChevronLeft, ChevronRight } from "react-feather";
import { Pagecontainer } from "./Container";

import Navbar from "../../layout/navbar";
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../styles/calendar.scss";
const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);
const eventColors = ["bg-success", "bg-warning", "bg-danger", "bg-primary"];

class Toolbar extends React.Component {
  render() {
    return (
      <div className="calendar-header mb-2 d-flex justify-content-between flex-wrap">
        {/* <div>
          <AddEventButton />
        </div> */}
        <div className="month-day-buttons">
          <ButtonGroup>
            <button
              className={`btn ${
                this.props.view === "month"
                  ? "btn-calendar"
                  : "btn-outline text-primary"
              }`}
              onClick={() => {
                this.props.onView("month");
              }}
            >
              Month
            </button>
            <button
              className={`btn ${
                this.props.view === "week"
                  ? "btn-calendar"
                  : "btn-outline text-primary"
              }`}
              onClick={() => {
                this.props.onView("week");
              }}
            >
              Week
            </button>

            <button
              className={`btn ${
                this.props.view === "day"
                  ? "btn-calendar"
                  : "btn-outline text-primary"
              }`}
              onClick={() => {
                this.props.onView("day");
              }}
            >
              Day
            </button>
          </ButtonGroup>
        </div>
        {this.props.view === "day" ? (
          <div className="justify-content-between">
            <Button
              className="btn-icon rounded-circle"
              size="sm"
              color="primary"
              onClick={() => window.print()}
            >
              Print
            </Button>
          </div>
        ) : (
          ""
        )}
        <div className="month-label d-flex flex-column text-md-right mt-1 mt-md-0">
          <div className="calendar-navigation">
            <Button
              className="btn-icon rounded-circle"
              size="sm"
              color="primary"
              onClick={() => this.props.onNavigate("PREV")}
            >
              <ChevronLeft size={15} />
            </Button>
            <div className="month d-inline-block mx-75 text-bold-500 font-medium-2 align-middle">
              {this.props.label}
            </div>
            <Button
              className="btn-icon rounded-circle"
              size="sm"
              color="primary"
              onClick={() => this.props.onNavigate("NEXT")}
            >
              <ChevronRight size={15} />
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

class CalendarApp extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (
      props.app.events.length !== state.events ||
      props.app.sidebar !== state.sidebar ||
      props.app.selectedEvent !== state.eventInfo ||
      props.app.categories !== state.categories
    ) {
      let dateToObj = props.app.events.map((event) => {
        event.start = new Date(event.start);
        event.end = new Date(event.end);
        return event;
      });
      return {
        events: dateToObj,
        sidebar: props.app.sidebar,
        eventInfo: props.app.selectedEvent,
        categories: props.app.categories,
      };
    }
    // Return null if the state hasn't changed
    return null;
  }
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      views: {
        month: true,
        week: true,
        day: true,
      },
      eventInfo: null,
      categories: [],
    };
  }

  async componentDidMount() {
    await this.props.fetchEvents();
    await this.props.fetchCategories();
  }

  handleEventColors = (event) => {
    // console.log(
    //   this.state.categories,
    //   event.label,
    //   this.state.categories.indexOf[event.label]
    // );
    return {
      className: eventColors[this.state.categories.indexOf(event.label)],
    };
  };

  checkTimeConflict = (
    startDate = this.state.startDate,
    endDate = this.state.endDate,
    e
  ) => {
    let error = "";
    this.state.events.map((event) => {
      // console.log(event.label, e.label);
      // console.log(
      //   moment(new Date(startDate)).isBetween(event.start, event.end),
      //   moment(new Date(endDate)).isBetween(event.start, event.end)
      // );
      // console.log(event.label, e.label);
      // console.log(moment(new Date(startDate)), event.start, event.end);
      // console.log(moment(new Date(endDate)), event.start, event.end);
      if (event.label == e.label && event.id != e.id) {
        if (
          moment(new Date(startDate)).isBetween(event.start, event.end) ||
          moment(new Date(endDate)).isBetween(event.start, event.end)
        ) {
          error = "The time is overlapping";
        } else if (
          moment(new Date(startDate)).isSameOrBefore(moment(event.start)) &&
          moment(event.end).isSameOrBefore(moment(new Date(endDate)))
        ) {
          error = "The overlapping overlaps. please change it.";
        }
      }
      console.log(error);
    });
    if (error) {
      this.setState({ error: error });
      return true;
    }
    if (this.state.error) this.setState({ error: "" });
    return false;
  };

  moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
    if (this.checkTimeConflict(start, end, event)) {
      return;
    }
    const { events } = this.state;
    const idx = events.indexOf(event);
    let allDay = event.allDay;
    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true;
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false;
    }
    const updatedEvent = { ...event, start, end, allDay };
    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);
    this.setState({
      events: nextEvents,
    });
    this.props.updateDrag(updatedEvent);
  };

  resizeEvent = ({ event, start, end }) => {
    if (this.checkTimeConflict(start, end, event)) {
      return;
    }
    const { events } = this.state;
    const nextEvents = events.map((existingEvent) => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });

    this.setState({
      events: nextEvents,
    });

    this.props.updateResize({ ...event, start, end });
  };

  handleSelectEvent = (event) => {
    let filteredState = this.state.events.filter((i) => i.id === event.id);
    this.props.handleSidebar(true);
    this.props.handleSelectedEvent(filteredState[0]);
    this.setState({
      eventInfo: filteredState[0],
    });
  };

  render() {
    const { events, views, sidebar } = this.state;
    return (
      <React.Fragment>
        <Navbar />
        <Pagecontainer>
          <div className="app-calendar position-relative">
            <div
              ref={this.printRef}
              className={`app-content-overlay ${sidebar ? "show" : "hidden"}`}
              onClick={() => {
                this.props.handleSidebar(false);
                this.props.handleSelectedEvent(null);
              }}
            ></div>
            <Card>
              <CardBody>
                <DragAndDropCalendar
                  localizer={localizer}
                  events={events}
                  onEventDrop={this.moveEvent}
                  onEventResize={this.resizeEvent}
                  startAccessor="start"
                  endAccessor="end"
                  resourceAccessor="url"
                  views={views}
                  components={{ toolbar: Toolbar }}
                  eventPropGetter={this.handleEventColors}
                  popup={true}
                  onSelectEvent={(event) => {
                    this.handleSelectEvent(event);
                  }}
                  onSelectSlot={({ start, end }) => {
                    this.props.handleSidebar(true);
                    this.props.handleSelectedEvent({
                      title: "",
                      label: null,
                      start: new Date(start),
                      end: new Date(end),
                      url: "",
                    });
                  }}
                  selectable={true}
                  style={{}}
                />
              </CardBody>
            </Card>
            <AddEventSidebar
              sidebar={sidebar}
              categories={this.state.categories}
              handleSidebar={this.props.handleSidebar}
              addEvent={this.props.addEvent}
              events={this.state.events}
              eventInfo={this.state.eventInfo}
              selectedEvent={this.props.handleSelectedEvent}
              updateEvent={this.props.updateEvent}
              removeAvailability={this.props.removeAvailability}
              resizable
            />
          </div>
        </Pagecontainer>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  //console.log("calendar", state);
  return {
    app: state.calendar,
  };
};

export default connect(mapStateToProps, {
  removeAvailability,
  fetchEvents,
  handleSidebar,
  addEvent,
  handleSelectedEvent,
  updateEvent,
  updateDrag,
  updateResize,
  fetchCategories,
})(CalendarApp);
