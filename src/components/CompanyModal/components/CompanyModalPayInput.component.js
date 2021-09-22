import { TextInput } from "grommet";
import React from "react";
import { Currency } from "grommet-icons";

export default function CompanyModalPayInput(props) {
  console.log(props.value);
  return (
    <TextInput
      icon={<Currency color="#027788" />}
      value={props.value}
      placeholder="Pay"
      onChange={(e) => {
        console.log(e.target.value);
        props.onChange(e.target.value);
      }}
      size="medium"
    />
  );
}
