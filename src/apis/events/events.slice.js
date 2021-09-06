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
  },
});

export const { setEvents, addEvent } = eventSlice.actions;

export default eventSlice.reducer;
