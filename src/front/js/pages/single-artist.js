import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Artist_single_card } from "../component/Artist-single-card.jsx";
import { Context } from "../store/appContext";
import "../../styles/single-card.css";
import { useNavigate, Navigate } from "react-router-dom";
import { LineUp } from "../component/Line-Up.jsx";

export const ArtistSingleView = () => {
  const { store, actions } = useContext(Context);
  const [newArtist, setNewartist] = useState({});
  const navigate = useNavigate();
  const { artist_ID } = useParams();

  const [loading, setLoading] = useState(false);

  const artists = store.artists;

  const handleClick = () => {
    navigate("/artist");
  };

  useEffect(() => {
    setLoading(true);

    setNewartist(artists[artist_ID]);

    setLoading(false);
  }, []);

  console.log(newArtist);

  return !newArtist ? (
    <Navigate to="/artist" />
  ) : (
    <div className="main">
      <div className="Back-container d-flex flex-row">
        <button onClick={handleClick}>
          <LineUp text={"Back to grid"} />
        </button>
      </div>
      <div className="d-flex flex-row justify-content-center">
        {loading ? (
          <Spinner />
        ) : (
          <div className="container-single d-flex flex-col ">
            <Artist_single_card
              image={newArtist.image_url}
              name={newArtist.name}
              text={newArtist.description}
              music={newArtist.music_url}
            />
          </div>
        )}
      </div>
    </div>
  );
};
