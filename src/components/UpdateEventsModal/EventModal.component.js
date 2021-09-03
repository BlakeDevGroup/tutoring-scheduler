import { Layer, Box, Text, Button } from "grommet";
import { useState, useeffect, useEffect } from "react";
import { Add } from "grommet-icons";
import CreateEventTitle from "../CreateEventModal/components/CreateEventTitle.component.js";
import CreateEventDescription from "../CreateEventModal/components/CreateEventDescription.component.js";
import CompanyDropMenu from "../CreateEventModal/components/CompanyDropMenu.component.js";
import CalendarDropMenu from "../CreateEventModal/components/CalendarDropMenu.component";
import CreateEventTimeSelector from "../CreateEventModal/components/CreateEventTimeSelector.component.js";
import CreateEventDateSelector from "../CreateEventModal/components/CreateEventDateSelector.component.js";

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
    setCompany(props.defaults.company_id);
    setDescription(props.defaults.description);
    // setDate()
    // setTimeStart();
    // setTimeEnd();
    setCalendar(props.defaults.calendar_id);
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
