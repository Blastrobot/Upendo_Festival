import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { NewsGrid } from "../component/Newsgrid.jsx";
import { Video } from "../component/Video.jsx";
import { Poster } from "../component/Poster.jsx";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div>
      <Video />
      <Poster />

      <NewsGrid />
    </div>
  );
};
