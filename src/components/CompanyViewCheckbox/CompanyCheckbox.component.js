import { useSelector } from "react-redux";
import { CheckBoxGroup } from "grommet";

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
