import { Select } from "grommet";
import { CaretDownFill } from "grommet-icons";
import React from "react";
// import calendarData from "../data/companies.json";

function FormatCalendars(calendars) {
  let calendarNames = [];

  calendars.forEach((item) => {
    calendarNames.push(item.calendarName);
  });
  return calendarNames;
}

function CalendarDropMenu(props) {
  return (
    <Select
      icon={<CaretDownFill />}
      size="small"
      options={FormatCalendars(props.calendars)}
      value={props.calendar}
      placeholder="Select calendar"
      onChange={(e) => {
        props.onChange(e.target.value);
      }}
      multiple={false}
      calendars={props.calendars}
    />
  );
}

export default CalendarDropMenu;
