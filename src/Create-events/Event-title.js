import { TextInput } from "grommet";
import React, { useState } from "react";

export const EventTitle = () => {
    const [value, setValue] = React.useState('');
    
    const onChange = event => setValue(event.target.value);
    
    return (
      <TextInput 
        value={value}
        onChange={onChange}
        placeholder="Add title"
     />
        
    )
  }

export default EventTitle;