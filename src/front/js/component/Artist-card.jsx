import React from "react";

import { useNavigate } from "react-router-dom";
import "../../styles/card.css";


export const Artist_card = (props) => {




    const handleOnErrorImg = (e) => {
        e.target.src = "https://res.cloudinary.com/dnqtyejtc/image/upload/v1676115484/logo_solo_mtudzh.png";
    };



    const navigate = useNavigate();

    const handleclick = (artist_id) => {
        navigate(`/artist/${artist_id}`)

    };




    return (

        <div className="card d-flex flex-col align-items-center">
            <img className="artist-image" src={props.image} onError={handleOnErrorImg} />
            <div className="hidden-menú">
                <h6 className="artist-name">{props.name}</h6>
                <p className="card-text">
                    {props.text}
                </p>
                <button className="direct-to btn btn-outline-light" onClick={(e) => handleclick(props.artist_id)}> More... </button>
            </div>
        </div>
    )


}