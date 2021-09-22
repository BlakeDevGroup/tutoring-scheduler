import { Observable } from "rxjs";
import axios from "axios";
import MessageService from "../../services/messaging/message.service";

export default class EventApi {
  constructor() {
    this.apiController = axios.create({
      baseURL: "http://localhost:3500",
      timeout: 1000,
      headers: { "Content-Type": "application/json;charset=utf-8" },
    });
  }
  async getAllEvents(calendar_id) {
    try {
      const result = await this.apiController.get(
        `/calendars/${calendar_id}/events`
      );

      if (result.data.success) {
        return MessageService.sendSuccess(
          "http",
          result.data.message,
          result.data.data
        );
      } else {
        return MessageService.sendFailure(
          "http",
          result.data.message,
          result.data.error
        );
      }
    } catch (e) {
      return MessageService.sendFailure("error", e.message, e);
    }
  }

  async getEventById(calendar_id, event_id) {
    try {
      const result = await this.apiController.get(
        `/calendars/${calendar_id}/events/${event_id}`
      );

      if (result.data.success) {
        return MessageService.sendSuccess(
          "http",
          result.data.message,
          result.data.data
        );
      } else {
        return MessageService.sendFailure(
          "http",
          result.data.message,
          result.data.error
        );
      }
    } catch (e) {
      return MessageService.sendFailure("error", e.message, e);
    }
  }

  async createEvent(calendar_id, payload) {
    try {
      const result = await this.apiController.post(
        `/calendars/${calendar_id}/events`,
        payload
      );

      if (result.data.success) {
        return MessageService.sendSuccess(
          "http",
          result.data.message,
          result.data.data
        );
      } else {
        return MessageService.sendFailure(
          "http",
          result.data.message,
          result.data.error
        );
      }
    } catch (e) {
      return MessageService.sendFailure("error", e.message, e);
    }
  }

  async deleteEvent(calendar_id, event_id) {
    try {
      const result = await this.apiController.delete(
        `/calendars/${calendar_id}/events/${event_id}`
      );

      if (result.data.success) {
        return MessageService.sendSuccess(
          "http",
          result.data.message,
          result.data.data
        );
      } else {
        return MessageService.sendFailure(
          "http",
          result.data.message,
          result.data.error
        );
      }
    } catch (e) {
      return MessageService.sendFailure("error", e.message, e);
    }
  }

  async updateEvent(calendar_id, event_id, payload) {
    try {
      const result = await this.apiController.put(
        `/calendars/${calendar_id}/events/${event_id}`,
        payload
      );
      if (result.data.success) {
        return MessageService.sendSuccess(
          "http",
          result.data.message,
          result.data.data
        );
      } else {
        return MessageService.sendFailure(
          "http",
          result.data.message,
          result.data.error
        );
      }
    } catch (e) {
      return MessageService.sendFailure("error", e.message, e);
    }
  }

  async patchEvent(calendar_id, event_id, payload) {
    try {
      const result = await this.apiController.patch(
        `/calendars/${calendar_id}/events/${event_id}`,
        payload
      );
      if (result.data.success) {
        return MessageService.sendSuccess(
          "http",
          result.data.message,
          result.data.data
        );
      } else {
        return MessageService.sendFailure(
          "http",
          result.data.message,
          result.data.error
        );
      }
    } catch (e) {
      return MessageService.sendFailure("error", e.message, e);
    }
  }
}

export const prepEventData = (eventData) => {
  return eventData.map((event) => {
    return {
      id: event.event_id,
      calendar_id: event.calendar_id,
      title: event.title,
      start: event.date_start,
      end: event.date_end,
      description: event.description,
      user_id: event.user_id,
      all_day: event.all_day,
      company_id: event.company_id,
      backgroundColor: "#027788",
      borderColor: "#FFF",
      display: "block",
    };
  });
};
