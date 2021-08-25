import { TextInput } from "grommet";
import React from "react";

export default function CompanyModalPayInput(props) {
  return (
    <TextInput
      Margin={{ Top: "small" }}
      value={props.value}
      placeholder="Company title"
      onChange={(e) => props.onChange(e.target.value)}
      size="medium"
    />
  );
}
