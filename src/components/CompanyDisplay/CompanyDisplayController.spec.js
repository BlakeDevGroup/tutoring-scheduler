import chai, { expect } from "chai";
import sinon, { createStubInstance } from "sinon";
import sinonChai from "sinon-chai";
import calendarService from "../../services/calendar/calendar.service";
import CalendarService from "../../services/calendar/calendar.service";
import CompanyDisplayController from "./CompanyDisplayController";

const companyData = [
  {
    name: "Company 10",
    pay: 25,
    company_id: "10",
    color: "#fff",
  },
  {
    name: "Company 20",
    pay: 35,
    company_id: "20",
    color: "#123456",
  },
  {
    name: "Company 128",
    pay: 45,
    company_id: "128",
    color: "#aabbcc",
  },
  {
    name: "Company 365",
    pay: 45,
    company_id: "365",
    color: "#aabbcc",
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
    company_id: "10",
    extendedProps: {
      company_id: "10",
      pay: "25",
    },
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
    company_id: "10",
    extendedProps: {
      company_id: "10",
      pay: "25",
    },
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
    company_id: "20",
    extendedProps: {
      company_id: "20",
      pay: "35",
    },
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
    company_id: "20",
    extendedProps: {
      company_id: "20",
      pay: "35",
    },
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
    extendedProps: {
      company_id: "128",
      pay: "45",
    },
  },
];

let sandBox;

describe("CompanyDisplayController", () => {
  before(() => {
    sandBox = sinon.createSandbox();
  });

  beforeEach(() => {});

  afterEach(() => {
    sandBox.restore();
  });

  describe("generateCardData", () => {
    let spy;
    beforeEach(() => {
      spy = sinon.spy(calendarService, "aggregatePayByAllCompanies");
    });

    afterEach(() => {
      spy.restore();
    });
    it("the first dataPoint should be an object containing aggregate data for events", () => {
      const result = CompanyDisplayController.generateCardData(
        eventData,
        companyData,
        "dayGridMonth"
      );

      expect(result).to.be.an("array");

      expect(result[0]).to.be.an("object");
      expect(result[0]).to.include.keys("color", "total", "title", "message");

      expect(result[0]["color"]).to.equal("green");

      expect(spy).calledOnceWith(eventData, companyData);
      expect(result[0]["total"]).to.equal(165);

      expect(result[0]["title"]).to.equal("Monthly Earnings");

      expect(result[0]["message"]).to.equal("5 sessions");
    });

    // it("when period is monthly then final dataPoint should contain correct yearly estimated revenue", () => {
    //   const result = CompanyDisplayController.generateCardData(
    //     eventData,
    //     companyData,
    //     "dayGridMonth"
    //   );

    //   expect(result[result.length - 1]).to.be.an("object");

    //   let { color, total, title, subTitle, message } =
    //     result[result.length - 1];

    //   expect(color).to.equal("green");
    //   expect(total).to.equal(result[0].total * 12);
    //   expect(title).to.equal("Projected Yearly");
    //   expect(message).to.equal(`${eventData.length * 12} sessions`);
    // });

    // it("when period is weekly then final dataPoint should contain correct yearly estimated revenue", () => {
    //   const result = CompanyDisplayController.generateCardData(
    //     eventData,
    //     companyData,
    //     "timeGridWeek"
    //   );

    //   expect(result[result.length - 1]).to.be.an("object");

    //   let { color, total, title, subTitle, message } =
    //     result[result.length - 1];

    //   expect(color).to.equal("green");
    //   expect(total).to.equal(result[0].total * 52);
    //   expect(title).to.equal("Projected Yearly");
    //   expect(message).to.equal(`${eventData.length * 52} sessions`);
    // });

    // it("when period is daily then final dataPoint should contain correct yearly estimated revenue", () => {
    //   const result = CompanyDisplayController.generateCardData(
    //     eventData,
    //     companyData,
    //     "timeGridDay"
    //   );

    //   expect(result[result.length - 1]).to.be.an("object");

    //   let { color, total, title, subTitle, message } =
    //     result[result.length - 1];

    //   expect(color).to.equal("green");
    //   expect(total).to.equal(result[0].total * 365);
    //   expect(title).to.equal("Projected Yearly");
    //   expect(message).to.equal(`${eventData.length * 365} sessions`);
    // });

    it("the remaining data should be objects containing aggregate data for events", () => {
      const result = CompanyDisplayController.generateCardData(
        eventData,
        companyData,
        "dayGridMonth"
      );

      expect(result[1]).to.be.an("object");

      let { color, total, title, subTitle, message } = result[1];

      expect(color).to.equal(companyData[0].color);
      expect(total).to.equal(50);
      expect(title).to.equal(companyData[0].name);
      expect(message).to.equal(`2 sessions`);
    });

    it("the remaining data should be objects containing aggregate data for events", () => {
      const result = CompanyDisplayController.generateCardData(
        eventData,
        companyData,
        "dayGridMonth"
      );

      expect(result[2]).to.be.an("object");

      let { color, total, title, subTitle, message } = result[2];

      expect(color).to.equal(companyData[1].color);
      expect(total).to.equal(70);
      expect(title).to.equal(companyData[1].name);
      expect(message).to.equal(`2 sessions`);

      expect(result[2]).to.be.an("object");
    });

    it("if a company has 0 sessions, filter from data", () => {
      const result = CompanyDisplayController.generateCardData(
        eventData,
        companyData,
        "dayGridMonth"
      );

      const filteredResult = result.filter(
        (res) => res.title == companyData[3].name
      );

      expect(filteredResult.length).to.equal(0);
    });
  });
});
