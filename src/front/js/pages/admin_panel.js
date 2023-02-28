import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Artist_card_admin } from "../component/Artist-card-admin.jsx";
import { NewsCardAdmin } from "../component/News-card-admin.jsx"
import { useNavigate } from "react-router-dom";


export const AdminPanel = () => {
  const { store, actions } = useContext(Context);

  //Artist Fetch
  const getArtists = async (url) => {
    const headers = new Headers();
    headers.append("Access-Control-Allow-Origin", "*");
    const request = {
      method: "GET",
      headers: headers
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
      headers: headers
    };

    const response = await fetch(url, request);
    if (response.ok) {
      const data = await response.json();

      actions.inserttNews(data);
    }
  };

  const news = store.news;

  useEffect(() => {
    if(news.length == 0){
      getNews(
        process.env.BACKEND_URL + "/api/news"
      );
    }
    if(artists.length == 0){
      getArtists(
        process.env.BACKEND_URL + "/api/artist"
      );
    }
  }, []);

  const navigate = new useNavigate()

  const handleClick = () => {
    navigate("/admin/news/create")
  }
  return (
    <div>
      <h1 className="text-center">ADMIN PANEL</h1>
      <hr className="mx-5" />
      <div>
        <div>
          <div className="d-flex">
          <h3>News</h3><button onClick={(e) => handleClick()}>+ Create new</button>
          </div>
          <div className="row">
          <div className="single-news d-flex flex-row">
            {news.map((news, index) => {
              return (
                <div key={index}>
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
        </div>
        <div>
          <h3>Artist</h3>
          <div className="row">
            {artists.map((artist, index) => {
              return (
                <div
                  key={index}
                  className="container row row-cols-3 row-cols-md-2"
                >
                  <Artist_card_admin
                    image={artist.image_url}
                    name={artist.name}
                    artist_id={artist.ArtistId}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
