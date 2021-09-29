import NavBar from "./components/NavBar.component";
import { Button, Heading } from "grommet";
import { BladesVertical } from "grommet-icons";
import NavBarDropMenu from "./components/NavBarDropMenu.component";
export default function NavBarWrapper(props) {
  return (
    <NavBar>
      <Button
        icon={<BladesVertical />}
        onClick={() => props.setShowSidebar(!props.showSidebar)}
      />

      <Heading level="3" margin="none" align="right">
        Digital Tutoring
      </Heading>
      <NavBarDropMenu views={props.views} onChange={props.setCurrentView} />
    </NavBar>
  );
}
