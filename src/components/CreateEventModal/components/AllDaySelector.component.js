import { CheckBox, Box, Layer, Select } from "grommet";
import React from "react";
// import RecuringDateSelectPopup from "./RecurringDateSelectModal.component";

export default function AllDaySelector(props) {
  const [allDayChecked, setAllDayChecked] = React.useState(false);
  const [recurringChecked, setrecurringChecked] = React.useState(false);
  const [show, setShow] = React.useState();
  const [value, setValue] = React.useState();
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
        onChange={() => setShow(true)}
      />
      {show && (
        <Layer
          onEsc={() => setShow(false)}
          onClickOutside={() => setShow(false)}
        >
          <Box
            margin={{
              top: "large",
              left: "large",
              right: "large",
              bottom: "large",
            }}
          >
            <Select
              options={[
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ]}
              value={value}
              onChange={() => setShow(false)}
            />
          </Box>
        </Layer>
      )}
    </Box>
  );
}
