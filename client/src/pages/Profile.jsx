import { useContext, useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { API } from "../config/api";
import { convertToRupiah } from "../components/utils/rupiah";
import NotFound from "../components/NotFound";
import { UserContext } from "../context/userContext";
import "../styles/profile.css";

export default () => {
  const path = "http://localhost:5000/uploads/";
  const [profile, setProfile] = useState({});
  const [isError, setIsError] = useState(false);
  const [trans, setTrans] = useState([]);

  const [{ user }] = useContext(UserContext);

  const idUser = user.id;

  const getUser = async () => {
    try {
      const resp = await API.get(`/user/${idUser}`);
      setProfile(resp.data.data.user);
    } catch (err) {
      setIsError(true);
    }
  };

  const getTrans = async () => {
    try {
      const resp = await API.get(`/user/${idUser}`);
      setTrans(resp.data.data.user.transaction);
    } catch (err) {
      setIsError(true);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getTrans();
  }, []);

  if (isError) {
    return <NotFound />;
  }

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-item-center">
        <div>
          <h1 className="mb-4 my-profile">My Profile</h1>
          <div className="d-flex justify-content-between align-item-center">
            <img
              src={path + `${profile.image}`}
              alt="profile-pic"
              className="image-profile"
              width="180px"
              height="221.79px"
            />
            <div className="d-flex flex-column ml-4 justify-content-between">
              <div>
                <h5 className="judul-title">Full Name</h5>
                <p className="isi-profile">{profile.fullName}</p>
              </div>
              <div>
                <h5 className="judul-title">Email</h5>
                <p className="isi-profile">{profile.email}</p>
              </div>
              <div>
                <h5 className="judul-title">Phone</h5>
                <p className="isi-profile">{profile.phone || "-"}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1 className="mb-4 my-profile">History Transaction</h1>
          {trans.map((film) => (
            <Card
              key={film.idFilm}
              style={{
                width: "419px",
                height: "auto",
                marginBottom: "1rem",
                backgroundColor: "#CD2E7170",
              }}
            >
              <Card.Body className="card-profile">
                <div className="d-flex flex-column justify-content-between">
                  <b className="judul-film-order">{film.film.title}</b>
                  <i className="tanggal-order-film">{film.createdAt}</i>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="profile-harga-film">
                      Total: {convertToRupiah(film.film.price)}
                    </div>
                    <div className="alert-container">
                      <div
                        className={
                          film.status === "Approve"
                            ? "profile-status-film"
                            : "profile-status-pending"
                        }
                      >
                        {film.status === "Approve" ? "Finished" : "Pending"}
                      </div>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
};
