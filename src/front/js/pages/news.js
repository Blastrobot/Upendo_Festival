import React, { useState, useContext, useEffect } from "react";

import { Context } from "../store/appContext";

import { NewsCard } from "../component/News-Card.jsx";

import { Spinner } from "../component/Spinner.jsx";

import { LineUp } from "../component/Line-Up.jsx";
import { EveryNews } from "../component/All-news-card.jsx";
import "../../styles/news.css";

export const AllNews = () => {
  const { store, actions } = useContext(Context);

  const [loading, setLoading] = useState(false);

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

  const news = store.news;

  useEffect(() => {
    news.length == 0 ? getNews(process.env.BACKEND_URL + "/api/news") : null;
  }, []);

  return (
    <div>
      <div className="top-container d-flex flex-row justify-content-between align-items-end">
        <LineUp text={"All news"} />
        <LineUp text={"All news"} />
        <LineUp text={"All news"} />
        <LineUp text={"All news"} />
      </div>

      <div className="all-News-container d-flex flex-row justify-content-center">
        <div className="news-box d-flex flex-row ">
          {loading ? (
            <Spinner />
          ) : (
            news.map((news, index) => {
              return (
                <div key={index}>
                  <EveryNews
                    image={news.image_url}
                    title={news.title}
                    body={news.body}
                    id={news.id}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
