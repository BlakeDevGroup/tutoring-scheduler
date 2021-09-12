import { Select } from "grommet";
import { CaretDownFill } from "grommet-icons";
import React from "react";

function FormatCompanies(companies) {
  let companyNames = [];

  companies.forEach((item) => {
    companyNames.push(item.name);
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
      defaultValue={FormatCompanies(props.companies)[0]}
      multiple={false}
    />
  );
}

export default CompanyDropMenu;
