import { useEffect, useState } from "react";
import { Alert, Container, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { API } from "../config/api";
import "../styles/addfilm.css";
import Aos from "aos";
import "aos/dist/aos.css";

export default () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const [form, setForm] = useState({
    title: "",
    tumbnail: "http://localhost:5000/uploads/prevtumb.png",
    price: "",
    description: "",
    filmUrl: "",
    idCategory: "",
  });

  const [categories, setCategories] = useState([]);

  const router = useHistory();

  const [status, setStatus] = useState({});

  const [preview, setPreview] = useState("");

  parseInt(`${form.idCategory}`);

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const getCategories = async () => {
    try {
      const resp = await API.get(`/categories`);
      setCategories(resp.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleOnSubmit = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("title", form.title);
      formData.set("tumbnail", form.tumbnail[0], form.tumbnail[0].name);
      formData.set("price", form.price);
      formData.set("description", form.description);
      formData.set("filmUrl", form.filmUrl);
      formData.set("idCategory", form.idCategory);

      const resp = await API.post("/film", formData, config);

      setStatus({
        message: "Your film is successfully added",
        error: false,
      });

      setTimeout(() => {
        router.push(`/film/${resp.data.data.id}`);
      }, 1500);
    } catch (err) {
      console.log(err);
      setStatus({
        message: "Something went wrong with the server, please try again later",
        error: true,
      });
    }
  };

  return (
    <Container className="mt-5" data-aos="fade-up">
      <h1 className="mb-4 judul-add-film">Add Film</h1>
      {status.message && (
        <Alert variant={status.error ? "danger" : "primary"}>
          {status.message}
        </Alert>
      )}
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleOnSubmit();
        }}
      >
        <div className="d-flex align-items-center">
          <div className="d-flex flex-grow-1 mr-3 flex-column">
            <input
              type="text"
              name="title"
              id="title"
              onChange={onChange}
              value={form.title}
              className="title-input-addfilm"
              placeholder="Title"
            />
          </div>
          <div>
            <label
              htmlFor="tumbnail"
              className="d-flex flex-row tombol-tumbnail"
            >
              <p style={{ marginTop: "15px" }}>Attach Tumbnail</p>
              <img
                src="/Frame1.svg"
                width={25}
                height={25}
                style={{ marginLeft: "5px" }}
              />
            </label>
            <input
              type="file"
              id="tumbnail"
              onChange={onChange}
              name="tumbnail"
              hidden
            />
          </div>
        </div>
        <div className="preview-film">
          {preview ? (
            <img src={preview} className="img-fluid rounded" width="20%" />
          ) : (
            <img
              src={form.tumbnail}
              className="img-fluid rounded"
              width="20%"
            />
          )}
        </div>
        <div>
          <select
            id="select"
            as="select"
            name="idCategory"
            className="normal-input-addfilm"
            onChange={onChange}
          >
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input
            type="number"
            name="price"
            id="price"
            onChange={onChange}
            value={form.price}
            className="normal-input-addfilm"
            placeholder="Price"
          />
        </div>
        <div>
          <input
            type="text"
            name="filmUrl"
            id="filmUrl"
            onChange={onChange}
            value={form.filmUrl}
            className="normal-input-addfilm"
            placeholder="URL Film"
          />
        </div>
        <div>
          <textarea
            name="description"
            id="description"
            className="normal-textarea-addfilm"
            onChange={onChange}
            placeholder="Description"
          ></textarea>
        </div>
        <div className="d-flex flex-row-reverse">
          <button className="btn-add-film" type="submit">
            Add Film
          </button>
        </div>
      </Form>
    </Container>
  );
};
