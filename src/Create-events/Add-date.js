import { DateInput, Grommet } from "grommet";
import React, { useState } from "react";

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

export const AddDate = (props) => {
    // const [value, setValue] = React.useState('');
    // const onChange = (event) => {
    //   const nextValue = event.value;
    //   console.log('onChange', nextValue);
    //   setValue(nextValue);
    // };
    return (
      <Grommet theme={theme}>
            <DateInput 
            size="small"
            format="m/d/yy" 
            value={props.value} 
            onChange={(e) => {props.onChange(e.value)}} />
      </Grommet>
    );
  };

export default AddDate;