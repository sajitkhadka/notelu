import React from "react";
import { X, Tag, Trash2 } from "react-feather";
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Input,
  Label,
  Button,
} from "reactstrap";
import Flatpickr from "react-flatpickr";
import moment from "moment";

import "flatpickr/dist/themes/light.css";

import "../../styles/flatpickr.scss";

const eventColors = {
  business: "chip-success",
  work: "chip-warning",
  personal: "chip-danger",
  others: "chip-primary",
};
class AddEvent extends React.Component {
  state = {
    startDate: new Date(),
    endDate: new Date(),
    title: "",
    label: null,
    allDay: false,
    selectable: true,
    allServices: [
      {
        id: "1",
        name: "Home",
      },
      {
        id: "2",
        name: "College",
      },
      {
        id: "3",
        name: "Work",
      },
    ],
    selectedAd: 0,
    error: "",
    categories: [],
  };

  checkTimeConflict = (
    startDate = this.state.startDate,
    endDate = this.state.endDate,
    label = this.state.selectedAd
  ) => {
    let error = "";
    this.props.events.map((event) => {
      if (event.label == label) {
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
    });
    if (error) {
      this.setState({ error: error });
      return true;
    }
    if (this.state.error) this.setState({ error: "" });
    return false;
  };

  handleStartTimeChange = (date) => {
    if (moment(new Date(this.state.endDate)).isSameOrBefore(date)) {
      this.setState({ error: "The end time is before starting time" });
      return;
    }
    this.setState({
      startDate: date,
    });
  };

  handleEndTimeChange = (date) => {
    if (this.checkTimeConflict(undefined, date)) {
      return;
    }
    this.setState({
      endDate: date,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.sidebar && this.state.error) {
      this.setState({ error: "" });
    }
  }

  handleLabelChange = (label) => {
    this.setState({
      label,
    });
  };

  handleAddEvent = (id) => {
    if (this.state.title == "" || this.state.selectedAd == -1) {
      this.setState({ error: "Please Fill all the fields." });
    } else {
      this.props.handleSidebar(false);
      this.props.addEvent({
        id: id,
        title: this.state.title,
        label: this.state.categories[this.state.selectedAd],
        start: this.state.startDate,
        end: this.state.endDate,
        allDay: this.state.allDay,
        selectable: this.state.selectable,
      });
    }
  };

  handleServiceChange = (value) => {
    this.setState({ selectedAd: this.state.categories.indexOf(value) });
    // this.checkTimeConflict(null, null, value);
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    // let selected = -1;
    // nextProps.categories.forEach((category, i) => {
    //   if (category === nextProps.eventInfo.label) {
    //     selected = i;
    //   }
    // });
    this.setState({
      title: nextProps.eventInfo === null ? "" : nextProps.eventInfo.title,
      url: nextProps.eventInfo === null ? "" : nextProps.eventInfo.url,
      startDate:
        nextProps.eventInfo === null
          ? new Date()
          : new Date(nextProps.eventInfo.start),
      endDate:
        nextProps.eventInfo === null
          ? new Date()
          : new Date(nextProps.eventInfo.end),
      label: nextProps.eventInfo === null ? null : nextProps.eventInfo.label,
      categories: nextProps.categories,
      selectedAd:
        nextProps.eventInfo === null
          ? -1
          : nextProps.categories.indexOf(nextProps.eventInfo.label),
    });
  }

  render() {
    let events = this.props.events.map((i) => i.id);
    let lastId = events.pop();
    let newEventId = lastId + 1;
    return (
      <div
        className={`add-event-sidebar ${
          this.props.sidebar ? "show" : "hidden"
        }`}
      >
        <div className="header d-flex justify-content-between">
          <h3 className="text-bold-600 mb-0">
            {this.props.eventInfo !== null &&
            this.props.eventInfo.title.length > 0
              ? "Update Schedule"
              : "Add Schedule"}
          </h3>
          <div
            className="close-icon cursor-pointer"
            onClick={() => this.props.handleSidebar(false)}
          >
            <X size={20} />
          </div>
        </div>

        <div className="add-event-body">
          <div className="headcategory-action d-flex justify-content-end text-danger">
            {this.props.eventInfo !== null &&
            this.props.eventInfo.title.length > 0 ? (
              <a
                onClick={() =>
                  this.props.removeAvailability(this.props.eventInfo.id)
                }
              >
                <Trash2 size="20" />
              </a>
            ) : null}
          </div>
          <div className="category-action d-flex flex-column my-1">
            <FormGroup>
              <Flatpickr
                id="date"
                disabled={true}
                className="form-control"
                value={this.state.startDate}
                onChange={(date) => this.handleEndDateChange(date)}
                options={{
                  altInput: true,
                  altFormat: "F j, Y",
                  dateFormat: "Y-m-d",
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="category">Schedule Category</Label>
              <Input
                id="category"
                type="select"
                name="select"
                onChange={(event) => {
                  this.handleServiceChange(event.target.value);
                }}
                value={
                  this.state.selectedAd !== -1
                    ? this.state.categories[this.state.selectedAd]
                    : -1
                }
              >
                <option disabled value="-1">
                  Please select one category
                </option>
                ;
                {this.state.categories.map((category, i) => {
                  return (
                    <option value={category} key={i}>
                      {category}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="schedule_title">Title/Task</Label>
              <Input
                type="text"
                name="title"
                id="schedule_title"
                placeholder="eg., Study Mernstack"
                value={this.state.title}
                onChange={(event) => {
                  this.setState({ title: event.target.value });
                }}
              />
            </FormGroup>
          </div>
          <div className="add-event-fields mt-2">
            <FormGroup>
              <Label for="startTime">Start</Label>
              <Flatpickr
                className="form-control"
                value={this.state.startDate}
                onChange={(date) => this.handleStartTimeChange(date)}
                options={{
                  enableTime: true,
                  dateFormat: "Y-m-d h:i K",
                  noCalendar: true,
                }}
              />
              <Label for="startTime">Until</Label>
              <Flatpickr
                className="form-control"
                value={this.state.endDate}
                onChange={(date) => this.handleEndTimeChange(date)}
                options={{
                  enableTime: true,
                  dateFormat: "Y-m-d h:i K",
                  noCalendar: true,
                  enableDate: false,
                }}
              />
            </FormGroup>
          </div>
          <hr className="my-2" />
          <div className="add-event-actions text-right d-flex">
            <Button
              // disabled={
              //   this.props.eventInfo === null
              //     ? false
              //     : this.state.error ||
              //       (this.props.eventInfo.start ==
              //         this.state.startDate.toString() &&
              //         this.props.eventInfo.end ==
              //           this.state.endDate.toString() &&
              //         this.props.eventInfo.label &&
              //         this.props.eventInfo.title == this.state.title &&
              //         this.props.categories.indexOf(
              //           this.props.eventInfo.label
              //         ) == this.state.selectedAd)
              //     ? true
              //     : false
              // }
              color="primary"
              onClick={() => {
                if (this.checkTimeConflict()) {
                  return;
                }

                if (
                  this.props.eventInfo === null ||
                  this.props.eventInfo.label === null
                ) {
                  this.handleAddEvent(newEventId);
                } else {
                  if (this.state.title == "" || this.state.selectedAd == -1) {
                    this.setState({ error: "Please Fill all the fields." });
                    return;
                  }
                  this.props.updateEvent({
                    id: this.props.eventInfo.id,
                    title: this.state.title,
                    label: this.state.categories[this.state.selectedAd],
                    start: this.state.startDate,
                    end: this.state.endDate,
                    allDay: false,
                    selectable: true,
                  });
                  this.props.handleSidebar(false);
                }
              }}
            >
              {this.props.eventInfo !== null &&
              this.props.eventInfo.title.length > 0
                ? "Update"
                : "Save"}
            </Button>

            <Button
              className="ml-1"
              color="flat-danger"
              onClick={() => {
                this.props.handleSidebar(false);
                if (this.props.handleSelectedEvent)
                  this.props.handleSelectedEvent(null);
                else return null;
              }}
            >
              Cancel
            </Button>
          </div>
          {this.state.error ? (
            <p className="text-danger pt-2">{this.state.error}</p>
          ) : null}
        </div>
      </div>
    );
  }
}

export default AddEvent;
