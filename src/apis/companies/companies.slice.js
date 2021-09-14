import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import CompanyApi from "./companies.api";

const companyApi = new CompanyApi();

export const addCompany = createAsyncThunk(
  "companies/addCompany",
  async (company, thunkApi) => {
    // return company.company
    const result = await companyApi.createCompany(2, {
      name: company.name,
      pay: company.pay,
      color: company.color,
    });
    if (result.success) {
      return {
        name: company.name,
        pay: company.pay,
        company_id: company.company_id,
        color: company.color,
      };
    }
    if (result.error) {
      throw result.error;
    }
  }
);

export const updateCompany = createAsyncThunk(
  "companies/updateCompany",
  async (company) => {
    const result = await companyApi.updateCompany(company.company_id, company);

    if (result.success) {
      return {
        name: company.name,
        pay: company.pay,
        color: company.color,
        company_id: company.company_id,
      };
    } else {
      console.log(result.error);
    }
  }
);

export const removeCompany = createAsyncThunk(
  "companies/removeCompany",
  async (company_id) => {
    const result = await companyApi.deleteCompany(company_id);

    if (result.success) {
      return company_id;
    } else {
      console.error(result.error);
    }
  }
);

export const companySlice = createSlice({
  name: "companies",
  initialState: {
    companies: [],
  },
  reducers: {
    setCompanies: (state, action) => {
      console.log(state, action);
      state.companies = action.payload.companies;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCompany.fulfilled, (state, action) => {
      state.companies.push(action.payload);
    });

    builder.addCase(updateCompany.fulfilled, (state, action) => {
      state.companies = state.companies.map((company) => {
        if (company.id === action.payload.id) return action.payload;
        return company;
      });
    });

    builder.addCase(removeCompany.fulfilled, (state, action) => {
      state.companies = state.companies.filter((company) => {
        if (company.id !== action.payload) return company;
      });
    });
  },
});

export const { setCompanies } = companySlice.actions;

export default companySlice.reducer;
