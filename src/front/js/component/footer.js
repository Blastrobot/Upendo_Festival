import React, { Component } from "react";
import logo from "./../../img/logoFooter.png";
import "../../styles/home.css";

export const Footer = () => (
  <footer className="footer mt-5 container-fluid bg-dark bg-opacity-50 text-white">
    <div className="row  d-flex justify-content-between">
      <div className="logo col-6">
        <img src={logo} width="250vh"></img>
      </div>
      <div className="rrss col-6 d-flex justify-content-end" width="50%">
        <a className="bi bi-instagram h4 my-auto mx-2 text-white" href="https://www.instagram.com" style={{ textDecoration: "none" }}></a>
        <a className="bi bi-twitter h4 my-auto mx-2 text-white" href="https://www.twitter.com" style={{ textDecoration: "none" }}></a>
        <a className="bi bi-facebook h4 my-auto ms-2 me-4 text-white" href="https://www.facebook.com" style={{ textDecoration: "none" }}></a>
      </div>
    </div>
    <hr className="" />
    <div className="d-flex justify-content-between">
      <div className="newsletter col-6 text-center">
        <h5 className="mb-4">SUBSCRIBE TO OUR NEWSLETTER</h5>
        <div className="input-group mx-auto" style={{ width: "75%" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your email"
          ></input>
          <div className="input-group-append">
            <button
              className="btn btn-light btn-outline-dark ms-1"
              type="button"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="contact col-6 text-center">
        <h5 className="mb-4">CONTACT US</h5>
        <div className="row d-flex justify-content-around">
          <span className="col-sm bi bi-envelope"><p>contact@upendofest.com</p></span>
          <span className="col-sm bi bi-telephone"><p>691383648</p></span>
          <span className="col-sm bi bi-geo-alt"><p>Calle Edison 3, 28006, Madrid</p></span>
        </div>
      </div>
    </div>
    <hr className=""/>
    <div className="text-center d-flex justify-content-center">
      <a
        className="mx-2 text-white border-0"
        style={{ textDecoration: "none" }}
        href=""
      >
        Terms & conditions
      </a>
      <a
        className="mx-2 text-white border-0"
        style={{ textDecoration: "none" }}
        href=""
      >
        Privacy policy
      </a>
      <a
        className="mx-2 text-white border-0"
        style={{ textDecoration: "none" }}
        href=""
      >
        Cookie policy
      </a>
    </div>
    <div className="text-center pb-1">
      <p>
        <i className="bi bi-c-circle"></i> All Rights Reserved <strong>UPENDO FESTIVAL</strong>
      </p>
    </div>
  </footer>
);
