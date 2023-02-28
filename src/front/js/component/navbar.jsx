import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	
	const handleSubmit = () => {
		actions.login(email, password).then(navigate("/"));
	};

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
								<a className="nav-link text-light" aria-current="page" href="#">Home</a>
								<a className="nav-link text-light" href="#">Artists</a>
								<a className="nav-link text-light" href="#">News</a>
								<Link to="/tickets" className="nav-link text-light">Tickets</Link>
							</div>
						</div>
						<div className="nav-item dropdown">
							<a className="nav-link text-light border border-info rounded" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
								Login
							</a>
							<div className="dropdown-menu">
								<form className="px-4 py-3">
									<div className="form-floating">
										<input type="email" className="form-control" id="loginemail" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} value={email} />
										<label htmlFor="loginemail" className="form-label">Email address</label>
									</div>
									<div className="form-floating">
										<input type="password" className="form-control" id="loginpassword" placeholder="password" aria-describedby="emailHelp" onChange={(e) => setPassword(e.target.value)} value={password} />
										<label htmlFor="loginpassword" className="form-label">Password</label>
										<div id="passwordHelp" className="form-text my-3 mx-3">We'll never share your password or ask for it.</div>
									</div>
									<hr className="dropdown-divider" />
									<button type="submit" onClick={handleSubmit} className="btn btn-outline-dark mt-3 mx-5">Submit</button>
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
								<a className="nav-link text-light" aria-current="page" href="#">Home</a>
								<a className="nav-link text-light" href="#">Artists</a>
								<a className="nav-link text-light" href="#">News</a>
								{store.admin == true ? (
									<Link to="/admin" className="nav-link text-light">Admin</Link>)
									:
									<></>
								}
								<Link to="/tickets" className="nav-link text-light">Tickets</Link>
							</div>
						</div>
						<div>
							<button onClick={() => actions.UserLogout()} className="btn btn-primary">Logout</button>
						</div>
					</div>
				</nav>
				)

			}
		</>
	);
};
