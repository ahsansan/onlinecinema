import { Switch, Route } from "react-router-dom";
import { API, setAuthToken } from "../src/config/api";
import { useEffect, useContext } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { UserContext } from "./context/userContext";

import PrivateRoute from "./components/route/PrivateRoute";
import AdminRoute from "./components/route/AdminRoute";
import Header from "./components/header/Header";
import Home from "./pages/Home";
import DetailFilm from "./pages/DetailFilm";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import MyFilms from "./pages/MyFilms";
import AddFilm from "./pages/AddFilm";
import EditFilm from "./pages/EditFilm";
import Transactions from "./pages/Transactions";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

export default () => {
  const [, dispatch] = useContext(UserContext);
  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      let payload = response.data.data.user;
      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute exact path="/film/:id" component={DetailFilm} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <PrivateRoute exact path="/my-film" component={MyFilms} />
        <AdminRoute exact path="/add-film" component={AddFilm} />
        <AdminRoute exact path="/transactions" component={Transactions} />
        <AdminRoute exact path="/edit-film/:id" component={EditFilm} />
      </Switch>
    </>
  );
};
