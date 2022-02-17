// Custom Css
import "../../styles/header.css";
import { useContext } from "react";
import { NavDropdown } from "react-bootstrap";

import { UserContext } from "../../context/userContext";

export default () => {
  const [state, dispatch] = useContext(UserContext);

  const role = state.user.role;

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <div>
      <NavDropdown
        id="nav-dropdown"
        bsPrefix="drop-down-menu"
        title={
          <img
            src={`${state.user.image}`}
            className="menu-image"
            alt="profile"
          />
        }
      >
        {role == "admin" ? (
          <div>
            <NavDropdown.Item className="menu-menu-container">
              <div className="d-flex flex-row menu-container">
                <img
                  src={process.env.PUBLIC_URL + "images/addfilm.png"}
                  className="icon-plus"
                />
                <strong style={{ color: "white" }}>Add Film</strong>
              </div>
            </NavDropdown.Item>
          </div>
        ) : (
          <div>
            <NavDropdown.Item className="menu-menu-container">
              <div className="d-flex flex-row menu-container">
                <img
                  src={process.env.PUBLIC_URL + "images/user.png"}
                  className="icon-plus"
                />
                <strong style={{ color: "white" }}>Profile</strong>
              </div>
            </NavDropdown.Item>
            <NavDropdown.Item className="menu-menu-container">
              <div className="d-flex flex-row menu-container">
                <img
                  src={process.env.PUBLIC_URL + "images/clapperboard.png"}
                  className="icon-plus"
                />
                <strong style={{ color: "white" }}>My List Film</strong>
              </div>
            </NavDropdown.Item>
          </div>
        )}

        <NavDropdown.Item className="menu-logout" onClick={handleLogout}>
          <div className="d-flex flex-row menu-container">
            <img
              src={process.env.PUBLIC_URL + "images/logout.png"}
              className="icon-plus"
            />
            <strong style={{ color: "white" }}>Logout</strong>
          </div>
        </NavDropdown.Item>
      </NavDropdown>
    </div>
  );
};
