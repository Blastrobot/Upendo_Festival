
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/news-card.css";
import { useNavigate } from "react-router-dom";

// News card component at home

export const NewsCard = (props) => {

    const navigate = useNavigate();

    const handleClick = (evt) => {
        evt.preventDefault();
        navigate("/news")
    };

    const handleOnErrorImg = (e) => {
        e.target.src = "https://res.cloudinary.com/dnqtyejtc/image/upload/v1676115484/logo_solo_mtudzh.png";
    };

    return (
        <div className="card">
            {/* <picture className="picture"> */}
                {/* <source media="(min-width: 0px)" srcSet={props.image} /> */}
                {/* <img src={props.image} onError={handleOnErrorImg} style={{marginBlock:"auto"}}/> */}
                <img src={props.image} onError={handleOnErrorImg} style={{objectFit:"cover", height:"100%"}}/>
                <div className="card-img-overlay bg-dark bg-opacity-75 d-flex flex-column align-items-center justify-content-center">
                    <h1 className="news-title card-title text-center">{props.title}</h1>
                    <button className="text-light card-text" onClick={handleClick}>More info!</button>
                    {/* <p>{props.body}</p> */}
                </div>
            {/* </picture> */}
        </div>
    )


}