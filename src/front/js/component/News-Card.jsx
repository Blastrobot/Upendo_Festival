
import React, { useContext, useEffect, useState } from "react";

import { Context } from "../store/appContext";

import "../../styles/news-card.css";



export const NewsCard = (props) => {






    const handleOnErrorImg = (e) => {
        e.target.src = "https://res.cloudinary.com/dnqtyejtc/image/upload/v1676115484/logo_solo_mtudzh.png";
    };



    return (


        <div >
            <picture className="picture">
                <source media="(min-width: 0px)" srcSet={props.image} />
                <img src={props.image} onError={handleOnErrorImg} className="news-image" />



                <div className="news-body">
                    <h1 className="news-title">{props.title}</h1>
                    <p>{props.body}</p>
                </div>


            </picture>



        </div>
    )


}