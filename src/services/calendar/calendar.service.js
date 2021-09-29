import store from "../../store";
import EntityFactory from "../../entitities/EntityFactory";
import SeriesApi from "../../apis/series/series.api";
import EventApi from "../../apis/events/events.api";
import { setEvents } from "../../apis/events/events.slice";
import SeriesAdapter from "../../entitities/Series/SeriesAdapter";
import EventAdapter from "../../entitities/Event/EventAdapter";
import validationService from "../validation/validation.service";
import { cli } from "winston/lib/winston/config";

const eventApi = new EventApi();
const seriesApi = new SeriesApi();
/**
 * retrieve company entity by id
 * @param {*} companies list of CompanyEntities
 * @param {*} companyId CompanyEntity id
 * @returns company entity
 */
const getCompanyById = (companies, companyId) => {
  return (
    companies.filter((company) => companyId == company.company_id)[0] ||
    undefined
  );
};

const getCompanyByName = (companies, name) => {
  return companies.filter((company) => name == company.name)[0] || undefined;
};

/**
 * transforms ServerEventEntities to interface for FullCalendar API
 * @param {*} eventData list of EventEntities
 * @param {*} companyData list of CompanyEntities
 * @returns event payload for FullCalendar API
 */
const prepCalendarEvents = (eventData, companyData) => {
  return eventData.map((event) => {
    const company = getCompanyById(companyData, event.company_id);
    return EventAdapter.toCalendar(
      EntityFactory.createServerEvent(event),
      company
    );
  });
};

/**
 * transform ServerSeriesEntities to interface for FullCalendar API
 * @param {*} seriesData list ServerSeriesEntities
 * @param {*} companyData list of CompanyEntities
 * @returns event payload for FullCalendar API
 */
const prepCalendarSeries = (seriesData, companyData) => {
  return seriesData.map((series) => {
    const company = getCompanyById(companyData, series.company_id);
    return SeriesAdapter.toCalendar(
      EntityFactory.createServerSeries(series),
      company
    );
  });
};

const parseTimeToMilitary = (timeString) => {
  if (RegExp(/[0-9]{2}:[0-9]{2}$/).test(timeString)) return timeString;

  let hour = timeString.split(":")[0];
  let minutes = timeString.split(":")[1].slice(0, -2);
  let timeOfDay = timeString.split(":")[1].slice(-2);
  if (timeOfDay.toLowerCase() === "am") {
    if (hour === "12") hour = "00";
  } else {
    if (hour < 12 && timeOfDay.toLowerCase() === "pm") {
      hour = parseInt(hour) + 12;
    }
  }
  return `${hour}:${minutes}`;
};

const convertMilitaryTimeToTime = (militaryTimeString) => {
  if (!validationService.isMilitaryTime(militaryTimeString))
    throw new Error(
      `${militaryTimeString} is invalid militaryTimeString, expected format: HH:MM`
    );

  const hour = militaryTimeString.split(":")[0];
  const minutes = militaryTimeString.split(":")[1];

  if (hour == "00") {
    return `12:${minutes}am`;
  } else if (hour > 12) {
    return `${hour - 12}:${minutes}pm`;
  } else if (hour < 12) {
    return `${hour}:${minutes}am`;
  } else if (hour == 12) {
    return `${hour}:${minutes}pm`;
  }
};

/**
 * creates a dateTime string from a date and time
 * @param {*} dateString
 * @param {*} timeString
 * @returns dateTime string
 */
const composeDateTime = (dateString, timeString) => {
  if (!validationService.isDate(dateString))
    throw new Error(
      `${dateString} is invalid dateString, expected format: YYYY-MM-DD`
    );

  if (
    !validationService.isTime(timeString) &&
    !validationService.isMilitaryTime(timeString)
  )
    throw new Error(
      `${timeString} is invalid timeString, expected format: HH:MM or HH:MM{am/pm}`
    );
  return `${dateString}T${parseTimeToMilitary(timeString)}`;
};

const parseDateFromDateTime = (dateTimeString) => {
  if (!validationService.isDateTime(dateTimeString))
    throw new Error(
      `${dateTimeString} is not a valid dateTime string, expected format [YYYY-MM-DD]T[HH:MM]`
    );
  return dateTimeString.split("T")[0];
};

