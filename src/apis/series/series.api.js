import axios from "axios";
import messageService from "../../services/messaging/message.service";

export default class SeriesApi {
  constructor() {
    this.apiController = axios.create({
      baseURL: "http://localhost:3500",
      timeout: 1000,
      headers: { "Content-Type": "application/json;charset=utf-8" },
    });
  }

  async getSeries(calendar_id) {
    try {
      const response = await this.apiController.get(
        `/calendars/${calendar_id}/series`
      );

      if (response.data.success) {
        return messageService.sendSuccess(
          "http",
          response.data.message,
          response.data.data
        );
      } else {
        return messageService.sendFailure(
          "http",
          response.data.message,
          response.data.error
        );
      }
    } catch (e) {
      return messageService.sendFailure("error", e.message, e);
    }
  }

  async getSeriesById(calendar_id, series_id) {
    try {
      const response = await this.apiController.get(
        `/calendars/${calendar_id}/series/${series_id}`
      );

      if (response.data.success) {
        return messageService.sendSuccess(
          "http",
          response.data.message,
          response.data.data
        );
      } else {
        return messageService.sendFailure(
          "http",
          response.data.message,
          response.data.error
        );
      }
    } catch (e) {
      return messageService.sendFailure("error", e.message, e);
    }
  }

  async createSeries(calendar_id, series_data) {
    try {
      const response = await this.apiController.post(
        `/calendars/${calendar_id}/series`,
        series_data
      );

      if (response.data.success) {
        return messageService.sendSuccess(
          "http",
          response.data.message,
          response.data.data
        );
      } else {
        return messageService.sendFailure(
          "http",
          response.data.message,
          response.data.error
        );
      }
    } catch (e) {
      return messageService.sendFailure("error", e.message, e);
    }
  }

  async deleteSeries(calendar_id, series_id) {
    try {
      const response = await this.apiController.delete(
        `/calendars/${calendar_id}/series/${series_id}`
      );

      if (response.data.success) {
        return messageService.sendSuccess(
          "http",
          response.data.message,
          response.data.data
        );
      } else {
        return messageService.sendFailure(
          "http",
          response.data.message,
          response.data.error
        );
      }
    } catch (e) {
      return messageService.sendFailure("error", e.message, e);
    }
  }

  async updateSeries(calendar_id, series_id, series_data) {
    try {
      const response = await this.apiController.put(
        `/calendars/${calendar_id}/series/${series_id}`,
        series_data
      );

      if (response.data.success) {
        return messageService.sendSuccess(
          "http",
          response.data.message,
          response.data.data
        );
      } else {
        return messageService.sendFailure(
          "http",
          response.data.message,
          response.data.error
        );
      }
    } catch (e) {
      return messageService.sendFailure("error", e.message, e);
    }
  }

  async patchSeries(calendar_id, series_id, series_data) {
    try {
      const response = await this.apiController.patch(
        `/calendars/${calendar_id}/series/${series_id}`,
        series_data
      );

      if (response.data.success) {
        return messageService.sendSuccess(
          "http",
          response.data.message,
          response.data.data
        );
      } else {
        return messageService.sendFailure(
          "http",
          response.data.message,
          response.data.error
        );
      }
    } catch (e) {
      return messageService.sendFailure("error", e.message, e);
    }
  }
}
