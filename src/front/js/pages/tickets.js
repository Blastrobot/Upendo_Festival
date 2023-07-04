// import React, { useContext } from "react";
// import { Context } from "../store/appContext";
// import { ProductCard } from "../component/productCard.jsx";

// export const Tickets = () => {
//     const { store, actions } = useContext(Context);

//     return (
//         <div className="container text-center mt-5">
//             <h1>Tickets View</h1>
//             <div className="row">
//                 {store.productsArray.map((product, idx) => (
//                     <div className="col-12" key={idx}>
//                         <ProductCard product={product}/>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

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
                    <div className="col-12" key={idx}>
                        <ProductCard product={product}/>
                    </div>
                ))}
            </div>
        </div>
    );
}