import axios from "axios";
import { server } from "../../../config";

export const fetchEvents = () => {
  return async (dispatch) => {
    await axios
      .get(`${server}/api/schedule/`)
      .then((response) => {
        console.log(response.data);
        dispatch({ type: "FETCH_SCHEDULE", events: response.data.schedule });
      })
      .catch((err) => console.log(err));
  };
};

export const fetchCategories = () => {
  return async (dispatch) => {
    await axios
      .get(`${server}/api/apps/calendar/categories`)
      .then((response) => {
        dispatch({ type: "FETCH_CATEGORIES", categories: response.data });
      })
      .catch((err) => console.log(err));
  };
};

export const handleSidebar = (bool) => {
  return (dispatch) => dispatch({ type: "HANDLE_SIDEBAR", status: bool });
};

export const addEvent = (event) => {
  return async (dispatch) => {
    await axios
      .post(`${server}/api/schedule/add`, event)
      .then((response) => {
        if (response.data.success) {
          dispatch({ type: "ADD_SCHEDULE", event: response.data.schedule });
        }
      })
      .catch((err) => console.log(err));
  };
};
export const updateEvent = (event) => {
  return async (dispatch) => {
    await axios
      .put(`${server}/api/schedule`, event)
      .then((response) => {
        if (response.data.success) {
          dispatch({ type: "UPDATE_SCHEDULE", event: response.data.schedule });
        }
      })
      .catch((err) => console.log(err));
  };
};

export const updateDrag = (event) => {
  return async (dispatch) => {
    await axios
      .put(`${server}/api/schedule`, event)
      .then((response) => {
        if (response.data.success) {
          dispatch({ type: "UPDATE_SCHEDULE", event: response.data.schedule });
        }
      })
      .catch((err) => console.log(err));
  };
};

export const updateResize = (event) => {
  return async (dispatch) => {
    await axios
      .put(`${server}/api/schedule`, event)
      .then((response) => {
        if (response.data.success) {
          dispatch({ type: "UPDATE_SCHEDULE", event: response.data.schedule });
        }
      })
      .catch((err) => console.log(err));
  };
};

export const handleSelectedEvent = (event) => {
  return (dispatch) => dispatch({ type: "HANDLE_SELECTED_EVENT", event });
};

export const removeAvailability = (availabilityId) => {
  let id = availabilityId;
  return async (dispatch) => {
    await axios
      .delete(`${server}/api/schedule`, {
        data: { id: availabilityId },
      })
      .then((response) => {
        if (response.data.success) {
          dispatch({ type: "REMOVE_SCHEDULE", id: response.data.id });
        }
      })
      .catch((err) => console.log(err));
  };
};
