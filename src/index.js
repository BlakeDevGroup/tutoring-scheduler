import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ResponsiveContext, Grommet } from "grommet";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";

const theme = {
  global: {
    colors: {
      brand: "#027788",
    },
    font: {
      family: "Dosis",
      size: "22px",
      height: "20px",
    },
  },
};

// const eventApi = new EventApi();

// eventApi.getAllEvents(2).then((result) => console.log(result));

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
