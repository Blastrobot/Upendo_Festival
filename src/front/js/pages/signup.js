import React from "react";
import { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setpassWord] = useState("");
  const [verifypassword, setverifypassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    actions.userSignup(email, password).then(navigate("/"));
  };

  useEffect(() => {
    store.token && store.token != "" && store.token != undefined;
  });

  return (
    <div className="container py-5 h-100">
      <form
        className="form-body"
        onSubmit={(e) => {
          password === verifypassword
            ? handleSubmit(e)
            : alert("the passwords do not match");
        }}
      >
        <div className=" row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white">
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Sign up!</h2>
                  <p className="text-white-50 mb-5">
                    Please enter a valid email and password
                    <br></br>
                    <span>
                      (password must be between 8 to 14 characters long)
                    </span>
                  </p>
                  <div className="form-outline form-white mb-4">
                    <input
                      value={email}
                      type="email"
                      id="typeEmailX"
                      onChange={(e) =>
                        setEmail(e.target.value.trim().toLowerCase())
                      }
                      className="form-control form-control-lg"
                    />
                    <label className="form-label">Email</label>
                  </div>
                  <div className="form-outline form-white mb-4">
                    <input
                      type="password"
                      id="typePasswordX"
                      value={password}
                      minLength="8"
                      maxLength="14"
                      required
                      onChange={(e) => setpassWord(e.target.value)}
                      className="form-control form-control-lg"
                    />
                    <label className="form-label">Password</label>
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="password"
                      id="typePasswordy"
                      value={verifypassword}
                      minLength="8"
                      maxLength="14"
                      required
                      onChange={(e) => setverifypassword(e.target.value)}
                      className="form-control form-control-lg"
                    />
                    <label className="form-label"> Confirm Password</label>
                  </div>

                  <button
                    className="btn btn-outline-light btn-lg px-5"
                    type="submit"
                  >
                    Sign up
                  </button>
                  <div className="d-flex justify-content-center text-center mt-4 pt-1">
                    <a href="#!" className="text-white">
                      <i className="fab fa-facebook-f fa-lg"></i>
                    </a>
                    <a href="#!" className="text-white">
                      <i className="fab fa-twitter fa-lg mx-4 px-2"></i>
                    </a>
                    <a href="#!" className="text-white">
                      <i className="fab fa-google fa-lg"></i>
                    </a>
                  </div>
                  <div className="disclaimer text-center pt-4">
                    You will be redirected to Login after you register
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
