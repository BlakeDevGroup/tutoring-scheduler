import {
    Box,
    Button,
    Layer,
    Grommet,
  } from "grommet";
  import {
    Add,
  } from "grommet-icons";
  import React, { useState } from "react";

  function CompanyButton() {
    const [show, setShow] = React.useState();
    return (
      <Box>
        <Button 
        primary
        alignSelf="start"
        color=""
        size="large"
        icon={<Add />}
        hoverIndicator="true" 
        onClick={() => setShow(true)} />
        {show && (
        <Layer
          onEsc={() => setShow(false)}
          onClickOutside={() => setShow(false)}
          >   
          <Box height="medium" width="medium" overflow="auto">

          </Box>
        </Layer>
        )}
      </Box>
    );
  }

export default CompanyButton