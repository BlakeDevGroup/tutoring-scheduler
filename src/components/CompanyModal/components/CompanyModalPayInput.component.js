import { TextInput } from "grommet";
import React from "react";

export default function CompanyModalPayInput(props) {
  console.log(props.value);
  return (
    <TextInput
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
