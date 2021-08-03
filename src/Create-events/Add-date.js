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

export const AddDate = () => {
    const [value, setValue] = React.useState('');
    const onChange = (event) => {
      const nextValue = event.value;
      console.log('onChange', nextValue);
      setValue(nextValue);
    };
    return (
      <Grommet theme={theme}>
            <DateInput 
            size="xsmall"
            format="m/d/yy" 
            value={value} 
            onChange={onChange} />
      </Grommet>
    );
  };

export default AddDate;