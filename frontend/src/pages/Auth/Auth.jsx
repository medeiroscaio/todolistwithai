import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Auth/Auth.css";
import { localURL } from "../assets/httpService";

function Auth() {
  const navigate = useNavigate();

  const [name, setName] = useState({ value: "", dirty: false });
  const [email, setEmail] = useState({ value: "", dirty: false });
  const [password, setPassword] = useState({ value: "", dirty: false });

  const regexEmail = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const resetFields = () => {
    setName({
      value: "",
      dirty: false,
    });
    setEmail({
      value: "",
      dirty: false,
    });
    setPassword({
      value: "",
      dirty: false,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const fields = [name, email, password];

    if (fields.some((field) => field.value.trim() === "")) {
      notifyError("Por favor, preencha todos os campos.");
      return;
    }

    if (!regexEmail.test(email.value)) {
      notifyError("Digite um email válido.");
      return;
    }

    try {
      const response = await axios.post(
        `http://${localURL}:5000/api/users/register`,
        {
          name: name.value,
          email: email.value,
          password: password.value,
        }
      );

      notifySuccess("Registrado com sucesso!");
      console.log(response.data);
      resetFields();
      //navigate login aqui
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data.error);
      } else {
        console.log("Erro desconhecido", error);
      }
      notifyError("Erro no registro, tente novamente.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const fields = [email, password];

    if (fields.some((field) => field.value.trim() === "")) {
      notifyError("Por favor, preencha todos os campos.");
      return;
    }

    if (!regexEmail.test(email.value)) {
      notifyError("Digite um email válido.");
      return;
    }

    try {
      const { data } = await axios.post(
        `http://${localURL}:5000/api/users/login`,
        {
          email: email.value,
          password: password.value,
        },
        { withCredentials: true }
      );
      localStorage.setItem("userName", data.name);
      localStorage.setItem("userEmail", data.email);
      localStorage.setItem("userImage", data.image);

      notifySuccess(data.message);
      setTimeout(() => navigate("/tasks"), 1000);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        notifyError(error.response.data.message);
      } else {
        notifyError("Erro no login, tente novamente.");
      }
    }
  };

  return (
    <div className="main-container">
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />

        <div className="signup">
          <form onSubmit={handleRegister} noValidate>
            <label htmlFor="chk" aria-hidden="true">
              Sign up
            </label>
            <input
              type="text"
              name="txt"
              placeholder="Username"
              value={name.value}
              className="auth-input"
              onChange={(e) => setName({ value: e.target.value, dirty: true })}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email.value}
              className="auth-input"
              onChange={(e) => setEmail({ value: e.target.value, dirty: true })}
            />
            <input
              type="password"
              name="pswd"
              placeholder="Password"
              value={password.value}
              className="auth-input"
              onChange={(e) =>
                setPassword({ value: e.target.value, dirty: true })
              }
            />
            <button className="auth-button" type="submit">
              Sign up
            </button>
          </form>
        </div>

        <div className="login">
          <form onSubmit={handleLogin} noValidate>
            <label htmlFor="chk" aria-hidden="true">
              Login
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email.value}
              className="auth-input"
              onChange={(e) => setEmail({ value: e.target.value, dirty: true })}
            />
            <input
              type="password"
              name="pswd"
              placeholder="Password"
              value={password.value}
              className="auth-input"
              onChange={(e) =>
                setPassword({ value: e.target.value, dirty: true })
              }
            />
            <button className="auth-button" type="submit">
              Login
            </button>
          </form>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
}

export default Auth;
