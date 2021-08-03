import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import React, { useState } from "react";


import Events from "../models/events";
import eventsData from "../data/events.json";

const getEvents = () => {

    let events = []

    eventsData["events"].forEach(data => {
        
        events.push(data)
    });
    
    

    return events
}
const MainCalendar = (props) => {
    const [events, setEvents] = useState(getEvents())
    

    return (
        <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        expandRows={true}
        handleWindowResize
        selectable={true}
        navLinks={true}
        events={events}
        nowIndicator={false}
        />
    );
}
    


export default MainCalendar;