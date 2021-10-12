import chai, { expect } from "chai";
import sinon, { createStubInstance } from "sinon";
import sinonChai from "sinon-chai";
import CalendarService from "./calendar.service";
import EntityFactory from "../../entitities/EntityFactory";
import SeriesAdapter from "../../entitities/Series/SeriesAdapter";
import EventAdapter from "../../entitities/Event/EventAdapter";
import validationService from "../../services/validation/validation.service";
import { cli } from "winston/lib/winston/config";

chai.use(sinonChai);
let stub;
let sandBox;
let SeriesToCalendarSpy;
let createServerEventSpy;
let createServerSeriesSpy;
let eventToCalendarSpy;
let createCalendarEventSpy;
let createCalendarSeriesSpy;
let clientToCalendarSpy;
let clientToSeriesSpy;
let composeSpy;

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

describe("CalendarService", () => {
  before(() => {});

  beforeEach(() => {
    sandBox = sinon.createSandbox();
    stub = sandBox.stub();
    SeriesToCalendarSpy = sandBox.spy(SeriesAdapter, "toCalendar");
    eventToCalendarSpy = sandBox.spy(EventAdapter, "toCalendar");
    createServerEventSpy = sandBox.spy(EntityFactory, "createServerEvent");
    createServerSeriesSpy = sandBox.spy(EntityFactory, "createServerSeries");
    createCalendarEventSpy = sandBox.spy(EntityFactory, "createCalendarEvent");
    createCalendarSeriesSpy = sandBox.spy(
      EntityFactory,
      "createCalendarSeries"
    );
    clientToCalendarSpy = sandBox.spy(CalendarService, "clientToCalendarEvent");
    composeSpy = sandBox.spy(CalendarService, "composeDateTime");
  });

  afterEach(() => {
    stub.reset();
    sandBox.restore();
    eventToCalendarSpy.resetHistory();
    createServerEventSpy.resetHistory();
    createServerSeriesSpy.resetHistory();
    createCalendarEventSpy.resetHistory();
    clientToCalendarSpy.resetHistory();
    composeSpy.resetHistory();
  });

  describe("getCompanyById", () => {
    it("when company_id exist then get company", async () => {
      const result = CalendarService.getCompanyById(COMPANY_DATA, "1");

      expect(result).to.equal(COMPANY_DATA[0]);
    });

    it("when company_id does not exist then return undefined", () => {
      const result = CalendarService.getCompanyByName(COMPANY_DATA, "2");

      expect(result).to.equal(undefined);
    });
  });

  describe("getCompanyByName", () => {
    it("when name exist then get company", async () => {
      const result = CalendarService.getCompanyByName(
        COMPANY_DATA,
        "Test Company"
      );

      expect(result).to.equal(COMPANY_DATA[0]);
    });

    it("when name does not exist then return undefined", () => {
      const result = CalendarService.getCompanyById(COMPANY_DATA, "2");

      expect(result).to.equal(undefined);
    });
  });

  describe("prepCalendarEvents", () => {
    it("should prep calendar events and return array of CalendarEventEntities", async () => {
      const result = await CalendarService.prepCalendarEvents(
        eventData,
        COMPANY_DATA
      );

      expect(createServerEventSpy).calledTwice;
      expect(eventToCalendarSpy).calledTwice;

      expect(result).to.be.an("array");
      expect(result.length).to.equal(2);
    });
  });

  describe("prepCalendarSeries", () => {
    it("should prep calendar series and return array of CalendarSeriesEntities", async () => {
      const result = await CalendarService.prepCalendarSeries(
        seriesData,
        COMPANY_DATA
      );

      expect(createServerSeriesSpy).calledOnce;
      expect(SeriesToCalendarSpy).calledOnce;
      expect(result).to.be.an("array");
    });
  });

  describe("parseTimeToMilitaryTime", () => {
    it('should parse "am" or "pm" regardless of case', () => {
      let result = CalendarService.parseTimeToMilitary("10:30am");

      expect(result).to.equal("10:30");

      result = CalendarService.parseTimeToMilitary("10:30AM");

      expect(result).to.equal("10:30");

      result = CalendarService.parseTimeToMilitary("10:30pm");

      expect(result).to.equal("22:30");

      result = CalendarService.parseTimeToMilitary("10:30PM");

      expect(result).to.equal("22:30");
    });

    it("when time of day is AM it should return the time as HH:MM ", () => {
      let result = CalendarService.parseTimeToMilitary("10:30AM");

      expect(result).to.equal("10:30");

      result = CalendarService.parseTimeToMilitary("11:30AM");
      expect(result).to.equal("11:30");
    });

    it("when time of day is AM and hour is 12 then return time as 00:MM", () => {
      let result = CalendarService.parseTimeToMilitary("12:30AM");

      expect(result).to.equal("00:30");

      result = CalendarService.parseTimeToMilitary("12:45AM");

      expect(result).to.equal("00:45");
    });

    it("when time of day is PM add 12 to hour and return time as HH:MM", () => {
      let result = CalendarService.parseTimeToMilitary("11:30PM");

      expect(result).to.equal("23:30");

      result = CalendarService.parseTimeToMilitary("1:15PM");

      expect(result).to.equal("13:15");
    });

    it("when time of day is PM and Hour equals 12 return time as 12:MM", () => {
      let result = CalendarService.parseTimeToMilitary("12:30PM");

      expect(result).to.equal("12:30");

      result = CalendarService.parseTimeToMilitary("12:00PM");

      expect(result).to.equal("12:00");
    });

    it("should do nothing if time is already military time", () => {});
  });

  describe("composeDateTime", () => {
    it("should return a dateTime string from a date and time string", () => {
      const dateTime = CalendarService.composeDateTime("2021-10-30", "10:30am");

      expect(dateTime).to.equal("2021-10-30T10:30");
      expect(validationService.isDateTime(dateTime)).to.equal(true);
    });

    it("when timeString includes {am/pm} then format timeString and return proper dateTime string", () => {
      const dateTime = CalendarService.composeDateTime("2022-11-31", "10:30pm");

      expect(dateTime).to.equal("2022-11-31T22:30");

      expect(validationService.isDateTime(dateTime)).to.equal(true);
    });

    it("when timeString is military time then format timeString and return proper dateTime string", () => {
      const dateTime = CalendarService.composeDateTime("2022-11-31", "22:30");

      expect(dateTime).to.equal("2022-11-31T22:30");

      expect(validationService.isDateTime(dateTime)).to.equal(true);
    });

    it("when dateString is not a date then throw error", () => {
      try {
        const dateTime = CalendarService.composeDateTime("XXXXs", "10:30am");
      } catch (e) {
        console.log(e, e.message);
        expect(e.message).to.equal(
          "XXXXs is invalid dateString, expected format: YYYY-MM-DD"
        );
      }

      expect(composeSpy.threw()).to.equal(true);
    });

    it("if timeString is not a time or militaryTime throw error", () => {
      try {
        const dateTime = CalendarService.composeDateTime("2022-05-21", "XXX");
      } catch (e) {
        expect(e.message).to.equal(
          "XXX is invalid timeString, expected format: HH:MM or HH:MM{am/pm}"
        );
      }
      expect(composeSpy.threw()).to.equal(true);
    });
  });

  describe("clientToCalendarEvent", () => {
    it("should create a calendar event entity", () => {
      const clientInput = {
        title: "My Title",
        company: {
          name: "Company Name",
          company_id: "1",
          color: "#f2f2f2",
        },
        dateStart: "2021-10-30",
        dateEnd: "2021-10-30",
        timeStart: "10:30am",
        timeEnd: "10:45pm",
        daysOfWeek: [],
        allDay: false,
        calendar_id: "1",
        user_id: "1",
        description: "my description",
        id: "1",
      };

      const calendarEvent = CalendarService.clientToCalendarEvent(clientInput);

      expect(createCalendarEventSpy).calledOnce;
    });
  });

  describe("clientToCalendarSeries", () => {
    it("should create a calendar series entity", () => {
      const clientInput = {
        title: "My Title",
        company: {
          name: "Company Name",
          company_id: "1",
          color: "#f2f2f2",
        },
        dateStart: "2021-10-30",
        dateEnd: "2021-10-30",
        timeStart: "10:30am",
        timeEnd: "10:45pm",
        daysOfWeek: [1, 2, 4],
        allDay: false,
        calendar_id: "1",
        user_id: "1",
        description: "my description",
        id: "1",
      };

      const calendarSeries =
        CalendarService.clientToCalendarSeries(clientInput);

      expect(createCalendarSeriesSpy).calledOnce;
    });
  });

  describe("createCalendarEntity", () => {
    it("should create an event when isRecurring is false", () => {
      const clientInput = {
        title: "My Title",
        company: {
          name: "Company Name",
          company_id: "1",
          color: "#f2f2f2",
        },
        dateStart: "2021-10-30",
        dateEnd: "2021-10-30",
        timeStart: "10:30am",
        timeEnd: "10:45pm",
        daysOfWeek: [],
        allDay: false,
        calendar_id: "1",
        user_id: "1",
        description: "my description",
        isRecurring: false,
      };

      const returnValue = {
        end: "2021-10-30T22:45",
        start: "2021-10-30T10:30",
        title: clientInput.title,
        allDay: clientInput.allDay,
        user_id: clientInput.user_id,
        calendar_id: clientInput.calendar_id,
        company_id: clientInput.company.company_id,
        description: clientInput.description,
        display: "block",
        editable: true,
        id: undefined,
        backgroundColor: clientInput.company.color,
        borderColor: clientInput.company.color,
      };

      const result = CalendarService.createCalendarEntity(clientInput);

      expect(result).to.eql(returnValue);
    });

    it("should create a series when isRecurring is true", () => {
      const clientInput = {
        title: "My Title",
        company: {
          name: "Company Name",
          company_id: "1",
          color: "#f2f2f2",
        },
        dateStart: "2021-10-30",
        dateEnd: "2021-10-30",
        timeStart: "10:30am",
        timeEnd: "10:45pm",
        daysOfWeek: [1, 2, 4],
        allDay: false,
        calendar_id: "1",
        user_id: "1",
        description: "my description",
      };

      const returnValue = {
        startTime: "10:30",
        endTime: "22:45",
        startRecur: "2021-10-30",
        endRecur: "2021-10-30",
        daysOfWeek: clientInput.daysOfWeek,
        title: clientInput.title,
        description: clientInput.description,
        calendar_id: clientInput.calendar_id,
        user_id: clientInput.user_id,
        company_id: clientInput.company.company_id,
        groupId: undefined,
        display: "block",
        editable: true,
        backgroundColor: clientInput.company.color,
        borderColor: clientInput.company.color,
      };

      const result = CalendarService.createCalendarEntity(clientInput, true);

      expect(result).to.eql(returnValue);
    });
  });

  describe("parseDateFromDateTime", () => {
    let spy;
    before(() => {
      spy = sandBox.spy(CalendarService, "parseDateFromDateTime");
    });
    after(() => {
      spy.restore();
    });
    afterEach(() => {
      spy.resetHistory();
    });

    it("when dateTimeString is not a valid dateTimeString throw error", () => {
      try {
        const date = CalendarService.parseDateFromDateTime("2021-10-30");
      } catch (e) {
        expect(e.message).to.equal(
          "2021-10-30 is not a valid dateTime string, expected format [YYYY-MM-DD]T[HH:MM]"
        );
      }
      expect(spy.threw()).to.equal(true);
    });

    it("should return date from dateTime string", () => {
      let date = CalendarService.parseDateFromDateTime("2021-10-30T10:30");

      expect(date).to.equal("2021-10-30");

      date = CalendarService.parseDateFromDateTime("2020-11-31T10:30");

      expect(date).to.equal("2020-11-31");
    });
  });

  describe("parseTimeFromDateTime", () => {
    let spy;
    before(() => {
      spy = sandBox.spy(CalendarService, "parseTimeFromDateTime");
    });
    after(() => {
      spy.restore();
    });
    afterEach(() => {
      spy.resetHistory();
    });

    it("when dateTimeString is not a valid dateTimeString throw error", () => {
      try {
        const date = CalendarService.parseTimeFromDateTime("2021-10-30");
      } catch (e) {
        expect(e.message).to.equal(
          "2021-10-30 is not a valid dateTime string, expected format [YYYY-MM-DD]T[HH:MM]"
        );
      }
      expect(spy.threw()).to.equal(true);
    });

    it("should return time from dateTime string", () => {
      let date = CalendarService.parseTimeFromDateTime("2021-10-30T10:30");

      expect(date).to.equal("10:30am");

      date = CalendarService.parseTimeFromDateTime("2020-11-31T23:30");

      expect(date).to.equal("11:30pm");
    });
  });

  describe("convertMilitaryTimeToTime", () => {
    let spy;
    before(() => {
      spy = sandBox.spy(CalendarService, "convertMilitaryTimeToTime");
    });
    after(() => {
      spy.restore();
    });

    afterEach(() => {
      spy.resetHistory();
    });

    it("should throw an error if not valid military time string", () => {
      try {
        CalendarService.convertMilitaryTimeToTime("10:30XXX");
      } catch (e) {
        expect(e.message).to.equal(
          "10:30XXX is invalid militaryTimeString, expected format: HH:MM"
        );
      }
      expect(spy.threw()).to.equal(true);
    });

    it("when hour is greater than 12 then subtract 12 and add pm", () => {
      let result = CalendarService.convertMilitaryTimeToTime("22:30");

      expect(result).to.equal("10:30pm");

      result = CalendarService.convertMilitaryTimeToTime("13:30");

      expect(result).to.equal("01:30pm");
    });

    it("when hour is less than 12 then return string and add am", () => {
      let result = CalendarService.convertMilitaryTimeToTime("10:30");

      expect(result).to.equal("10:30am");

      result = CalendarService.convertMilitaryTimeToTime("05:45");

      expect(result).to.equal("05:45am");
    });

    it("when hour is equal to 12 then return 12:MMpm", () => {
      let result = CalendarService.convertMilitaryTimeToTime("12:30");

      expect(result).to.equal("12:30pm");

      result = CalendarService.convertMilitaryTimeToTime("12:45");

      expect(result).to.equal("12:45pm");
    });

    it("when hour is equal to 00 then return 12:MMam", () => {
      let result = CalendarService.convertMilitaryTimeToTime("00:30");

      expect(result).to.equal("12:30am");

      result = CalendarService.convertMilitaryTimeToTime("00:45");

      expect(result).to.equal("12:45am");
    });
  });

  describe("calendarEventToClientInterface", () => {
    it("should return proper clientPayload from a CalendarEventEntity", () => {
      const calendarEvent = EntityFactory.createCalendarEvent({
        end: "2021-07-29T15:30:00",
        start: "2021-07-29T14:30:00",
        title: "Our First Event",
        allDay: false,
        user_id: 1,
        calendar_id: 1,
        description: "Test Description",
        company_id: 1,
        id: 1,
      });

      const returnValue = {
        dateStart: "2021-07-29",
        dateEnd: "2021-07-29",
        timeEnd: "03:30pm",
        timeStart: "02:30pm",
        title: "Our First Event",
        allDay: false,
        user_id: 1,
        calendar_id: 1,
        description: "Test Description",
        company_id: 1,
        id: 1,
      };

      const result =
        CalendarService.calendarEventToClientInterface(calendarEvent);

      expect(result).to.eql(returnValue);
    });
  });

  describe("calendarSeriesToClient", () => {
    it("should return proper clientPayload from a CalendarSeriesEntity", () => {
      const calendarSeries = EntityFactory.createCalendarSeries({
        title: "New Series",
        description: "Series description",
        calendar_id: 2,
        startTime: "10:30",
        endTime: "11:30",
        startRecur: "2021-10-30",
        endRecur: "2022-10-30",
        daysOfWeek: [0, 1, 3],
        user_id: 1,
        company_id: 1,
        groupId: 1,
      });

      const returnValue = {
        dateStart: "2021-10-30",
        dateEnd: "2022-10-30",
        timeEnd: "11:30am",
        timeStart: "10:30am",
        title: "New Series",
        daysOfWeek: [0, 1, 3],
        user_id: 1,
        calendar_id: 2,
        description: "Series description",
        company_id: 1,
        groupId: 1,
      };

      const result =
        CalendarService.calendarSeriesToClientInterface(calendarSeries);

      expect(result).to.eql(returnValue);
    });
  });
});
