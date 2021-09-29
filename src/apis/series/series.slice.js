import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { eventSlice } from "../events/events.slice";
import SeriesApi from "./series.api";

const seriesApi = new SeriesApi();

export const addSeries = createAsyncThunk(
  "series/addSeries",
  async (data, thunkAPI) => {
    const series = Object.assign({}, data.series, { calendar_id: 2 });
    const result = await seriesApi.createSeries(2, series);

    if (result.success) {
      return series;
    } else {
      throw result.error;
    }
  }
);

export const updateSeries = createAsyncThunk(
  "series/updateSeries",
  async (data) => {
    const series = Object.assign({}, data.series, {
      calendar_id: 2,
      series_id: data.series.id,
    });
    const result = await seriesApi.updateSeries(2, series.id, series);

    if (result.success) {
      return series;
    } else {
      throw result.erorr;
    }
  }
);

export const removeSeries = createAsyncThunk(
  "series/removeSeries",
  async (id) => {
    const result = await seriesApi.deleteSeries(2, id);

    if (result.success) {
      return id;
    } else {
      throw result.error;
    }
  }
);

export const seriesSlice = createSlice({
  name: "series",
  initialState: {
    series: [],
  },
  reducers: {
    setSeries: (state, action) => {
      state.series = action.payload.series;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addSeries.fulfilled, (state, action) => {
      state.series.push(action.payload);
    });

    builder.addCase(updateSeries.fulfilled, (state, action) => {
      state.series.map((series) => {
        if (series.id === action.payload.id) return action.payload;
        return series;
      });
    });

    builder.addCase(removeSeries.fulfilled, (state, action) => {
      state.series.filter((series) => {
        if (series.id !== action.payload.id) return series;
      });
    });
  },
});

export const { setSeries } = eventSlice.actions;

export default seriesSlice.reducer;
