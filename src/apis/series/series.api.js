import axios from "axios";
import messageService from "../../services/messaging/message.service";

export default class SeriesApi {
  constructor() {
    this.apiController = axios.create({
      baseURL: process.env.REACT_APP_SERVICE_URL,
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

export const prepSeriesData = (seriesData) => {
  return seriesData.map((series) => {
    return {
      daysOfWeek: series.days_of_week,
      startTime: series.start_time,
      endTime: series.end_time,
      startRecur: series.start_recur,
      endRecur: series.end_recur,
      groupId: series.series_id,
      title: series.title,
      description: series.description,
    };
  });
};
