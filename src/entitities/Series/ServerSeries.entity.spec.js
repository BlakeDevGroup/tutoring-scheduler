import chai, { expect } from "chai";
import sinon, { stub } from "sinon";
import sinonChai from "sinon-chai";
import * as errors from "../EntityTypeError";
import { ENTITY_TYPES } from "../EntityTypes";
import { ServerSeriesEntity } from "./ServerSeries.entity";

chai.use(sinonChai);
let spy;
let sandBox;

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

describe("SeriesEntity", () => {
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

  describe("Data Validation", () => {
    it("when start_time is not a valid MilitaryTime then throw error", () => {
      const testData = Object.assign({}, DATA, { start_time: "XXXX" });

      try {
        new ServerSeriesEntity(testData);
        expect(spy).calledOnceWith(
          testData.start_time,
          ENTITY_TYPES.MILITARY_TIME
        );
      } catch (e) {
        expect(spy).calledOnceWith(
          testData.start_time,
          ENTITY_TYPES.MILITARY_TIME
        );
      }
    });

    it("when end_time is not a valid MilitaryTime then throw error", () => {
      const testData = Object.assign({}, DATA, { end_time: "XXXX" });

      try {
        new ServerSeriesEntity(testData);
        expect(spy).calledOnceWith(
          testData.end_time,
          ENTITY_TYPES.MILITARY_TIME
        );
      } catch (e) {
        expect(spy).calledOnceWith(
          testData.end_time,
          ENTITY_TYPES.MILITARY_TIME
        );
      }
    });

    it("when start_recur is not a valid Date then throw error", () => {
      const testData = Object.assign({}, DATA, { start_recur: "XXXX" });

      try {
        new ServerSeriesEntity(testData);
        expect(spy).calledOnceWith(testData.start_recur, ENTITY_TYPES.DATE);
      } catch (e) {
        expect(spy).calledOnceWith(testData.start_recur, ENTITY_TYPES.DATE);
      }
    });

    it("when end_recur is not a valid Date then throw error", () => {
      const testData = Object.assign({}, DATA, { end_recur: "XXXX" });

      try {
        new ServerSeriesEntity(testData);
        expect(spy).calledOnceWith(testData.end_recur, ENTITY_TYPES.DATE);
      } catch (e) {
        expect(spy).calledOnceWith(testData.end_recur, ENTITY_TYPES.DATE);
      }
    });

    it("when days_of_week is not a valid Array then throw error", () => {
      const testData = Object.assign({}, DATA, { days_of_week: "XXX" });

      try {
        new ServerSeriesEntity(testData);
        expect(spy).calledOnceWith(testData.days_of_week, ENTITY_TYPES.ARRAY);
      } catch (e) {
        expect(spy).calledOnceWith(testData.days_of_week, ENTITY_TYPES.ARRAY);
      }
    });

    it("when title is not a valid string then throw error", () => {
      const testData = Object.assign({}, DATA, { title: 123 });

      try {
        new ServerSeriesEntity(testData);
        expect(spy).calledOnceWith(testData.title, ENTITY_TYPES.STRING);
      } catch (e) {
        expect(spy).calledOnceWith(testData.title, ENTITY_TYPES.STRING);
      }
    });

    it("when description is not a valid string then throw error", () => {
      const testData = Object.assign({}, DATA, { description: 123 });

      try {
        new ServerSeriesEntity(testData);
        expect(spy).calledOnceWith(testData.description, ENTITY_TYPES.STRING);
      } catch (e) {
        expect(spy).calledOnceWith(testData.description, ENTITY_TYPES.STRING);
      }
    });

    it("when calendar_id is not a valid numeric then throw error", () => {
      const testData = Object.assign({}, DATA, { calendar_id: "XXX" });

      try {
        new ServerSeriesEntity(testData);
        expect(spy).calledOnceWith(testData.calendar_id, ENTITY_TYPES.NUMERIC);
      } catch (e) {
        expect(spy).calledOnceWith(testData.calendar_id, ENTITY_TYPES.NUMERIC);
      }
    });

    it("when user_id is not a valid numeric then throw error", () => {
      const testData = Object.assign({}, DATA, { user_id: "XXX" });

      try {
        new ServerSeriesEntity(testData);
        expect(spy).calledOnceWith(testData.user_id, ENTITY_TYPES.NUMERIC);
      } catch (e) {
        expect(spy).calledOnceWith(testData.user_id, ENTITY_TYPES.NUMERIC);
      }
    });

    it("when company_id is not a valid numeric then throw error", () => {
      const testData = Object.assign({}, DATA, { company_id: "XXX" });

      try {
        new ServerSeriesEntity(testData);
        expect(spy).calledOnceWith(testData.company_id, ENTITY_TYPES.NUMERIC);
      } catch (e) {
        expect(spy).calledOnceWith(testData.company_id, ENTITY_TYPES.NUMERIC);
      }
    });

    it("when company_id is undefined then no error is thrown", () => {
      const testData = Object.assign({}, DATA, { company_id: undefined });
      try {
        new ServerSeriesEntity(testData);
        expect(spy).not.called;
      } catch (e) {
        expect(spy).not.called;
      }
    });

    describe("series_id", () => {
      it("when series_id is not undefined and not a valid numeric then throw error", () => {
        const testData = Object.assign({}, DATA, { series_id: "XXX" });

        try {
          new ServerSeriesEntity(testData);
          expect(spy).calledOnceWith(testData.series_id, ENTITY_TYPES.NUMERIC);
        } catch (e) {
          expect(spy).calledOnceWith(testData.series_id, ENTITY_TYPES.NUMERIC);
        }
      });

      it("when series_id is undefined then no error is thrown", () => {
        const testData = Object.assign({}, DATA, { series_id: undefined });
        try {
          new ServerSeriesEntity(testData);
          expect(spy).not.called;
        } catch (e) {
          expect(spy).not.called;
        }
      });
    });

    it("should run with no errors", () => {
      try {
        new ServerSeriesEntity(DATA);
        expect(spy).not.called;
      } catch (e) {
        expect(spy).not.called;
      }
    });
  });
});
