import { Layer, Box, Button } from "grommet";
import CompanyModalTitleInput from "./CompanyModalTitleInput.component";
import { useState, useEffect } from "react";
import CompanyColorSelector from "./CompanyModalColorSelector.component";
import CompanyModalPayInput from "./CompanyModalPayInput.component";
import { useDispatch, useSelector } from "react-redux";
import CompanyDropMenu from "../../CreateEventModal/components/CompanyDropMenu.component";
import {
  updateCompany,
  deleteCompany,
} from "../../../apis/companies/companies.slice";
import colorOptions from "../../../data/colorOptions.json";

export default function UpdateCompanyModal(props) {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [pay, setPay] = useState("");
  const [color, setColor] = useState("");
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.companies.companies);
  const [companyIdentifier, setCompanyIdentifier] = useState("");
  const [companyId, setCompanyId] = useState("");

  const getCompanyByName = (name) => {
    return companies.filter((company) => name == company.name)[0];
  };

  const getColor = (colorOptions, hexColor) => {
    return colorOptions.filter((color) => hexColor == color.color)[0];
  };

  useEffect(() => {
    const company = getCompanyByName(companyIdentifier);

    if (company) {
      setName(company.name);
      setPay(company.pay || "");
      setColor(getColor(colorOptions, company.color));
      setCompanyId(company.company_id);
    }
  }, [companyIdentifier]);

  return (
    <Layer
      onEsc={() => props.setShow(false)}
      onClickOutside={() => props.setShow(false)}
    >
      <Box
        margin={{
          top: "large",
          bottom: "large",
          right: "large",
          left: "large",
        }}
        height="small"
        width="small"
      >
        <CompanyDropMenu onChange={setCompanyIdentifier} />
        <CompanyModalTitleInput onChange={setName} value={name} />
        <CompanyModalPayInput onChange={setPay} value={pay} />
        <CompanyColorSelector color={color} setColor={setColor} />
        <Button
          label="save"
          size="xsmall"
          alignSelf="center"
          hoverIndicator
          margin={{
            top: "small",
            left: "small",
            right: "small",
            bottom: "small",
          }}
          background="linear-gradient(102.77deg, #865ED6 -9.18%, #18BAB9 209.09%)"
          onClick={() => {
            dispatch(
              updateCompany({
                name: name,
                pay_rate: pay,
                color: color.color,
                company_id: companyId,
              })
            );
            setCompanyIdentifier("");
            props.setShow(false);
          }}
        />
      </Box>
    </Layer>
  );
}
