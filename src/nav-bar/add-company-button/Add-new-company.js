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
  import CompanyDropMenu from "../../Create-events/Company-drop-menu";

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
           <Box margin={{ top: "xsmall", bottom: "small"}}>
                <CompanyDropMenu />
              </Box>
          <Box height="xsmall" width="xsmall" overflow="auto">

          </Box>
        </Layer>
        )}
      </Box>
    );
  }

export default CompanyButton