import {
    Box,
    Button,
    Text,
    Layer,
    Tip,
    Menu,
  } from "grommet";
  import {
    Add,
    Money
  } from "grommet-icons";
  import EventTitle from "./Event-title";
  import AddDate from "./Add-date";
  import EventDescription from "./Event-description";
  import CompanyDropMenu from "./Company-drop-menu";
  import React, { useState } from "react";

function EventModal() {
    const [show, setShow] = React.useState();
    return (
      <Box>
        {show && (
          <Layer
          onEsc={() => setShow(false)}
          onClickOutside={() => setShow(false)}
        >   <Box height="medium" width="medium" overflow="auto">
              <Box pad="medium">
                <EventTitle />
              </Box>
              <Box pad="medium" direction="row-responsive">
                <Box>
                  <Text 
                    align="center"
                    margin={{ top: "small" }}
                  >
                    Select time:
                    </Text>
                </Box>
                <Box margin={{ left: "medium" }}>
                <Menu
                  size="small"
                  align="start"
                  label="Start time"
                  items={[
                    { label: '12:00', onClick: () => {} },
                    { label: '12:30', onClick: () => {} },
                    { label: '1:00', onClick: () => {} },
                    { label: '1:30', onClick: () => {} },
                    { label: '2:00', onClick: () => {} },
                    { label: '2:30', onClick: () => {} },
                    { label: '3:00', onClick: () => {} },
                    { label: '3:30', onClick: () => {} },
                    { label: '4:00', onClick: () => {} },
                    { label: '4:30', onClick: () => {} },
                    { label: '5:00', onClick: () => {} },
                    { label: '5:30', onClick: () => {} },
                    { label: '6:00', onClick: () => {} },
                    { label: '6:30', onClick: () => {} },
                    { label: '7:00', onClick: () => {} },
                    { label: '7:30', onClick: () => {} },
                    { label: '8:00', onClick: () => {} },
                    { label: '8:30', onClick: () => {} },
                    { label: '9:00', onClick: () => {} },
                    { label: '9:30', onClick: () => {} },
                    { label: '10:00', onClick: () => {} },
                    { label: '10:30', onClick: () => {} },
                    { label: '11:00', onClick: () => {} },
                    { label: '11:30', onClick: () => {} },
                  ]}
                />
              </Box>
              <Box>
              <Menu
                  size="small"
                  align="end"
                  label="End time"
                  items={[
                    { label: '12:00', onClick: () => {} },
                    { label: '12:30', onClick: () => {} },
                    { label: '1:00', onClick: () => {} },
                    { label: '1:30', onClick: () => {} },
                    { label: '2:00', onClick: () => {} },
                    { label: '2:30', onClick: () => {} },
                    { label: '3:00', onClick: () => {} },
                    { label: '3:30', onClick: () => {} },
                    { label: '4:00', onClick: () => {} },
                    { label: '4:30', onClick: () => {} },
                    { label: '5:00', onClick: () => {} },
                    { label: '5:30', onClick: () => {} },
                    { label: '6:00', onClick: () => {} },
                    { label: '6:30', onClick: () => {} },
                    { label: '7:00', onClick: () => {} },
                    { label: '7:30', onClick: () => {} },
                    { label: '8:00', onClick: () => {} },
                    { label: '8:30', onClick: () => {} },
                    { label: '9:00', onClick: () => {} },
                    { label: '9:30', onClick: () => {} },
                    { label: '10:00', onClick: () => {} },
                    { label: '10:30', onClick: () => {} },
                    { label: '11:00', onClick: () => {} },
                    { label: '11:30', onClick: () => {} },
                  ]}
                />
              </Box>
              </Box>
              <Box pad="medium" direction="row-responsive">
              <Text
                    size="medium" 
                    align="center"
                    margin={{ top: "xsmall", right: "medium" }}
                  >
                    Select date:
                    </Text>
                <AddDate />
              </Box>
              <Box 
                margin={{ top: "small", left: "medium", right:"medium"}} 
                height="medium"
                >
                <EventDescription />
              </Box>
              <Box margin={{ top: "xsmall", bottom: "small"}}>
                <CompanyDropMenu />
              </Box>
              <Box 
              align="start" 
              pad="small"
              margin={{left: "medium"}}
              >
              <Tip
                content={
            <Box alignContent="center" pad="xsmall" gap="small" width={{ max: 'small' }}>
              <Text weight="bold">Pay: $35/hr</Text>
              <>
              </>
            </Box>
          }
          dropProps={{ align: { left: 'right' } }}
        >
          <Button 
          margin={{top: "small"}}
          icon={<Money size="medium" />} />
        </Tip>
              </Box>
              <Button 
              color="asd"
              label="save"
              size="small"
              alignSelf="end"
              hoverIndicator="true"
              margin={{ bottom: "xsmall", right: "xsmall" }}
              />
            </Box>
            {/* <Button label="close" onClick={() => setShow(false)} /> */}
          </Layer>
        )}
      </Box>
    );
  }

  export default EventModal;