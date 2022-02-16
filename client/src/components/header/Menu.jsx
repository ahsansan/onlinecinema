// Custom Css
import "../../styles/header.css";
import { NavDropdown } from "react-bootstrap";
// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faClapperboard,
  faRightFromBracket,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";

export default () => {
  return (
    <div>
      <NavDropdown
        id="nav-dropdown"
        bsPrefix="drop-down-menu"
        title={
          <img
            src={process.env.PUBLIC_URL + "/images/Ahsan.jpg"}
            className="menu-image"
            alt="profile"
          />
        }
      >
        <NavDropdown.Item className="menu-menu-container">
          <div className="menu-container">
            <FontAwesomeIcon icon={faUser} className="icon-plus" />
            <strong style={{ color: "white" }}>Profile</strong>
          </div>
        </NavDropdown.Item>
        <NavDropdown.Item className="menu-menu-container">
          <div className="menu-container">
            <FontAwesomeIcon icon={faClapperboard} className="icon-plus" />
            <strong style={{ color: "white" }}>My List Film</strong>
          </div>
        </NavDropdown.Item>

        <NavDropdown.Item className="menu-menu-container">
          <div className="menu-container">
            <FontAwesomeIcon icon={faVideo} className="icon-plus" />
            <strong style={{ color: "white" }}>Add Film</strong>
          </div>
        </NavDropdown.Item>
        <NavDropdown.Item className="menu-logout">
          <div className="menu-container">
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className="icon-logout"
            />
            <strong style={{ color: "white" }}>Logout</strong>
          </div>
        </NavDropdown.Item>
      </NavDropdown>
    </div>
  );
};
