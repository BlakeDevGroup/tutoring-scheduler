import store from "../../store";
import EntityFactory from "../../entitities/EntityFactory";
import SeriesApi from "../../apis/series/series.api";
import EventApi from "../../apis/events/events.api";
import { setEvents } from "../../apis/events/events.slice";
import SeriesAdapter from "../../entitities/Series/SeriesAdapter";
import EventAdapter from "../../entitities/Event/EventAdapter";

const eventApi = new EventApi();
const seriesApi = new SeriesApi();

export const getCompanyById = (companyId) => {
  const companies = store.getState().companies.companies;
  return (
    companies.filter((company) => companyId == company.company_id)[0] ||
    undefined
  );
};

const buildEvent = (event) => {
  const companyData = getCompanyById(event.company_id);
  const color = companyData ? companyData.color : "#027788";

  return Object.assign({}, event, {
    editable: true,
    display: "block",
    backgroundColor: color,
    borderColor: color,
  });
};

export const getCalendarEvents = async (calendar_id) => {
  const eventData = await eventApi.getAllEvents(calendar_id);

  return eventData.data.map((events) => {
    return buildEvent(
      EventAdapter.toCalendar(EntityFactory.createServerEvent(events))
    );
  });
};

export const getCalendarSeries = async (calendar_id) => {
  const seriesData = await seriesApi.getSeries(calendar_id);

  return seriesData.data.map((series) => {
    return buildEvent(
      SeriesAdapter.toCalendar(EntityFactory.createServerSeries(series))
    );
  });
};
const setCalendarEvents = async (calendar_id) => {
  const series = await getCalendarSeries(calendar_id);
  const events = await getCalendarEvents(calendar_id);

  store.dispatch(setEvents({ events: [].concat(series, events) }));
};
export default {
  buildEvent: buildEvent,
  setCalendarEvents: setCalendarEvents,
};
