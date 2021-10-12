import { Layer, Box, Button, CheckBox } from "grommet";
import { Checkmark, Close } from "grommet-icons";
import { useState, useEffect } from "react";
import CreateEventTitle from "./CreateEventTitle.component";
import CreateEventDescription from "./CreateEventDescription.component.js";
import CompanyDropMenu from "./CompanyDropMenu.component";
import CalendarDropMenu from "./CalendarDropMenu.component";
import CreateEventTimeSelector from "./CreateEventTimeSelector.component";
import CreateEventDateSelector from "./CreateEventDateSelector.component";
import RecurringDatesSelector from "./ReccuringDatesSelector.component";
import CalendarService from "../../../services/calendar/calendar.service";
import { useDispatch, useSelector } from "react-redux";

import {
  updateEvent,
  removeEvent,
  addEvent,
} from "../../../apis/events/events.slice";

export default function EventModal(props) {
  const companies = useSelector((state) => state.companies.companies);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [allDay, setAllDay] = useState(false);
  const [id, setId] = useState("");
  const [type, setType] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    let payload;
    if (props.defaults) {
      if (props.defaults.daysOfWeek) {
        payload = CalendarService.calendarSeriesToClientInterface(
          props.defaults
        );
        setId(payload.groupId);
        setType("series");
      } else {
        payload = CalendarService.calendarEventToClientInterface(
          props.defaults
        );
        setId(payload.id);
        setType("event");
      }

      setCompany(
        CalendarService.getCompanyById(companies, payload.company_id) || {}
      );
      setTitle(payload.title || "");
      setDescription(payload.description || "");
      setDateStart(payload.dateStart || "");
      setDateEnd(payload.dateEnd || "");
      setTimeStart(payload.timeStart || "");
      setTimeEnd(payload.timeEnd || "");
      setDaysOfWeek(payload.daysOfWeek || []);
      setAllDay(payload.allDay || false);
    }

    console.log(payload);
  }, [props.defaults]);

  if (!props.type) props.type = "create";

  const remove = () => {
    dispatch(removeEvent({ type: type, id: id }));
    props.setShow(false);
  };

  const update = () => {
    let payload = CalendarService.createCalendarEntity(
      {
        title: title,
        company: company,
        description: description,
        dateStart: dateStart.split("T")[0],
        dateEnd: dateEnd.split("T")[0],
        timeStart: timeStart,
        timeEnd: timeEnd,
        daysOfWeek: daysOfWeek,
        allDay: allDay,
        user_id: 1,
        calendar_id: 2,
        company_id: company.company_id,
        id: id,
      },
      daysOfWeek.length > 0
    );
    dispatch(updateEvent({ type: type, event: payload }));
    props.setShow(false);
  };

  const add = () => {
    let eventPayload = CalendarService.createCalendarEntity(
      {
        title: title,
        company: company,
        description: description,
        dateStart: dateStart.split("T")[0],
        dateEnd: dateEnd.split("T")[0],
        timeStart: timeStart,
        timeEnd: timeEnd,
        daysOfWeek: daysOfWeek,
        allDay: allDay,
        user_id: 1,
        calendar_id: 2,
        company_id: company.company_id,
      },
      daysOfWeek.length > 0
    );

    dispatch(addEvent({ event: eventPayload }));

    props.setShow(false);
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
        <Box
          margin={{
            top: "small",
            left: "medium",
            right: "medium",
            bottom: "xsmall",
          }}
          direction="row-responsive"
          justify="center"
          gap="xsmall"
        >
          <CreateEventTitle onChange={setTitle} value={title} />
          <CompanyDropMenu value={company.name} onChange={setCompany} />
        </Box>
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
            isDisabled={props.type !== "create" && daysOfWeek.length == 0}
          />
        </Box>

        <CreateEventDescription onChange={setDescription} value={description} />
      </Box>
      {props.type == "create" && (
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
          onClick={add}
        />
      )}
      {props.type == "update" && (
        <Box justify="center" direction="row-responsive">
          <Button
            label="Update"
            size="small"
            alignSelf="center"
            hoverIndicator
            icon={<Checkmark />}
            margin={{
              top: "xsmall",
              left: "xsmall",
              right: "small",
              bottom: "xsmall",
            }}
            onClick={update}
          />
          <Button
            label="Delete"
            size="small"
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
            onClick={remove}
          />
        </Box>
      )}
    </Layer>
  );
}
