import { Box, Button, Grommet } from "grommet";
import { Add } from "grommet-icons";
import React, { useState } from "react";
import EventModal from "./components/EventModal.component";
import { useSelector, useDispatch } from "react-redux";
import { addEvent } from "../../apis/events/events.slice";

// const theme = {
//   global: {
//     colors: {
//       brand: "#81FCED",
//     },
//     font: {
//       family: "Roboto",
//       size: "18px",
//       height: "20px",
//     },
//   },
// };

export default function CreateEventWrapper(props) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const onSubmit = (eventData) => {
    dispatch(addEvent({ event: eventData }));
  };
  return (
    <Box>
      <Button
        primary
        alignSelf="start"
        label="Event"
        size="medium"
        icon={<Add />}
        margin={{ bottom: "small" }}
        hoverIndicator="true"
        onClick={() => setShow(true)}
      />
      {show && (
        <EventModal
          type="create"
          show={show}
          setShow={setShow}
          companies={props.companies}
          calendars={props.calendars}
          onSubmit={onSubmit}
        />
      )}
    </Box>
  );
}
