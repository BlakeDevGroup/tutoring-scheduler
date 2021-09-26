import chai, { expect } from "chai";
import sinon, { stub } from "sinon";
import sinonChai from "sinon-chai";
import axios from "axios";
import SeriesApi from "./series.api";
import MessageService from "../../services/messaging/message.service";
import EventApi from "../events/events.api";
import messageService from "../../services/messaging/message.service";

chai.use(sinonChai);

const CALENDAR_ID = 1;
const SERIES_ID = 1;
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

const SERIES_DATA = {
  title: "New Series",
  description: "Series description",
  calendar_id: 2,
  start_time: "10:30",
  end_time: "11:30",
  start_recur: "2021-10-30",
  end_recur: "2022-10-30",
  days_of_week: [0, 1, 3],
};

let sandBox = sinon.createSandbox();
let axiosStub;
let seriesApi;
let stubSuccess;
let stubFailure;

describe("SeriesApi", () => {
  beforeEach(() => {
    seriesApi = new SeriesApi();
    stubSuccess = sandBox.spy(MessageService, "sendSuccess");
    stubFailure = sandBox.spy(MessageService, "sendFailure");
  });

  afterEach(() => {
    sandBox.restore();
    axiosStub.reset();
    stubSuccess.restore();
    stubFailure.restore();
  });

  it("should run axios create with proper arguments", () => {
    const axiosInstanceParams = {
      baseURL: "http://localhost:3500",
      timeout: 1000,
      headers: { "Content-Type": "application/json;charset=utf-8" },
    };

    axiosStub = sandBox.stub(axios, "create").returns(true);

    seriesApi = new SeriesApi();

    expect(seriesApi.apiController).not.equal(undefined);
    expect(axiosStub).calledOnce;
    expect(axiosStub).calledWith(axiosInstanceParams);
  });

  describe("get all series", () => {
    it("should get all series by specified calendar_id and send success message", async () => {
      axiosStub = sandBox
        .stub(seriesApi.apiController, "get")
        .resolves(RESOLVED);

      const result = await seriesApi.getSeries(CALENDAR_ID);

      expect(axiosStub).calledOnceWith(`/calendars/${CALENDAR_ID}/series`);

      expect(stubSuccess).calledOnce;
      expect(stubSuccess).calledWith(
        "http",
        RESOLVED.data.message,
        RESOLVED.data.data
      );

      expect(result).to.eql(
        messageService.sendSuccess(
          "http",
          RESOLVED.data.message,
          RESOLVED.data.data
        )
      );
    });

    it("should send failure when success is false", async () => {
      axiosStub = sandBox.stub(seriesApi.apiController, "get").resolves(FAILED);

      const result = await seriesApi.getSeries(CALENDAR_ID);
      expect(stubFailure).calledOnce;
      expect(stubFailure).calledWith(
        "http",
        FAILED.data.message,
        FAILED.data.error
      );

      const comparison = messageService.sendFailure(
        "http",
        FAILED.data.message,
        FAILED.data.error
      );
      expect(result).to.eql(comparison);
    });

    it("should catch error and send failure", async () => {
      axiosStub = sandBox.stub(seriesApi.apiController, "get").throws(ERROR);

      const result = await seriesApi.getSeries(CALENDAR_ID);

      expect(stubFailure).calledOnce;
      expect(stubFailure).calledWith("error", ERROR.message, ERROR);

      const comparison = messageService.sendFailure(
        "error",
        ERROR.message,
        ERROR
      );

      expect(result).to.eql(comparison);
    });
  });

  describe("get a series by id", () => {
    it("when success is true then send success message with returned data", async () => {
      axiosStub = sandBox
        .stub(seriesApi.apiController, "get")
        .resolves(RESOLVED);

      const result = await seriesApi.getSeriesById(CALENDAR_ID, SERIES_ID);

      expect(axiosStub).calledOnce;
      expect(axiosStub).calledWith(
        `/calendars/${CALENDAR_ID}/series/${SERIES_ID}`
      );

      expect(stubSuccess).calledOnce;
      expect(stubSuccess).calledWith(
        "http",
        RESOLVED.data.message,
        RESOLVED.data.data
      );

      const comparison = messageService.sendSuccess(
        "http",
        RESOLVED.data.message,
        RESOLVED.data.data
      );

      expect(result).to.eql(comparison);
    });

    it("when success if false then send failure message with error", async () => {
      axiosStub = sandBox.stub(seriesApi.apiController, "get").resolves(FAILED);

      const result = await seriesApi.getSeriesById(CALENDAR_ID, SERIES_ID);

      expect(stubFailure).calledOnce;
      expect(stubFailure).calledWith(
        "http",
        FAILED.data.message,
        FAILED.data.error
      );

      const comparison = messageService.sendFailure(
        "http",
        FAILED.data.message,
        FAILED.data.error
      );

      expect(result).to.eql(comparison);
    });

    it("should catch error and send failure", async () => {
      axiosStub = sandBox.stub(seriesApi.apiController, "get").throws(ERROR);

      const result = await seriesApi.getSeriesById(CALENDAR_ID, SERIES_ID);

      expect(stubFailure).calledOnce;
      expect(stubFailure).calledWith("error", ERROR.message, ERROR);

      const comparison = messageService.sendFailure(
        "error",
        ERROR.message,
        ERROR
      );

      expect(result).to.eql(comparison);
    });
  });

  describe("create a series", () => {
    it("when success is true then send success message", async () => {
      axiosStub = sandBox
        .stub(seriesApi.apiController, "post")
        .resolves(RESOLVED);

      const result = await seriesApi.createSeries(CALENDAR_ID, SERIES_DATA);

      expect(axiosStub).calledOnceWith(
        `/calendars/${CALENDAR_ID}/series`,
        SERIES_DATA
      );

      expect(stubSuccess).calledOnce;
      expect(stubSuccess).calledWith(
        "http",
        RESOLVED.data.message,
        RESOLVED.data.data
      );

      const comparison = messageService.sendSuccess(
        "http",
        RESOLVED.data.message,
        RESOLVED.data.data
      );
      expect(result).to.eql(comparison);
    });

    it("when success is false then send failure message", async () => {
      axiosStub = sandBox
        .stub(seriesApi.apiController, "post")
        .resolves(FAILED);

      const result = await seriesApi.createSeries(CALENDAR_ID, SERIES_DATA);
      expect(stubFailure).calledOnce;
      expect(stubFailure).calledWith(
        "http",
        FAILED.data.message,
        FAILED.data.error
      );

      const comparison = messageService.sendFailure(
        "http",
        FAILED.data.message,
        FAILED.data.error
      );

      expect(result).to.eql(comparison);
    });

    it("should catch error and send failure", async () => {
      axiosStub = sandBox.stub(seriesApi.apiController, "post").throws(ERROR);

      const result = await seriesApi.createSeries(CALENDAR_ID, SERIES_DATA);

      expect(stubFailure).calledOnce;
      expect(stubFailure).calledWith("error", ERROR.message, ERROR);

      const comparison = messageService.sendFailure(
        "error",
        ERROR.message,
        ERROR
      );

      expect(result).to.eql(comparison);
    });
  });

  describe("delete a series", () => {
    it("when success is true then send success message", async () => {
      axiosStub = sandBox
        .stub(seriesApi.apiController, "delete")
        .resolves(RESOLVED);

      const result = await seriesApi.deleteSeries(CALENDAR_ID, SERIES_ID);

      expect(axiosStub).calledOnce;
      expect(axiosStub).calledWith(
        `/calendars/${CALENDAR_ID}/series/${SERIES_ID}`
      );

      expect(stubSuccess).calledOnce;
      expect(stubSuccess).calledWith(
        "http",
        RESOLVED.data.message,
        RESOLVED.data.data
      );

      const comparison = messageService.sendSuccess(
        "http",
        RESOLVED.data.message,
        RESOLVED.data.data
      );

      expect(result).to.eql(comparison);
    });

    it("should catch error and send failure", async () => {
      axiosStub = sandBox.stub(seriesApi.apiController, "delete").throws(ERROR);

      const result = await seriesApi.deleteSeries(CALENDAR_ID, SERIES_ID);

      expect(stubFailure).calledOnce;
      expect(stubFailure).calledWith("error", ERROR.message, ERROR);

      const comparison = messageService.sendFailure(
        "error",
        ERROR.message,
        ERROR
      );

      expect(result).to.eql(comparison);
    });

    it("when success is false then send failure message", async () => {
      axiosStub = sandBox
        .stub(seriesApi.apiController, "delete")
        .resolves(FAILED);

      const result = await seriesApi.deleteSeries(CALENDAR_ID, SERIES_ID);

      expect(stubFailure).calledOnce;
      expect(stubFailure).calledWith(
        "http",
        FAILED.data.message,
        FAILED.data.error
      );

      const comparison = messageService.sendFailure(
        "http",
        FAILED.data.message,
        FAILED.data.error
      );

      expect(result).to.eql(comparison);
    });
  });

  describe("update a series", () => {
    it("should catch error and send failure", async () => {
      axiosStub = sandBox.stub(seriesApi.apiController, "put").throws(ERROR);

      const result = await seriesApi.updateSeries(
        CALENDAR_ID,
        SERIES_ID,
        SERIES_DATA
      );

      expect(axiosStub).calledOnceWith(
        `/calendars/${CALENDAR_ID}/series/${SERIES_ID}`,
        SERIES_DATA
      );

      expect(stubFailure).calledOnce;
      expect(stubFailure).calledWith("error", ERROR.message, ERROR);

      const comparison = messageService.sendFailure(
        "error",
        ERROR.message,
        ERROR
      );

      expect(result).to.eql(comparison);
    });

    it("when success is true then send success message ", async () => {
      axiosStub = sandBox
        .stub(seriesApi.apiController, "put")
        .resolves(RESOLVED);

      const result = await seriesApi.updateSeries(
        CALENDAR_ID,
        SERIES_ID,
        SERIES_DATA
      );

      expect(stubSuccess).calledOnce;
      expect(stubSuccess).calledWith(
        "http",
        RESOLVED.data.message,
        RESOLVED.data.data
      );

      const comparison = messageService.sendSuccess(
        "http",
        RESOLVED.data.message,
        RESOLVED.data.data
      );

      expect(result).to.eql(comparison);
    });
    it("when success is false then send failure message", async () => {
      axiosStub = sandBox.stub(seriesApi.apiController, "put").resolves(FAILED);

      const result = await seriesApi.updateSeries(
        CALENDAR_ID,
        SERIES_ID,
        SERIES_DATA
      );

      expect(stubFailure).calledOnce;
      expect(stubFailure).calledWith(
        "http",
        FAILED.data.message,
        FAILED.data.error
      );

      const comparison = messageService.sendFailure(
        "http",
        FAILED.data.message,
        FAILED.data.error
      );

      expect(result).to.eql(comparison);
    });
  });

  describe("patch a series", () => {
    it("should catch error and send failure", async () => {
      axiosStub = sandBox.stub(seriesApi.apiController, "patch").throws(ERROR);

      const result = await seriesApi.patchSeries(
        CALENDAR_ID,
        SERIES_ID,
        SERIES_DATA
      );

      expect(axiosStub).calledOnceWith(
        `/calendars/${CALENDAR_ID}/series/${SERIES_ID}`,
        SERIES_DATA
      );

      expect(stubFailure).calledOnce;
      expect(stubFailure).calledWith("error", ERROR.message, ERROR);

      const comparison = messageService.sendFailure(
        "error",
        ERROR.message,
        ERROR
      );

      expect(result).to.eql(comparison);
    });

    it("when success is true then send success message ", async () => {
      axiosStub = sandBox
        .stub(seriesApi.apiController, "patch")
        .resolves(RESOLVED);

      const result = await seriesApi.patchSeries(
        CALENDAR_ID,
        SERIES_ID,
        SERIES_DATA
      );

      expect(stubSuccess).calledOnce;
      expect(stubSuccess).calledWith(
        "http",
        RESOLVED.data.message,
        RESOLVED.data.data
      );

      const comparison = messageService.sendSuccess(
        "http",
        RESOLVED.data.message,
        RESOLVED.data.data
      );

      expect(result).to.eql(comparison);
    });
    it("when success is false then send failure message", async () => {
      axiosStub = sandBox
        .stub(seriesApi.apiController, "patch")
        .resolves(FAILED);

      const result = await seriesApi.patchSeries(
        CALENDAR_ID,
        SERIES_ID,
        SERIES_DATA
      );

      expect(stubFailure).calledOnce;
      expect(stubFailure).calledWith(
        "http",
        FAILED.data.message,
        FAILED.data.error
      );

      const comparison = messageService.sendFailure(
        "http",
        FAILED.data.message,
        FAILED.data.error
      );

      expect(result).to.eql(comparison);
    });
  });
});
