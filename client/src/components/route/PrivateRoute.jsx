import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { UserContext } from "../../context/userContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [{ isLogin }] = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
