import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { store } from "./redux/storeConfig/store";
import Spinner from "./components/spinner";

const MyApp = lazy(() => import("./App"));

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<Spinner />}>
      <MyApp />
    </Suspense>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
