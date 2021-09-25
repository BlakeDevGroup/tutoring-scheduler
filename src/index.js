import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ResponsiveContext, Grommet } from "grommet";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";
import SeriesApi from "./apis/series/series.api";
import EventsApi from "./apis/events/events.api";

const theme = {
  global: {
    colors: {
      brand: "#027788",
      focus: "#34929f",
      selected: "#34929f",
    },
    font: {
      family: "Dosis",
      size: "22px",
      height: "20px",
    },
  },
};

ReactDOM.render(
  <React.StrictMode>
    <Grommet theme={theme} full>
      <Provider store={store}>
        <ResponsiveContext.Consumer>
          {(size) => <App size={size} />}
        </ResponsiveContext.Consumer>
      </Provider>
    </Grommet>
  </React.StrictMode>,
  document.getElementById("root")
);
