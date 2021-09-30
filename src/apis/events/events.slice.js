import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import EventApi from "./events.api";
import SeriesApi from "../series/series.api";
import { updateCompany } from "../companies/companies.slice";
import EntityFactory from "../../entitities/EntityFactory";
import EventAdapter from "../../entitities/Event/EventAdapter";
import SeriesAdapter from "../../entitities/Series/SeriesAdapter";

const eventApi = new EventApi();
const seriesApi = new SeriesApi();

export const addEvent = createAsyncThunk(
  "events/addEvent",
  async (data, thunkAPI) => {
    let result;

    if (data.event.daysOfWeek) {
      result = await seriesApi.createSeries(
        data.event.calendar_id,
        SeriesAdapter.toServer(data.event)
      );
    } else {
      result = await eventApi.createEvent(
        data.event.calendar_id,
        EventAdapter.toServer(data.event)
      );
    }

    if (result.success) {
      return data.event;
    }
    if (result.error) {
      throw result.error;
    }
  }
);

export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async (payload) => {
    let result;
    if (payload.type == "series") {
      result = await seriesApi.updateSeries(
        payload.event.calendar_id,
        payload.event.groupId,
        SeriesAdapter.toServer(payload.event)
      );
    } else if (payload.type == "event") {
      result = await eventApi.updateEvent(
        payload.event.calendar_id,
        payload.event.id,
        EventAdapter.toServer(payload.event)
      );
    }

    if (result.success) {
      return payload;
    } else {
      throw result.error;
    }
  }
);

export const removeEvent = createAsyncThunk(
  "events/removeEvent",
  async (payload) => {
    let result;
    if (payload.type == "event") {
      result = await eventApi.deleteEvent(2, payload.id);
    } else if (payload.type == "series") {
      result = await seriesApi.deleteSeries(2, payload.id);
    }

    if (result.success) {
      return payload;
    } else {
      throw result.error;
    }
  }
);

export const eventSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
  },
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload.events;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addEvent.fulfilled, (state, action) => {
      state.events.push(action.payload);
    });

    builder.addCase(updateEvent.fulfilled, (state, action) => {
      state.events = state.events.map((event) => {
        if (action.payload.type == "event") {
          if (event.id && event.id == action.payload.event.id)
            return action.payload.event;
        } else if (action.payload.type == "series") {
          if (event.groupId && event.groupId == action.payload.event.groupId)
            return action.payload.event;
        }

        return event;
      });
    });

    builder.addCase(removeEvent.fulfilled, (state, action) => {
      state.events = state.events.filter((event) => {
        if (action.payload.type == "event") {
          if (event.id !== action.payload.id) return event;
        } else if (action.payload.type == "series") {
          if (event.groupId !== action.payload.id) return event;
        }
      });
    });

    builder.addCase(updateCompany.fulfilled, (state, action) => {
      state.events = state.events.map((event) => {
        if (event.company_id === action.payload.company_id)
          return Object.assign({}, event, {
            backgroundColor: action.payload.color,
            borderColor: action.payload.color,
          });
        return event;
      });
    });
  },
});

export const { setEvents } = eventSlice.actions;

export default eventSlice.reducer;
