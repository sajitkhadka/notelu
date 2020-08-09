import React from "react";
import { X, Tag } from "react-feather";
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

import "flatpickr/dist/themes/light.css";
import "../../../styles/flatpickr.scss";

const eventColors = {
  business: "chip-success",
  work: "chip-warning",
  personal: "chip-danger",
  others: "chip-primary",
};
const schedule = {
  date: {
    from: "2020-07-19",
    to: "2020-07-19",
  },
  services: [
    {
      id: 1,
      name: "Hair Cutting",
      availability: [
        {
          from: "2020-07-19 10:02 am",
          to: "2020-07-19 12:02 pm",
        },
        {
          from: "2020-07-19 1:02 pm",
          to: "2020-07-19 3:02 pm",
        },
        {
          from: "2020-07-19 1:02 pm",
          to: "2020-07-19 3:02 pm",
        },
      ],
    },
    {
      id: 2,
      name: "Plumbing",
      availability: [
        {
          from: "2020-07-19 7:02 am",
          to: "2020-07-19 8:02 pm",
        },
        {
          from: "2020-07-19 9:02 am",
          to: "2020-07-19 10:02 am",
        },
      ],
    },
  ],
};
class AddEvent extends React.Component {
  state = {
    startDate: new Date(),
    endDate: new Date(),
    title: "",
    label: null,
    allDay: true,
    selectable: true,
    currentAd: 1,
    date: "2020-07-19",
    servicesSchedule: [
      {
        id: 1,
        name: "Hair Cutting",
        availability: [
          {
            from: "2020-07-19 10:02 am",
            to: "2020-07-19 12:02 pm",
          },
          {
            from: "2020-07-19 1:02 pm",
            to: "2020-07-19 3:02 pm",
          },
          {
            from: "2020-07-19 1:02 pm",
            to: "2020-07-19 3:02 pm",
          },
        ],
      },
      {
        id: 2,
        name: "Plumbing",
        availability: [
          {
            from: "2020-07-19 7:02 am",
            to: "2020-07-19 8:02 pm",
          },
          {
            from: "2020-07-19 9:02 am",
            to: "2020-07-19 10:02 am",
          },
        ],
      },
    ],
  };
  handleDateChange = (date) => {
    this.setState({
      startDate: date,
    });
  };

  handleEndDateChange = (date) => {
    this.setState({
      endDate: date,
    });
  };
  handleTimeChange = (date, index, dateStart) => {
    const services = [...this.state.servicesSchedule];
    services.map((service) => {
      if (service.id == this.state.currentAd) {
        service.availability.map((current, i) => {
          if (i == index) {
            dateStart ? (current.from = date) : (current.to = date);
          }
          return current;
        });
      }
      return service;
    });
    this.setState({ servicesSchedule: services });
  };
  // handleStartTimeChange = (date,index) =>{
  //   const services = [...this.setState.servicesSchedule];
  //   services.map(service=>{
  //     if(service.id == this.state.currentAd){
  //       service.availability.map((current,i)=>{
  //           if(i==index){
  //             current.from = date
  //           }
  //           return current;
  //       })
  //     }
  //     return service;
  //   })
  //   this.setState({servicesSchedule:services});
  // }

  handleLabelChange = (label) => {
    this.setState({
      label,
    });
  };

  handleAddEvent = (id) => {
    this.props.handleSidebar(false);
    this.props.addEvent({
      id: id,
      title: this.state.title,
      start: this.state.startDate,
      end: this.state.endDate,
      label: this.state.label === null ? "others" : this.state.label,
      allDay: this.state.allDay,
      selectable: this.state.selectable,
    });
    this.setState({
      startDate: new Date(),
      endDate: new Date(),
      title: "",
      label: null,
      allDay: true,
      selectable: true,
    });
  };

  handleServiceChange = (id) => {
    this.setState({ currentAd: id });
  };

