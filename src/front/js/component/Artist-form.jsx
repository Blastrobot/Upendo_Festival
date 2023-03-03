import React, { useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/admin-form.css";

export const AdminArtistsForm = (props) => {
  const [desc, setDesc] = useState("");
  const [music, setMusic] = useState("");
  const [file, setFile] = useState();
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const { artist_ID } = useParams();

  const handleDescChange = (event) => {
    setDesc(event.target.value);
  };

  const handleMusicChange = (event) => {
    setMusic(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const putArtist = async (url) => {
    var data = new FormData();
    data.append("name", props.name);
    data.append("description", desc);
    data.append("music_url", music);
    data.append("file", file);
    const request = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${store.token}`,
        "Access-Cotrol-Allow-Origin": "*",
      },
      body: data,
    };
    const response = await fetch(url, request);
    console.log(response);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    putArtist(process.env.BACKEND_URL + "/api/admin/artist/" + artist_ID);
    navigate("/admin");
  };

  return (
    <div className="mx-5">
      <form className="mx-4" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Description</label>
          <textarea
            className="form-control admin-form mb-3"
            id="exampleFormControlTextarea1"
            rows="3"
            defautvalue={props.desc}
            placeholder={props.desc}
            onChange={handleDescChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">Music URL</label>
          <input
            type="text"
            className="form-control admin-form mb-3"
            id="exampleFormControlInput1"
            defautvalue={props.musicUrl}
            placeholder={props.musicUrl}
            onChange={handleMusicChange}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">Select Image</label>
          <input
            type="file"
            className="form-control admin-form mb-3"
            id="exampleFormControlInput1"
            onChange={handleFileChange}
          ></input>
        </div>
        <button className="mx-auto form-btn mb-5" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
