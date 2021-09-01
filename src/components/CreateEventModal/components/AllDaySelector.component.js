import { CheckBox, Box, Layer, Select, Button } from "grommet";
import React from "react";
// import RecuringDateSelectPopup from "./RecurringDateSelectModal.component";

const Option = React.memo(({ value, selected }) => (
  <Box direction="row" gap="small" align="center" pad="xsmall">
    <CheckBox tabIndex="-1" checked={selected} onChange={() => {}} />
    {value}
  </Box>
));

const dummyOptions = Array(7)
  .fill()
  .map((_, i) => `option ${i}`)
  .sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
  );

export default function AllDaySelector(props) {
  const [allDayChecked, setAllDayChecked] = React.useState(false);
  const [recurringChecked, setRecurringChecked] = React.useState(false);
  const [show, setShow] = React.useState();
  const [value, setValue] = React.useState();
  const [selected, setSelected] = React.useState([]);
  const [options, setOptions] = React.useState(dummyOptions);
  console.log(value);
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
          <Box fill align="center" justify="start" pad="large">
            <Button margin={{bottom:"small"}} label="save" onClick={() => setShow(false)} />
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
              multiple={true}
              placeholder="select an option..."
              closeOnChange={false}
              value={value}
              onChange={({ option }) => setValue(option)}
              size="medium"
              onClose={() =>
                setOptions(
                  options.sort((p1, p2) => {
                    const p1Exists = selected.includes(p1);
                    const p2Exists = selected.includes(p2);

                    if (!p1Exists && p2Exists) {
                      return 1;
                    }
                    if (p1Exists && !p2Exists) {
                      return -1;
                    }
                    return p1.localeCompare(p2, undefined, {
                      numeric: true,
                      sensitivity: "base",
                    });
                  })
                )
              }
              onChange={({ selected: nextSelected }) => {
                setSelected(nextSelected);
              }}
            >
              {(option, index) => (
                <Option
                  value={option}
                  selected={selected.indexOf(index) !== -1}
                />
              )}
            </Select>
          </Box>
        </Layer>
      )}
    </Box>
  );
}
