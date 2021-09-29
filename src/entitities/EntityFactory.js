import { CalendarEventEntity } from "./Event/CalendarEvent.entity";
import { ServerEventEntity } from "./Event/ServerEvent.entity";
import { ServerSeriesEntity } from "./Series/ServerSeries.entity";
import { CalendarSeriesEntity } from "./Series/CalendarSeries.entity";

function createCalendarEvent(eventData) {
  return new CalendarEventEntity(eventData);
}
const EntityFactory = {
  createCalendarEvent: (eventData, companyData) =>
    new CalendarEventEntity(eventData, companyData),

  createServerEvent: (eventData) => new ServerEventEntity(eventData),

  createCalendarSeries: (seriesData, companyData) =>
    new CalendarSeriesEntity(seriesData, companyData),

  createServerSeries: (seriesData) => new ServerSeriesEntity(seriesData),
};

export default EntityFactory;
