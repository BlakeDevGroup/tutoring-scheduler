import { Grommet, Box, Text, DateInput } from "grommet";
import React from "react";

export default function CreateEventDateSelector(props) {
  return (
    <React.Fragment>
      <Text
        size="small"
        align="center"
        margin={{ top: "xsmall", right: "medium" }}
      >
        Date:
      </Text>
      <Grommet theme={theme}>
        <DateInput
          size="small"
          format="yyyy-mm-dd"
          value={props.value}
          onChange={(e) => {
            props.onChange(e.value);
          }}
        />
      </Grommet>
    </React.Fragment>
  );
}

const theme = {
  global: {
    colors: {
      brand: "#81FCED",
    },
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
};
