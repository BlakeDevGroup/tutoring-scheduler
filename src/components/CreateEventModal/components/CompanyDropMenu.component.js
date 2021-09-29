import { Box, Select } from "grommet";
import { CaretDownFill } from "grommet-icons";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCompanies } from "../../../apis/companies/companies.slice";
import CompanyApi, {
  prepCompanyData,
} from "../../../apis/companies/companies.api";
import CalendarService from "../../../services/calendar/calendar.service";

const companyApi = new CompanyApi();

function formatCompanies(companies) {
  let companyNames = [];

  companies.forEach((item) => {
    companyNames.push(item.name);
  });

  return companyNames;
}

function CompanyDropMenu(props) {
  const companies = useSelector((state) => state.companies.companies);
  const [options, setOptions] = React.useState([]);
  const dispatch = useDispatch();

  useEffect(async () => {
    setOptions(formatCompanies(companies));
  }, [companies]);

  return (
    <Box margin={{ bottom: "small" }} basis="1/2">
      <Select
        size="small"
        options={options}
        value={props.value}
        placeholder="Select company"
        onChange={(e) => {
          props.onChange(
            CalendarService.getCompanyByName(companies, e.target.value)
          );
        }}
        multiple={false}
        onSearch={(searchText) => {
          const regexp = new RegExp(searchText, "i");
          setOptions(
            formatCompanies(
              companies.filter((company) => company.name.match(regexp))
            )
          );
        }}
        onClose={() => {
          setOptions(formatCompanies(companies));
        }}
      />
    </Box>
  );
}

export default CompanyDropMenu;
