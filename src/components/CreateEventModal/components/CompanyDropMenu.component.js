import { Select } from "grommet";
import { CaretDownFill } from "grommet-icons";
import React from "react";

function FormatCompanies(companies) {
  let companyNames = [];

  companies.forEach((item) => {
    companyNames.push(item.companyName);
  });

  return companyNames;
}

function CompanyDropMenu(props) {
  return (
    <Select
      icon={<CaretDownFill />}
      size="small"
      options={FormatCompanies(props.companies)}
      value={props.value}
      placeholder="Select company"
      onChange={(e) => {
        props.onChange(e.target.value);
      }}
      multiple={false}
    />
  );
}

export default CompanyDropMenu;
