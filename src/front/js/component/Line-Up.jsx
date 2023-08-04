import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const LineUp = (props) => {

    const navigate = useNavigate();
    const handleClick = (evt) => {
        evt.preventDefault();
        navigate("/news");
    };

    return (
        <div className="container d-flex justify-content-center">
            <button onClick={handleClick}><h3>{props.text}</h3></button>
        </div>
    )
};