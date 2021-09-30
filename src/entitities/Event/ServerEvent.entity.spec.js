import chai, { expect } from "chai";
import sinon, { stub } from "sinon";
import sinonChai from "sinon-chai";
import { ServerEventEntity } from "./ServerEvent.entity";
import * as errors from "../EntityTypeError";
import { ENTITY_TYPES } from "../EntityTypes";

chai.use(sinonChai);
let spy;
let sandBox;

const DATA = {
  date_end: "2021-09-01T11:30",
  date_start: "2021-09-01T10:30",
  event_id: "319",
  title: "Test Event",
  all_day: false,
  user_id: "1",
  calendar_id: "2",
  company_id: "2",
  description: "Test",
};

const COMPANY_DATA = {
  color: "#fff",
};

describe("ServerEventEntity", () => {
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
    it("when date_end is not a valid DateTime then throw error ", () => {
      const testData = Object.assign({}, DATA, { date_end: "XXXX" });

      try {
        new ServerEventEntity(testData);
        expect(spy).calledOnceWith(testData.date_end, ENTITY_TYPES.DATE_TIME);
      } catch (e) {
        expect(spy).calledOnceWith(testData.date_end, ENTITY_TYPES.DATE_TIME);
      }
    });

    it("when date_start is not a valid DateTime then throw error", () => {
      const testData = Object.assign({}, DATA, { date_start: "XXXX" });

      try {
        new ServerEventEntity(testData);
        expect(spy).calledOnceWith(testData.date_start, ENTITY_TYPES.DATE_TIME);
      } catch (e) {
        expect(spy).calledOnceWith(testData.date_start, ENTITY_TYPES.DATE_TIME);
      }
    });

    it("when title is not a valid string then throw error", () => {
      const testData = Object.assign({}, DATA, { title: 123 });

      try {
        new ServerEventEntity(testData);
        expect(spy).calledOnceWith(testData.title, ENTITY_TYPES.STRING);
      } catch (e) {
        expect(spy).calledOnceWith(testData.title, ENTITY_TYPES.STRING);
      }
    });

    it("when all_day is not a valid boolean then throw error", () => {
      const testData = Object.assign({}, DATA, { all_day: 123 });

      try {
        new ServerEventEntity(testData);
        expect(spy).calledOnceWith(testData.all_day, ENTITY_TYPES.BOOLEAN);
      } catch (e) {
        expect(spy).calledOnceWith(testData.all_day, ENTITY_TYPES.BOOLEAN);
      }
    });

    it("when user_id is not a valid numeric then throw error", () => {
      const testData = Object.assign({}, DATA, { user_id: "XXX" });

      try {
        new ServerEventEntity(testData);
        expect(spy).calledOnceWith(testData.user_id, ENTITY_TYPES.NUMERIC);
      } catch (e) {
        expect(spy).calledOnceWith(testData.user_id, ENTITY_TYPES.NUMERIC);
      }
    });

    it("when calendar_id is not a valid numeric then throw error", () => {
      const testData = Object.assign({}, DATA, { calendar_id: "XXX" });

      try {
        new ServerEventEntity(testData);
        expect(spy).calledOnceWith(testData.calendar_id, ENTITY_TYPES.NUMERIC);
      } catch (e) {
        expect(spy).calledOnceWith(testData.calendar_id, ENTITY_TYPES.NUMERIC);
      }
    });

    it("when company_id is not a valid numeric or not undefined then throw error", () => {
      const testData = Object.assign({}, DATA, { company_id: "XXX" });

      try {
        new ServerEventEntity(testData);
        expect(spy).calledOnceWith(testData.company_id, ENTITY_TYPES.NUMERIC);
      } catch (e) {
        expect(spy).calledOnceWith(testData.company_id, ENTITY_TYPES.NUMERIC);
      }

      it("when company_id is undefined then do not throw error", () => {
        new ServerEventEntity(
          Object.assign({}, DATA, { company_id: undefined })
        );

        expect(spy).not.called;
      });
    });

    it("when description is not a valid numeric then throw error", () => {
      const testData = Object.assign({}, DATA, { description: 123 });

      try {
        new ServerEventEntity(testData);
        expect(spy).calledOnceWith(testData.description, ENTITY_TYPES.STRING);
      } catch (e) {
        expect(spy).calledOnceWith(testData.description, ENTITY_TYPES.STRING);
      }
    });

    describe("event_id", () => {
      it("when event_id is not undefined and not a valid numeric then throw error", () => {
        const testData = Object.assign({}, DATA, { event_id: "xxx" });

        try {
          new ServerEventEntity(testData);
          expect(spy).calledOnceWith(testData.event_id, ENTITY_TYPES.NUMERIC);
        } catch (e) {
          expect(spy).calledOnceWith(testData.event_id, ENTITY_TYPES.NUMERIC);
        }
      });

      it("when event_id is undefined then do not throw error", () => {
        new ServerEventEntity(Object.assign({}, DATA, { event_id: undefined }));

        expect(spy).not.called;
      });
    });

    it("should create a server event entity", () => {
      const serverEvent = new ServerEventEntity(DATA);

      expect(serverEvent)
        .to.be.an("object")
        .and.include.keys(
          "date_end",
          "date_start",
          "title",
          "all_day",
          "user_id",
          "calendar_id",
          "description",
          "company_id"
        );
    });
  });
});
