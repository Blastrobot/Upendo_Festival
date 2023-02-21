import React, { useState, useContext, useEffect } from "react";

import { Context } from "../store/appContext";

import { NewsCard } from "./News-Card.jsx";

import { Spinner } from "../component/Spinner.jsx";

import "../../styles/news-card.css";

export const NewsGrid = () => {
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
        news.length == 0
            ? getNews(
                "https://3001-blastrobot-finalproject-5qsc3yhr9p7.ws-eu87.gitpod.io/api/news"
            )
            : null;
    }, []);

    return (
        <div className="container-news d-flex flex-row justify-content-center">

            <div className="single-news d-flex flex-row">
                {loading ? (
                    <Spinner />
                ) : (
                    news.map((news, index) => {
                        return (
                            <div key={index}>
                                <NewsCard
                                    image={news.image_url}
                                    title={news.title}
                                    body={news.body}
                                    artist_id={index}
                                />
                            </div>
                        );
                    })
                )}
            </div>

        </div>
    );
};