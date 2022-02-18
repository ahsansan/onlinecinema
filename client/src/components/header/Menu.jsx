// Custom Css
import "../../styles/header.css";
import { useContext } from "react";
import { NavDropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { UserContext } from "../../context/userContext";

export default () => {
  const [state, dispatch] = useContext(UserContext);

  const router = useHistory();

  const goTo = (path) => {
    router.push(path);
  };

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
                  src={"http://localhost:5000/uploads/addfilm.png"}
                  className="icon-plus"
                />
                <strong style={{ color: "white" }}>Add Film</strong>
              </div>
            </NavDropdown.Item>
          </div>
        ) : (
          <div>
            <NavDropdown.Item
              className="menu-menu-container"
              onClick={() => goTo("/profile")}
            >
              <div className="d-flex flex-row menu-container">
                <img
                  src={"http://localhost:5000/uploads/user.png"}
                  className="icon-plus"
                />
                <strong style={{ color: "white" }}>Profile</strong>
              </div>
            </NavDropdown.Item>
            <NavDropdown.Item
              className="menu-menu-container"
              onClick={() => goTo("/myfilm")}
            >
              <div className="d-flex flex-row menu-container">
                <img
                  src={"http://localhost:5000/uploads/clapperboard.png"}
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
              src={"http://localhost:5000/uploads/logout.png"}
              className="icon-plus"
            />
            <strong style={{ color: "white" }}>Logout</strong>
          </div>
        </NavDropdown.Item>
      </NavDropdown>
    </div>
  );
};
