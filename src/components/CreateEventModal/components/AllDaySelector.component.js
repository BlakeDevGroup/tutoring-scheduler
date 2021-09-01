import { CheckBox, Box } from "grommet";
import React from "react";

export default function AllDaySelector() {
  const [allDayChecked, setAllDayChecked] = React.useState(true);
  const [recurringChecked, setrecurringChecked] = React.useState(true);
  return (
    <Box
      margin={{
        top: "xsmall",
        left: "medium",
        right: "medium",
        bottom: "xsmall",
      }}
      direction="row-responsive"
    >
      <CheckBox
        checked={allDayChecked}
        label="all day"
        onChange={(event) => setAllDayChecked(event.target.checked)}
        pad="small"
      />

      <CheckBox
        checked={recurringChecked}
        label="recurring"
        onChange={(event) => setrecurringChecked(event.target.checked)}
      />
    </Box>
  );
}
