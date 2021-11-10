import { createSlice } from "@reduxjs/toolkit";

export const fullCalendarSlice = createSlice({
  name: "fullCalendar",
  initialState: {
    events: [],
    start: "",
    end: "",
    view: "",
  },
  reducers: {
    setFCEvents: (state, action) => {
      state.events = action.payload;
    },

    setStart: (state, action) => {
      state.start = action.payload;
    },

    setEnd: (state, action) => {
      state.end = action.payload;
    },
    setView: (state, action) => {
      state.view = action.payload;
    },
  },
});

export const { setFCEvents, setStart, setEnd, setView } =
  fullCalendarSlice.actions;

export default fullCalendarSlice.reducer;
