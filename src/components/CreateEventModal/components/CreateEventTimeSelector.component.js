import { Box, Text, Select } from "grommet";

export default function CreateEventTimeSelector(props) {
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
      <Box>
        <Text size="small" align="center" margin={{ top: "small" }}>
          Time:
        </Text>
      </Box>
      <Box margin={{ left: "medium" }}>
        <Select
          multiple={false}
          dropHeight="small"
          size="small"
          align="start"
          placeholder="Start time"
          options={timeArray()}
          onChange={({ option }) => props.setTimeStart(option)}
        />
      </Box>
      <Box>
        <Select
          multiple={false}
          dropHeight="small"
          size="small"
          align="end"
          placeholder="End time"
          options={timeArray()}
          onChange={({ option }) => props.setTimeEnd(option)}
        />
      </Box>
    </Box>
  );
}

function timeArray() {
  let times = [];
  for (let i = 0; i < 12; i++) {
    let time = i;
    if (i === 0) {
      time = 12;
      times.push(`${time}:00am`);
      times.push(`${time}:15am`);
      times.push(`${time}:30am`);
      times.push(`${time}:45am`);
    } else if (i < 10) {
      times.push(`0${time}:00am`);
      times.push(`0${time}:15am`);
      times.push(`0${time}:30am`);
      times.push(`0${time}:45am`);
    } else {
      times.push(`${time}:00am`);
      times.push(`${time}:15am`);
      times.push(`${time}:30am`);
      times.push(`${time}:45am`);
    }
  }

  for (let i = 0; i < 12; i++) {
    let time = i;
    if (i === 0) {
      time = 12;
      times.push(`${time}:00pm`);
      times.push(`${time}:15pm`);
      times.push(`${time}:30pm`);
      times.push(`${time}:45pm`);
    } else if (i < 10) {
      times.push(`0${time}:00pm`);
      times.push(`0${time}:15pm`);
      times.push(`0${time}:30pm`);
      times.push(`0${time}:45pm`);
    } else {
      times.push(`${time}:00pm`);
      times.push(`${time}:15pm`);
      times.push(`${time}:30pm`);
      times.push(`${time}:45pm`);
    }
  }

  return times;
}
