import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { UserContext } from "../../context/userContext";

const AdminRoute = ({ component: Component, ...rest }) => {
  const [{ isLogin, user }] = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin && user.role === "admin" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default AdminRoute;
