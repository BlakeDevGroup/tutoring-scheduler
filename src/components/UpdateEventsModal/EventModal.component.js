import { Layer, Box, Text, Button } from "grommet";
import { useState, useEffect } from "react";
import CreateEventTitle from "../CreateEventModal/components/CreateEventTitle.component.js";
import CreateEventDescription from "../CreateEventModal/components/CreateEventDescription.component.js";
import CompanyDropMenu from "../CreateEventModal/components/CompanyDropMenu.component.js";
import CalendarDropMenu from "../CreateEventModal/components/CalendarDropMenu.component";
import CreateEventTimeSelector from "../CreateEventModal/components/CreateEventTimeSelector.component.js";
import CreateEventDateSelector from "../CreateEventModal/components/CreateEventDateSelector.component.js";
import { parse } from "@babel/core";

const parseEventTimeData = (dateString) => {
  let parsedTime = dateString.substring(11, 16);
  let hour = parsedTime.substring(0, 2);

  if (hour == 12) {
    parsedTime = parsedTime + "pm";
  } else if (hour == "00") {
    parsedTime = parsedTime.replace(hour, "12");
    parsedTime = parsedTime + "am";
  } else if (hour > 12 && hour < 22) {
    parsedTime = parsedTime.replace(hour, hour - 12);
    parsedTime = "0" + parsedTime + "pm";
  } else if (hour > 12) {
    parsedTime = parsedTime.replace(hour, hour - 12);
    parsedTime = parsedTime + "pm";
  } else if (hour < 10) {
    parsedTime = parsedTime + "am";
  } else {
    parsedTime = parsedTime + "am";
  }
  console.log(parsedTime);
  return parsedTime;
};

// else if (hour > 12) {
//   parsedTime = parsedTime.replace(hour, hour - 12);
//   parsedTime = parsedTime + "pm";

export default function EventModal(props) {
  // console.log(props.defaults);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [calendar, setCalendar] = useState("");

  useEffect(() => {
    setTitle(props.defaults.title || "");
    setCompany(props.defaults.company_name);
    setDescription(props.defaults.description);
    if (props.defaults.start) {
      setTimeStart(parseEventTimeData(props.defaults.start));
    }
    if (props.defaults.end) {
      setTimeEnd(parseEventTimeData(props.defaults.end));
    }
    setCalendar(props.defaults.calendar_name);
  }, [props.defaults]);

  // setCompany(props.default.company_name);
  // setDate()

  console.log(props.defaults.end && props.defaults.end.substring(11, 16));
  // console.log(props.defaults.end && props.defaults.end.substring(11, 16));
  return (
    <Layer
      onEsc={() => props.setShow(false)}
      onClickOutside={() => props.setShow(false)}
    >
      {" "}
      <Box
        margin={{
          top: "xsmall",
          left: "medium",
          right: "medium",
          bottom: "xsmall",
        }}
      >
        <CreateEventTitle onChange={setTitle} value={title} />
        <CreateEventTimeSelector
          timeStart={timeStart}
          timeEnd={timeEnd}
          setTimeStart={setTimeStart}
          setTimeEnd={setTimeEnd}
        />
        <CreateEventDateSelector onChange={setDate} value={date} />

        <CreateEventDescription onChange={setDescription} value={description} />

        <Box
          margin={{
            top: "xsmall",
            left: "medium",
            right: "medium",
            bottom: "xsmall",
          }}
          direction="row-responsive"
          justify="between"
        >
          <CompanyDropMenu
            companies={props.companies}
            value={company}
            onChange={setCompany}
          />

          <CalendarDropMenu
            calendars={props.calendars}
            value={calendar}
            onChange={setCalendar}
          />
        </Box>
        <Button
          type="submit"
          label="update"
          size="medium"
          alignSelf="center"
          hoverIndicator
          margin={{
            top: "xsmall",
            left: "medium",
            right: "medium",
            bottom: "xsmall",
          }}
          onClick={() => {
            // updateEvent(
            //   props.events,
            //   {
            //     id: "3",
            //     title: title,
            //     start: `${date.split("T")[0]}T${parseEventTime(timeStart)}`,
            //     end: `${date.split("T")[0]}T${parseEventTime(timeEnd)}`,
            //     description: `${description}`,
            //     calendar_id: calendar,
            //     editable: "true",
            //   },
            //   props.setEvents
            // );
            props.setShow(false);
          }}
        />
      </Box>
    </Layer>
  );
}
