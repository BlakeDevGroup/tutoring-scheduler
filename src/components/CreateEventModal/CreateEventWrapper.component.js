import { Box, Button, Grommet } from "grommet";
import { Add } from "grommet-icons";
import React, { useState } from "react";
import CreateEventModal from "./components/CreateEventModal.component";

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

export default function CreateEventWrapper(props) {
  const [show, setShow] = useState(false);
  return (
    <Grommet theme={theme}>
      <Box>
        <Button
          primary
          alignSelf="start"
          label="Create"
          size="large"
          icon={<Add />}
          margin={{ left: "small", top: "small" }}
          hoverIndicator="true"
          onClick={() => setShow(true)}
        />
        {show && (
          <CreateEventModal
            show={show}
            setShow={setShow}
            companies={props.companies}
            calendars={props.calendars}
            setEvents={props.setEvents}
            events={props.events}
          />
        )}
      </Box>
    </Grommet>
  );
}
