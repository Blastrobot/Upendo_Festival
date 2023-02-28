import React, { useEffect, useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function PaymentForm () {
    const stripe = useStripe ();
    const elements = useElements ();

    const [message, setMessage] = useState (null);
    const [isLoading, setIsLoading] = useState (false);

    /* Showing payment status messages */
    useEffect(() => {
        if (!stripe) {
            return;
        }
    

        const clientSecret = newURLSearchParams(window.location.search).get(
            data.clientSecret
        );
    
        if (!clientSecret) {
            return;
        }
    
        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succedeed":
                    setMessage("Payment succeed!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was nmot successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);

    /* Completing the payment */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js isn't loaded yet
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "https://3000-blastrobot-finalproject-8zt3fz6eteh.ws-eu87.gitpod.io/",
            },
        });

        // This point is only reached if there's an immediate error when confirming
        // the payment. Otherwise is gonna be returned to "return_url"
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }
        
        setIsLoading(false);
    };

    /* This is to change the way the checkout form is showed, tabs or accordion */
    const paymentElementOptions = {
        layout: "tabs"
    }

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" options={paymentElementOptions} />
            <button disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                </span>
            </button>
            {message && <div id="payment-message">{message}</div>}
        </form>
    )
}