import chai, { expect } from "chai";
import sinon, { createStubInstance } from "sinon";
import sinonChai from "sinon-chai";
import CalendarService, {
  getCompanyById,
  getCalendarEvents,
  getCalendarSeries,
} from "./calendar.service";
import store from "../../store";
import EntityFactory from "../../entitities/EntityFactory";
import SeriesApi from "../../apis/series/series.api";
import EventApi from "../../apis/events/events.api";
import * as eventActions from "../../apis/events/events.slice";

chai.use(sinonChai);
let stub;
let sandBox;
let eventApiStub;
let seriesApiStub;
let dispatchStub;

const CALENDAR_ID = "2";
const COMPANY_DATA = [
  {
    company_id: 1,
    name: "Test Company",
    color: "#f2f2f2",
  },
];
const seriesData = [
  {
    title: "Test Series",
    description: "Test Series description",
    series_id: "48",
    calendar_id: "2",
    start_time: "10:30:00",
    end_time: "14:30:00",
    days_of_week: ["0", "1", "2"],
    user_id: "1",
    company_id: "128",
    start_recur: "2021-08-31",
    end_recur: "2022-08-31",
  },
];
const eventData = [
  {
    date_end: "2021-09-14T20:15:00.000Z",
    date_start: "2021-09-14T20:00:00.000Z",
    event_id: "336",
    title: "Caleb Blake",
    all_day: false,
    user_id: "1",
    calendar_id: "2",
    description: "description here",
    company_id: "128",
  },
  {
    date_end: "2021-07-29T19:30:00.000Z",
    date_start: "2021-07-29T15:30:00.000Z",
    event_id: "316",
    title: "MyEvent",
    all_day: true,
    user_id: "1",
    calendar_id: "2",
    description: "1",
    company_id: "128",
  },
];

describe.skip("CalendarService", () => {
  before(() => {});

  beforeEach(() => {
    sandBox = sinon.createSandbox();
    stub = sandBox.stub();
    eventApiStub = sandBox
      .stub(EventApi.prototype, "getAllEvents")
      .resolves({ data: eventData });

    seriesApiStub = sandBox
      .stub(SeriesApi.prototype, "getSeries")
      .resolves({ data: seriesData });

    dispatchStub = sandBox.stub(store, "dispatch");
  });

  afterEach(() => {
    stub.reset();
    sandBox.restore();
    eventApiStub.reset();
    seriesApiStub.reset();
    dispatchStub.reset();
  });

  it("when company_id exist then get company", async () => {
    stub = sandBox.stub(store, "getState").returns({
      companies: {
        companies: COMPANY_DATA,
      },
    });
    const result = getCompanyById("1");

    expect(result).to.equal(COMPANY_DATA[0]);
  });

  it("when company_id does not exist then return undefined", () => {
    stub = sandBox.stub(store, "getState").returns({
      companies: {
        companies: COMPANY_DATA,
      },
    });

    const result = getCompanyById("2");

    expect(result).to.equal(undefined);
  });

  describe("build event", () => {
    it("when getCompanyById returns data then combine objects into one and return ", () => {
      stub = sandBox.stub(store, "getState").returns({
        companies: {
          companies: COMPANY_DATA,
        },
      });

      const DATA = {
        end: "2021-07-29T15:30:00",
        start: "2021-07-29T14:30:00",
        title: "Our First Event",
        allDay: false,
        user_id: 1,
        calendar_id: 1,
        description: "Test Description",
        company_id: 1,
        id: 1,
      };

      const COMPARE = {
        end: "2021-07-29T15:30:00",
        start: "2021-07-29T14:30:00",
        title: "Our First Event",
        allDay: false,
        user_id: 1,
        calendar_id: 1,
        description: "Test Description",
        company_id: 1,
        id: 1,
      };

      const result = CalendarService.buildEvent(
        EntityFactory.createCalendarEvent(DATA)
      );

      expect(result).to.be.an("object");
      expect(result).to.eql(
        Object.assign({}, COMPARE, {
          editable: true,
          display: "block",
          backgroundColor: COMPANY_DATA[0].color,
          borderColor: COMPANY_DATA[0].color,
        })
      );
    });

    it("when getCompanyById does not return data then combine objects into one and return defaults ", () => {
      stub = sandBox.stub(store, "getState").returns({
        companies: {
          companies: COMPANY_DATA,
        },
      });

      const DATA = {
        end: "2021-07-29T15:30:00",
        start: "2021-07-29T14:30:00",
        title: "Our First Event",
        allDay: false,
        user_id: 1,
        calendar_id: 1,
        description: "Test Description",
        company_id: 5,
        id: 1,
      };

      const COMPARE = {
        end: "2021-07-29T15:30:00",
        start: "2021-07-29T14:30:00",
        title: "Our First Event",
        allDay: false,
        user_id: 1,
        calendar_id: 1,
        description: "Test Description",
        company_id: 5,
        id: 1,
      };

      const result = CalendarService.buildEvent(
        EntityFactory.createCalendarEvent(DATA)
      );

      expect(result).to.be.an("object");
      expect(result).to.eql(
        Object.assign({}, COMPARE, {
          editable: true,
          display: "block",
          backgroundColor: "#027788",
          borderColor: "#027788",
        })
      );
    });
  });

  describe("getCalendarEvents", () => {
    it("should get calendar events and return array of CalendarEventEntities", async () => {
      const result = await getCalendarEvents(CALENDAR_ID);

      expect(eventApiStub).calledOnceWith(CALENDAR_ID);

      expect(result).to.be.an("array");
    });
  });

  describe("getCalendarSeries", () => {
    it("should get calendar series and return array of CalendarEventEntities", async () => {
      const result = await getCalendarSeries(CALENDAR_ID);

      expect(seriesApiStub).calledOnce;
      expect(result).to.be.an("array");
    });
  });

  describe("setCalendarEvents", () => {
    it("should retrieve data series and events from API and dispatch setEvents", async () => {
      const sData = await getCalendarSeries(CALENDAR_ID);
      const eData = await getCalendarEvents(CALENDAR_ID);
      const RETURN_VALUE = [].concat(sData, eData);
      const setEventsStub = sandBox
        .stub(eventActions, "setEvents")
        .returns(RETURN_VALUE);
      await CalendarService.setCalendarEvents(CALENDAR_ID);

      expect(dispatchStub).calledOnceWith(RETURN_VALUE);
    });
  });
});
