import { Box, Button } from "grommet";
import ColorItem from "./ColorItem.component";
import "./CompanyColorList.css";

export default function CompanyColorList(props) {
  return <ColorItem colorData={props.colorData} />;
}
