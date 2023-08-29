import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Artist_card } from "../component/Artist-card.jsx";
import { LineUp } from "../component/Line-Up.jsx";
import { Spinner } from "../component/Spinner.jsx";
import "../../styles/card.css";

// General artists view

export const Artist_grid = () => {
  const { store, actions } = useContext(Context);

  const [loading, setLoading] = useState(false);

  const getArtists = async (url) => {
    setLoading(true);
    const headers = new Headers();
    headers.append("Access-Control-Allow-Origin", "*");

    const request = {
      headers: headers,
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
  console.log(store.single_artist);

  useEffect(() => {
    artists.length == 0
      ? getArtists(process.env.BACKEND_URL + "/api/artist")
      : null;
  }, []);

  return (
    <>
      <div className="container">
        <div className="second-title">
          <h1> LINE UP </h1>
        </div>
        <div className="card-grid d-flex justify-content-center">
          {loading ? (
            <Spinner />
          ) : (
            artists.map((artist, index) => {
              return (
                <div key={index}>
                  <Artist_card
                    image={artist.image_url}
                    name={artist.name}
                    artist_id={index}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};
