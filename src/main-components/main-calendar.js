import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import rrulePlugin from "@fullcalendar/rrule";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setEvents, updateEvent } from "../apis/events/events.slice";
import EventApi from "../apis/events/events.api";
import { Box } from "grommet";
<<<<<<< HEAD
import EventModal from "../components/UpdateEventsModal/EventModal.component";
import { createSelector } from "reselect";
import { filter } from "rxjs";
=======
import EventModal from "../components/CreateEventModal/components/EventModal.component";
>>>>>>> develop

const eventApi = new EventApi();

const MainCalendar = (props) => {
  const cal = useRef();

  const events = useSelector((state) => state.events.events);
  const filteredCompanies = useSelector(
    (state) => state.companies.filteredCompanies
  );

  const [filteredEvents, setFilteredEvents] = useState([]);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [defaults, setDefaults] = useState(null);

  useEffect(() => {
    cal.current.getApi().changeView(props.currentView);
  }, [props.currentView]);

  useEffect(() => {
    setFilteredEvents(
      events.filter((event) => !filteredCompanies.includes(event.company_id))
    );
  }, [events, filteredCompanies]);

  const EventClickHandler = (eventData) => {
    setShow(true);

    events.forEach((event) => {
      if (event.daysOfWeek) {
        if (event.groupId == eventData.event.groupId) {
          setDefaults(event);
        }
      } else if (event.id == eventData.event.id) {
        setDefaults(event);
      }
    });
  };

  const onSubmitHandler = (event) => {
    dispatch(updateEvent(event));
  };
  return (
    <Box>
      <FullCalendar
        ref={cal}
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          rrulePlugin,
        ]}
        eventRemove
        initialView={props.currentView}
        expandRows={true}
        handleWindowResize={false}
        selectable={true}
        navLinks={true}
        events={filteredEvents}
        nowIndicator={true}
        eventClick={EventClickHandler}
        editable={true}
      />
      {show && (
        <EventModal
          type="update"
          show={show}
          setShow={setShow}
          events={events}
          defaults={defaults}
        />
      )}
    </Box>
  );
};

export default MainCalendar;
