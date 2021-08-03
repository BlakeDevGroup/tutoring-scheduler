import {
  Box,
  Collapsible,
  Button,
  Heading,
  Main,
  ResponsiveContext,
  Grommet,
} from "grommet";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import {
  FormClose,
  BladesVertical,
} from "grommet-icons";
import AddViewForm from "./nav-bar/Add-calendar-view";
import NavDropMenu from "./nav-bar/Calendar-view-dropmenu";
import CreateButton from "./Create-events/Create-events";
import NavBar from "./nav-bar/new-bar";
import interactionPlugin from "@fullcalendar/interaction";
import React, { useState } from "react";
import Events from "./models/events";
import MainCalendar from "./main-components/main-calendar";

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


const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <Grommet theme={theme} full>
      <ResponsiveContext.Consumer>
        {(size) => (
          <Box fill>
            <NavBar>
              <Button
                icon={<BladesVertical />}
                onClick={() => setShowSidebar(!showSidebar)}
              />
              <Heading level="3" margin="none" align="right">
                My App
              </Heading>
              <NavDropMenu />
            </NavBar>
            <Box
              direction=""
              height="xsmall"
              flex
              overflow={{ horizontal: "hidded" }}
            >
              {!showSidebar || size !== "small"}
                <Collapsible direction="horizontal" open={showSidebar}>
                  <Box
                    flex
                    direction="column"
                    width="medium"
                    background="light-2"
                    elevation="small"
                    animation="fadeIn"
                    justify="evenly"
                  >
                    <CreateButton />

                    <AddViewForm />

                    <FullCalendar
                      plugins={[dayGridPlugin, interactionPlugin]}
                      initialView="dayGridMonth"
                      selectable={true}
                      navLinks={true}
                    />
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
              <Main margin="xsmall">
                <MainCalendar />
              </Main>
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
  );
};

export default App;
