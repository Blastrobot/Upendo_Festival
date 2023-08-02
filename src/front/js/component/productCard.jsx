import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Form, Toast, ToastContainer} from "react-bootstrap";
import { CartContext } from "../store/cartContext"
import { useContext } from "react";
import { Context } from "../store/appContext";

export const ProductCard = (props) => { // props.product is the product we are selling
    const product = props.product;
    const cart = useContext(CartContext);
    const productQuantity = cart.getProductQuantity(product.id);
    console.log(cart.items);

    const { store, actions } = useContext(Context);

    useEffect(() => {
		actions.userValidation();
	}, []);

    const [show, setShow] = useState(true);
    const toggleShow = () => setShow(!show);

    return (
        <Card>
            <Card.Body className="text-light border-rounded-3" style={{padding:'0px'}}>
                <Card.Img className="bg-image" src={product.background} style={{ height:'200px', objectFit:'cover', opacity:'90%'}}/>
                <Card.ImgOverlay>

                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>{product.price} €</Card.Text>
                    {productQuantity > 0 ?
                        <>
                            <Form as={Row}>
                                <Form.Label column="true" sm="6">In Cart: {productQuantity}</Form.Label>
                                <Col sm="6">
                                    <Button sm="6" onClick={() => cart.addOneToCart(product.id)} className="mx-2">+</Button>
                                    <Button sm="6" onClick={() => cart.removeOneFromCart(product.id)} className="mx-2">-</Button>
                                </Col>
                            </Form>
                            <Button variant="danger" onClick={() => cart.deleteFromCart(product.id)} className="my-2">Remove from Cart</Button>
                        </>
                        :
                        (
                        store.token ?
                        <Button variant="primary" onClick={() => cart.addOneToCart(product.id)}>Add to Cart</Button>
                        :
                        (<>
                        <Button variant="primary" onClick={toggleShow}>Add to Cart</Button>
                            <ToastContainer position="middle-center">
                                <Toast bg="warning" show={!show} onClose={toggleShow}>
                                    <Toast.Header>
                                        <img/>
                                        <strong className="me-auto">UPENDO</strong>
                                    </Toast.Header>
                                    <Toast.Body>Please, proceed to login to buy your tickets! 😎</Toast.Body>
                                </Toast>
                            </ToastContainer>
                        </>)
                        )
                    }
                </Card.ImgOverlay>
            </Card.Body>
        </Card>
    )
}