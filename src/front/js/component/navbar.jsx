import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { CartContext } from "../store/cartContext";
import CartProduct from "./cartProduct.jsx";
import { Button, Offcanvas } from "react-bootstrap"

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const cart = useContext(CartContext);

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const [admin, setadmin] = useState(false)

	const checkoutHandle = async () => {
		const response = await fetch(process.env.BACKEND_URL + "/create-checkout-session", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ items: cart.items })
		}).then((response) => {
			return response.json();
		}).then((response) => {
			if (response.url) {
				window.location.assign(response.url)
			}
		})
	}

	const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0)

	const handleSubmit = (e) => {
		e.preventDefault();
		actions.login(email, password).then(navigate("/"));
	};

	const handleSignup = (e) => {
		e.preventDefault();
		navigate("/signup")
	}

	const handleLogout = (evt) => {
		evt.preventDefault();
		actions.UserLogout();
		navigate("/");
	}

	useEffect(() => {
		actions.adminValidation();
	}, []);


	return (
		<div className="container-flex">
			{!store.token ?
				(
					<nav className="navbar navbar-light bg-dark navbar-expand-lg bg-body-tertiary">
						<div className="container">
							<Link to="/" className="navbar-brand mb-0 h1">
								<img src="https://res.cloudinary.com/dnqtyejtc/image/upload/v1676115484/logo_solo_mtudzh.png" alt="Upendo" width="180" height="100"></img>
							</Link>
							<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
								<span className="navbar-toggler-icon"></span>
							</button>
							<div className="collapse navbar-collapse" id="navbarNav">
								<div className="navbar-nav">
									<Link to="/" className="nav-link text-light" aria-current="page" href="#">Home</Link>
									<Link to="/artist" className="nav-link text-light" href="#">Artists</Link>
									<Link to="/news" className="nav-link text-light" href="#">News</Link>
									<Link to="/tickets" className="nav-link text-light">Tickets</Link>
								</div>
							</div>
							<div className="nav-item dropdown">
								<a className="nav-link text-light border border-info rounded" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
									<strong>LOGIN</strong>
								</a>
								<div className="dropdown-menu">
									<form className="px-3 py-3 m-3">
										<div className="form-floating">
											<input type="email" className="form-control" id="loginemail" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} value={email} />
											<label htmlFor="loginemail" className="form-label">Email address</label>
										</div>
										<div className="form-floating">
											<input type="password" className="form-control" id="loginpassword" placeholder="password" aria-describedby="emailHelp" onChange={(e) => setPassword(e.target.value)} value={password} />
											<label htmlFor="loginpassword" className="form-label">Password</label>
										</div>
										<hr className="dropdown-divider mt-3" />
										<button type="submit" onClick={(e) => { handleSubmit(e) }} className="btn btn-outline-dark mt-2 mx-5">Login</button>
										<div id="passwordHelp" className="form-text my-3 mx-1">Don't have an account?</div>
										<button type="submit" onClick={(e) => { handleSignup(e) }} className="btn btn-outline-dark px-2 mt-1 mx-5">Register</button>
									</form>
								</div>
							</div>
						</div>
					</nav>
				)
				:
				(
					<nav className="navbar navbar-light bg-dark navbar-expand-lg bg-body-tertiary">
						<div className="container">
							<Link to="/" className="navbar-brand mb-0 h1">
								<img src="https://res.cloudinary.com/dnqtyejtc/image/upload/v1676115484/logo_solo_mtudzh.png" alt="Upendo" width="180" height="100"></img>
							</Link>
							<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
								<span className="navbar-toggler-icon"></span>
							</button>
							<div className="collapse navbar-collapse" id="navbarNav">
								<div className="navbar-nav">
									<Link to="/" className="nav-link text-light" aria-current="page" href="#">Home</Link>
									<Link to="/artist" className="nav-link text-light" href="#">Artists</Link>
									<Link to="/news" className="nav-link text-light" href="#">News</Link>
									<Link to="/tickets" className="nav-link text-light">Tickets</Link>
									{store.admin == true ? (
										<Link to="/admin" className="nav-link text-warning">Admin</Link>)
										:
										<></>
									}

								</div>
							</div>
							<Button variant="primary" onClick={handleShow}>
								{productsCount} Items
							</Button>
							<Offcanvas show={show} onHide={handleClose}>
								<Offcanvas.Header closeButton>
									<Offcanvas.Title>Shopping Cart</Offcanvas.Title>
								</Offcanvas.Header>
								<Offcanvas.Body>
									{productsCount > 0 ?
										<>
											<p>Items in your cart:</p>
											{cart.items.map((currentProduct, idx) => (
												<CartProduct key={idx} id={currentProduct.id} quantity={currentProduct.quantity}></CartProduct>
											))}

											<h1>Total: {cart.getTotalCost().toFixed(2)}</h1>
											<Button variant="warning" onClick={checkoutHandle}>Purchase</Button>
											{/* {sessionId && (
												<StripeCheckout 
													stripeKey="pk_test_51McCmaKTqfPHNZ5mOKOBJN5kQTJ5etXJqgzYFHtIXJMpmGoNO7KCT4EC4Lhpz1OZc4EM7ivJRiklDCPAXLnLNYrP00L6nePPLv"
													token={(token) => console.log(token)}
													amount={5}
													currency="EUR"
													shippingAddress
													billingAddress/>
											)} */}
										</>
									:
									<h1>There are no items in your cart!</h1>
									}
								</Offcanvas.Body>
							</Offcanvas>
							<div>
								<button onClick={(evt) => { handleLogout(evt) }} className="btn text-light border border-info rounded">Logout</button>
							</div>
						</div>
					</nav>
				)

			}
		</div>
	);
};
