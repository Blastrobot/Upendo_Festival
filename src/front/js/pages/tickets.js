import React, { useContext } from "react";
import { CartContext } from "../store/cartContext";
import { productsArray } from "../store/productsStore";
import { ProductCard } from "../component/productCard.jsx";

export const Tickets = () => {
    const { store, actions } = useContext(CartContext);

    return (
        <div className="container-fluid second-title text-center">
            <h1 className="">TICKETS</h1>
            <div className="row">
                {productsArray.map((product, idx) => (
                    <div className="col-xxl-9 mx-auto" key={idx}>
                        <ProductCard product={product}/>
                    </div>
                ))}
            </div>
        </div>
    );
}