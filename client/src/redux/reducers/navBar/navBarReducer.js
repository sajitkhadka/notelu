const initialState = {
  sticky: false,
};
export const navBar = (state = initialState, action) => {
  switch (action.type) {
    case 'NAVBAR_SHOW': {
      return { ...state, ...action.payload };
    }
    case 'NAVBAR_HIDE': {
      return { ...state, ...action.payload };
    }
    default:
      return { ...state };
  }
};
