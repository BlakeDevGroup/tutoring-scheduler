import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import React, { useEffect, useRef, useState } from "react";
import { Box } from "grommet";
import EventModal from "../components/UpdateEventsModal/EventModal.component";

const MainCalendar = (props) => {
  const cal = useRef();
  const [show, setShow] = useState(false);
  const [defaults, setDefaults] = useState({});
  useEffect(() => {
    cal.current.getApi().changeView(props.currentView);
  });

  function parseEventTime(timeString) {
    let hour = timeString.substring(0, 2);
    let minutes = timeString.substring(3, 5);
    let timeOfDay = timeString.substring(5, 8);
    if (timeOfDay === "am") {
      if (hour === "12") hour = "00";
    } else {
      if (hour < 12 && timeOfDay === "pm") {
        hour = parseInt(hour) + 12;
      }
    }
    return `${hour}:${minutes}`;
  }

  const EventClickHandler = (eventData) => {
    setShow(true);

    props.events.forEach((event) => {
      if (event.id == eventData.event.id) {
        setDefaults(event);
      }
    });
  };

  return (
    <Box>
      <FullCalendar
        ref={cal}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={props.currentView}
        expandRows={true}
        handleWindowResize={false}
        selectable={true}
        navLinks={true}
        events={props.events}
        nowIndicator={true}
        eventClick={EventClickHandler}
      />
      {show && (
        <EventModal
          show={show}
          setShow={setShow}
          events={props.events}
          companies={props.companies}
          setEvents={props.setEvents}
          calendars={props.calendars}
          defaults={defaults}
        />
      )}
    </Box>
  );
};

export default MainCalendar;
