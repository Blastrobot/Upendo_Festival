import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement } from "@stripe/react-stripe-js";

import PaymentForm from "../component/checkoutform.jsx";

const stripePromise = loadStripe("pk_test_51McCmaKTqfPHNZ5mOKOBJN5kQTJ5etXJqgzYFHtIXJMpmGoNO7KCT4EC4Lhpz1OZc4EM7ivJRiklDCPAXLnLNYrP00L6nePPLv")

export const Checkout = () => {
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        fetch(process.env.BACKEND_URL + "/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ items: [{id: ""}]})
        })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }, []);

    const appearance = {
        theme: "stripe",
    }

    const options = {
        clientSecret,
        appearance,
    }

    return (
        <div>
            <Elements stripe={stripePromise}>
                <CardElement />
            </Elements>
        </div>
    );
}