import { Box, CheckBox, Grommet } from "grommet";
import { Cloud, FormCheckmark } from "grommet-icons";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCompanies } from "../../../apis/companies/companies.slice";
import CompanyApi, {
  prepCompanyData,
} from "../../../apis/companies/companies.api";
import { grommet } from "grommet/themes";
import { normalizeColor, deepMerge } from "grommet/utils";

const companyApi = new CompanyApi();

const customCheckBoxTheme = (color) => {
  return {
    global: {
      colors: {
        focus: color,
        selected: color,
      },
      active: {
        background: { color: "#f2f2f2" },
        color: "red",
      },
    },
    checkBox: {
      font: {
        family: "Dosis",
        size: "22px",
        height: "20px",
      },
      border: {
        color: {
          light: color,
        },
        // width: 'xsmall',
        radius: "2px",
      },

      check: {
        extend: ({ theme, checked }) => `
            ${checked && `background-color: ${color}; border:none;`}
            `,
      },

      gap: "small",
      hover: {
        border: {
          color: color,
        },
      },
      icon: {
        size: "18px",
        extend: "stroke: white;",
      },
      icons: {
        checked: FormCheckmark,
      },
      size: "18px",
    },
    extend: `background-color: #f2f2f2`,
  };
};

export default function CompanyCheckBoxList(props) {
  const companies = useSelector((state) => state.companies.companies);
  const dispatch = useDispatch();
  const listItems = companies.map((company) => (
    <CheckBox name={company.name} />
  ));
  useEffect(async () => {
    const companyData = await companyApi.getAllCompanies();
    dispatch(setCompanies({ companies: prepCompanyData(companyData.data) }));
  }, []);
  console.log(companies);
  //   const checkBoxItems = companies.map((company) => (

  //   ));

  return (
    <Box pad={{ bottom: "small" }}>
      {companies.map((company) => (
        <Grommet
          background="#f2f2f2"
          theme={deepMerge(grommet, customCheckBoxTheme(company.color))}
        >
          <CheckBox label={company.name} />
        </Grommet>
      ))}
    </Box>
  );
}
