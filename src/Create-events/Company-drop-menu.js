import { Select } from "grommet";
import { CaretDownFill } from "grommet-icons";
import React, { useState } from "react";
import companyData from "../data/companies.json";

const getCompanies = () => {

  let companies = []

  companyData["companies"].forEach(data => {
      
      companies.push(data["companyName"])
  });
  console.log(companies)
  return companies
}


function CompanyDropMenu(props) {
    const [value, setValue] = React.useState("medium");
    const [company, setsetCompanies] = useState(getCompanies())

    return (
      <Select
        // margin={{ right: "large", left: "large"}}
        icon={<CaretDownFill />}
        size="small"
        options={company}
        value={props.value}
        placeholder="Select company"
        onChange={(e) => props.onChange(e.target.value)}
        multiple={false}
      />
    );
  }

export default CompanyDropMenu;