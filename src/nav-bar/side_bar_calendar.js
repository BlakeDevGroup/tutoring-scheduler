import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import React, { useState } from "react";

export function SideBarCalendar(props) {
  return (
    <FullCalendar
    //   headerToolbar={{
    //     right: "daygridDay, daygridWeek, daygridMonth",
        // center: "daygridWeek",
        // right: "daygridMonth",
    //   }}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      selectable={true}
      navLinks={true}
    />
  );
}
