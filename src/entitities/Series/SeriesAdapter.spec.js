import chai, { expect } from "chai";
import sinon, { server, stub } from "sinon";
import sinonChai from "sinon-chai";
import EntityFactory from "../EntityFactory";
import SeriesAdapter from "./SeriesAdapter";

const COMPANY_DATA = {
  color: "#fff",
};
describe("SeriesAdapter", () => {
  describe("CalendarSeriesEntity to ServerSeriesEntity", () => {
    it("should create serverSeries from calendarSeries interface", () => {
      const calendarSeriesData = EntityFactory.createCalendarSeries({
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
      });

      const result = SeriesAdapter.toServer(calendarSeriesData);

      expect(result).to.be.an("object");

      expect(result.title).to.equal(calendarSeriesData.title);
      expect(result.description).to.equal(calendarSeriesData.description);
      expect(result.calendar_id).to.equal(calendarSeriesData.calendar_id);
      expect(result.start_time).to.equal(calendarSeriesData.startTime);
      expect(result.end_time).to.equal(calendarSeriesData.endTime);
      expect(result.start_recur).to.equal(calendarSeriesData.startRecur);
      expect(result.end_recur).to.equal(calendarSeriesData.endRecur);
      expect(result.days_of_week).to.equal(calendarSeriesData.daysOfWeek);
      expect(result.user_id).to.equal(calendarSeriesData.user_id);
      expect(result.company_id).to.equal(calendarSeriesData.company_id);
    });

    it("should create calendarSeries from serverSeries interface", () => {
      const serverSeriesData = EntityFactory.createServerSeries({
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
      });

      const result = SeriesAdapter.toCalendar(serverSeriesData, COMPANY_DATA);

      expect(result).to.be.an("object");

      expect(result.title).to.equal(serverSeriesData.title);
      expect(result.description).to.equal(serverSeriesData.description);
      expect(result.calendar_id).to.equal(serverSeriesData.calendar_id);
      expect(result.startTime).to.equal(serverSeriesData.start_time);
      expect(result.endTime).to.equal(serverSeriesData.end_time);
      expect(result.startRecur).to.equal(serverSeriesData.start_recur);
      expect(result.endRecur).to.equal(serverSeriesData.end_recur);
      expect(result.daysOfWeek).to.equal(serverSeriesData.days_of_week);
      expect(result.user_id).to.equal(serverSeriesData.user_id);
      expect(result.company_id).to.equal(serverSeriesData.company_id);
      expect(result.backgroundColor).to.equal(COMPANY_DATA.color);
      expect(result.borderColor).to.equal(COMPANY_DATA.color);
    });
  });
});
