import chai, { expect } from "chai";
import { describe } from "mocha";
import sinon, { stub } from "sinon";
import sinonChai from "sinon-chai";
import * as errors from "../EntityTypeError";
import { ENTITY_TYPES } from "../EntityTypes";
import { CalendarSeriesEntity } from "./CalendarSeries.entity";

chai.use(sinonChai);
let spy;
let sandBox;

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

const COMPANY_DATA = {
  color: "#fff",
};

describe("CalendarSeriesEntity", () => {
  before(() => {
    sandBox = sinon.createSandbox();
    spy = sandBox.spy(errors, "EntityTypeError");
  });

  after(() => {
    sandBox.restore();
  });

  afterEach(() => {
    spy.resetHistory();
  });

  it("when startTime is not valid MilitaryTime then throw error", () => {
    const testData = Object.assign({}, DATA, { startTime: "XXXX" });

    try {
      new CalendarSeriesEntity(testData);
      expect(spy).calledOnceWith(
        testData.startTime,
        ENTITY_TYPES.MILITARY_TIME
      );
    } catch (e) {
      expect(spy).calledOnceWith(
        testData.startTime,
        ENTITY_TYPES.MILITARY_TIME
      );
    }
  });
  it("when endTime is not valid MilitaryTime then throw error", () => {
    const testData = Object.assign({}, DATA, { endTime: "XXXX" });

    try {
      new CalendarSeriesEntity(testData);
      expect(spy).calledOnceWith(testData.endTime, ENTITY_TYPES.MILITARY_TIME);
    } catch (e) {
      expect(spy).calledOnceWith(testData.endTime, ENTITY_TYPES.MILITARY_TIME);
    }
  });
  it("when startRecur is not valid Date then throw error", () => {
    const testData = Object.assign({}, DATA, { startRecur: "XXXX" });

    try {
      new CalendarSeriesEntity(testData);
      expect(spy).calledOnceWith(testData.startRecur, ENTITY_TYPES.DATE);
    } catch (e) {
      expect(spy).calledOnceWith(testData.startRecur, ENTITY_TYPES.DATE);
    }
  });

  it("when endRecur is not valid Date then throw error", () => {
    const testData = Object.assign({}, DATA, { endRecur: "XXXX" });

    try {
      new CalendarSeriesEntity(testData);
      expect(spy).calledOnceWith(testData.endRecur, ENTITY_TYPES.DATE);
    } catch (e) {
      expect(spy).calledOnceWith(testData.endRecur, ENTITY_TYPES.DATE);
    }
  });

  it("when daysOfWeek is not valid Array then throw error", () => {
    const testData = Object.assign({}, DATA, { daysOfWeek: "XXXX" });

    try {
      new CalendarSeriesEntity(testData);
      expect(spy).calledOnceWith(testData.daysOfWeek, ENTITY_TYPES.ARRAY);
    } catch (e) {
      expect(spy).calledOnceWith(testData.daysOfWeek, ENTITY_TYPES.ARRAY);
    }
  });

  it("when title is not valid string then throw error", () => {
    const testData = Object.assign({}, DATA, { title: 123 });

    try {
      new CalendarSeriesEntity(testData);
      expect(spy).calledOnceWith(testData.title, ENTITY_TYPES.STRING);
    } catch (e) {
      expect(spy).calledOnceWith(testData.title, ENTITY_TYPES.STRING);
    }
  });

  it("when description is not valid string then throw error", () => {
    const testData = Object.assign({}, DATA, { description: 123 });

    try {
      new CalendarSeriesEntity(testData);
      expect(spy).calledOnceWith(testData.description, ENTITY_TYPES.STRING);
    } catch (e) {
      expect(spy).calledOnceWith(testData.description, ENTITY_TYPES.STRING);
    }
  });

  it("when calendar_id is not valid numeric then throw error", () => {
    const testData = Object.assign({}, DATA, { calendar_id: "XXX" });

    try {
      new CalendarSeriesEntity(testData);
      expect(spy).calledOnceWith(testData.calendar_id, ENTITY_TYPES.NUMERIC);
    } catch (e) {
      expect(spy).calledOnceWith(testData.calendar_id, ENTITY_TYPES.NUMERIC);
    }
  });

  it("when user_id is not valid numeric then throw error", () => {
    const testData = Object.assign({}, DATA, { user_id: "XXX" });

    try {
      new CalendarSeriesEntity(testData);
      expect(spy).calledOnceWith(testData.user_id, ENTITY_TYPES.NUMERIC);
    } catch (e) {
      expect(spy).calledOnceWith(testData.user_id, ENTITY_TYPES.NUMERIC);
    }
  });

  it("when company_id is not valid numeric or not undefined then throw error", () => {
    const testData = Object.assign({}, DATA, { company_id: "XXX" });

    try {
      new CalendarSeriesEntity(testData);
      expect(spy).calledOnceWith(testData.company_id, ENTITY_TYPES.NUMERIC);
    } catch (e) {
      expect(spy).calledOnceWith(testData.company_id, ENTITY_TYPES.NUMERIC);
    }
  });

  it("when company_id is undefined then error is not thrown", () => {
    const testData = Object.assign({}, DATA, { company_id: undefined });
    try {
      new CalendarSeriesEntity(testData);
      expect(spy).not.called;
    } catch (e) {
      expect(spy).not.called;
    }
  });

  describe("groupId", () => {
    it("when groupId is not undefined and not a valid numeric then throw error", () => {
      const testData = Object.assign({}, DATA, { groupId: "XXX" });

      try {
        new CalendarSeriesEntity(testData);
        expect(spy).calledOnceWith(testData.groupId, ENTITY_TYPES.NUMERIC);
      } catch (e) {
        expect(spy).calledOnceWith(testData.groupId, ENTITY_TYPES.NUMERIC);
      }
    });

    it("when groupId is undefined then error is not thrown", () => {
      const testData = Object.assign({}, DATA, { groupId: undefined });
      try {
        new CalendarSeriesEntity(testData);
        expect(spy).not.called;
      } catch (e) {
        expect(spy).not.called;
      }
    });
  });

  it("when backgroundColor provided by companyData is not a valid string then throw error", async () => {
    const testData = Object.assign({}, { color: 123 });

    try {
      new CalendarSeriesEntity(DATA, testData);
      expect(spy).calledOnceWith(testData.color, ENTITY_TYPES.STRING);
    } catch (e) {
      expect(spy).calledOnceWith(testData.color, ENTITY_TYPES.STRING);
    }
  });

  it("when color is not provided by companyData then backgroundColor should match default", async () => {
    const event = new CalendarSeriesEntity(DATA, COMPANY_DATA);
    expect(event.backgroundColor).to.equal(COMPANY_DATA.color);
  });

  it("when color is not provided by companyData then borderColor should match default", async () => {
    const event = new CalendarSeriesEntity(DATA, COMPANY_DATA);
    expect(event.borderColor).to.equal(COMPANY_DATA.color);
  });

  it("should run with no errors", () => {
    try {
      new CalendarSeriesEntity(DATA);
      expect(spy).not.called;
    } catch (e) {
      expect(spy).not.called;
    }
  });
});
