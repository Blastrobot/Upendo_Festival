import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";


export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      {/* <Spotify link="https://open.spotify.com/album/0fUy6IdLHDpGNwavIlhEsl?si=mTiITmlHQpaGkoivGTv8Jw" /> */}
      <h1>Esto es el home</h1>
    </div>
  );
};
