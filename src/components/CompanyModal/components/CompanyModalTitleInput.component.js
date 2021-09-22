import { TextInput, Box, Text } from "grommet";
import React from "react";
import { Organization } from "grommet-icons";

export default function CompanyModalTitleInput(props) {
  return (
    <Box margin={{ bottom: "small" }} direction="row" align="baseline">
      {/* <Text margin={{ right: "small" }}>Name:</Text>s */}
      <TextInput
        icon={<Organization color="#027788" />}
        value={props.value}
        placeholder="Company Name"
        onChange={(e) => props.onChange(e.target.value)}
        size="medium"
      />
    </Box>
  );
}
