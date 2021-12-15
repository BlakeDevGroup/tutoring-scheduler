import { DropButton } from "grommet";
import React from "react";
import { Paint } from "grommet-icons";
import colorData from "../../../data/colorOptions.json";
import CompanyColorList from "./CompanyColorList.component";

export default function CompanyColorSelector(props) {
  return (
    <DropButton
      plain={false}
      color="#027788"
      dropContent={<CompanyColorList colorData={colorData} />}
      // dropProps={colorData}
      icon={<Paint color="#027788" />}
    ></DropButton>
  );
}
