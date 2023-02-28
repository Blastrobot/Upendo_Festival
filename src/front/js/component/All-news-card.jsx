import React from "react";

import "../../styles/news.css";




export const EveryNews = (props) => {






    const handleOnErrorImg = (e) => {
        e.target.src = "https://res.cloudinary.com/dnqtyejtc/image/upload/v1676115484/logo_solo_mtudzh.png";
    };



    return (
        <div>
            <h1 className="singlenews-title justify-content-start">{props.title}</h1>

            <div className="card-single d-flex flex-row justify-content-center">

                <img src={props.image} onError={handleOnErrorImg} className="single-news-img" />
                <div className="news-body-container d-flex align-items-end">
                    <p className="singlenews-bdy">
                        {props.body}
                    </p>

                </div>
            </div>
        </div>
    )


}