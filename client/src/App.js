import React, { useEffect } from "react";
import Router from "./Router/Router";

import setAuthToken from "./utils/setAuthToken";
import { checkAuthentication } from "./redux/actions/auth/loginActions";
import { store } from "./redux/storeConfig/store";

function App() {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      store.dispatch(checkAuthentication());
    }
  }, []);
  return <Router />;
}

export default App;
