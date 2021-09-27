import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import EventApi from "./events.api";
import { updateCompany } from "../companies/companies.slice";
import EntityFactory from "../../entitities/EntityFactory";

const eventApi = new EventApi();

export const addEvent = createAsyncThunk(
  "events/addEvent",
  async (data, thunkAPI) => {
    // return event.event;
    const result = await eventApi.createEvent(2, {
      date_end: data.event.end,
      date_start: data.event.start,
      title: data.event.title,
      all_day: false,
      user_id: 1,
      calendar_id: 2,
    });
    if (result.success) {
      return {
        end: data.event.end,
        start: data.event.start,
        title: data.event.title,
        all_day: false,
        user_id: 1,
        calendar_id: 2,
      };
    }
    if (result.error) {
      throw result.error;
    }
  }
);

export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async (event) => {
    const result = await eventApi.updateEvent(2, event.id, {
      calendar_id: 2,
      date_end: event.end,
      date_start: event.start,
      title: event.title,
      all_day: false,
      user_id: 1,
    });

    if (result.success) {
      return {
        calendar_id: 2,
        end: event.end,
        start: event.start,
        title: event.title,
        all_day: false,
        user_id: 1,
        id: event.id,
      };
    } else {
      console.error(result.error);
    }
  }
);

export const removeEvent = createAsyncThunk(
  "events/removeEvent",
  async (id) => {
    const result = await eventApi.deleteEvent(2, id);

    if (result.success) {
      return id;
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
        if (event.id === action.payload.id) return action.payload;
        return event;
      });
    });

    builder.addCase(removeEvent.fulfilled, (state, action) => {
      state.events = state.events.filter((event) => {
        if (event.id !== action.payload.id) return event;
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
