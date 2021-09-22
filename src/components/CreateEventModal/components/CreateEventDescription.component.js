import { TextArea, Box } from "grommet";
import { TextAlignFull } from "grommet-icons";
import React from "react";

export default function CreateEventDescription(props) {
  return (
    <Box
      margin={{
        top: "small",
        left: "medium",
        right: "medium",
        bottom: "small",
      }}
      height="small"
    >
      <TextArea
        fill={true}
        size="large"
        resize={false}
        placeholder="Event Description"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </Box>
  );
}
