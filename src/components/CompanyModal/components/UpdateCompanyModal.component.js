import { Layer, Box, Button } from "grommet";
import CompanyModalTitleInput from "./CompanyModalTitleInput.component";
import { useState, useEffect } from "react";
import CompanyColorSelector from "./CompanyModalColorSelector.component";
import CompanyModalPayInput from "./CompanyModalPayInput.component";
import { useDispatch } from "react-redux";
import CompanyDropMenu from "../../CreateEventModal/components/CompanyDropMenu.component";
import { Checkmark, Close } from "grommet-icons";
import {
  updateCompany,
  removeCompany,
} from "../../../apis/companies/companies.slice";
import colorOptions from "../../../data/colorOptions.json";

export default function UpdateCompanyModal(props) {
  const [name, setName] = useState("");
  const [pay, setPay] = useState("");
  const [color, setColor] = useState("");
  const dispatch = useDispatch();
  const [company, setCompany] = useState("");
  const [companyId, setCompanyId] = useState("");

  const removeCompanies = () => {
    dispatch(removeCompany(company.company_id));
    props.setShow(false);
  };

  const getColor = (colorOptions, hexColor) => {
    return colorOptions.filter((color) => hexColor == color.color)[0];
  };

  useEffect(() => {
    setName(company.name);
    setPay(company.pay || "");
    setColor(getColor(colorOptions, company.color));
    setCompanyId(company.company_id);
  }, [company]);

  return (
    <Layer
      onEsc={() => props.setShow(false)}
      onClickOutside={() => props.setShow(false)}
    >
      <Box
        margin={{
          top: "medium",
          bottom: "xsmall",
          right: "medium",
          left: "medium",
        }}
      >
        <CompanyDropMenu onChange={setCompany} value={company.name} />
        <CompanyModalTitleInput onChange={setName} value={name} />
        <Box justify="center" direction="row-responsive" gap="xsmall">
          <CompanyModalPayInput onChange={setPay} value={pay} />
          <CompanyColorSelector color={color} setColor={setColor} />
        </Box>
        <Box justify="center" direction="row-responsive" margin="small">
          <Button
            label="Update"
            size="small"
            alignSelf="center"
            hoverIndicator
            icon={<Checkmark />}
            margin={{
              top: "small",
              left: "small",
              right: "small",
              bottom: "small",
            }}
            disabled={company == ""}
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
              setCompany("");
              props.setShow(false);
            }}
          />
          <Button
            label="Delete"
            size="small"
            alignSelf="center"
            color="red"
            hoverIndicator
            icon={<Close />}
            disabled={company == ""}
            margin={{
              top: "small",
              left: "small",
              right: "small",
              bottom: "small",
            }}
            onClick={removeCompanies}
          />
        </Box>
      </Box>
    </Layer>
  );
}
