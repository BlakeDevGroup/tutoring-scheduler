import { Box, Collapsible, Button, Main } from "grommet";
import { FormClose } from "grommet-icons";
import AddViewForm from "./components/NavBar/components/AddViewForm.component";
import CreateEventWrapper from "./components/CreateEventModal/CreateEventWrapper.component";
import React, { useState, useEffect } from "react";
import MainCalendar from "./main-components/main-calendar";
import eventsData from "./data/events.json";
import companiesData from "./data/companies.json";
import calendarsData from "./data/calendars.json";
import viewsData from "./data/views.json";
import NavBarWrapper from "./components/NavBar/NavBarWrapper.component";

const getCompanies = () => {
  let companies = [];

  companiesData["companies"].forEach((data) => {
    companies.push(data);
  });

  return companies;
};

const getCalendars = () => {
  let calendars = [];

  calendarsData["calendars"].forEach((data) => {
    calendars.push(data);
  });
  return calendars;
};

const getViews = () => {
  let views = [];

  viewsData["views"].forEach((data) => {
    views.push(data);
  });

  return views;
};

const App = (props) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const [companies, setCompanies] = useState(getCompanies());
  const [calendars, setCalendars] = useState(getCalendars());
  const [views, setViews] = useState(getViews());
  const [currentView, setCurrentView] = useState("dayGridMonth");

  return (
    <Box fill>
      <NavBarWrapper
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        companies={companies}
        setCompanies={setCompanies}
        views={views}
        setCurrentView={setCurrentView}
      />
      <Box
        direction=""
        height="xsmall"
        flex
        overflow={{ horizontal: "hidden" }}
      >
        {!showSidebar || props.size !== "small" ? (
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
              <CreateEventWrapper
                companies={companies}
                // setEvents={setEvents}
                calendars={calendars}
              />
              <AddViewForm calendars={calendars} setCalendars={setCalendars} />
              {/* <SideBarCalendar /> */}
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
            <Box fill background="light-2" align="center" justify="center">
              sidebar
            </Box>
          </layer>
        )}
        <Main margin="xsmall">
          <MainCalendar
            currentView={currentView}
            companies={companies}
            calendars={calendars}
          />
        </Main>
      </Box>
    </Box>
  );
};

export default App;
