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
  import EventTitle from "../Create-events/Event-title";
  import AddDate from "../Create-events/Add-date";
  import EventDescription from "../Create-events/Event-description";
  import CompanyDropMenu from "../Create-events/Company-drop-menu";
  import React, { useState } from "react";


  function timeArray() {
    let times = []
    for(let i = 0; i < 12; i++) {
        let time = i
        if (i == 0) time = 12
        times.push({label:`${time}:00am`, onClick: () => {}})
        times.push({label:`${time}:15am`, onClick: () => {}})
        times.push({label:`${time}:30am`, onClick: () => {}})
        times.push({label:`${time}:45am`, onClick: () => {}})
    }

    for(let i = 12; i > 0; i--) {
        let time = i
        if (i == 0) time = 12
        times.push({label:`${time}:00pm`, onClick: () => {}})
        times.push({label:`${time}:15pm`, onClick: () => {}})
        times.push({label:`${time}:30pm`, onClick: () => {}})
        times.push({label:`${time}:45pm`, onClick: () => {}})
    }

    return times
}

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
                  items={timeArray()}
                />
              </Box>
              <Box>
              <Menu
                  size="small"
                  align="end"
                  label="End time"
                  items={timeArray()}
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