  addAnotherAvailability = () => {
    let newSchedule = this.state.servicesSchedule.map((service) => {
      if (service.id == this.state.currentAd) {
        service.availability.push({
          from: new Date(),
          to: new Date(),
        });
      }
      return service;
    });
    this.setState({
      servicesSchedule: newSchedule,
    });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
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
      allDay: nextProps.eventInfo === null ? true : nextProps.eventInfo.allDay,
      selectable:
        nextProps.eventInfo === null ? true : nextProps.eventInfo.selectable,
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
        style={{ overflow: "auto" }}
      >
        <div className="header d-flex justify-content-between">
          <h3 className="text-bold-600 mb-0">
            {this.props.eventInfo !== null &&
            this.props.eventInfo.title.length > 0
              ? "Update your availability"
              : "Add your availability"}
          </h3>
          <div
            className="close-icon cursor-pointer"
            onClick={() => this.props.handleSidebar(false)}
          >
            <X size={20} />
          </div>
        </div>
        <div className="add-event-body">
          <div className="category-action d-flex justify-content-between my-50">
            <FormGroup>
              <Flatpickr
                id="endDate"
                className="form-control"
                value={this.state.date}
                onChange={(date) => this.handleEndDateChange(date)}
                options={{
                  altInput: true,
                  altFormat: "F j, Y",
                  dateFormat: "Y-m-d",
                }}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="select"
                name="select"
                onChange={(event) => {
                  this.handleServiceChange(event.target.value);
                }}
                value={this.state.currentAd}
              >
                {this.state.servicesSchedule.map((service, i) => {
                  return (
                    <option key={i} value={service.id}>
                      {service.name}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>
          </div>

          {/* <div className="category-action d-flex justify-content-between my-50">
            <div className="event-category">
              {this.state.label !== null ? (
                <div className={`chip ${eventColors[this.state.label]}`}>
                  <div className="chip-body">
                    <div className="chip-text text-capitalize">
                      {this.state.label}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="category-dropdown">
              <UncontrolledDropdown>
                <DropdownToggle tag="div" className="cursor-pointer">
                  <Tag size={18} />
                </DropdownToggle>
                <DropdownMenu tag="ul" right>
                  <DropdownItem
                    tag="li"
                    onClick={() => this.handleLabelChange("business")}
                  >
                    <span className="bullet bullet-success bullet-sm mr-50"></span>
                    <span>Business</span>
                  </DropdownItem>
                  <DropdownItem
                    tag="li"
                    onClick={() => this.handleLabelChange("work")}
                  >
                    <span className="bullet bullet-warning bullet-sm mr-50"></span>
                    <span>Work</span>
                  </DropdownItem>
                  <DropdownItem
                    tag="li"
                    onClick={() => this.handleLabelChange("personal")}
                  >
                    <span className="bullet bullet-danger bullet-sm mr-50"></span>
                    <span>Personal</span>
                  </DropdownItem>
                  <DropdownItem
                    tag="li"
                    onClick={() => this.handleLabelChange("others")}
                  >
                    <span className="bullet bullet-primary bullet-sm mr-50"></span>
                    <span>Others</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </div> */}
          <div className="add-event-fields mt-2">
            {this.state.servicesSchedule
              .find((service) => {
                return service.id == this.state.currentAd;
              })
              .availability.map((availableTime, i) => {
                return (
                  <fieldset key={i}>
                    <FormGroup>
                      <Label for="startTime">Available From</Label>
                      <Flatpickr
                        className="form-control"
                        value={availableTime.from}
                        onChange={(date) =>
                          this.handleTimeChange(date, i, true)
                        }
                        options={{
                          enableTime: true,
                          dateFormat: "Y-m-d h:i K",
                          noCalendar: true,
                        }}
                      />
                      <Label for="startTime">Available Until</Label>
                      <Flatpickr
                        className="form-control"
                        value={availableTime.to}
                        onChange={(date) =>
                          this.handleTimeChange(date, i, false)
                        }
                        options={{
                          enableTime: true,
                          dateFormat: "Y-m-d h:i K",
                          noCalendar: true,
                          enableDate: false,
                        }}
                      />
                    </FormGroup>
                  </fieldset>
                );
              })}

            <Button
              onClick={() => {
                this.addAnotherAvailability();
              }}
            >
              Add Availability
            </Button>
          </div>
          <hr className="my-2" />
          <div className="add-event-actions text-right">
            <Button.Ripple
              disabled={this.state.title.length > 0 ? false : true}
              color="primary"
              onClick={() => {
                this.props.handleSidebar(false);
                if (
                  this.props.eventInfo === null ||
                  this.props.eventInfo.title.length <= 0
                )
                  this.handleAddEvent(newEventId);
                else
                  this.props.updateEvent({
                    id: this.props.eventInfo.id,
                    title: this.state.title,
                    label: this.state.label,
                    start: this.state.startDate,
                    end: this.state.endDate,
                    allDay: true,
                    selectable: true,
                  });
              }}
            >
              {this.props.eventInfo !== null &&
              this.props.eventInfo.title.length > 0
                ? "Update Availability"
                : "Save Availability"}
            </Button.Ripple>
            <Button.Ripple
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
            </Button.Ripple>
          </div>
        </div>
      </div>
    );
  }
}

export default AddEvent;
