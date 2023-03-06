import React, { useContext } from "react";
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
      <h1 className="main-title">
        Enjoy the best Afro Pop festival in the paradise 🏝
      </h1>
      <Poster />
      <Video />
      <NewsGrid />
      <Container className="spotify ">
        <div>
          <h1 className="spoty-title">Upendo Music Playlist</h1>
        </div>
        <div>
          <Spotify link="https://open.spotify.com/playlist/4uNZ30aesoQ2CJJnIQdwWB"></Spotify>
        </div>
      </Container>
    </div>
  );
};
