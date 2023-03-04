


import React from "react";

import "../../styles/single-card.css";

import { AiFillFastForward } from "react-icons/ai"




export const Artist_single_card = (props) => {






    const handleOnErrorImg = (e) => {
        e.target.src = "https://res.cloudinary.com/dnqtyejtc/image/upload/v1676115484/logo_solo_mtudzh.png";
    };



    return (

        <div className="card-single d-flex flex-row justify-content-center">
            <h1 className="artist-name justify-self-start">{props.name}</h1>
            <img src={props.image} onError={handleOnErrorImg} className="single-card-img col-12" />
            <div className="cards-body">
                <p className="description">
                    {props.text}
                </p>

            </div>
            <div className="play-button d-flex align-items-end justify-content-end">
                <a href={props.music} target="_blank">
                    <button className="direct-to-spotify"> Play </button>
                    <AiFillFastForward />
                </a>
            </div>
        </div>
    )


}