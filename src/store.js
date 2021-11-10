import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "./apis/events/events.slice";
import companyReducer from "./apis/companies/companies.slice";
import seriesReducer from "./apis/series/series.slice";
import fullCalendarReducer from "./apis/fullCalendar.slice";

export default configureStore({
  reducer: {
    events: eventReducer,
    companies: companyReducer,
    series: seriesReducer,
    fullCalendar: fullCalendarReducer,
  },
});
