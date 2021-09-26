import { Layer, Box, Text, Button } from "grommet";
import { useState, useEffect } from "react";
import { Checkmark, Close } from "grommet-icons";
import CreateEventTitle from "../CreateEventModal/components/CreateEventTitle.component.js";
import CreateEventDescription from "../CreateEventModal/components/CreateEventDescription.component.js";
import CompanyDropMenu from "../CreateEventModal/components/CompanyDropMenu.component.js";
import CalendarDropMenu from "../CreateEventModal/components/CalendarDropMenu.component";
import CreateEventTimeSelector from "../CreateEventModal/components/CreateEventTimeSelector.component.js";
import CreateEventDateSelector from "../CreateEventModal/components/CreateEventDateSelector.component.js";
import { useDispatch } from "react-redux";
import { updateEvent, removeEvent } from "../../apis/events/events.slice";

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
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [calendar, setCalendar] = useState("");
  const dispatch = useDispatch();

  const removeEvents = () => {
    dispatch(removeEvent(props.defaults.id));
    props.setShow(false);
  };

  const updateEvents = () => {
    dispatch(
      updateEvent({
        title: title,
        company_name: company,
        description: description,
        start: `${parseEventDateData(date)}T${parseEventTime(timeStart)}`,
        end: `${parseEventDateData(date)}T${parseEventTime(timeEnd)}`,
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
      setDate(props.defaults.start);
    }

    if (props.defaults.end) {
      setTimeEnd(parseEventTimeData(props.defaults.end));
    }
  }, [props.defaults]);

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
        <Box
          margin={{
            top: "small",
            left: "medium",
            right: "medium",
            bottom: "xxsmall",
          }}
          direction="row-responsive"
          justify="center"
          gap="xsmall"
        >
          <CreateEventTitle onChange={setTitle} value={title} />
          <CompanyDropMenu
            companies={props.companies}
            value={company}
            onChange={setCompany}
          />
        </Box>

        <CreateEventTimeSelector
          timeStart={timeStart}
          timeEnd={timeEnd}
          setTimeStart={setTimeStart}
          setTimeEnd={setTimeEnd}
        />
        <CreateEventDateSelector onChange={setDate} value={date} />
        <CreateEventDescription onChange={setDescription} value={description} />
        <Box justify="center" direction="row-responsive">
          <Button
            label="Update"
            size="xsmall"
            alignSelf="center"
            hoverIndicator
            icon={<Checkmark />}
            margin={{
              top: "xsmall",
              left: "xsmall",
              right: "small",
              bottom: "xsmall",
            }}
            onClick={updateEvents}
          />
          <Button
            label="Delete"
            size="xsmall"
            alignSelf="center"
            color="red"
            hoverIndicator
            icon={<Close />}
            margin={{
              top: "xsmall",
              left: "small",
              right: "xsmall",
              bottom: "xsmall",
            }}
            onClick={removeEvents}
          />
        </Box>
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
