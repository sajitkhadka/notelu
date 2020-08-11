import setAuthToken from "../../../utils/setAuthToken";
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  message: "",
  error: false,
  user: null,
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

    case "FORGOT_PASSWORD": {
      return {
        ...state,
        token: null,
        message: payload.message,
        error: !payload.success,
      };
    }
    case "GOT_USER": {
      return {
        ...state,
        user: payload.user,
      };
    }
    case "FORGOT_PASSWORD_RESET": {
      return {
        ...state,
        token: null,
        message: payload.message,
        error: !payload.success,
      };
    }

    default: {
      return {
        ...state,
        message: "",
        error: false,
      };
    }
  }
};
