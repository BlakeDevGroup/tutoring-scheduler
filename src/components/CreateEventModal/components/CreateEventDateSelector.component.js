import { Grommet, Box, Text, DateInput } from "grommet";
import AllDaySelector from "./AllDaySelector.component";
export default function CreateEventDateSelector(props) {
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
          format="yyyy/mm/dd"
          value={props.value}
          onChange={(e) => {
            props.onChange(e.value);
          }}
        />
      </Grommet>
      <AllDaySelector />
    </Box>
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
