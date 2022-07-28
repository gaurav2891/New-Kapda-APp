import React, { useEffect } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import MainNavigation from "./navigation/mainNavigation";

import store from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
}
