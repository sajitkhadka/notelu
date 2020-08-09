export const showNavBar = function () {
  return (dispatch) => {
    dispatch({ type: 'NAVBAR_SHOW', payload: { sticky: true } });
  };
};

export const hideNavBar = function () {
  return (dispatch) => {
    dispatch({ type: 'NAVBAR_HIDE', payload: { sticky: false } });
  };
};
