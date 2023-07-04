import React, { useEffect, useRef } from "react";
import "../../styles/video.css";



export const Video = () => {

    const videoEl = useRef(null);

    const attemptPlay = () => {
        videoEl &&
            videoEl.current &&
            videoEl.current.play().catch(error => {
                console.error("Error attempting to play", error);
            });
    };
    useEffect(() => {
        attemptPlay();
    }, []);


    return (

        <div className="video-container">


            <video
                className="video"
                playsInline
                loop
                controls
                muted
                alt="All the devices"
                src="https://res.cloudinary.com/dnqtyejtc/video/upload/v1677177263/VIDEO_HOME_kcjdly.mov"
                ref={videoEl}
            />



        </div>


    )


}