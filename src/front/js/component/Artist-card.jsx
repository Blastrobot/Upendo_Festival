import React, { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import "../../styles/card.css";
import { Context } from "../store/appContext";


export const Artist_card = (props) => {

    const { store, actions } = useContext(Context);



    const handleOnErrorImg = (e) => {
        e.target.src = "https://res.cloudinary.com/dnqtyejtc/image/upload/v1676115484/logo_solo_mtudzh.png";
    };



    const navigate = useNavigate();

    const handleclick = (artist_id) => {

        navigate(`/artist/${artist_id}`)

    };




    return (

        <div className="cards d-flex flex-col align-items-center">

            <img className="artist-image" src={props.image} onError={handleOnErrorImg} />

            <div className="hidden-menú d-flex flex-col  ">


                <button className="direct-to btn   btn btn-outline-dark " onClick={(e) => handleclick(props.artist_id)}> {props.name} </button>

            </div>

        </div>
    )


}