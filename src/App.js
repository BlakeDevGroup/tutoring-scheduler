import {
  Box,
  Collapsible,
  Button,
  Heading,
  Main,
  ResponsiveContext,
  Text,
  CheckBoxGroup,
  Select,
  FormField,
  Form,
  TextInput,
  Grommet,
} from "grommet";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import {
  FormClose,
  BladesVertical,
  Add,
  CaretDownFill,
  ChapterAdd,
} from "grommet-icons";
import NavBar from "./nav-bar/new-bar";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import React, { useState } from "react";
import Events from "./models/events";
import Calendar from "./models/calendar";
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

let calendarOne = new Calendar({
  id: Math.random() * 10000 + 1,
  calendarName: "News",
});

let calendarTwo = new Calendar({
  id: Math.random() * 10000 + 1,
  calendarName: "Work",
});

function AddViewForm(props) {
  const [calendars, setCalendars] = useState([
    calendarOne.calendarName,
    calendarTwo.calendarName,
  ]);
  const [textValue, setTextValue] = useState("");

  return (
    <Form
      onReset={() => setTextValue("")}
      onSubmit={(e) => {
        if (textValue == "") return;
        const calendar = new Calendar({
          id: Math.random * 10000 + 1,
          calendarName: textValue,
        });
        setCalendars([].concat(calendars, calendar.calendarName));
        setTextValue("");
      }}
    >
      <CheckBoxGroup options={calendars} gap="small" margin="medium" />
      <FormField name="name" htmlFor="text-input-id" label="Add View">
        <TextInput
          id="text-input-id"
          name="name"
          placeholder="Name your calendar"
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
        />
      </FormField>
      <Box direction="row" gap="medium">
        <Button type="submit" primary label="Submit" />
        <Button type="reset" label="Reset" />
      </Box>
    </Form>
  );
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
              <DropMenu />
            </NavBar>
            <Box
              direction=""
              height="xsmall"
              flex
              overflow={{ horizontal: "hidded" }}
            >
              {!showSidebar || size !== "small" ? (
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
              )}
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
