import React from "react";

import "../../styles/news.css";




export const EveryNews = (props) => {

    const handleOnErrorImg = (e) => {
        e.target.src = "https://res.cloudinary.com/dnqtyejtc/image/upload/v1676115484/logo_solo_mtudzh.png";
    };
    
    return (
            <div className="row row-cols-1">
                <h1 className="col text-center">{props.title}</h1>
            {/* <div className="row justify-content-center"> */}
                {/* <div className="col-6 .col-sm"> */}
                <img src={props.image} onError={handleOnErrorImg} className="col-10 mx-auto my-5"/>
                {/* </div> */}
            {/* </div> */}
                {/* <div className=""> */}
                <p className="col-6 mx-auto mb-5">{props.body}</p>
                {/* </div> */}
            </div>
    )


}