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
  import Events from "../models/events";

  export const setNewEvents = (events, newEvent, setEvents) => {

    const newEvents = [].concat(events, [newEvent])
    
    console.log(newEvents)

    setEvents(newEvents)
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
    for(let i = 0; i < 25; i++) {
        let time = i
        if (i < 10) {
        times.push(`0${time}:00`)
        times.push(`0${time}:15`)
        times.push(`0${time}:30`)
        times.push(`0${time}:45`);

        } else if (i > 9 && i != 24) {
        times.push(`${time}:00`)
        times.push(`${time}:15`)
        times.push(`${time}:30`)
        times.push(`${time}:45`);
        } else if (i == 24) {
        times.push(`${time}:00`);
        }
    }

    return times
}

// function timeArrayPm() {
//   let times = []
//   for(let i = 13; i < 24; i++) {
//       let time = i
//       if (i == 0) time = 12
//       times.push(`${time}:00`)
//       times.push(`${time}:15`)
//       times.push(`${time}:30`)
//       times.push(`${time}:45`)
//   }

//   return times
// }

function CreateButton(props) {
    const [title, setTitle] = React.useState("");
    const [company, setCompany] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [show, setShowEventModal] = React.useState();
    const [date, setDate] = React.useState();
    const [timeAm, setTimeValueAm] = React.useState("");
    const [timePm, setTimeValuePm] = React.useState("");
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
                  multiple={false}
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
                  multiple={false}
                  dropHeight="small"                 
                  size="small"
                  messages="hello"
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
                <EventDescription 
                onChange={setDescription}
                value={description}
                />
              </Box>
              <Box margin={{ top: "xsmall", left: "medium", right:"medium", bottom:"xsmall"}}>
                <CompanyDropMenu
                  value={company}
                  onChange={setCompany}
                
                />
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
              onClick={() => {
                setNewEvents(props.events, {
                  "id":"3",
                  "title":title,
                  "start":`${date.split("T")[0]}T${timeAm}:00`,
                  "end":`${date.split("T")[0]}T${timePm}:00`,                
                }, props.setEvents)
                setShowEventModal(false)
              }
            }
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