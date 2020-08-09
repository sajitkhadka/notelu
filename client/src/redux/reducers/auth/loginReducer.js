import setAuthToken from "../../../utils/setAuthToken";
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  message: "",
  error: "",
};

export const login = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGGED_IN": {
      localStorage.setItem("token", payload.token);
      setAuthToken(localStorage.token);
      return {
        ...state,
        ...action.payload,
        error: false,
        message: "",
      };
    }
    case "LOGGED_OUT": {
      localStorage.removeItem("token");
      setAuthToken(localStorage.token);
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        error: false,
        message: "Successfully Logged out.",
      };
    }
    case "AUTH_ERROR": {
      localStorage.removeItem("token");
      setAuthToken(localStorage.token);
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        message: payload.message,
        error: true,
      };
    }
    default: {
      return state;
    }
  }
};
