import { TextArea } from "grommet";
import React, { useState } from "react";


function EventDescription(props) {
    // const [value, setValue] = React.useState('');
    return (
      
      <TextArea
        fill={true}
        size="large"
        resize={false}
        placeholder="Event Description"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
      
      
    );
  }

export default EventDescription;