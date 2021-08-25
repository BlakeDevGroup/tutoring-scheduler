import { Layer, Box, Button } from "grommet";
import CompanyModalTitleInput from "./CompanyModalTitleInput.component";
import CompanyPay from "./CompanyModalPayInput.component";
import { useState } from "react";

export default function CompanyButtonModal(props) {
  const [title, setTitle] = useState("");
  const [pay, setPay] = useState("");
  return (
    <Layer
      onEsc={() => props.setShow(false)}
      onClickOutside={() => props.setShow(false)}
    >
      <Box
        margin={{
          top: "small",
          bottom: "small",
          right: "medium",
          left: "medium",
        }}
        height="small"
        width="medium"
        overflow="auto"
      >
        <CompanyModalTitleInput onChange={setTitle} value={title} />
        <CompanyPay onChange={setPay} value={pay} />
        <Button
          label="save"
          size="small"
          alignSelf="center"
          hoverIndicator
          margin={{
            top: "medium",
            left: "medium",
            right: "medium",
            bottom: "medium",
          }}
          background="linear-gradient(102.77deg, #865ED6 -9.18%, #18BAB9 209.09%)"
          onClick={() => {
            const newCompanies = [
              ...props.companies,
              {
                companyName: title,
                pay: pay,
              },
            ];

            props.setCompanies(newCompanies);
            props.setShow(false);
          }}
        />
      </Box>
    </Layer>
  );
}
