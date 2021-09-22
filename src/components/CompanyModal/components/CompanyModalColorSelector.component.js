import { Select } from "grommet";
import { CaretDownFill } from "grommet-icons";
import React from "react";
import colorOptions from "../../../data/colorOptions.json";

export default function CompanyColorSelector(props) {
  return (
    <Select
      icon={<CaretDownFill />}
      labelKey="label"
      size="medium"
      options={colorOptions}
      value={props.color}
      valueKey="color"
      placeholder="Color"
      onChange={({ option }) => {
        props.setColor(option);
      }}
      multiple={false}
    />
  );
}
