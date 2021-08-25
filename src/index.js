import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ResponsiveContext, Grommet } from "grommet";
const theme = {
  global: {
    colors: {
      brand: "#81FCED",
    },
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
};
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
