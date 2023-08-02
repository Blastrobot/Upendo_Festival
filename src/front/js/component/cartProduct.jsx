import React from "react";
import Button from "react-bootstrap/Button"
import { CartContext} from "../store/cartContext";
import { useContext } from "react";
import { getProductData } from "../store/productsStore";

const CartProduct = (props) => {
    const cart = useContext(CartContext);
    const id = props.id;
    const quantity = props.quantity;
    const productData = getProductData(id);

    return (
        <>
            <h5>{productData.title}</h5>
            <p>{quantity} total</p>
            <p>{(quantity * productData.price).toFixed(2)} €</p>
            <Button variant="danger" size="sm" onClick={() => cart.deleteFromCart(id)}>Remove</Button>
            <hr></hr>
        </>
    )
}

export default CartProduct;