const parseTimeFromDateTime = (dateTimeString) => {
  if (!validationService.isDateTime(dateTimeString))
    throw new Error(
      `${dateTimeString} is not a valid dateTime string, expected format [YYYY-MM-DD]T[HH:MM]`
    );
  return convertMilitaryTimeToTime(dateTimeString.split("T")[1]);
};

/**
 * creates CalendarEventEntity for FullCalendar API from client input
 * @param {*} clientInput Object containing client input
 */
const clientToCalendarEvent = (clientInput) => {
  const eventPayload = {
    end: composeDateTime(clientInput.dateStart, clientInput.timeEnd),
    start: composeDateTime(clientInput.dateStart, clientInput.timeStart),
    title: clientInput.title,
    allDay: clientInput.allDay,
    user_id: clientInput.user_id,
    calendar_id: clientInput.calendar_id,
    company_id: clientInput.company.company_id,
    description: clientInput.description,
    id: clientInput.id,
  };

  return EntityFactory.createCalendarEvent(eventPayload, clientInput.company);
};

const calendarEventToClientInterface = (calendarEvent) => {
  const clientPayload = {
    dateStart: parseDateFromDateTime(calendarEvent.start),
    dateEnd: parseDateFromDateTime(calendarEvent.end),
    timeStart: parseTimeFromDateTime(calendarEvent.start),
    timeEnd: parseTimeFromDateTime(calendarEvent.end),
    title: calendarEvent.title,
    allDay: calendarEvent.allDay,
    user_id: calendarEvent.user_id,
    calendar_id: calendarEvent.calendar_id,
    company_id: calendarEvent.company_id,
    description: calendarEvent.description,
    id: calendarEvent.id,
  };

  return clientPayload;
};

/**
 * creates CalendarSeriesEntity for FullCalendar API from client input
 * @param {*} clientInput Object containing client input
 */
const clientToCalendarSeries = (clientInput) => {
  const seriesPayload = {
    startTime: parseTimeToMilitary(clientInput.timeStart),
    endTime: parseTimeToMilitary(clientInput.timeEnd),
    startRecur: clientInput.dateStart,
    endRecur: clientInput.dateEnd,
    daysOfWeek: clientInput.daysOfWeek,
    title: clientInput.title,
    description: clientInput.description,
    calendar_id: clientInput.calendar_id,
    user_id: clientInput.user_id,
    company_id: clientInput.company.company_id,
    groupId: clientInput.id,
  };

  return EntityFactory.createCalendarSeries(seriesPayload, clientInput.company);
};

const calendarSeriesToClientInterface = (calendarSeries) => {
  const clientPayload = {
    dateStart: calendarSeries.startRecur,
    dateEnd: calendarSeries.endRecur,
    timeStart: convertMilitaryTimeToTime(calendarSeries.startTime),
    timeEnd: convertMilitaryTimeToTime(calendarSeries.endTime),
    title: calendarSeries.title,
    daysOfWeek: calendarSeries.daysOfWeek,
    user_id: calendarSeries.user_id,
    calendar_id: calendarSeries.calendar_id,
    company_id: calendarSeries.company_id,
    description: calendarSeries.description,
    groupId: calendarSeries.groupId,
  };

  return clientPayload;
};
/**
 * create a CalendarEventEntity or if recurring creates a CalendarSeriesEntity
 * @param {*} clientInput Object containing client input
 * @param {*} isRecurring
 * @returns CalendarEntity
 */
const createCalendarEntity = (clientInput, isRecurring) => {
  return isRecurring
    ? clientToCalendarSeries(clientInput)
    : clientToCalendarEvent(clientInput);
};

export default {
  getCompanyById: getCompanyById,
  prepCalendarEvents: prepCalendarEvents,
  prepCalendarSeries: prepCalendarSeries,
  parseTimeToMilitary: parseTimeToMilitary,
  clientToCalendarEvent: clientToCalendarEvent,
  clientToCalendarSeries: clientToCalendarSeries,
  composeDateTime: composeDateTime,
  createCalendarEntity: createCalendarEntity,
  parseDateFromDateTime: parseDateFromDateTime,
  parseTimeFromDateTime: parseTimeFromDateTime,
  convertMilitaryTimeToTime: convertMilitaryTimeToTime,
  calendarEventToClientInterface: calendarEventToClientInterface,
  calendarSeriesToClientInterface: calendarSeriesToClientInterface,
  getCompanyByName: getCompanyByName,
};
