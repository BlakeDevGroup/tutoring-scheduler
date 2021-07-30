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

let eventOne = new Events({
  id: Math.random() * 10000 + 1,
  title: "Our First Event",
  start: "2021-07-29T10:30:00",
  end: "2021-07-29T11:30:00",
});

let eventTwo = new Events({
  id: Math.random() * 10000 + 1,
  title: "Our Second Event",
  start: "2021-07-29T14:30:00",
  end: "2021-07-29T15:30:00",
});

let calendarOne = new Calendar({
  id: Math.random() * 10000 + 1,
  calendarName: "News",
});

let calendarTwo = new Calendar({
  id: Math.random() * 10000 + 1,
  calendarName: "Work",
});
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
function AddViewForm(props) {
  /**
   * AddViewForm.state = {
   *  calendars = [calendarOne.calendarName, calendarTwo.calendarName]
   * }
   *
   * setCalendars([])
   *
   * AddViewForm.state = {
   *  calendars = []
   * }
   */
  const [calendars, setCalendars] = useState([
    calendarOne.calendarName,
    calendarTwo.calendarName,
  ]);
  const [textValue, setValue] = useState("");

  return (
    <Form
      value={textValue}
      onChange={(nextValue) => setValue(nextValue)}
      onReset={() => setValue("")}
      onSubmit={(e) => {
        console.log(e.value.name);
        const calendar = new Calendar({
          id: Math.random * 10000 + 1,
          calendarName: e.value.name,
        });
        setCalendars([].concat(calendars, calendar.calendarName));
      }}
    >
      <CheckBoxGroup options={calendars} gap="small" margin="medium" />
      <FormField name="name" htmlFor="text-input-id" label="Add View">
        <TextInput id="text-input-id" name="name" />
      </FormField>
      <Box direction="row" gap="medium">
        <Button type="submit" primary label="Submit" />
        <Button type="reset" label="Reset" />
      </Box>
    </Form>
  );
}

// function CheckBox() {
//   const [options, setValue] = React.useState("medium");
//   return (
//     <Text
//       margin="medium">Select View
//     <CheckBoxGroup
//       options={["Personal", calendarOne.calendarName, "Test"]}
//       gap="small"
//       margin="medium"
//     />
//     </Text>
//     )
// }

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
                  <AddViewForm />
                  <Box
                    flex
                    width="medium"
                    background="light-2"
                    elevation="small"
                    align="stretch"
                    animation="fadeIn"
                  >
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
                <FullCalendar
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  initialView="timeGridWeek"
                  expandRows={true}
                  handleWindowResize
                  selectable={true}
                  navLinks={true}
                  events={[
                    {
                      id: eventOne.id,
                      title: eventOne.title,
                      start: eventOne.start,
                    },
                    {
                      id: eventTwo.id,
                      title: eventTwo.title,
                      start: eventTwo.start,
                    },
                  ]}
                />
              </Main>
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
  );
};

export default App;
