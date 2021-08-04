import {
    Box,
    Button,
    Text,
    Layer,
    Select,
    Tip,
    Menu,
    Grommet,
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
  import eventsData from "../data/events.json";

  const getEvents = () => {

    let events = []

    eventsData["events"].forEach(data => {
        
        events.push(data)
      }
    )
  };
  
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
  
  function timeArray() {
    let times = []
    for(let i = 0; i < 12; i++) {
        let time = i
        if (i == 0) time = 12
        times.push(`${time}:00am`)
        times.push(`${time}:15am`)
        times.push(`${time}:30am`)
        times.push(`${time}:45am`)
    }

    for(let i = 0; i < 12; i++) {
      let time = i
      if (i == 0) time = 12
      times.push(`${time}:00pm`)
      times.push(`${time}:15pm`)
      times.push(`${time}:30pm`)
      times.push(`${time}:45pm`)
  }

    return times
}

function CreateButton() {
    const [title, setTitle] = React.useState("");
    const [show, setShowEventModal] = React.useState();
    const [date, setDate] = React.useState();
    const [timeValueAm, setTimeValueAm] = React.useState("");
    const [timeValuePm, setTimeValuePm] = React.useState("");
    return (
      <Grommet theme={theme}>
      <Box>
        <Button 
        primary
        alignSelf="start"
        label="Create"
        color="asd"
        size="large"
        icon={<Add />}
        margin={{ left: "small", top: "small" }}
        hoverIndicator="true" 
        onClick={() => setShowEventModal(true)} />
        {show && (
          <Layer
          onEsc={() => setShowEventModal(false)}
          onClickOutside={() => setShowEventModal(false)}
        >   <Box margin={{ top: "xsmall", left: "medium", right:"medium", bottom:"xsmall"}}>
              <Box margin={{ top: "xsmall", left: "medium", right:"medium", bottom:"xsmall"}}>
                <EventTitle
                  onChange={setTitle}
                  value={title}
                />
              </Box>
              <Box margin={{ top: "xsmall", left: "medium", right:"medium", bottom:"xsmall"}} direction="row-responsive">
                <Box>
                  <Text
                    size="small" 
                    align="center"
                    margin={{ top: "small" }}
                  >
                    Time:
                    </Text>
                </Box>
                <Box margin={{ left: "medium" }}>
                <Select
                  dropHeight="small"
                  size="small"
                  align="start"
                  placeholder="Start time"
                  options={timeArray()}
                  onChange={({ option }) => setTimeValueAm(option)}
                />
              </Box>
              <Box>
              <Select
                  dropHeight="small"                 
                  size="small"
                  align="end"
                  placeholder="End time"
                  options={timeArray()}
                  onChange={({ option }) => setTimeValuePm(option)}
                />
              </Box>
              </Box>
              <Box margin={{ top: "xsmall", left: "medium", right:"medium", bottom:"xsmall"}} direction="row-responsive">
              <Text
                    size="small" 
                    align="center"
                    margin={{ top: "xsmall", right: "medium" }}
                  >
                    Date:
                    </Text>
                <AddDate
                  onChange={setDate}
                  value={date}
                
                />
              </Box>
              <Box 
                margin={{ top: "small", left: "medium", right:"medium", bottom:"small"}} 
                height="small"
                >
                <EventDescription />
              </Box>
              <Box margin={{ top: "xsmall", left: "medium", right:"medium", bottom:"xsmall"}}>
                <CompanyDropMenu />
              </Box>
              {/* <Box 
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
              </Box> */}
              <Button 
              type="submit"
              icon={<Add />}
              size="medium"
              alignSelf="center"
              hoverIndicator
              margin={{ top: "xsmall", left: "medium", right:"medium", bottom:"xsmall"}}
              />
            </Box>
            {/* <Button label="close" onClick={() => setShow(false)} /> */}
          </Layer>
        )}
      </Box>
    </Grommet>
    );
  }

  export default CreateButton;