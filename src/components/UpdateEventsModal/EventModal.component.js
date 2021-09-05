import { Layer, Box, Text, Button } from "grommet";
import { useState, useEffect } from "react";
import CreateEventTitle from "../CreateEventModal/components/CreateEventTitle.component.js";
import CreateEventDescription from "../CreateEventModal/components/CreateEventDescription.component.js";
import CompanyDropMenu from "../CreateEventModal/components/CompanyDropMenu.component.js";
import CalendarDropMenu from "../CreateEventModal/components/CalendarDropMenu.component";
import CreateEventTimeSelector from "../CreateEventModal/components/CreateEventTimeSelector.component.js";
import CreateEventDateSelector from "../CreateEventModal/components/CreateEventDateSelector.component.js";
import { parse } from "@babel/core";

const parseEventDateData = (dateString) => {
  let date = dateString.split("T");
  return date[0];
};

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
  return parsedTime;
};

export default function EventModal(props) {
  // console.log(props.defaults);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [calendar, setCalendar] = useState("");

  const updateEvents = () => {
    let filteredEvents = props.events;
    for (let i = 0; i < filteredEvents.length; i++) {
      if (filteredEvents[i].id == props.defaults.id) {
        const removedValue = filteredEvents.splice(i, 1);
        break;
      }
    }

    props.setEvents(
      [].concat(filteredEvents, {
        title: title,
        company_name: company,
        description: description,
        start: "2021-09-04T22:30:00",
        end: "2021-09-04T23:30:00",
        id: props.defaults.id,
        calendar_name: calendar,
      })
    );
    props.setShow(false);
  };

  useEffect(() => {
    setTitle(props.defaults.title || "");
    setCompany(props.defaults.company_name);
    setDescription(props.defaults.description);
    setCalendar(props.defaults.calendar_name);

    if (props.defaults.start) {
      setTimeStart(parseEventTimeData(props.defaults.start));
    }

    if (props.defaults.end) {
      setTimeEnd(parseEventTimeData(props.defaults.end));
    }

    if (props.defaults.start) {
      setDate(parseEventDateData(props.defaults.start));
    }
  }, [props.defaults]);

  // console.log(props.defaults.start && props.defaults.start);
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
          onClick={updateEvents}
        />
      </Box>
    </Layer>
  );
}

// {
//   id: props.defaults.id,
//   title: title,
//   start: "2021-09-04T22:30:00",
//   end: "2021-09-04T23:30:00",
//   description: description,
//   calendar_name: calendar,
//   editable: "true",
//   company_name: company,
// }
