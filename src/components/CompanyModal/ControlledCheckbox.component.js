import { CheckBox } from "grommet";
import { useState } from "react";

export default function ControlledCheckBoxComponent(props) {
  const [checked, setChecked] = useState(props.checked || false);
  const onChangeHandler = (e) => {
    if (e.target.checked) setChecked(true);
    else setChecked(false);

    props.onChange(e);
  };

  return (
    <CheckBox
      checked={checked}
      label={props.label}
      onChange={onChangeHandler}
    />
  );
}
