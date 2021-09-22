import { Grommet, Box, Text, DateInput } from "grommet";
import { Calendar } from "grommet-icons";
import React from "react";

export default function CreateEventDateSelector(props) {
  return (
    <Box
      direction="row-responsive"
      margin={{
        top: "xsmall",
        left: "medium",
        right: "medium",
        bottom: "xsmall",
      }}
    >
      <Box justify="center" pad={{ right: "small" }}>
        <Text size="small">Date:</Text>
      </Box>
      <Grommet theme={theme}>
        <DateInput
          inputProps={{ icon: <Calendar color="#027788" /> }}
          size="small"
          format="yyyy-mm-dd"
          value={props.value}
          onChange={(e) => {
            props.onChange(e.value);
          }}
        />
      </Grommet>
    </Box>
  );
}

const theme = {
  global: {
    font: {
      family: "Dosis",
      size: "18px",
      height: "20px",
    },
  },
};
