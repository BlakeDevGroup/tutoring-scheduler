import chai, { expect } from "chai";
import sinon, { stub } from "sinon";
import sinonChai from "sinon-chai";
import EventFactory from "../EntityFactory";
import EventAdapter from "./EventAdapter";

describe("EventAdapter", () => {
  describe("calendarEventEntity to serverEventEntity", () => {
    it("should create serverEvent from calendarEvent data", () => {
      const calendarEvent = EventFactory.createCalendarEvent({
        end: "2021-07-29T15:30:00",
        start: "2021-07-29T14:30:00",
        title: "Our First Event",
        allDay: false,
        user_id: 1,
        calendar_id: 1,
        description: "Test Description",
        company_id: 1,
        id: 319,
      });
      const result = EventAdapter.toServer(calendarEvent);

      expect(result).to.be.an("object");

      expect(result.date_end).to.equal(calendarEvent.end);
      expect(result.date_start).to.equal(calendarEvent.start);
      expect(result.title).to.equal(calendarEvent.title);
      expect(result.all_day).to.equal(calendarEvent.allDay);
      expect(result.user_id).to.equal(calendarEvent.user_id);
      expect(result.calendar_id).to.equal(calendarEvent.calendar_id);
      expect(result.company_id).to.equal(calendarEvent.company_id);
      expect(result.description).to.equal(calendarEvent.description);
      expect(result.event_id).to.equal(calendarEvent.id);
    });
  });

  describe("serverEventEntity to calendarEventEntity", () => {
    it("should create calendarEvent from serverEvent data", () => {
      const serverEvent = EventFactory.createServerEvent({
        date_end: "2021-09-01T11:30",
        date_start: "2021-09-01T10:30",
        event_id: "319",
        title: "Test Event",
        all_day: false,
        user_id: "1",
        calendar_id: "2",
        company_id: "2",
        description: "Test",
      });

      const result = EventAdapter.toCalendar(serverEvent);

      expect(result).to.be.an("object");

      expect(result.end).to.equal(serverEvent.date_end);
      expect(result.start).to.equal(serverEvent.date_start);
      expect(result.title).to.equal(serverEvent.title);
      expect(result.allDay).to.equal(serverEvent.all_day);
      expect(result.user_id).to.equal(serverEvent.user_id);
      expect(result.calendar_id).to.equal(serverEvent.calendar_id);
      expect(result.company_id).to.equal(serverEvent.company_id);
      expect(result.description).to.equal(serverEvent.description);
      expect(result.id).to.equal(serverEvent.event_id);
    });
  });
});
