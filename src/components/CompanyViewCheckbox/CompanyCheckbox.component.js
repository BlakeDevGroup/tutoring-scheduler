import { useSelector, useDispatch } from "react-redux";
import { CheckBoxGroup, Box } from "grommet";
import { useEffect } from "react";
// import React, { useEffect, useState } from "react";
// import CompanyApi, {
//   prepCompanyData,
// } from "../../apis/companies/companies.api";
// import { setCompanies } from "../../apis/companies/companies.slice";

// const companyApi = new CompanyApi();

function FormatCompanies(companies) {
  let companyNames = [];

  companies.forEach((item) => {
    companyNames.push(item.name);
  });

  return companyNames;
}

export default function CompanyCheckbox() {
  const companies = useSelector((state) => state.companies.companies);

  return (
    <CheckBoxGroup
      multiple
      options={FormatCompanies(companies)}
      gap="small"
      defaultChecked={true}
    />
  );
}
