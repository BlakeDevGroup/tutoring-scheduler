import { server } from "sinon";
import EntityFactory from "../EntityFactory";

const toServer = (calendarSeries) => {
  const serverEventData = {
    start_time: calendarSeries.startTime,
    end_time: calendarSeries.endTime,
    start_recur: calendarSeries.startRecur,
    end_recur: calendarSeries.endRecur,
    days_of_week: calendarSeries.daysOfWeek,
    title: calendarSeries.title,
    description: calendarSeries.description,
    calendar_id: calendarSeries.calendar_id,
    user_id: calendarSeries.user_id,
    company_id: calendarSeries.company_id,
    series_id: calendarSeries.series_id,
  };

  return EntityFactory.createServerSeries(serverEventData);
};

const toCalendar = (serverSeries, companyData) => {
  const seriesData = {
    startTime: serverSeries.start_time,
    endTime: serverSeries.end_time,
    startRecur: serverSeries.start_recur,
    endRecur: serverSeries.end_recur,
    daysOfWeek: serverSeries.days_of_week,
    title: serverSeries.title,
    description: serverSeries.description,
    calendar_id: serverSeries.calendar_id,
    user_id: serverSeries.user_id,
    company_id: serverSeries.company_id,
    groupId: serverSeries.series_id,
  };

  return EntityFactory.createCalendarSeries(seriesData, companyData);
};

export default {
  toServer: toServer,
  toCalendar: toCalendar,
};
