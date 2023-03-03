import React from "react";
import { useNavigate } from "react-router-dom";

export const Artist_card_admin = (props) => {
  const handleOnErrorImg = (e) => {
    e.target.src =
      "https://res.cloudinary.com/dnqtyejtc/image/upload/v1676115484/logo_solo_mtudzh.png";
  };

  const navigate = useNavigate();

  const handleclick = (artist_id) => {
    navigate(`/admin/artist/${artist_id}`);
  };

  return (
    <div className="">
      <img
        src={props.image}
        onError={handleOnErrorImg}
        className="card-img-top"
      />
      <div className="d-flex mb-5 justify-content-between mt-2">
        <h5 className="">{props.name}</h5>
        <p className="card-text">{props.text}</p>
        <button
          className="btn-dark"
          onClick={(e) => handleclick(props.artist_id)}
        >
          Update Artist
        </button>
      </div>
    </div>
  );
};
