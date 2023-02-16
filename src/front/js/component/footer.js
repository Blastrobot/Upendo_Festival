import React, { Component } from "react";
import logo from "./../../img/logoFooter.png";

export const Footer = () => (
  <footer className="footer container-fluid bg-dark text-white">
    <div className="row d-flex justify-content-between">
      <div className="logo col-6">
        <img src={logo} width="250vh"></img>
      </div>
      <div className="rrss col-6 d-flex justify-content-end" width="50%">
        <a className="bi bi-instagram h4 my-auto mx-2 text-white" href=""></a>
        <a className="bi bi-twitter h4 my-auto mx-2  text-white" href=""></a>
        <a
          className="bi bi-facebook h4 my-auto ms-2 me-4  text-white"
          href=""
        ></a>
      </div>
    </div>
    <hr className="mt-0" />
    <div className="row d-flex justify-content-between">
      <div className="newsletter col-6 text-center">
        <h5>SUBSCRIBE TO OUR NEWSLETTER</h5>
        <div className="input-group mx-auto" style={{ width: "75%" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your Email"
          ></input>
          <div className="input-group-append">
            <button
              className="btn btn-light btn-outline-dark text-dark ms-1"
              type="button"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="contact col-6">
        <h5 className="text-center">CONTACT US</h5>
        <ul className="text-center">
          <p>Contact Email: contact@upendofest.com</p>
          <p>Contact Tel.: 691383648</p>
          <p>Contact Adress: Cl. Edison, 3, 28006 Madrid</p>
        </ul>
      </div>
    </div>
    <hr className="mt-0" />
    <div className="text-center d-flex justify-content-center">
      <a
        className="mx-2 text-white border-0"
        style={{ textDecoration: "none" }}
        href=""
      >
        Terms & conditions
      </a>
      <p> - </p>
      <a
        className="mx-2 text-white border-0"
        style={{ textDecoration: "none" }}
        href=""
      >
        Terms of use
      </a>
      <p> - </p>
      <a
        className="mx-2 text-white border-0"
        style={{ textDecoration: "none" }}
        href=""
      >
        Privacy policy
      </a>
      <p> - </p>
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
        <i className="bi bi-c-circle"></i> All Rigths Reserved Upendo Festival
      </p>
    </div>
  </footer>
);
