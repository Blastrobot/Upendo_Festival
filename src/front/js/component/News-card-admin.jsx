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
    <div className="card news-card-admin">

        <img
          src={props.image}
          onError={handleOnErrorImg}
          style={{objectFit:"cover", height:"100%"}}
        />
        <div className="card-img-overlay bg-dark bg-opacity-50 d-flex flex-column align-items-center justify-content-center">
          <h5 className="card-title text-light text-center">{props.title}</h5>
          <div className="d-flex">
            <button type="button" className="text-light card-text" onClick={(e) => handleDelete(props.id)}>
              Delete
            </button>
            <button type="button" className="text-light card-text" onClick={(e) => handleUpdate(props.id)}>
              Update
            </button>

          </div>

        </div>

    </div>
  );
};
