import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Artist_single_card } from "../component/Artist-single-card.jsx";

// const getArtists = async (setArtist, id) => {
//   const res = await fetch(
//     `https://3001-blastrobot-finalproject-9v4quhwb66k.ws-eu86.gitpod.io/api/artist/${id}`
//   );
//   const data = await res.json();
//   setArtist(data.result);
// };

export const ArtistSingleView = () => {
  const [artist, setArtist] = useState({});
  const [loading, setLoading] = useState(false);
  const { artist_ID } = useParams();

  const getArtists = async (id) => {
    const url =
      `https://3001-blastrobot-finalproject-9v4quhwb66k.ws-eu86.gitpod.io/api/artist/` +
      id;
    const request = {
      method: "GET",
      redirect: "follow",
    };
    const res = await fetch(url, request);
    if (res.ok) {
      const data = await res.json();
      setArtist(data.result);
    }
  };

  useEffect(() => {
    setLoading(true);
    getArtists(artist_ID);
    setLoading(false);
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
