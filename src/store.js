import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "./apis/events/events.slice";

export default configureStore({
  reducer: {
    events: eventReducer,
  },
});
