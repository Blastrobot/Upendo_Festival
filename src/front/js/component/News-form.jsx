import React, { useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const AdminNewsForm = (props) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [filee, setFile] = useState();
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const { news_ID } = useParams();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const putNew = async (url) => {
    var data = new FormData()
    data.append("title", title)
    data.append("body", body)
    data.append("file", filee)
    const request = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${store.token}`,
        "Access-Cotrol-Allow-Origin": "*",
      },
      body: data
    };
    const response = await fetch(url, request);
    console.log(response)
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    putNew(
      process.env.BACKEND_URL + "/api/admin/news/" + news_ID
    );
    navigate("/admin");
  };

  return (
    <form className="mx-4" onSubmit={(e) => handleSubmit(e)}>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">Title</label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          defautvalue={props.title}
          placeholder={props.title}
          onChange={handleTitleChange}
        ></input>
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlTextarea1">Body</label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          defautvalue={props.body}
          placeholder={props.body}
          onChange={handleBodyChange}
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">Select Image</label>
        <input
          type="file"
          className="form-control"
          onChange={handleFileChange}
        ></input>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

AdminNewsForm.defaultProps = {
  title: "",
  body: "",
  imageUrl: "",
};