import { Select } from "grommet";
import { CaretDownFill } from "grommet-icons";
import React from "react";

const colorOptions = [
  {
    label: "Pink",
    color: "#FF68A8",
  },
  {
    label: "Light Blue",
    color: "#64CFF7",
  },
  {
    label: "Yellow",
    color: "#F7E752",
  },
  {
    label: "Purple",
    color: "#CA7CD8",
  },
  {
    label: "Dark Blue",
    color: "#3968CB",
  },
];

export default function CompanyColorSelector(props) {
  return (
    <Select
      icon={<CaretDownFill />}
      labelKey="label"
      size="medium"
      options={colorOptions}
      value={props.color}
      placeholder="Color"
      onChange={(options) => {
        props.setColor(options.label);
        props.setHexColor(options.value.color);
      }}
      multiple={false}
    />
  );
}
