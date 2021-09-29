import { TextInput } from "grommet";
import React from "react";
import { Currency } from "grommet-icons";

export default function CompanyModalPayInput(props) {
  return (
    <TextInput
      icon={<Currency color="#027788" />}
      value={props.value}
      placeholder="Pay: e.g. 25.00"
      onChange={(e) => {
        props.onChange(e.target.value);
      }}
      size="medium"
    />
  );
}
