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
    <div className="card h-100">
      <img
        src={props.image}
        onError={handleOnErrorImg}
        className="card-img"
      />
      <div className="card-img-overlay bg-dark bg-opacity-50 d-flex flex-column align-items-center justify-content-center">

      
      {/* <div className="card-body"> */}

        <h5 className="text-light card-title">{props.name}</h5>
        <button
          className="text-light card-text"
          onClick={(e) => handleclick(props.artist_id)}
        >
          Update
        </button>
      {/* </div> */}
      
      </div>
    </div>
  );
};
