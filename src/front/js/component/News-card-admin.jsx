import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const NewsCardAdmin = (props) => {
  const { store, actions } = useContext(Context);

  const delNew = async (url) => {
    const request = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${store.token}`,
        "Access-Cotrol-Allow-Origin": "*",
      },
    };
    const response = await fetch(url, request);
    console.log(response);
  };

  const handleOnErrorImg = (e) => {
    e.target.src =
      "https://res.cloudinary.com/dnqtyejtc/image/upload/v1676115484/logo_solo_mtudzh.png";
  };
  const navigate = useNavigate();

  const handleUpdate = (id) => {
    navigate(`/admin/news/update/${id}`);
  };

  const handleDelete = (id) => {
    delNew(process.env.BACKEND_URL + "/api/admin/news/" + id);
    location.reload();
  };

  return (
    <div>
      <picture className="picture text-center">
        <source media="(min-width: 0px)" srcSet={props.image} />
        <img
          src={props.image}
          onError={handleOnErrorImg}
          className="news-image"
        />
        <div className="news-body">
          <h1 className="news-title">{props.title}</h1>
          <p>{props.body}</p>
        </div>
        <div className="d-flex btn-container">
          <button
            type="button"
            className="news-btn btn-dark"
            onClick={(e) => handleDelete(props.id)}
          >
            Delete
          </button>
          <button
            type="button"
            className="news-admin-btn btn-dark"
            onClick={(e) => handleUpdate(props.id)}
          >
            Update
          </button>
        </div>
      </picture>
    </div>
  );
};
