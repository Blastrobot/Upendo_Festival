import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { AdminArtistsForm } from "../component/Artist-form.jsx";

export const AdminArtistsPanel = () => {
  const [artist, setArtist] = useState({});
  const { artist_ID } = useParams();

  const getArtist = async (url) => {
    const headers = new Headers();
    headers.append("Access-Control-Allow-Origin", "*");
    const request = {
      method: "GET",
      headers: headers,
    };

    const response = await fetch(url, request);
    if (response.ok) {
      const data = await response.json();
      setArtist(data.results);
    }
  };

  useEffect(() => {
    console.log("aqui");
    getArtist(process.env.BACKEND_URL + "/api/artist/" + artist_ID);
    console.log(artist);
  }, []);

  return (
    <div className="mx-5">
      <Link to="/admin" className="second-title" style={{ textDecoration: "none" }}>
        <h1>ADMIN PANEL</h1>
      </Link>
      <hr className="mx-4" />
      <AdminArtistsForm
        name={artist.name}
        desc={artist.description}
        musicUrl={artist.music_url}
      />
    </div>
  );
};
