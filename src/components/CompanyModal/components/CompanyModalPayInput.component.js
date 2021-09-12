import { TextInput } from "grommet";
import React from "react";

export default function CompanyModalPayInput(props) {
  return (
    <TextInput
      value={props.value}
      placeholder="Pay"
      onChange={(e) => props.onChange(e.target.value)}
      size="medium"
    />
  );
}
