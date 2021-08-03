import { MODULESPECIFIER_TYPES } from "@babel/types";
import { 
    Form,
    CheckBoxGroup,
    FormField,
    TextInput,
    Box,
    Button,
} from "grommet";
import React, { useState } from "react";
import Calendar from "../models/calendar";

let calendarOne = new Calendar({
    id: Math.random() * 10000 + 1,
    calendarName: "News",
  });
  
  let calendarTwo = new Calendar({
    id: Math.random() * 10000 + 1,
    calendarName: "Work",
  });



function AddViewForm(props) {
    const [calendars, setCalendars] = useState([
      calendarOne.calendarName,
      calendarTwo.calendarName,
    ]);
    const [textValue, setTextValue] = useState("");
  
    return (
      <Form
        onReset={() => setTextValue("")}
        onSubmit={(e) => {
          if (textValue == "") return;
          const calendar = new Calendar({
            id: Math.random * 10000 + 1,
            calendarName: textValue,
          });
          setCalendars([].concat(calendars, calendar.calendarName));
          setTextValue("");
        }}
      >
        <CheckBoxGroup options={calendars} gap="small" margin="medium" />
        <FormField name="name" htmlFor="text-input-id" label="Add View">
          <TextInput
            id="text-input-id"
            name="name"
            placeholder="Name your calendar"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
          />
        </FormField>
        <Box direction="row" gap="medium">
          <Button type="submit" primary label="Submit" />
          <Button type="reset" label="Reset" />
        </Box>
      </Form>
    );
  }

  export default AddViewForm;