import React, { useContext, useState } from "react";
import { AiFillFastForward } from "react-icons/ai"


export const LineUp = (props) => {
    return (
        <div className="line-up d-flex flex-row align-items-end justify-content-between">
            <h2>{props.text}</h2>
            <AiFillFastForward />
        </div>
    )
}