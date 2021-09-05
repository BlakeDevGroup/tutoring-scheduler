import { Layer, Box, Text, Button } from "grommet";
import { useState, useEffect } from "react";
import CreateEventTitle from "../CreateEventModal/components/CreateEventTitle.component.js";
import CreateEventDescription from "../CreateEventModal/components/CreateEventDescription.component.js";
import CompanyDropMenu from "../CreateEventModal/components/CompanyDropMenu.component.js";
import CalendarDropMenu from "../CreateEventModal/components/CalendarDropMenu.component";
import CreateEventTimeSelector from "../CreateEventModal/components/CreateEventTimeSelector.component.js";
import CreateEventDateSelector from "../CreateEventModal/components/CreateEventDateSelector.component.js";

const parseEventTimeData = (props) => {
  const startTime = props.defaults.start;
  const endTime = props.defaults.end;

  return console.log(startTime);
};

export default function EventModal(props) {
  console.log(props.defaults);
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
    // setCompany(props.default.company_name);
    // setDate()
    // setTimeStart(props.defaults.start);
    // setTimeEnd(props.defaults.end);
    setCalendar(props.defaults.calendar_name);
  }, [props.defaults]);
  // parseEventTimeData();
  // console.log(props.defaults.start && props.defaults.start.substring(11, 16));
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
