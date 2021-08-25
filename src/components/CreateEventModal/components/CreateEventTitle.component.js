import { TextInput, Box } from "grommet";

export default function CreateEventTitle(props) {
  return (
    <Box
      margin={{
        top: "xsmall",
        left: "medium",
        right: "medium",
        bottom: "xsmall",
      }}
    >
      <TextInput
        Margin={{ Top: "small" }}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder="Add title"
        size="large"
      />
    </Box>
  );
}
