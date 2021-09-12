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
  const [value, setValue] = React.useState("");
  console.log(value);
  return (
    <Select
      icon={<CaretDownFill />}
      labelKey="label"
      size="medium"
      options={colorOptions}
      value={value}
      placeholder="Color"
      onChange={(options) => {
        setValue(options.label);
      }}
      views={props.views}
      multiple={false}
    />
  );
}
