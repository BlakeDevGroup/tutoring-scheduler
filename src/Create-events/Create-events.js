import {
    Box,
    Button,
    Text,
    Layer,
    Select,
    Grommet,
  } from "grommet";
  import {
    Add, Zoom,
  } from "grommet-icons";
  import EventTitle from "./Event-title";
  import AddDate from "./Add-date";
  import EventDescription from "./Event-description";
  import CompanyDropMenu from "./Company-drop-menu";
  import React, { useState } from "react";
  import CalendarDropMenu from "./Calendar-drop-menu";

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

  function parseEventTime(timeString){
    let hour = timeString.substring(0,2)
    let minutes = timeString.substring(3,5)
    let timeOfDay = timeString.substring(8,10)

    if(timeOfDay == "am") {
      if(hour == "12") hour = "00:00"
    } else {
      if(hour < 12 && timeOfDay == "pm" ) {
        hour  = parseInt(hour) + 12
      }
    }
    console.log(hour, minutes, timeOfDay)
    return `${hour}:${minutes}`
  }
  //"2021-08-13T10:30"
  console.log(parseEventTime("03:45:00pm"))
  
  
  function timeArray() {
    let times = []
    for(let i = 0; i < 12; i++) {
        let time = i
        if(i == 0) {
          time = 12
          times.push(`${time}:00am`)
          times.push(`${time}:15am`)
          times.push(`${time}:30am`)
          times.push(`${time}:45am`)
        } else if (i < 10) {
          times.push(`0${time}:00am`)
          times.push(`0${time}:15am`)
          times.push(`0${time}:30am`)
          times.push(`0${time}:45am`);
        } else {
          times.push(`${time}:00am`)
          times.push(`${time}:15am`)
          times.push(`${time}:30am`)
          times.push(`${time}:45am`);
        }
      }
         
        for(let i = 0; i < 12; i++) {
          let time = i
          if(i == 0) {
            time = 12
            times.push(`${time}:00pm`)
            times.push(`${time}:15pm`)
            times.push(`${time}:30pm`)
            times.push(`${time}:45pm`)
          } else if (i < 10) {
            times.push(`0${time}:00pm`)
            times.push(`0${time}:15pm`)
            times.push(`0${time}:30pm`)
            times.push(`0${time}:45pm`);
          } else {
            times.push(`${time}:00pm`)
            times.push(`${time}:15pm`)
            times.push(`${time}:30pm`)
            times.push(`${time}:45pm`);
          }
        }

    return times
}


function CreateButton(props) {
    const [title, setTitle] = React.useState("");
    const [company, setCompany] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [show, setShowEventModal] = React.useState();
    const [date, setDate] = React.useState();
    const [timeStart, setTimeStart] = React.useState("");
    const [timeEnd, setTimeEnd] = React.useState("");
    return (
      <Grommet theme={theme}>
      <Box>
        <Button 
        primary
        alignSelf="start"
        label="Create"
        color="asxce"
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
                  onChange={({ option }) => (setTimeStart(option))}
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
                  onChange={({ option }) => setTimeEnd(option)}
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
                <Box>
                  <CompanyDropMenu
                    value={company}
                    onChange={setCompany}
                  />
                </Box>
                <Box>
                  <CalendarDropMenu 

                  />
                </Box>
              </Box>
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
                  "start":`${date.split("T")[0]}T${parseEventTime(timeStart)}`,
                  "end":`${date.split("T")[0]}T${parseEventTime(timeEnd)}`,                
                }, props.setEvents)
                setShowEventModal(false)
              }
            }
              />
            </Box>
          </Layer>
        )}
      </Box>
    </Grommet>
    );
  }

  export default CreateButton;