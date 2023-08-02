import React from "react";
import "../../styles/single-card.css";

import { AiFillFastForward } from "react-icons/ai"
import { Spotify } from "react-spotify-embed";

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
            <Spotify style={{width: "75%"}}link={"https://open.spotify.com/track/18t2ofQiViidZHxOBVjpD1?si=0cfdabc3cd2743c3"}></Spotify>
            <div className="play-button d-flex align-items-end justify-content-end">
                <a href={props.music} target="_blank">
                    <button className="direct-to-spotify"> Play </button>
                    <AiFillFastForward />
                </a>
            </div>
        </div>
    )
}