import { combineReducers } from "redux";
import auth from "./auth/";
import { navBar } from "./navBar/navBarReducer";

import calenderReducer from "./calendar/";

const rootReducer = combineReducers({
  calendar: calenderReducer,
  auth: auth,
  showNavbar: navBar,
});

export default rootReducer;
