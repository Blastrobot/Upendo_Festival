import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { NewsGrid } from "../component/Newsgrid.jsx";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div>
      <h1>Esto es el home</h1>
      <NewsGrid />
    </div>
  );
};
