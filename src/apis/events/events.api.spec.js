import chai, { expect } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import axios from "axios";
import EventApi from "./events.api";
import MessageService from "../../services/messaging/message.service";

chai.use(sinonChai);
const CALENDAR_ID = 1;
const EVENT_ID = 1;
const RESOLVED = {
  data: {
    success: true,
    data: [],
    message: "RESOLVED",
  },
};

const ERROR = new Error("ERROR");

const FAILED = {
  data: {
    success: false,
    error: ERROR,
    message: ERROR.message,
  },
};
const EVENT_DATA = {
  date_end: "2021-09-01T11:30:00.000Z",
  date_start: "2021-09-01T10:30:00.000Z",
  event_id: "319",
  title: "Test Event",
  all_day: false,
  user_id: "1",
  calendar_id: "2",
};

let sandBox = sinon.createSandbox();
let axiosStub;
let eventApi;
let stubSuccess;
let stubFailure;
describe("EventApi", () => {
  beforeEach(() => {
    eventApi = new EventApi();
    stubSuccess = sandBox.stub(MessageService, "sendSuccess");
    stubFailure = sandBox.stub(MessageService, "sendFailure");
  });

  afterEach(() => {
    sandBox.restore();
    axiosStub.reset();
    stubSuccess.restore();
    stubFailure.restore();
  });

  it("it should run axios create with proper arguments", () => {
    const axiosInstanceParams = {
      baseURL: "http://localhost:3500",
      timeout: 1000,
      headers: { "Content-Type": "application/json;charset=utf-8" },
    };

    axiosStub = sandBox.stub(axios, "create").returns(true);

    eventApi = new EventApi();

    expect(eventApi.apiController).not.equal(undefined);
    expect(axiosStub).calledOnce;
    expect(axiosStub).calledWith(axiosInstanceParams);
  });

  describe("get all events", () => {
    it("should get all events by specified calendar_id send success message", async () => {
      axiosStub = sandBox
        .stub(eventApi.apiController, "get")
        .resolves(RESOLVED);

      await eventApi.getAllEvents(CALENDAR_ID);

      expect(axiosStub).calledOnceWith(`/calendars/${CALENDAR_ID}/events`);

      expect(stubSuccess).calledOnce;
      expect(stubSuccess).calledWith(
        "http",
        RESOLVED.data.message,
        RESOLVED.data.data
      );
    });

    it("when data.success is false, send failure", async () => {
      axiosStub = sandBox.stub(eventApi.apiController, "get").resolves(FAILED);

      await eventApi.getAllEvents(CALENDAR_ID);

      expect(stubFailure).calledOnce;
      expect(stubFailure).calledWith("http", FAILED.data.message, ERROR);
    });

    it("when an exception occurs then send failure message", async () => {
      axiosStub = sandBox.stub(eventApi.apiController, "get").throws(ERROR);

      await eventApi.getAllEvents(CALENDAR_ID);

      expect(stubFailure).calledOnce;
      expect(stubFailure).calledWith("error", ERROR.message);
    });
  });

  describe("get an event by event_id and calendar_id", () => {
    it("when result success is true then send success message and data", async () => {
      axiosStub = sandBox
        .stub(eventApi.apiController, "get")
        .resolves(RESOLVED);

      await eventApi.getEventById(CALENDAR_ID, EVENT_ID);

      expect(axiosStub).calledOnceWith(
        `/calendars/${CALENDAR_ID}/events/${EVENT_ID}`
      );

      expect(stubSuccess).calledOnce;
      expect(stubSuccess).calledWith(
        "http",
        RESOLVED.data.message,
        RESOLVED.data.data
      );
    });

    it("when result success is false then send failure message and data", async () => {
      axiosStub = sandBox.stub(eventApi.apiController, "get").resolves(FAILED);

      await eventApi.getEventById(CALENDAR_ID, EVENT_ID);

      expect(stubFailure).calledOnce;
      expect(stubFailure).calledWith("http", FAILED.data.message, ERROR);
    });

    it("when an exception occurs thensend failure message and error", async () => {
      axiosStub = sandBox.stub(eventApi.apiController, "get").throws(ERROR);

      await eventApi.getEventById(CALENDAR_ID, EVENT_ID);

      expect(stubFailure).calledOnce;
      expect(stubFailure).calledWith("error", ERROR.message, ERROR);
    });
  });

  describe("create event", () => {
    it("when result success is true then send success message and data", async () => {
      axiosStub = sandBox
        .stub(eventApi.apiController, "post")
        .resolves(RESOLVED);

      await eventApi.createEvent(CALENDAR_ID, EVENT_DATA);

      expect(axiosStub).calledOnceWith(
        `/calendars/${CALENDAR_ID}/events`,
        EVENT_DATA
      );

      expect(stubSuccess).calledOnce;
      expect(stubSuccess).calledWith(
        "http",
        RESOLVED.data.message,
        RESOLVED.data.data
      );
    });

    it("when result success if false then send failure message and error", async () => {
      axiosStub = sandBox.stub(eventApi.apiController, "post").resolves(FAILED);

      await eventApi.createEvent(CALENDAR_ID, EVENT_DATA);

      expect(stubFailure).calledOnce;
      expect(stubFailure).calledWith(
        "http",
        FAILED.data.message,
        FAILED.data.error
      );
    });

    it("when exception is thrown then send failure message and error", async () => {
      axiosStub = sandBox.stub(eventApi.apiController, "post").throws(ERROR);

      await eventApi.createEvent(CALENDAR_ID, EVENT_DATA);

      expect(stubFailure).calledOnce;
      expect(stubFailure).calledWith("error", ERROR.message, ERROR);
    });
  });

  describe("delete event", () => {
    it("when result success is true then send success message and data", async () => {
      axiosStub = sandBox
        .stub(eventApi.apiController, "delete")
        .resolves(RESOLVED);

      await eventApi.deleteEvent(CALENDAR_ID, EVENT_ID);

      expect(axiosStub).calledOnceWith(
        `/calendars/${CALENDAR_ID}/events/${EVENT_ID}`
      );

      expect(stubSuccess).calledOnce;
      expect(stubSuccess).calledWith(
        "http",
        RESOLVED.data.message,
        RESOLVED.data.data
      );
    });

    it("when result success is false then send failure message and error", async () => {
      axiosStub = sandBox
        .stub(eventApi.apiController, "delete")
        .resolves(FAILED);

      await eventApi.deleteEvent(CALENDAR_ID, EVENT_ID);

      expect(stubFailure).calledOnce;
      expect(stubFailure).calledWith(
        "http",
        FAILED.data.message,
        FAILED.data.error
      );
    });

    it("when exception is thrown then send failure message and error", async () => {
      axiosStub = sandBox.stub(eventApi.apiController, "delete").throws(ERROR);

      await eventApi.deleteEvent(CALENDAR_ID, EVENT_ID);

      expect(stubFailure).calledOnce;
      expect(stubFailure).calledWith("error", ERROR.message, ERROR);
    });
  });

  describe("patch event", () => {
    it("when result success is true then send success message and data", async () => {
      axiosStub = sandBox
        .stub(eventApi.apiController, "patch")
        .resolves(RESOLVED);

      await eventApi.patchEvent(CALENDAR_ID, EVENT_ID, EVENT_DATA);

      expect(axiosStub).calledOnceWith(
        `/calendars/${CALENDAR_ID}/events/${EVENT_ID}`,
        EVENT_DATA
      );

      expect(stubSuccess).calledOnce;
      expect(stubSuccess).calledWith(
        "http",
        RESOLVED.data.message,
        RESOLVED.data.data
      );
    });

    it("when result success is false then send failure message and error", async () => {
      axiosStub = sandBox
        .stub(eventApi.apiController, "patch")
        .resolves(FAILED);

      await eventApi.patchEvent(CALENDAR_ID, EVENT_ID, EVENT_DATA);

      expect(stubFailure).calledOnce;
      expect(stubFailure).calledWith(
        "http",
        FAILED.data.message,
        FAILED.data.error
      );
    });

    it("when exception is thrown then send failure message and error", async () => {
      axiosStub = sandBox.stub(eventApi.apiController, "patch").throws(ERROR);

      await eventApi.patchEvent(CALENDAR_ID, EVENT_ID, EVENT_DATA);

      expect(stubFailure).calledOnce;
      expect(stubFailure).calledWith("error", ERROR.message, ERROR);
    });
  });

  describe("update event", () => {
    it("when result success is true then send success message and data", async () => {
      axiosStub = sandBox
        .stub(eventApi.apiController, "put")
        .resolves(RESOLVED);

      await eventApi.updateEvent(CALENDAR_ID, EVENT_ID, EVENT_DATA);

      expect(axiosStub).calledOnceWith(
        `/calendars/${CALENDAR_ID}/events/${EVENT_ID}`,
        EVENT_DATA
      );

      expect(stubSuccess).calledOnce;
      expect(stubSuccess).calledWith(
        "http",
        RESOLVED.data.message,
        RESOLVED.data.data
      );
    });

    it("when result success is false then send failure message and error", async () => {
      axiosStub = sandBox.stub(eventApi.apiController, "put").resolves(FAILED);

      await eventApi.updateEvent(CALENDAR_ID, EVENT_ID, EVENT_DATA);

      expect(stubFailure).calledOnce;
      expect(stubFailure).calledWith(
        "http",
        FAILED.data.message,
        FAILED.data.error
      );
    });

    it("when exception is thrown then send failure message and error", async () => {
      axiosStub = sandBox.stub(eventApi.apiController, "put").throws(ERROR);

      await eventApi.updateEvent(CALENDAR_ID, EVENT_ID, EVENT_DATA);

      expect(stubFailure).calledOnce;
      expect(stubFailure).calledWith("error", ERROR.message, ERROR);
    });
  });
});
