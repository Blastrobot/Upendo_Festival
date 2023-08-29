import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Artist_card_admin } from "../component/Artist-card-admin.jsx";
import { NewsCardAdmin } from "../component/News-card-admin.jsx";
import { useNavigate } from "react-router-dom";

export const AdminPanel = () => {
  const { store, actions } = useContext(Context);

  //Artist Fetch
  const getArtists = async (url) => {
    const headers = new Headers();
    headers.append("Access-Control-Allow-Origin", "*");
    const request = {
      method: "GET",
      headers: headers,
    };

    const response = await fetch(url, request);
    if (response.ok) {
      const data = await response.json();

      actions.insertArtists(data);
    }
  };

  const artists = store.artists;

  //News Fetch
  const getNews = async (url) => {
    const headers = new Headers();
    headers.append("Access-Control-Allow-Origin", "*");

    const request = {
      method: "GET",
      headers: headers,
    };

    const response = await fetch(url, request);
    if (response.ok) {
      const data = await response.json();

      actions.inserttNews(data);
    }
  };

  const news = store.news;

  useEffect(() => {
    if (news.length == 0) {
      getNews(process.env.BACKEND_URL + "/api/news");
    }
    if (artists.length == 0) {
      getArtists(process.env.BACKEND_URL + "/api/artist");
    }
  }, []);

  const navigate = new useNavigate();

  const handleClick = () => {
    navigate("/admin/news/create");
  };

  return (
    <div className="container">
      <div className="second-title">
        <h1 className="text-center">ADMIN PANEL</h1>
      </div>
      <hr className="mx-5 text-light" />
      {/* <div> */}
        <div className="row row-cols-1 bg-transparent bg-gradient bg-light justify-content-center rounded-3 shadow-lg p-5">
          <div className="d-flex flex-column align-items-center">
            <h3 className="mx-auto text-light ">News</h3>
            <button className="btn w-20 btn-success mt-3" onClick={(e) => handleClick()}>Create new +</button>
          </div>
          <div className="mx-auto row row-cols-1 row-cols-md-2 g-3">
            {news.map((news, index) => {
              return (
                <div key={index} className="col-sm d-flex">
                  <NewsCardAdmin
                    id={news.id}
                    image={news.image_url}
                    title={news.title}
                    body={news.body}
                  />
                </div>
              );
            })}
          </div>
        </div>



        <div className="row row-cols-1 bg-transparent bg-gradient bg-light justify-content-center rounded-3 shadow-lg p-5">
          <h3 className="text-light text-center mb-3">Artist</h3>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-3">
            {artists.map((artist, index) => {
              return (
                <div key={index} className="col">
                  <Artist_card_admin
                    image={artist.image_url}
                    name={artist.name}
                    artist_id={artist.id}
                    musicUrl={artist.music_url}
                  />
                </div>
              );
            })}
          </div>
        </div>
      {/* </div> */}
    </div>
  );
};
