import { Select } from "grommet";
import { CaretDownFill } from "grommet-icons";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCompanies } from "../../../apis/companies/companies.slice";
import CompanyApi, {
  prepCompanyData,
} from "../../../apis/companies/companies.api";

const companyApi = new CompanyApi();

function FormatCompanies(companies) {
  let companyNames = [];

  companies.forEach((item) => {
    companyNames.push(item.name);
  });

  return companyNames;
}

function CompanyDropMenu(props) {
  const companies = useSelector((state) => state.companies.companies);
  const dispatch = useDispatch();
  useEffect(async () => {
    const companyData = await companyApi.getAllCompanies();
    dispatch(setCompanies({ companies: prepCompanyData(companyData.data) }));
  }, []);

  return (
    <Select
      icon={<CaretDownFill />}
      size="small"
      options={FormatCompanies(companies)}
      value={props.value}
      placeholder="Select company"
      onChange={(e) => {
        props.onChange(e.target.value);
      }}
      defaultValue={FormatCompanies(companies)[0]}
      multiple={false}
    />
  );
}

export default CompanyDropMenu;
