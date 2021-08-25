import NavBar from "./components/NavBar.component";
import { Button, Heading } from "grommet";
import { BladesVertical } from "grommet-icons";
import CompanyModalWrapper from "../CompanyModal/CompanyModalWrapper.component";
import NavBarDropMenu from "./components/NavBarDropMenu.component";
export default function NavBarWrapper(props) {
  return (
    <NavBar>
      <Button
        icon={<BladesVertical />}
        onClick={() => props.setShowSidebar(!props.showSidebar)}
      />
      <CompanyModalWrapper
        companies={props.companies}
        setCompanies={props.setCompanies}
      />
      <Heading level="3" margin="none" align="right">
        My App
      </Heading>
      <NavBarDropMenu views={props.views} onChange={props.setCurrentView} />
    </NavBar>
  );
}
