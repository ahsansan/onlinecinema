// Custom Css
import "../../styles/header.css";
import { useContext } from "react";
import { NavDropdown } from "react-bootstrap";
// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faClapperboard,
  faRightFromBracket,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";

import { UserContext } from "../../context/userContext";

export default () => {
  const [state, dispatch] = useContext(UserContext);

  const role = state.user.role;

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  console.log(state);
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
        {role == "admin" ? (
          <div>
            <NavDropdown.Item className="menu-menu-container">
              <div className="menu-container">
                <FontAwesomeIcon icon={faVideo} className="icon-plus" />
                <strong style={{ color: "white" }}>Add Film</strong>
              </div>
            </NavDropdown.Item>
          </div>
        ) : (
          <div>
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
          </div>
        )}

        <NavDropdown.Item className="menu-logout" onClick={handleLogout}>
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
