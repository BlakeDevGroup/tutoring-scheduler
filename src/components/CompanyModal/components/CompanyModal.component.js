import { Layer, Box, Button } from "grommet";
import CompanyModalTitleInput from "./CompanyModalTitleInput.component";
import CompanyPay from "./CompanyModalPayInput.component";
import { useState } from "react";
import CompanyColorSelector from "./CompanyModalColorSelector.component";
import { useDispatch } from "react-redux";
import { addCompany } from "../../../apis/companies/companies.slice";

export default function CompanyButtonModal(props) {
  const [title, setTitle] = useState("");
  const [pay, setPay] = useState("");
  const [color, setColor] = useState("");
  const dispatch = useDispatch();

  return (
    <Layer
      onEsc={() => props.setShow(false)}
      onClickOutside={() => props.setShow(false)}
    >
      <Box
        margin={{
          top: "medium",
          bottom: "small",
          right: "medium",
          left: "medium",
        }}
        height="small"
        width="small"
        // overflow="auto"
      >
        <CompanyModalTitleInput onChange={setTitle} value={title} />
        <CompanyPay onChange={setPay} value={pay} />
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
              addCompany({
                name: title,
                pay: pay,
                color: color.color,
              })
            );
            props.setShow(false);
          }}
        />
      </Box>
    </Layer>
  );
}
