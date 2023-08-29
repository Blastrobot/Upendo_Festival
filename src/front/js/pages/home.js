import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { NewsGrid } from "../component/Newsgrid.jsx";
import { Video } from "../component/Video.jsx";
import { Poster } from "../component/Poster.jsx";
import { Spotify } from "react-spotify-embed";
import Container from "react-bootstrap/Container";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div>
      <Link to="/tickets" style={{textDecoration: "none"}}>
        <h1 className="main-title">
          BUY TICKETS HERE!
        </h1>
      </Link>
      <Poster />
      <hr className="mx-2"/>
      <Video />
      <hr className="mx-2"/>
      <NewsGrid />
      <hr className="mx-2 mb-1"/>
      <Container className="spotify container-fluid">
          <h1 className="spoty-title">Upendo Music Playlist</h1>
          <Spotify style={{width: "75%"}}link="https://open.spotify.com/playlist/4uNZ30aesoQ2CJJnIQdwWB"></Spotify>
      </Container>
    </div>
  );
};
