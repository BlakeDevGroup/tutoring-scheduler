import { Select } from "grommet";
import { CaretDownFill } from "grommet-icons";
import React, { useState } from "react";


function CompanyDropMenu(props) {
    const [value, setValue] = React.useState("medium");
    return (
      <Select
        // margin={{ right: "large", left: "large"}}
        icon={<CaretDownFill />}
        size="small"
        options={["Comp1", "Comp2", "Comp3", "Comp4"]}
        value={props.value}
        placeholder="Select a company"
        onChange={(e) => props.onChange(e.target.value)}
      />
    );
  }

export default CompanyDropMenu;