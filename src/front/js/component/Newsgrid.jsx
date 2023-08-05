import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { NewsCard } from "./News-Card.jsx";
import { Spinner } from "./Spinner.jsx";
import { LineUp } from "./Line-Up.jsx";
import "../../styles/news-card.css";

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
  // const handleClick = (evt) => {
  //   evt.preventDefault();
  //   navigate("/news")
  // }

  const news = store.news;

  useEffect(() => {
    news.length == 0 ? getNews(process.env.BACKEND_URL + "/api/news") : null;
  }, []);

  return (
    <div className="news-container mx-auto row row-cols-1 row-cols-md-2 g-3">
        {loading ? (
          <Spinner />
        ) : (
          news.slice(0, 4).map((news, index) => {
            return (
              <div key={index} className="col-sm d-flex">
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
    </div>
  );
};
