import { Box, Text, Grommet, Grid } from "grommet";
import React, { useEffect, useState } from "react";
import { Money, Currency } from "grommet-icons";
import { useSelector } from "react-redux";
import calendarService from "../../services/calendar/calendar.service";
import CompanyCard from "./CompanyCard";
import CompanyDisplayController from "./CompanyDisplayController";
import { filter } from "rxjs";
const theme = {
  global: {
    font: {
      family: `-apple-system,
           BlinkMacSystemFont, 
           "Segoe UI"`,
    },
    colors: {
      blue: "#00C8FF",
      green: "#17EBA0",
      teal: "#82FFF2",
      purple: "#F740FF",
      red: "#FC6161",
      orange: "#FFBC44",
      yellow: "#FFEB59",
    },
  },
  card: {
    footer: {
      pad: { horizontal: "medium", vertical: "small" },
      background: "#FFFFFF27",
    },
  },
};
export default function CompanyDisplayWrapper() {
  const startDate = useSelector((state) => state.fullCalendar.start);
  const endDate = useSelector((state) => state.fullCalendar.end);
  const fcEvents = useSelector((state) => state.fullCalendar.events);
  const companies = useSelector((state) => state.companies.companies);
  const view = useSelector((state) => state.fullCalendar.view);
  const [events, setEvents] = useState([]);
  const [cardData, setCardData] = useState([]);
  useEffect(() => {
    async function filterEvents() {
      const filteredEvents = calendarService.filterEventsByDateRange(
        fcEvents,
        new Date(startDate),
        new Date(endDate)
      );

      setEvents(filteredEvents);
    }

    filterEvents();
  }, [fcEvents]);

  useEffect(() => {
    async function generateCardData() {
      if (events.length > 0 && companies.length > 0) {
        setCardData(
          CompanyDisplayController.generateCardData(events, companies, view)
        );
      }
    }

    generateCardData();
  }, [events]);

  return (
    <Grommet theme={theme}>
      <Grid columns="small" gap="small">
        {cardData.map((value) => (
          <CompanyCard
            key={value.key}
            color={value.color}
            title={value.title}
            total={value.total}
            message={value.message}
          />
        ))}
      </Grid>
    </Grommet>
  );
}
