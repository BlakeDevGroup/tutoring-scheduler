import { Layer, Box, Button } from "grommet";
import { Add } from "grommet-icons";
import { useState } from "react";
import CreateEventTitle from "./CreateEventTitle.component";
import CreateEventDescription from "./CreateEventDescription.component.js";
import CompanyDropMenu from "./CompanyDropMenu.component";
import CalendarDropMenu from "./CalendarDropMenu.component";
import CreateEventTimeSelector from "./CreateEventTimeSelector.component";
import CreateEventDateSelector from "./CreateEventDateSelector.component";

const setNewEvents = (events, newEvent, setEvents) => {
  const newEvents = [].concat(events, [newEvent]);

  setEvents(newEvents);
};

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

export default function CreateEventModal(props) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState();
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [calendar, setCalendar] = useState("");
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
          icon={<Add />}
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
            props.onSubmit({
              id: "3",
              title: title,
              start: `${date.split("T")[0]}T${parseEventTime(timeStart)}`,
              end: `${date.split("T")[0]}T${parseEventTime(timeEnd)}`,
              description: `${description}`,
              calendar_id: calendar,
              editable: "true",
            });

            props.setShow(false);
          }}
        />
      </Box>
    </Layer>
  );
}
