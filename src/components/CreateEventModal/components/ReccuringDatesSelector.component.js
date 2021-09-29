import {
  CheckBox,
  Box,
  Layer,
  Select,
  Button,
  DateInput,
  Text,
  Drop,
} from "grommet";
import React, { useRef } from "react";
// import momentPlugin from "@fullcalendar/moment";
// import RecuringDateSelectPopup from "./RecurringDateSelectModal.component";

// function getOptions() {
//   const newOptions = [];

//   const weekday = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];
//   weekday.forEach((day) => newOptions.push(day));

//   return newOptions;
// }

const Option = React.memo(({ value, selected }) => (
  <Box direction="row" gap="small" align="center" pad="xsmall">
    <CheckBox tabIndex="-1" checked={selected} onChange={() => {}} />
    {value}
  </Box>
));

const options = [
  { label: "Sunday", value: 0 },
  { label: "Monday", value: 1 },
  { label: "Tuesday", value: 2 },
  { label: "Wednesday", value: 3 },
  { label: "Thursday", value: 4 },
  { label: "Friday", value: 5 },
  { label: "Saturday", value: 6 },
];

export default function RecurringDatesSelector(props) {
  const [recurringChecked, setRecurringChecked] = React.useState(false);
  const [show, setShow] = React.useState(false);
  // const [selected, setSelected] = React.useState([]);
  const targetRef = useRef();

  return (
    <Box
      margin={{
        top: "xsmall",
        left: "medium",
        right: "medium",
        bottom: "xsmall",
      }}
      direction="row-responsive"
      ref={targetRef}
      onClick={() => {
        setShow(true);
      }}
    >
      <CheckBox
        checked={props.daysOfWeek.length > 0 ? true : false}
        label="recurring"
      />
      {show && (
        <Drop
          align={{ top: "bottom", left: "right" }}
          target={targetRef.current}
          elevation="medium"
          onClickOutside={() => setShow(false)}
          onEsc={() => setShow(false)}
        >
          <Box fill align="center" justify="between" pad="small">
            <Box
              margin={{
                top: "xsmall",
                left: "medium",
                right: "medium",
                bottom: "xsmall",
              }}
              direction="row-responsive"
              justify="between"
            >
              <Box>
                <Text>Start Date</Text>
                <DateInput
                  size="small"
                  format="yyyy-mm-dd"
                  value={props.dateStart}
                  onChange={(e) => props.setDateStart(e.value)}
                />
              </Box>
              <Box>
                <Text>End Date</Text>
                <DateInput
                  size="small"
                  format="yyyy-mm-dd"
                  value={props.dateEnd}
                  onChange={(e) => props.setDateEnd(e.value)}
                />
              </Box>
            </Box>
            <Select
              multiple
              closeOnChange={false}
              labelKey="label"
              placeholder="select an option..."
              selected={props.daysOfweek}
              options={options}
              dropHeight="medium"
              onChange={({ selected: nextSelected }) => {
                props.setDaysOfWeek(nextSelected);
              }}
            >
              {(option, index) => (
                <Option
                  value={option.label}
                  selected={props.daysOfWeek.indexOf(index) !== -1}
                />
              )}
            </Select>
          </Box>
        </Drop>
      )}
    </Box>
  );
}
