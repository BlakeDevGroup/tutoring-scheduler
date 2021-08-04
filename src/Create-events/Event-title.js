import { TextInput } from "grommet";
import React, { useState } from "react";

export const EventTitle = (props) => {
    
    return (
      <TextInput
        Margin={{Top:"small"}} 
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder="Add title"
        size="large"
     />
        
    )
  }

export default EventTitle;