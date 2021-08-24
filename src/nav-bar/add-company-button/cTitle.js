import { TextInput } from "grommet";
import React, { useState } from "react";

export const CompanyTitle = (props) => {
    
    return (
      <TextInput
        Margin={{Top:"small"}} 
        value={props.value}
        placeholder="Company title"
        onChange={(e) => props.onChange(e.target.value)}
        placeholder="Add title"
        size="medium"
     />
        
    )
  }

export default CompanyTitle;