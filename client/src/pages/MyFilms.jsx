import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { API } from "../config/api";
import NotFound from "../components/NotFound";
import "../styles/home.css";

export default () => {
  const [myFilm, setMyFilm] = useState([]);
  const [isError, setIsError] = useState(false);

  const router = useHistory();

  const getMyFilms = async () => {
    try {
      const resp = await API.get(`/my-list`);
      setMyFilm(resp.data.data);
    } catch (err) {
      setIsError(true);
    }
  };

  useEffect(() => {
    getMyFilms();
  }, []);

  if (isError) {
    return <NotFound />;
  }

  return (
    <Container className="mt-5">
      <h1 className="mb-4 ms-4 judul-my-film">My List Film</h1>
      <Row>
        {myFilm.map((film) => (
          <Col md={2} className="mb-6" key={film.idFilm}>
            <img
              className="my-film-list"
              onClick={() => router.push(`/film/${film.idFilm}`)}
              src={`http://localhost:5000/uploads/${film.film.tumbnail}`}
              alt={film.film.title}
              width="180px"
              height="250px"
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
