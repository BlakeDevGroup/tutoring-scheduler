import chai, { expect } from "chai";
import sinon, { stub } from "sinon";
import sinonChai from "sinon-chai";
import { CalendarEventEntity } from "./CalendarEvent.entity";
import * as errors from "../EntityTypeError";
import { ENTITY_TYPES } from "../EntityTypes";

chai.use(sinonChai);
let spy;
let sandBox;

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

const COMPANY_DATA = {
  color: "#fff",
};

describe("CalendarEventEntity", () => {
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
    describe("end", () => {
      it("when end is not a valid DateTime then throw error", () => {
        const testData = Object.assign({}, DATA, { end: "XXXX" });

        try {
          new CalendarEventEntity(testData);
          expect(spy).calledOnceWith(testData.end, ENTITY_TYPES.DATE_TIME);
        } catch (e) {
          expect(spy).calledOnceWith(testData.end, ENTITY_TYPES.DATE_TIME);
        }
      });
    });
    describe("start", () => {
      it("when start is not a valid DateTime then throw error", () => {
        const testData = Object.assign({}, DATA, { start: "XXXX" });

        try {
          new CalendarEventEntity(testData);
          expect(spy).calledOnceWith(testData.start, ENTITY_TYPES.DATE_TIME);
        } catch (e) {
          expect(spy).calledOnceWith(testData.start, ENTITY_TYPES.DATE_TIME);
        }
      });
    });

    describe("title", () => {
      it("when title is not a valid string then throw error", () => {
        const testData = Object.assign({}, DATA, { title: 123 });

        try {
          new CalendarEventEntity(testData);
          expect(spy).calledOnceWith(testData.title, ENTITY_TYPES.STRING);
        } catch (e) {
          expect(spy).calledOnceWith(testData.title, ENTITY_TYPES.STRING);
        }
      });
    });

    describe("allDay", () => {
      it("when allDay is not a valid boolean then throw error", () => {
        const testData = Object.assign({}, DATA, { allDay: 123 });

        try {
          new CalendarEventEntity(testData);
          expect(spy).calledOnceWith(testData.allDay, ENTITY_TYPES.BOOLEAN);
        } catch (e) {
          expect(spy).calledOnceWith(testData.allDay, ENTITY_TYPES.BOOLEAN);
        }
      });
    });

    describe("user_id", () => {
      it("when user_id is not a valid numeric then throw error", () => {
        const testData = Object.assign({}, DATA, { user_id: "XXX" });

        try {
          new CalendarEventEntity(testData);
          expect(spy).calledOnceWith(testData.user_id, ENTITY_TYPES.NUMERIC);
        } catch (e) {
          expect(spy).calledOnceWith(testData.user_id, ENTITY_TYPES.NUMERIC);
        }
      });
    });

    describe("calendar_id", () => {
      it("when calendar_id is not a valid numeric then throw error", () => {
        const testData = Object.assign({}, DATA, { calendar_id: "XXX" });

        try {
          new CalendarEventEntity(testData);
          expect(spy).calledOnceWith(
            testData.calendar_id,
            ENTITY_TYPES.NUMERIC
          );
        } catch (e) {
          expect(spy).calledOnceWith(
            testData.calendar_id,
            ENTITY_TYPES.NUMERIC
          );
        }
      });
    });

    describe("company_id", () => {
      it("when calendar_id is not a valid numeric then throw error", () => {
        const testData = Object.assign({}, DATA, { company_id: "XXX" });

        try {
          new CalendarEventEntity(testData);
          expect(spy).calledOnceWith(testData.company_id, ENTITY_TYPES.NUMERIC);
        } catch (e) {
          expect(spy).calledOnceWith(testData.company_id, ENTITY_TYPES.NUMERIC);
        }
      });
    });

    describe("description", () => {
      it("when description is not a valid string then throw error", () => {
        const testData = Object.assign({}, DATA, { description: 123 });

        try {
          new CalendarEventEntity(testData);
          expect(spy).calledOnceWith(testData.description, ENTITY_TYPES.STRING);
        } catch (e) {
          expect(spy).calledOnceWith(testData.description, ENTITY_TYPES.STRING);
        }
      });
    });

    describe("id", () => {
      it("when id is not a valid numeric or undefined then throw error", () => {
        const testData = Object.assign({}, DATA, { id: "asdf" });

        try {
          new CalendarEventEntity(testData);
          expect(spy).calledOnceWith(testData.id, ENTITY_TYPES.NUMERIC);
        } catch (e) {
          expect(spy).calledOnceWith(testData.id, ENTITY_TYPES.NUMERIC);
        }
      });

      it("when id is undefined then do not throw error", () => {
        const testData = Object.assign({}, DATA, { id: undefined });

        new CalendarEventEntity(testData);
        expect(spy).not.called;
      });
    });

    it("when backgroundColor provided by companyData is not a valid string then throw error", async () => {
      const testData = Object.assign({}, { color: 123 });

      try {
        new CalendarEventEntity(DATA, testData);
        expect(spy).calledOnceWith(testData.color, ENTITY_TYPES.STRING);
      } catch (e) {
        expect(spy).calledOnceWith(testData.color, ENTITY_TYPES.STRING);
      }
    });

    it("when color is not provided by companyData then backgroundColor should match default", async () => {
      const event = new CalendarEventEntity(DATA, COMPANY_DATA);
      expect(event.backgroundColor).to.equal(COMPANY_DATA.color);
    });

    it("when color is not provided by companyData then borderColor should match default", async () => {
      const event = new CalendarEventEntity(DATA, COMPANY_DATA);
      expect(event.borderColor).to.equal(COMPANY_DATA.color);
    });

    it("should create calendarEventEntity and not throw error", () => {
      try {
        const calendarEvent = new CalendarEventEntity(DATA);

        expect(calendarEvent)
          .to.be.an("object")
          .and.include.keys(
            "end",
            "start",
            "title",
            "allDay",
            "user_id",
            "calendar_id",
            "company_id",
            "description",
            "backgroundColor",
            "borderColor",
            "editable",
            "display"
          );
      } catch (e) {}
    });

    it("should create calendarEventEntity and not throw error", () => {
      try {
        const calendarEvent = new CalendarEventEntity(DATA, COMPANY_DATA);

        expect(calendarEvent)
          .to.be.an("object")
          .and.include.keys(
            "end",
            "start",
            "title",
            "allDay",
            "user_id",
            "calendar_id",
            "company_id",
            "description",
            "backgroundColor",
            "borderColor",
            "editable",
            "display"
          );
      } catch (e) {}
    });
  });
});
