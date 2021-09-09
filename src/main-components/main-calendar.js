import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import rrulePlugin from "@fullcalendar/rrule";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setEvents, updateEvent } from "../apis/events/events.slice";
import EventApi, { prepEventData } from "../apis/events/events.api";
import { Box } from "grommet";
import EventModal from "../components/UpdateEventsModal/EventModal.component";

const eventApi = new EventApi();

const MainCalendar = (props) => {
  const cal = useRef();
  const events = useSelector((state) => state.events.events);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [defaults, setDefaults] = useState({});

  useEffect(async () => {
    const eventData = await eventApi.getAllEvents(2);
    // dispatch(setEvents({ events: prepEventData(eventData.data) }));
    dispatch(
      setEvents({
        events: [
          {
            daysOfWeek: [0, 1],
            startTime: "10:00",
            endTime: "12:00",
            startRecur: "2021-09-07",
            endRecur: "2022-09-07",
            groupId: "1",
            title: "My Recurring Event",
            description: "ASDFSDFGSDFG",
          },
        ],
      })
    );
  }, []);

  useEffect(() => {
    cal.current.getApi().changeView(props.currentView);
  }, [props.currentView]);

  const EventClickHandler = (eventData) => {
    setShow(true);

    events.forEach((event) => {
      if (event.id == eventData.event.id) {
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
        initialView={props.currentView}
        expandRows={true}
        handleWindowResize={false}
        selectable={true}
        navLinks={true}
        events={events}
        nowIndicator={true}
        eventClick={EventClickHandler}
      />
      {show && (
        <EventModal
          show={show}
          setShow={setShow}
          events={events}
          companies={props.companies}
          calendars={props.calendars}
          defaults={defaults}
        />
      )}
    </Box>
  );
};

export default MainCalendar;
