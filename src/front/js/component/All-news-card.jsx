import React from "react";
import "../../styles/news.css";

// News at news view

export const EveryNews = (props) => {

    const handleOnErrorImg = (e) => {
        e.target.src = "https://res.cloudinary.com/dnqtyejtc/image/upload/v1676115484/logo_solo_mtudzh.png";
    };
    
    return (
            <div className="row row-cols-1 bg-transparent justify-content-center rounded-3 shadow-lg">
                <h1 className="col-10 text-center mt-5">{props.title}</h1>
            {/* <div className="row justify-content-center"> */}
                {/* <div className="col-6 .col-sm"> */}
                <img src={props.image} onError={handleOnErrorImg} className="col-10 mx-auto my-5 "/>
                {/* </div> */}
            {/* </div> */}
                {/* <div className=""> */}
                <p className="col-10 mx-auto mb-5 text-light">{props.body}</p>
                {/* </div> */}
            </div>
    )


}