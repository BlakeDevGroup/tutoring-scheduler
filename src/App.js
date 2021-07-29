import {
  Box,
  Collapsible,
  Button,
  Heading,
  Main,
  ResponsiveContext,
  // Calendar,
  CheckBoxGroup,
  Select,
  Grommet,
} from "grommet";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { FormClose, BladesVertical, Add, CaretDownFill } from "grommet-icons";
import NavBar from "./nav-bar/new-bar";
import interactionPlugin from '@fullcalendar/interaction';
import React, { useState } from "react";

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

// const AppBar = (props) => (
//   <Box
//     tag="header"
//     direction="row"
//     align="center"
//     justify="between"
//     background="brand"
//     pad={{ left: "medium", right: "small", vertical: "small" }}
//     elevation="medium"
//     style={{ zIndex: "1" }}
//     {...props}
//   />
// );

function CheckBox(props) {
  const [value, option] = React.useState("medium");
  return (
    <CheckBoxGroup
    options={["Personal", "Work", "Test"]}
    gap="small"
    margin="medium"
    />
    )
}

function DropMenu(props) {
  const [value, setValue] = React.useState("medium");
  return (
    <Select
      margin={{ right: "medium" }}
      icon={<CaretDownFill />}
      size="xsmall"
      options={["Day", "Week", "Month", "Year"]}
      value={value}
      onChange={({ option }) => setValue(option)}
    />
  );
}

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    // <div className="App">
    <Grommet theme={theme} full>
      <ResponsiveContext.Consumer>
        {(size) => (
          <Box fill>
            <NavBar>
              {/* <Heading level="4" margin="none" align="right">
                My App
              </Heading> */}
              <Button
                icon={<BladesVertical />}
                onClick={() => setShowSidebar(!showSidebar)}
              />
              <Heading level="3" margin="none" align="right">
                My App
              </Heading>
              <DropMenu />
            </NavBar>
            <Box
              direction=""
              height="xsmall"
              flex
              overflow={{ horizontal: "hidded" }}
            >
              {/* <Box flex align="center" justify="center">
                app body
              </Box> */}
              {!showSidebar || size !== "small" ? (
                <Collapsible direction="horizontal" open={showSidebar}>
                  <Box
                    flex
                    width="medium"
                    background="light-2"
                    elevation="small"
                    animation="fadeIn"
                  >
                    <Button
                      primary
                      alignSelf="start"
                      label="Create"
                      color="asd"
                      size="large"
                      icon={<Add />}
                      margin={{ left: "small", top: "small" }}
                      hoverIndicator="true"
                    />
                  </Box>
                  <Box 
                  flex
                  width="medium"
                  background="light-2"
                  elevation="small"
                  animation="fadeIn" 
                  >
                    <CheckBox 
                    />
                  </Box>
                  <Box
                    flex
                    width="medium"
                    background="light-2"
                    elevation="small"
                    align="stretch"
                    animation="fadeIn"
                  >
                    <FullCalendar
                      plugins={[dayGridPlugin]}
                      initialView="dayGridMonth"
                    />
                    {/* <Calendar
                      // size="medium"
                      // date={new Date().toISOString()}
                      // onSelect={(date) => {}}
                    /> */}
                  </Box>
                </Collapsible>
              ) : (
                <layer>
                  <Box
                    background="light-2"
                    tag="header"
                    justify="end"
                    align="center"
                    direction="row"
                  >
                    <Button
                      icon={<FormClose />}
                      onClick={() => setShowSidebar(false)}
                    />
                  </Box>
                  <Box
                    fill
                    background="light-2"
                    align="center"
                    justify="center"
                  >
                    sidebar
                  </Box>
                </layer>
              )}
              <Main margin="xsmall">
                <FullCalendar
                  plugins={[dayGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  expandRows={true}
                  handleWindowResize
                  selectable={true}
                  navLinks={true}
                />
              </Main>
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
    /* </div> */
  );
};

export default App;
