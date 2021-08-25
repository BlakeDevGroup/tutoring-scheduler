import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import React, { useEffect, useState, useRef } from "react";

import Events from "../models/events";
import eventsData from "../data/events.json";
import EventModal from "./Event-modal";
import { Calendar } from "grommet";

const MainCalendar = (props) => {
  const cal = useRef();
  useEffect(() => {
    cal.current.getApi().changeView(props.currentView);
  });
  return (
    <FullCalendar
      ref={cal}
      // headerToolbar={{
      //   center: "dayGridMonth, timeGridWeek, timeGridDay",
      // }}
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView={props.currentView}
      expandRows={true}
      handleWindowResize
      selectable={true}
      navLinks={true}
      events={props.events}
      nowIndicator={true}
      // dateClick={changeView("timeGridDay")}
    />
  );
};

export default MainCalendar;
