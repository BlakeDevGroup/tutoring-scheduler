import { TextInput } from "grommet";
import React from "react";

export default function CompanyModalTitleInput(props) {
  return (
    <TextInput
      value={props.value}
      placeholder="Title"
      onChange={(e) => props.onChange(e.target.value)}
      size="medium"
    />
  );
}
