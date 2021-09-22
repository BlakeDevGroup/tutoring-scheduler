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
const colorOptions = [
  {
    label: "Pink",
    color: "#FF68A8",
  },
  {
    label: "Light Blue",
    color: "#64CFF7",
  },
  {
    label: "Yellow",
    color: "#F7E752",
  },
  {
    label: "Purple",
    color: "#CA7CD8",
  },
  {
    label: "Dark Blue",
    color: "#3968CB",
  },
];
export default function UpdateCompanyModal(props) {
  const [name, setName] = useState("");
  const [pay, setPay] = useState("");
  const [color, setColor] = useState("");
  const [hexColor, setHexColor] = useState("");
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.companies.companies);
  const [companyIdentifier, setCompanyIdentifier] = useState("");

  const removeCompanies = () => {
    dispatch(removeCompany(props.defaults.id));
    props.setShow(false);
  };

  const getCompanyByName = (name) => {
    return companies.filter((company) => name == company.name)[0];
  };

  const getColor = (hexColor) => {
    return colorOptions.filter((color) => hexColor == color.color)[0];
  };

  useEffect(() => {
    const company = getCompanyByName(companyIdentifier);

    if (company) {
      let c = getColor(company.color);
      setName(company.name);
      setPay(company.pay);
      setColor(c.label);
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
        <CompanyModalPayInput onChange={setPay} value={pay} />
        <CompanyColorSelector
          color={color}
          setColor={setColor}
          setHexColor={setHexColor}
        />
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
            dispatch(updateCompanies);
            props.setShow(false);
          }}
        />
      </Box>
    </Layer>
  );
}
