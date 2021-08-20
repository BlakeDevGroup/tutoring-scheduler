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
  import Companies from "../../models/companies";
  import CompanyDropMenu from "../../Create-events/Company-drop-menu";

  function CompanyButton() {
    const [show, setShow] = React.useState();
    const [company, setCompany] = React.useState();
    return (
      <Box>
        <Button 
        primary
        label="Add company"
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
           <Box margin={{ top: "small", bottom: "small", right: "medium", left: "medium"}}>
                <CompanyDropMenu 
                  onChange = {setCompany}
                  value={company}
                
                />
              </Box>
          <Box height="small" width="small" overflow="auto">

          </Box>
        </Layer>
        )}
      </Box>
    );
  }

export default CompanyButton