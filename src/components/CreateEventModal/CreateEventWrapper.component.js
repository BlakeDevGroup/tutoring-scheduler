import { Box, Button, Grommet } from "grommet";
import { AddCircle } from "grommet-icons";
import React, { useState } from "react";
import CreateEventModal from "./components/CreateEventModal.component";

const theme = {
  global: {
    colors: {
      brand: "#6FFFB0",
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
          icon={<AddCircle />}
          margin={{ left: "small", top: "small" }}
          hoverIndicator
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
            defaults={props.event}
            onSubmit={props.updateEvents}
          />
        )}
      </Box>
    </Grommet>
  );
}
