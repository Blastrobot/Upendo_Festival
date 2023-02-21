
import React from "react";
import { useNavigate } from "react-router-dom";

import "../../styles/news-card.css";



export const NewsCard = (props) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/")

    }

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
                    <button type="button" className="news-btn btn-dark" onClick={handleClick}> Read more... </button>

                </div>


            </picture>



        </div>
    )


}