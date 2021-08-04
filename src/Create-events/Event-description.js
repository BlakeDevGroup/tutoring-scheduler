import { TextArea } from "grommet";
import React, { useState } from "react";


function EventDescription() {
    const [value, setValue] = React.useState('');
    return (
      <TextArea
        fill={true}
        size="large"
        resize={false}
        placeholder="Event Description"
        value={value}
        onChange={event => setValue(event.target.value)}
      />
    );
  }

export default EventDescription;