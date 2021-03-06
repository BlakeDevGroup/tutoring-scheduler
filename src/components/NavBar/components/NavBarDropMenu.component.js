import { Select } from "grommet";
import { CaretDownFill } from "grommet-icons";
import React from "react";

function getViewName(views) {
  let viewOptions = [];

  views.forEach((item) => {
    viewOptions.push(item.view_id);
  });
  return viewOptions;
}

export default function NavBarDropMenu(props) {
  function getViewObject(view_id) {
    for (let i = 0; i < props.views.length; i++) {
      if (props.views[i].view_id == view_id) {
        // set value == view_id used for dropdown title
        setValue(props.views[i].view_id);

        // set initialView == center used for calendar layout
        props.onChange(props.views[i].center);
        return;
      }
    }
  }
  const [value, setValue] = React.useState("Month");
  return (
    <Select
      // margin={{ right: "medium" }}
      icon={<CaretDownFill />}
      size="small"
      options={getViewName(props.views)}
      value={value}
      placeholder="Select calendar view"
      onChange={(e) => {
        getViewObject(e.target.value);
      }}
      views={props.views}
      multiple={false}
    />
  );
}
