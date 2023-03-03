import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { CartContext } from "../store/cartContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const cart = useContext(CartContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const [admin, setadmin] = useState(false)

	const checkout = async () => {
		await fetch("https://3001-blastrobot-finalproject-8zt3fz6eteh.ws-eu88.gitpod.io/create-checkout-session", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ items: cart.items })
		}).then((response) => {
			return response.json();
		}).then((session) => {
			stripe.redirectToCheckout({ sessionId: session.id })
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
		<>
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
									Login
								</a>
								<div className="dropdown-menu">
									<form className="px-3 py-3">
										<div className="form-floating">
											<input type="email" className="form-control" id="loginemail" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} value={email} />
											<label htmlFor="loginemail" className="form-label">Email address</label>
										</div>
										<div className="form-floating">
											<input type="password" className="form-control" id="loginpassword" placeholder="password" aria-describedby="emailHelp" onChange={(e) => setPassword(e.target.value)} value={password} />
											<label htmlFor="loginpassword" className="form-label">Password</label>
										</div>
										<hr className="dropdown-divider" />
										<button type="submit" onClick={(e) => { handleSubmit(e) }} className="btn btn-outline-dark mt-3 mx-5">Login</button>
										<div id="passwordHelp" className="form-text my-3 mx-1">¿Don't have an account?.</div>

										<button type="submit" onClick={(e) => { handleSignup(e) }} className="btn btn-outline-dark mt-2 mx-5">Sign up</button>
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
							{/* <button className="btn btn-warning" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
								{productsCount} Items
							</button>
							<div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
								<div className="offcanvas-header">
									<h5 className="offcanvas-title" id="offcanvasRightLabel">Shopping Cart</h5>
									<button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
								</div>
								<div className="offcanvas-body">
									{productsCount > 0 ?
										<>
											<p>Items in your cart:</p>
											{cart.items.map((currentProduct, idx) => (
												<h1 key={idx}>{currentProduct.id}</h1>
											))}

											<h1>Total: {cart.getTotalCost().toFixed(2)}</h1>
											<button className="btn btn-success" onClick={checkout}>Purchase</button>
										</>
										:
										<h1>There are no items in your cart!</h1>
									}
									<div>Modal body</div>
								</div>
							</div> */}
							<button className="btn btn-warning" type="button" data-bs-toggle="modal" data-bs-target="#Modal">
								{productsCount} Items
							</button>
							<div className="modal fade" tabIndex="-1" id="Modal" aria-labelledby="ModalLabel" aria-hidden="true">
								<div className="modal-dialog">
									<div className="modal-content">
										<div className="modal-header">
											<h5 className="modal-title fs-5" id="Modal">Shopping Cart</h5>
											<button type="button" className="btn-close" data-bs-dismiss="Modal" aria-label="Close"></button>
										</div>
									</div>
								</div>
								<div className="modal-body">
									{productsCount > 0 ?
										<>
											<p>Items in your cart:</p>
											{cart.items.map((currentProduct, idx) => (
												<h1 key={idx}>Item ID: {currentProduct.id}</h1>
											))}

											<h1>Total: {cart.getTotalCost().toFixed(2)}</h1>
											<button className="btn btn-success" onClick={checkout}>Purchase</button>
										</>
										:
										<h1>There are no items in your cart!</h1>
									}
									<div>Modal body</div>
								</div>
							</div>
							<div>
								<button onClick={(evt) => { handleLogout(evt) }} className="btn text-light border border-info rounded">Logout</button>
							</div>
						</div>
					</nav>
				)

			}
		</>
	);
};
