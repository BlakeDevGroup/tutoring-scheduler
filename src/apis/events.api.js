import { Observable } from "rxjs";
import axios from "axios";
import MessageService from "../services/message.service";

export default class EventApi {
  constructor() {
    this.apiController = axios.create({
      baseURL: "http://localhost:49160",
      timeout: 1000,
      headers: { "Content-Type": "json" },
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
