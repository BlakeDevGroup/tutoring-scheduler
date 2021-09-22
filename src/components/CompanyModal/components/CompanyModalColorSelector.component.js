import { Select } from "grommet";
import { CaretDownFill, Paint } from "grommet-icons";
import React from "react";
import colorOptions from "../../../data/colorOptions.json";

export default function CompanyColorSelector(props) {
  return (
    <React.Fragment>
      <Select
        icon={<Paint color="#027788" />}
        labelKey="label"
        size="medium"
        options={colorOptions}
        value={props.color}
        valueKey="color"
        placeholder="Select Color"
        onChange={({ option }) => {
          props.setColor(option);
        }}
        multiple={false}
      />
    </React.Fragment>
  );
}
