import React from "react";
import "../../styles/single-card.css";

import { AiFillFastForward } from "react-icons/ai"
import { Spotify } from "react-spotify-embed";
import { LineUp } from "./Line-Up.jsx";
import { useNavigate } from "react-router-dom";

// Component for single artist view

export const Artist_single_card = (props) => {
    const handleOnErrorImg = (e) => {
        e.target.src = "https://res.cloudinary.com/dnqtyejtc/image/upload/v1676115484/logo_solo_mtudzh.png";
    };

    const navigate = useNavigate();
    const handleClick = (e) => {
        navigate("/artist");
    }
    
    return (
        <div className="row bg-transparent bg-gradient p-5 align-items-center rounded-3 shadow-lg">
            <div className="col-lg-6 text-center">
                <h1 className="display-5 fw-bold">{props.name}</h1>
                {/* <div className="col-8 mx-auto"> */}
                    <p className="lead col-10 mx-auto text-light">
                        {props.text}
                    </p>
                {/* </div> */}
                {/* <div className="w-100"></div>  */}
                <img src={props.image} onError={handleOnErrorImg} className="img-fluid mx-auto my-2 shadow-lg rounded-3" />
                
            </div>
            <div className="col-lg-6 col-10 col-sm-8 text-center mx-auto">
                {props.music ? (
                    <Spotify className="spotify" link={props.music}></Spotify>
                ) : null}
                <div className="w-100"></div>
                <i className="btn fa-solid fa-rotate-left text-light" onClick={handleClick}></i>
            </div>
        </div>
    )
}