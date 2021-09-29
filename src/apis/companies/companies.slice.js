import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import CompanyApi from "./companies.api";

const companyApi = new CompanyApi();

export const addCompany = createAsyncThunk(
  "companies/addCompany",
  async (company, thunkApi) => {
    // return company.company
    const result = await companyApi.createCompany(2, {
      name: company.name,
      pay_rate: company.pay,
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
      throw new Error(result.message);
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
        pay: company.pay_rate,
        color: company.color,
        company_id: company.company_id,
      };
    } else {
      throw new Error(result.message);
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
      throw new Error(result.message);
    }
  }
);

export const companySlice = createSlice({
  name: "companies",
  initialState: {
    companies: [],
    filteredCompanies: [],
  },
  reducers: {
    setCompanies: (state, action) => {
      state.companies = action.payload.companies;
    },
    addCompanyToFilter: (state, action) => {
      state.filteredCompanies.push(action.payload);
    },
    removeCompanyFromFilter: (state, action) => {
      state.filteredCompanies = state.filteredCompanies.filter(
        (id) => id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCompany.fulfilled, (state, action) => {
      state.companies.push(action.payload);
    });

    builder.addCase(updateCompany.fulfilled, (state, action) => {
      state.companies.map((company) => {
        if (company.id === action.payload) return action.payload;
        return company;
      });
      state.companies = [...state.companies];
      console.log(state.events);
    });

    builder.addCase(removeCompany.fulfilled, (state, action) => {
      state.companies = state.companies.filter((company) => {
        if (company.company_id !== action.payload) return company;
      });
    });
  },
});

export const { setCompanies, addCompanyToFilter, removeCompanyFromFilter } =
  companySlice.actions;
// export const setCompanies = companySlice.actions.setCompanies
export default companySlice.reducer;
