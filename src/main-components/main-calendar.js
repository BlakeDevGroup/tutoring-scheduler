import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setEvents } from "../apis/events/events.slice";
import EventApi, { prepEventData } from "../apis/events/events.api";

const eventApi = new EventApi();

const MainCalendar = (props) => {
  const cal = useRef();
  const events = useSelector((state) => state.events.events);
  const dispatch = useDispatch();

  useEffect(async () => {
    const eventData = await eventApi.getAllEvents(2);
    dispatch(setEvents({ events: prepEventData(eventData.data) }));
  }, []);

  useEffect(() => {
    cal.current.getApi().changeView(props.currentView);
  }, [props.currentView]);

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
      events={events}
      nowIndicator={true}
      // dateClick={changeView("timeGridDay")}
    />
  );
};

export default MainCalendar;
