import React, { useState, useContext, useEffect } from "react";

import { Context } from "../store/appContext";

import { NewsCard } from "./News-Card.jsx";

import { Spinner } from "./Spinner.jsx";


import "../../styles/news-card.css";
import { LineUp } from "./Line-Up.jsx";
import { useNavigate } from "react-router-dom";

export const NewsGrid = () => {
  const { store, actions } = useContext(Context);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const getNews = async (url) => {
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

      actions.inserttNews(data);

      setLoading(false);
    }
  };
  const handleClick = (evt) => {
    evt.preventDefault();
    navigate("/news")
  }


  const news = store.news;

  useEffect(() => {
    news.length == 0 ? getNews(process.env.BACKEND_URL + "/api/news") : null;
  }, []);

  return (
    <div>

      <div className="container-news d-flex flex-row justify-content-center">


        <div className="single-news d-flex flex-row">
          {loading ? (
            <Spinner />
          ) : (
            news.slice(0, 4).map((news, index) => {
              return (
                <div key={index}>
                  <NewsCard
                    image={news.image_url}
                    title={news.title}
                    body={news.body}
                    id={news.id}
                  />
                </div>
              );
            })
          )}
          <div>
            <button className="more-news" onClick={handleClick}>
              <LineUp text={"More News"} />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
