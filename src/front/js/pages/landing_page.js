import React from "react";
import "../../styles/landingpage.css"

export const LandingPage = () => {
    return (
        <div className="landing d-flex">
            <video autoPlay muted loop className="intro-video" id="intro-video">
                <source src="https://res.cloudinary.com/dnqtyejtc/video/upload/v1677177263/VIDEO_HOME_kcjdly.mov" type="video/mp4" />
            </video>
            <div className="overlay">
            </div>
            <div className="btn-container">
                <a href="/home" className="btn-access text-center"><span className="fa-solid fa-arrow-right-to-bracket"></span></a>
            </div>
            <i className="bi bi-c-circle all-rights"> UPENDO FESTIVAL</i>
        </div>
    )
}