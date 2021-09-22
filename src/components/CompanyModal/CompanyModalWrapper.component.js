import { Box, Button } from "grommet";
import { Add } from "grommet-icons";
import React, { useEffect } from "react";
import CompanyButtonModal from "./components/CompanyModal.component";
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
      <Button
        primary
        label="Add company"
        alignSelf="start"
        color=""
        size="large"
        icon={<Add />}
        hoverIndicator
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
