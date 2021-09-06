import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ResponsiveContext, Grommet } from "grommet";

import EventApi from "./apis/events/events.api";

const theme = {
  global: {
    colors: {
      brand: "#6FFFB0",
    },
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
};

const eventApi = new EventApi();

eventApi.getAllEvents(2).then((result) => console.log(result));

ReactDOM.render(
  <React.StrictMode>
    <Grommet theme={theme} full>
      <ResponsiveContext.Consumer>
        {(size) => <App size={size} />}
      </ResponsiveContext.Consumer>
    </Grommet>
  </React.StrictMode>,
  document.getElementById("root")
);
