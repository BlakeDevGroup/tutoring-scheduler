import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import React, { useEffect, useRef } from "react";

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
      handleWindowResize={false}
      selectable={true}
      navLinks={true}
      events={props.events}
      nowIndicator={true}
      // dateClick={changeView("timeGridDay")}
    />
  );
};

export default MainCalendar;
