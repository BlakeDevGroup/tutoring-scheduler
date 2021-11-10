import { Box, Collapsible, Button, Main } from "grommet";
import { FormClose } from "grommet-icons";
import CreateEventWrapper from "./components/CreateEventModal/CreateEventWrapper.component";
import React, { useState, useEffect, useCallback } from "react";
import MainCalendar from "./main-components/main-calendar";
import companiesData from "./data/companies.json";
import calendarsData from "./data/calendars.json";
import viewsData from "./data/views.json";
import NavBarWrapper from "./components/NavBar/NavBarWrapper.component";
import CompanyModalWrapper from "./components/CompanyModal/CompanyModalWrapper";
import CompanyCheckBoxesList from "./components/CompanyModal/components/CompanyCheckBoxList.component";

import { useDispatch, useSelector } from "react-redux";
import { setCompanies } from "./apis/companies/companies.slice";
import CompanyApi, { prepCompanyData } from "./apis/companies/companies.api";
import CalendarService from "./services/calendar/calendar.service";
import EventApi from "./apis/events/events.api";
import SeriesApi from "./apis/series/series.api";
import { setEvents } from "./apis/events/events.slice";
import CompanyDisplayWrapper from "./components/CompanyDisplay/CompanyDisplayWrapper";

const eventApi = new EventApi();
const seriesApi = new SeriesApi();

const getViews = () => {
  let views = [];

  viewsData["views"].forEach((data) => {
    views.push(data);
  });

  return views;
};

const App = (props) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [views, setViews] = useState(getViews());
  const [currentView, setCurrentView] = useState("dayGridMonth");
  const dispatch = useDispatch();

  useEffect(async () => {
    const companyApi = new CompanyApi();
    const companyData = await companyApi.getAllCompanies();

    await dispatch(
      setCompanies({ companies: prepCompanyData(companyData.data) })
    );

    let [events, series] = await Promise.all([
      eventApi.getAllEvents(2),
      seriesApi.getSeries(2),
    ]);

    events = CalendarService.prepCalendarEvents(
      events.data,
      prepCompanyData(companyData.data)
    );
    series = CalendarService.prepCalendarSeries(
      series.data,
      prepCompanyData(companyData.data)
    );
    dispatch(
      setEvents({
        events: [...events, ...series],
      })
    );
  }, []);

  return (
    <Box fill>
      <NavBarWrapper
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        views={views}
        setCurrentView={setCurrentView}
      />
      <Box
        direction="row-responsive"
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
              <CreateEventWrapper />

              <CompanyCheckBoxesList />
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
          <CompanyDisplayWrapper />
          <MainCalendar currentView={currentView} />
        </Main>
      </Box>
    </Box>
  );
};

export default App;
