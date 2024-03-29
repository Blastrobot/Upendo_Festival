import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const AdminNewsCreatePanel = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [filee, setFile] = useState(null);
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const postNew = async (url) => {
    var data = new FormData();
    data.append("title", title);
    data.append("body", body);
    data.append("file", filee);
    const request = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${store.token}`,
        "Access-Cotrol-Allow-Origin": "*",
      },
      body: data,
    };
    const response = await fetch(url, request);
    console.log(response);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    postNew(process.env.BACKEND_URL + "/api/admin/news");
    navigate("/admin");
  };

  return (
    <div className="mx-5">
      <Link to="/admin" className="second-title" style={{ textDecoration: "none" }}>
        <h1>ADMIN PANEL</h1>
      </Link>
      {/* <hr className="mx-4" /> */}
      <div className="container">
        <form className="bg-transparent bg-gradient p-3 p-sm-4 p-xl-5 rounded-3 shadow-lg" onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group mx-sm-2 mx-xl-5">
            <label className="text-light fs-5" htmlFor="exampleFormControlInput1">Title</label>
            <input
              type="text"
              className="form-control admin-form mb-sm-1 mb-xl-3"
              id="exampleFormControlInput1"
              onChange={handleTitleChange}
            ></input>
          </div>
          <div className="form-group mx-sm-2 mx-xl-5">
            <label className="text-light fs-5" htmlFor="exampleFormControlTextarea1">Body</label>
            <textarea
              className="form-control admin-form mb-sm-1 mb-xl-3"
              id="exampleFormControlTextarea1"
              rows="3"
              onChange={handleBodyChange}
            ></textarea>
          </div>
          <div className="form-group mx-sm-2 mx-xl-5">
            <label className="text-light fs-5" htmlFor="exampleFormControlInput1">Select Image</label>
            <input
              type="file"
              className="form-control admin-form mb-sm-1 mb-xl-3"
              onChange={handleFileChange}
            ></input>
            <button className="form-btn mt-3 mt-sm-3 mt-xl-4" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};
