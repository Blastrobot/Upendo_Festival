import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Artist_single_card } from "../component/Artist-single-card.jsx";

const getArtists = async (setArtist, id) => {
  const res = await fetch(
    `https://3001-blastrobot-finalproject-9v4quhwb66k.ws-eu86.gitpod.io/api/artist/${id}`
  );
  const data = await res.json();
  setArtist(data);
};

export const ArtistSingleView = () => {
  const [artist, setArtist] = useState({});
  const { artist_ID } = useParams();

  useEffect(() => {
    getArtists(setArtist, artist_ID);
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container row row-cols-3 row-cols-md-2">
          <Artist_single_card
            image={artist.image_url}
            name={artist.name}
            text={artist.description}
            artist_id={artist.id}
            music_url={artist.music_url}
          />
        </div>
      )}
    </>
  );
};
