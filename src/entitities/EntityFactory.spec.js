import chai, { expect } from "chai";
import sinon, { server, stub } from "sinon";
import sinonChai from "sinon-chai";

import { CalendarEventEntity } from "./Event/CalendarEvent.entity";
import { ServerEventEntity } from "./Event/ServerEvent.entity";
import { ServerSeriesEntity } from "./Series/ServerSeries.entity";
import { CalendarSeriesEntity } from "./Series/CalendarSeries.entity";

import EntityFactory from "./EntityFactory";

chai.use(sinonChai);

let sandBox;
describe("EntityFactory", () => {
  before(() => {
    sandBox = sinon.createSandbox();
  });

  after(() => {
    sandBox.restore();
  });

  it("should return a valid CalendarEventEntity", () => {
    const DATA = {
      end: "2021-07-29T15:30:00",
      start: "2021-07-29T14:30:00",
      title: "Our First Event",
      allDay: false,
      user_id: 1,
      calendar_id: 1,
      description: "Test Description",
      company_id: 1,
    };
    const calendarEvent = EntityFactory.createCalendarEvent(DATA);

    expect(calendarEvent).to.eql(new CalendarEventEntity(DATA));
  });

  it("should return a valid ServerEventEntity", () => {
    const DATA = {
      date_end: "2021-09-01T11:30:00.000Z",
      date_start: "2021-09-01T10:30:00.000Z",
      event_id: "319",
      title: "Test Event",
      all_day: false,
      user_id: "1",
      calendar_id: "2",
      description: "description",
      company_id: "2",
    };

    const serverEventEntity = EntityFactory.createServerEvent(DATA);

    expect(serverEventEntity).to.eql(new ServerEventEntity(DATA));
  });

  it("should return a valid ServerSeriesEntity", () => {
    const DATA = {
      title: "New Series",
      description: "Series description",
      calendar_id: 2,
      start_time: "10:30",
      end_time: "11:30",
      start_recur: "2021-10-30",
      end_recur: "2022-10-30",
      days_of_week: [0, 1, 3],
      user_id: 1,
      company_id: 1,
    };

    const serverSeriesEntity = EntityFactory.createServerSeries(DATA);

    expect(serverSeriesEntity).to.eql(new ServerSeriesEntity(DATA));
  });

  it("should return a valid CalendarSeriesEntity", () => {
    const DATA = {
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
    };

    const calendarSeriesEntity = EntityFactory.createCalendarSeries(DATA);

    expect(calendarSeriesEntity).to.eql(new CalendarSeriesEntity(DATA));
  });
});
