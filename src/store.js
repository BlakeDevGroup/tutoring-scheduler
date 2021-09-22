import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "./apis/events/events.slice";
import companyReducer from "./apis/companies/companies.slice";

export default configureStore({
  reducer: {
    events: eventReducer,
    companies: companyReducer,
  },
});
