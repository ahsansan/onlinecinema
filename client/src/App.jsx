import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Header from "./components/header/Header";
import ListFilm from "./components/ListFilm";

export default () => {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" exact element={<ListFilm />} />
        {/* <PrivateRoute exact path="/film/:id" component={DetailFilm} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/my-film" component={MyFilm} />
        <AdminRoute exact path="/add-film" component={AddFilm} />
        <AdminRoute exact path="/transactions" component={Transactions} />
        <AdminRoute exact path="/edit-film/:id" component={EditFilm} /> */}
      </Routes>
    </>
  );
};
