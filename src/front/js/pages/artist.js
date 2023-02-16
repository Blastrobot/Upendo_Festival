import React, { useState, useContext, useEffect } from "react";

import { Context } from "../store/appContext";

import { Artist_card } from "../component/Artist-card.jsx";

import { Spinner } from "../component/Spinner.jsx";

export const Artist_grid = () => {
  const { store, actions } = useContext(Context);

  const [loading, setLoading] = useState(false);

  const getArtists = async (url) => {
    setLoading(true);
    const request = {
      method: "GET",
      redirect: "follow",
    };

    const response = await fetch(url, request);
    console.log(response);
    if (response.ok) {
      const data = await response.json();

      console.log(data);

      actions.insertArtists(data);

      setLoading(false);
    }
  };

  const artists = store.artists;
  console.log(store.artists);

  useEffect(() => {
    getArtists(
      "https://3001-blastrobot-finalproject-9v4quhwb66k.ws-eu87.gitpod.io/api/artist"
    );
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        artists.map((artist) => {
          return (
            <div
              key={artist.id}
              className="container row row-cols-3 row-cols-md-2"
            >
              <Artist_card
                image={artist.image_url}
                name={artist.name}
                artist_id={artist.id}
              />
            </div>
          );
        })
      )}
      <div className="text-center my-4">
        <button
          type="button"
          className={`btn btn-dark shadow-sm ${
            !store.next_page || loading == true ? "" : ""
          }`}
          onClick={() => getArtists(store.next_page)}
        >
          Show More <i className="fas fa-long-arrow-alt-down ms-1"></i>
        </button>
      </div>
    </>
  );
};
