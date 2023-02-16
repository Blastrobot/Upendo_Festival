
import { Link } from 'react-router-dom';

import React from "react";







export const Artist_single_card = (props) => {

    const handleOnErrorImg = (e) => {
        e.target.src = "https://res.cloudinary.com/dnqtyejtc/image/upload/v1676115484/logo_solo_mtudzh.png";
    };



    return (

        <div id="artis-grid-card" className="card col-12 col-md-6 col-lg-4 flex-row">
            <p className="artist-name">{props.artist_name}</p>
            <img src={props.image} onError={handleOnErrorImg} className="card-img col-12" />
            <div className="card-body">
                <p className="description">
                    {props.text}
                </p>
                <Link to={props.music_url}>
                    <button className="direct-to-spotify"> Play </button> </Link>

            </div>
        </div>
    )


}