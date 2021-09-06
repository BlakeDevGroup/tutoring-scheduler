import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import EventApi from "./events.api";

const eventApi = new EventApi();

export const eventSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
  },
  reducers: {
    setEvents: (state, action) => {
      console.log(state, action);
      state.events = action.payload.events;
    },
    addEvent: (state, action) => {
      state.events.push(action.payload.event);
    },
    updateEvent: (state, action) => {
      state.events = state.events.map((event) => {
        if (event.id === action.payload.id) return action.payload;
        return event;
      });
    },
    removeEvent: (state, action) => {
      state.events = state.events.filter((event) => {
        if (event.id !== action.payload.id) return event;
      });
    },
  },
});

export const { setEvents, addEvent, updateEvent, removeEvent } =
  eventSlice.actions;

export default eventSlice.reducer;
