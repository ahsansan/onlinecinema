// Custom Css
import "../../styles/header.css";
// Component
import Auth from "./Auth";
import Menu from "./Menu";

export default () => {
  return (
    <div className="header-container">
      <div className="header-logo">
        <img
          src={process.env.PUBLIC_URL + "/images/OnlineCinemaIcon.png"}
          alt="Online Cinema"
          height={55}
        />
      </div>
      <div className="header-menu">
        <Auth />
      </div>
    </div>
  );
};
