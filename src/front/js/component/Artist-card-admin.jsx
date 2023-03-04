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
        className="admin-artist-image"
      />
      <div className="mb-5 text-center mt-2">
        <h5 className="">{props.name}</h5>
        <button
          className="btn-dark mx-auto"
          onClick={(e) => handleclick(props.artist_id)}
        >
          Update Artist
        </button>
      </div>
    </div>
  );
};
