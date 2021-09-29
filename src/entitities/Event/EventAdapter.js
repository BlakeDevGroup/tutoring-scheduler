import EntityFactory from "../EntityFactory";
const toServer = (calendarEvent) => {
  const serverEventData = {
    date_end: calendarEvent.end,
    date_start: calendarEvent.start,
    title: calendarEvent.title,
    all_day: calendarEvent.allDay,
    user_id: calendarEvent.user_id,
    calendar_id: calendarEvent.calendar_id,
    company_id: calendarEvent.company_id,
    description: calendarEvent.description,
    event_id: calendarEvent.id,
  };

  return EntityFactory.createServerEvent(serverEventData);
};

const toCalendar = (serverEvent, companyData) => {
  const calendarEventData = {
    end: serverEvent.date_end,
    start: serverEvent.date_start,
    title: serverEvent.title,
    allDay: serverEvent.all_day,
    user_id: serverEvent.user_id,
    calendar_id: serverEvent.calendar_id,
    company_id: serverEvent.company_id,
    description: serverEvent.description,
    id: serverEvent.event_id,
  };

  return EntityFactory.createCalendarEvent(calendarEventData, companyData);
};

export default {
  toServer: toServer,
  toCalendar: toCalendar,
};
