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
} from "grommet-icons";
import AddViewForm from "./nav-bar/Add-calendar-view";
import NavDropMenu from "./nav-bar/Nav-Drop-Menu";
import CreateButton from "./Create-events/Create-events"
import NavBar from "./nav-bar/new-bar";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import React, { useState } from "react";
import Calendar from "./models/calendar";
import MainCalendar from "./main-components/main-calendar";
import eventsData from "./data/events.json";
import companiesData from './data/companies.json';
import CompanyButton from "./nav-bar/add-company-button/Add-new-company";


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

const getEvents = () => {

  let events = []

  eventsData["events"].forEach(data => {
      
      events.push(data)
  });

  return events
}

const getCompanies = () => {

  let companies = []

  companiesData["companies"].forEach(data => {
      
      companies.push(data)
  });

  return companies
}
  

// const getCompanies = () => {

//   let companies = []

//   eventsData["companies"].forEach(data => {
      
//       companies.push(data)
//   });

//   return companies
// }
  



const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [events, setEvents] = useState(getEvents());
  const[companies, setCompanies] = useState(getCompanies());
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
              <CompanyButton
                companies={companies}
                setCompanies={setCompanies}
              
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
                    <CreateButton
                        events={events}
                        companies={companies}
                        setEvents = {setEvents}
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
                <MainCalendar 
                  events = {events}  
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
