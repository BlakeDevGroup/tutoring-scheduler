import { Box, Button, Menu } from "grommet";
import { Add } from "grommet-icons";
import React, { useEffect } from "react";
import CompanyButtonModal from "./components/CompanyModal.component";
import UpdateCompanyModal from "./components/UpdateCompanyModal.component";
import CompanyApi, {
  prepCompanyData,
} from "../../apis/companies/companies.api";
import { useSelector, useDispatch } from "react-redux";
import { setCompanies } from "../../apis/companies/companies.slice";

const companyApi = new CompanyApi();

export default function CompanyModalWrapper(props) {
  const [show, setShow] = React.useState(false);
  const companies = useSelector((state) => state.companies.companies);
  const dispatch = useDispatch();

  useEffect(async () => {
    const companyData = await companyApi.getAllCompanies();
    dispatch(setCompanies({ companies: prepCompanyData(companyData.data) }));
  }, []);

  return (
    <Box>
      <Menu
        label="Companies"
        dropBackground="#027788"
        items={[
          {
            label: "Create",
            onClick: (e) => {
              setShow(e.target.innerHTML);
            },
          },
          {
            label: "Update",
            onClick: (e) => {
              setShow(e.target.innerHTML);
            },
          },
        ]}
      />
      {show == "Create" && (
        <CompanyButtonModal
          companies={companies}
          setCompanies={props.setCompanies}
          setShow={setShow}
        />
      )}
      {show == "Update" && (
        <UpdateCompanyModal companies={companies} setShow={setShow} />
      )}
    </Box>
  );
}
