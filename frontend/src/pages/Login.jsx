import "../styles/login.css";
import axios from "axios";
import { useState } from "react";
import { API_ROOT } from "../api-config";
import { useContext } from "react";
import { UserContext } from "../utils/userContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function Login() {
  const navigate = useNavigate();
  const { state, setState } = useContext(UserContext);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const formSchema = yup.object().shape({
    password: yup
      .string()
      .required("Password is mandatory")
      .min(6, "Password must be at 6 char long"),
    email: yup.string().required("Email is required"),
  });

  const formOptions = { resolver: yupResolver(formSchema) };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm(formOptions);

  const formSubmit = (data) => {
    login(data);
  };

  const login = async (data) => {
    console.log(data);
    try {
      const res = await axios.post(
        `${API_ROOT}/user/login`,
        {
          email: data.email,
          password: data.password,
        },
        { withCredentials: true }
      );

      if (res.status === 200) {
        setState({
          user: true,
          userID: res.data.userId,
          email: data.email,
          name: res.data.name,
        });

        navigate("/home");
      }
    } catch (error) {
      console.log("error");
      setError(error);
    }
  };

  return (
    <div id="Login" className="container-fluid m-0 p-0 d-flex">
      <div className="image-div">
        <img
          className="img-fluid mx-auto h-100"
          src="../assets/register/login.jpg"
          alt="animal help"
        />
      </div>
      <div className="content-div container">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="card h-100">
            <div className="card-body my-5">
              <h2 className="text-uppercase text-center mb-5">Welcome, User</h2>
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
                    type="email"
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

                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-success btn-block btn-lg"
                  >
                    Login
                  </button>
                </div>

                <h4 className="text-center my-4">OR, Login using</h4>
                <div className="form-outline mb-4">
                  <div className="text-center">
                    <button
                      type="button"
                      className="btn btn-link btn-floating mx-1"
                      style={{ fontSize: "xx-large", color: "green" }}
                    >
                      <i className="fab fa-google"></i>
                    </button>
                  </div>
                </div>

                <p className="text-center text-muted mt-5 mb-0">
                  Don't have an account?
                  <a href="/register" className="fw-bold text-body">
                    <u>Register here</u>
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
