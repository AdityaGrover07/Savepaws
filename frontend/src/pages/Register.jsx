import { useState } from "react";
import axios from "axios";
import "../styles/register.css";
import { API_ROOT } from "../api-config";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const formSchema = yup.object().shape({
    password: yup
      .string()
      .required("Password is mandatory")
      .min(6, "Password must be at 6 char long"),
    confirmPwd: yup
      .string()
      .required("Password is mandatory")
      .oneOf([yup.ref("password")], "Password does not match"),
    name: yup
      .string()
      .required("Name is mandatory")
      .min(6, "Name must be at 6 char long"),
    email: yup.string().required("Email is required"),
    checkBox: yup.bool().oneOf([true], "Checkbox selection is required"),
  });

  const formOptions = { resolver: yupResolver(formSchema) };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const formSubmit = (data) => {
    newUser(data);
  };

  const newUser = async (data) => {
    try {
      const res = await axios.post(`${API_ROOT}/user/register`, {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      console.log(res.status, res.data);
      if (res.status === 200) navigate("/login");
    } catch (error) {
      console.log("error");
      setError(error);
    }
  };

  return (
    <div id="Register" className="container-fluid m-0 p-0 d-flex">
      <div className="image-div d-none d-md-block">
        <img
          className="img-fluid mx-auto h-100"
          src="../assets/register/login.jpg"
          alt="animal help"
        />
      </div>
      <div className="content-div container">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="card h-100">
            <div className="card-body">
              <h2 className="text-uppercase text-center mb-5">
                Create an account
              </h2>
              {error.length ? (
                <div class="alert alert-danger" role="alert">
                  {error}
                </div>
              ) : (
                <div></div>
              )}

              <form onSubmit={handleSubmit(formSubmit)}>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    {...register("name")}
                    className={`form-control form-control-lg ${
                      errors.name ? "is-invalid" : ""
                    }`}
                  />

                  <label className="form-label" for="form3Example1cg">
                    Your Name
                  </label>
                  {errors.name && (
                    <div class="alert alert-danger py-0" role="alert">
                      {errors.name.message}
                    </div>
                  )}
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    name="email"
                    {...register("email")}
                    className={`form-control form-control-lg ${
                      errors.email ? "is-invalid" : ""
                    }`}
                  />
                  <label className="form-label" for="form3Example3cg">
                    Your Email
                  </label>
                  {errors.email && (
                    <div class="alert alert-danger py-0" role="alert">
                      {errors.email.message}
                    </div>
                  )}
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    name="password"
                    {...register("password")}
                    className={`form-control form-control-lg ${
                      errors.password ? "is-invalid" : ""
                    }`}
                  />
                  <label className="form-label" for="form3Example4cg">
                    Password
                  </label>
                  {errors.password && (
                    <div class="alert alert-danger py-0" role="alert">
                      {errors.password.message}
                    </div>
                  )}
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    {...register("confirmPwd")}
                    className={`form-control form-control-lg ${
                      errors.confirmPwd ? "is-invalid" : ""
                    }`}
                  />
                  <label className="form-label" for="form3Example4cdg">
                    Confirm password
                  </label>
                  {errors.confirmPwd && (
                    <div class="alert alert-danger py-0" role="alert">
                      {errors.confirmPwd.message}
                    </div>
                  )}
                </div>

                <div className="form-check d-flex justify-content-center mb-3">
                  <input
                    {...register("checkBox")}
                    className={`form-check-input me-2 ${
                      errors.checkBox ? "is-invalid" : ""
                    }`}
                    type="checkbox"
                    name="checkBox"
                  />
                  <label className="form-check-label" for="form2Example3g">
                    I agree all statements in
                    <a href="#!" className="text-body">
                      <u>Terms of service</u>
                    </a>
                  </label>
                </div>
                {errors.checkBox && (
                  <div class="alert alert-danger py-0" role="alert">
                    {errors.checkBox.message}
                  </div>
                )}

                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-success btn-block btn-lg gradient-custom-4 "
                  >
                    Register
                  </button>
                </div>

                <p className="text-center text-muted mt-3 mb-0">
                  Have already an account?
                  <a href="/login" className="fw-bold text-body">
                    <u>Login here</u>
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
