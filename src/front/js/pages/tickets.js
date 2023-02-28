import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { ProductCard } from "../component/productCard.jsx";

export const Tickets = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container text-center mt-5">
            <h1>Tickets View</h1>
            <div className="row">
                {store.productsArray.map((product, idx) => (
                    <div className="col-12" key={idx}>
                        <ProductCard product={product}/>
                    </div>
                ))}
            </div>
        </div>
    );
}