import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import React, { useState } from "react";

import Events from "../models/events";
import eventsData from "../data/events.json";
import EventModal from "./Event-modal";


const MainCalendar = (props) => {

    return (
        <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        expandRows={true}
        handleWindowResize
        selectable={true}
        navLinks={true}
        events={props.events}
        nowIndicator={true}
        // dateClick={}
        />
    );
}
    


export default MainCalendar;