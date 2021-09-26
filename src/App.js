import { Box, Collapsible, Button, Main } from "grommet";
import { RRule, RRuleSet, rrulestr } from "rrule";
import { FormClose } from "grommet-icons";
import CreateEventWrapper from "./components/CreateEventModal/CreateEventWrapper.component";
import React, { useState, useEffect } from "react";
import MainCalendar from "./main-components/main-calendar";
import companiesData from "./data/companies.json";
import calendarsData from "./data/calendars.json";
import viewsData from "./data/views.json";
import NavBarWrapper from "./components/NavBar/NavBarWrapper.component";
import CompanyModalWrapper from "./components/CompanyModal/CompanyModalWrapper";

import { useDispatch } from "react-redux";
import { setEvents } from "./apis/events/events.slice";
import EventApi, { prepEventData } from "./apis/events/events.api";
import SeriesApi, { prepSeriesData } from "./apis/series/series.api";

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
  const dispatch = useDispatch();

  useEffect(async () => {
    const seriesApi = new SeriesApi();
    const eventsApi = new EventApi();

    const result = await Promise.all([
      seriesApi.getSeries(2),
      eventsApi.getAllEvents(2),
    ]);

    const calendarData = [
      ...prepSeriesData(result[0].data),
      ...prepEventData(result[1].data),
    ];

    dispatch(setEvents({ events: calendarData }));
    // dispatch(
    //   setEvents({
    //     events: [
    //       {
    //         daysOfWeek: [0, 1],
    //         startTime: "10:00",
    //         endTime: "12:00",
    //         startRecur: "2021-09-07",
    //         endRecur: "2022-09-07",
    //         groupId: "1",
    //         title: "My Recurring Event",
    //         description: "ASDFSDFGSDFG",

    //         exdate: ["2021-09-13T10:30"],
    //       },
    //     ],
    //   })
    // );
  }, []);

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
              pad="medium"
              direction="column"
              background="light-2"
              elevation="medium"
              animation="zoomIn"
              justify="start"
            >
              <CreateEventWrapper
                companies={companies}
                // setEvents={setEvents}
                calendars={calendars}
              />
              <CompanyModalWrapper />
            </Box>
          </Collapsible>
        ) : (
          <layer>
            <Box
              background="light-2"
              tag="header"
              justify="end"
              align="start"
              direction="row"
            >
              <Button
                icon={<FormClose />}
                onClick={() => setShowSidebar(false)}
              />
            </Box>
            {/* <Box fill background="light-2" align="center" justify="center">
              sidebar
            </Box> */}
          </layer>
        )}
        <Main pad="small">
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
