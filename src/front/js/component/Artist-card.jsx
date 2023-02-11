
import { useNavigate } from "react-router-dom";

import React from "react";


// const handleOnErrorImg = (e) => {
//     e.target.src = "festival_logo";
//   };





export const Artist_card = (props) => {


    // const handleOnErrorImg = (e) => {
    //     e.target.src = "festival_logo";
    //   };


    const navigate = useNavigate();

    const handleclick = (artist_id) => {
        navigate(`/artist/${artist_id}`)

    };



    return (

        <div id="artis-grid-card" className="card col-12 col-md-3 flex-row">
            <img src={props.image} onError={handleOnErrorImg} className="card-img-top" />
            <div className="card-body">
                <h5 className="artist-name">{props.name}</h5>
                <p className="card-text">
                    {props.text}
                </p>
                <button className="direct-to-single-view" onClick={(e) => handleclick(props.artist_id)}> Go to </button>
            </div>
        </div>
    )


}