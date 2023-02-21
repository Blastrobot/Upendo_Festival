import React from "react";
import { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/signup.css";
import { useFormik } from "formik";
import * as Yup from "yup";

export const Signup = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      typeEmailX: "",
      typePasswordX: "",
    },
    validationSchema: Yup.object({
      typeEmailX: Yup.string()
        .matches(
          /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/,
          "Correo electrónico inválido"
        )
        .required("Este campo es requerido"),
      typePasswordX: Yup.string()
        .min(6, "Debe tener al menos 6 caracteres")
        .max(15, "Debe tener máximo 15 caracteres")
        .matches(
          /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,15}$/,
          "La contraseña deber tener 6 a 15 caracteres, 1 mayúscula, 1 minúscula y 1 número. No puede tener caracteres especiales"
        )
        .required("Este campo es requerido"),
    }),
    onSubmit: (values) => {
      actions.userSignup(values.typeEmailX, values.typePasswordX);
      navigate("/");
    },
  });

  useEffect(() => {
    store.token && store.token != "" && store.token != undefined;
  });

  return (
    <div className="container py-5 h-100">
      <form className="form-body" onSubmit={formik.handleSubmit}>
        <div className=" row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white">
              <div className="body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <img
                    className="logo text-center"
                    src="https://res.cloudinary.com/dnqtyejtc/image/upload/v1676115484/logo_solo_mtudzh.png"
                  ></img>
                  <h4 className="fw-bold mb-2 text-uppercase">Sign up!</h4>
                  <p className="text-white-50 mb-5">
                    Please enter a valid email and password
                    <br></br>
                    <span>
                      (password must be between 6 to 14 characters long and must
                      contain 1 uppercase and 1 lowercase.)
                    </span>
                  </p>
                  <div className="form-outline form-white mb-4">
                    <input
                      type="email"
                      id="typeEmailX"
                      name="typeEmailX"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.typeEmailX}
                      className="form-control form-control-lg"
                    />
                    {formik.touched.typeEmailX && formik.errors.typeEmailX ? (
                      <div className="text-danger">
                        {formik.errors.typeEmailX}
                      </div>
                    ) : null}
                    <label className="form-label">Email</label>
                  </div>
                  <div className="form-outline form-white mb-4">
                    <input
                      type="password"
                      id="typePasswordX"
                      name="typePasswordX"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.typePasswordX}
                      className="form-control form-control-lg"
                    />
                    {formik.touched.typePasswordX &&
                    formik.errors.typePasswordX ? (
                      <div className="text-danger">
                        {formik.errors.typePasswordX}
                      </div>
                    ) : null}
                    <label className="form-label">Password</label>
                  </div>
                  <button className="btn btn-dark btn-lg px-5" type="submit">
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
