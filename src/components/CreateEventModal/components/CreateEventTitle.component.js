import { TextInput, Box } from "grommet";
import { ScheduleNew } from "grommet-icons";

export default function CreateEventTitle(props) {
  return (
    <Box basis="1/2">
      <TextInput
        icon={<ScheduleNew color="#027788" />}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder="Add title"
        size="small"
      />
    </Box>
  );
}
