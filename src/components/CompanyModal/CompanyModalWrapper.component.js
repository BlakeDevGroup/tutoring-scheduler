import { Box, Button } from "grommet";
import { Add } from "grommet-icons";
import React from "react";
import CompanyButtonModal from "./components/CompanyModal.component";

export default function CompanyModalWrapper(props) {
  const [show, setShow] = React.useState();

  return (
    <Box>
      <Button
        primary
        label="Add company"
        alignSelf="start"
        color=""
        size="large"
        icon={<Add />}
        hoverIndicator="true"
        onClick={() => setShow(true)}
      />
      {show && (
        <CompanyButtonModal
          companies={props.companies}
          setCompanies={props.setCompanies}
          setShow={setShow}
        />
      )}
    </Box>
  );
}
