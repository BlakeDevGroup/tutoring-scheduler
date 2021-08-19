import { Select } from "grommet";
import { CaretDownFill } from "grommet-icons";
import React, { useState } from "react";


function NavDropMenu(props) {
    const [value, setValue] = React.useState("medium");
    return (
      <Select
        margin={{ right: "medium" }}
        icon={<CaretDownFill />}
        size="xsmall"
        options={["Day", "Week", "Month", "Year"]}
        value={value}
        placeholder="Select calendar view"
        onChange={({ option }) => setValue(option)}
      />
    );
  }

export default NavDropMenu;