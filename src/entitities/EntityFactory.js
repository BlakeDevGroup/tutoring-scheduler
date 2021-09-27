import { CalendarEventEntity } from "./Event/CalendarEvent.entity";
import { ServerEventEntity } from "./Event/ServerEvent.entity";
import { ServerSeriesEntity } from "./Series/ServerSeries.entity";
import { CalendarSeriesEntity } from "./Series/CalendarSeries.entity";

function createCalendarEvent(eventData) {
  return new CalendarEventEntity(eventData);
}
const EntityFactory = {
  createCalendarEvent: (eventData) => new CalendarEventEntity(eventData),

  createServerEvent: (eventData) => new ServerEventEntity(eventData),

  createCalendarSeries: (seriesData) => new CalendarSeriesEntity(seriesData),

  createServerSeries: (seriesData) => new ServerSeriesEntity(seriesData),
};

export default EntityFactory;
