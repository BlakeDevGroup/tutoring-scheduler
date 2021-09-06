import { Box, Button, Grommet } from "grommet";
import { Add } from "grommet-icons";
import React, { useState } from "react";
import CreateEventModal from "./components/CreateEventModal.component";
import { useSelector, useDispatch } from "react-redux";
import { addEvent } from "../../apis/events/events.slice";

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
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const onSubmit = (eventData) => {
    dispatch(addEvent({ event: eventData }));
  };
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
            onSubmit={onSubmit}
          />
        )}
      </Box>
    </Grommet>
  );
}
