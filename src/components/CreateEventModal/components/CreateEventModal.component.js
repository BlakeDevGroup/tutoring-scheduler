import { Layer, Box, Button, CheckBox } from "grommet";
import { Checkmark } from "grommet-icons";
import { useState } from "react";
import CreateEventTitle from "./CreateEventTitle.component";
import CreateEventDescription from "./CreateEventDescription.component.js";
import CompanyDropMenu from "./CompanyDropMenu.component";
import CalendarDropMenu from "./CalendarDropMenu.component";
import CreateEventTimeSelector from "./CreateEventTimeSelector.component";
import CreateEventDateSelector from "./CreateEventDateSelector.component";
import RecurringDatesSelector from "./ReccuringDatesSelector.component";

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
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [calendar, setCalendar] = useState("");
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [allDay, setAllDay] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);
  console.log(props.companies);

  const selectEventType = () => {
    /**
     * determines if creating an event or a series
     * a series is just a recurring event for a specified amount of time
     * if dateEnd is empty the series recurs infinitely
     *
     * check if recurring days of the week have been set
     * if true, event is a series
     * if false, event is not recurring
     */
    //
    if (daysOfWeek.length > 0) {
      return {
        daysOfWeek: daysOfWeek,
        startTime: parseEventTime(timeStart),
        endTime: parseEventTime(timeEnd),
        startRecur: dateStart.split("T")[0],
        endRecur: dateEnd.split("T")[0],
        title: title,
        description: description,
        groupId: "2",
      };
    } else {
      return {
        title: title,
        start: `${dateStart.split("T")[0]}T${parseEventTime(timeStart)}`,
        end: `${dateStart.split("T")[0]}T${parseEventTime(timeEnd)}`,
        description: `${description}`,
        calendar_id: calendar,
        editable: "true",
      };
    }
  };
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
          description={description}
          setTimeStart={setTimeStart}
          setTimeEnd={setTimeEnd}
        />
        <Box
          margin={{
            top: "xsmall",
            left: "medium",
            right: "medium",
            bottom: "xsmall",
          }}
          direction="row-responsive"
        >
          <CreateEventDateSelector onChange={setDateStart} value={dateStart} />
          <CheckBox
            checked={allDay}
            label="all day"
            onChange={(event) => setAllDay(event.target.checked)}
            pad="small"
          />
          <RecurringDatesSelector
            daysOfWeek={daysOfWeek}
            setDaysOfWeek={setDaysOfWeek}
            dateStart={dateStart}
            setDateStart={setDateStart}
            dateEnd={dateEnd}
            setDateEnd={setDateEnd}
            setChecked={setIsRecurring}
            checked={isRecurring}
          />
        </Box>

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
          icon={<Checkmark />}
          label="Create"
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
            props.onSubmit(selectEventType());

            props.setShow(false);
          }}
        />
      </Box>
    </Layer>
  );
}
