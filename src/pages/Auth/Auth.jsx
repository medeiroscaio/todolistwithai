import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Auth/Auth.css";

function Auth() {
  const navigate = useNavigate();

  const [name, setName] = useState({ value: "", dirty: false });
  const [email, setEmail] = useState({ value: "", dirty: false });
  const [password, setPassword] = useState({ value: "", dirty: false });

  const regexEmail = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

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
        "http://localhost:5000/api/users/register",
        {
          name: name.value,
          email: email.value,
          password: password.value,
        }
      );

      notifySuccess("Registrado com sucesso!");
      console.log(response.data);
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

  return (
    <div className="main">
      <input type="checkbox" id="chk" aria-hidden="true" />

      <div className="signup">
        <form onSubmit={handleRegister}>
          <label htmlFor="chk" aria-hidden="true">
            Sign up
          </label>
          <input
            type="text"
            name="txt"
            placeholder="User name"
            required
            value={name.value}
            onChange={(e) => setName({ value: e.target.value, dirty: true })}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={email.value}
            onChange={(e) => setEmail({ value: e.target.value, dirty: true })}
          />
          <input
            type="password"
            name="pswd"
            placeholder="Password"
            required
            value={password.value}
            onChange={(e) =>
              setPassword({ value: e.target.value, dirty: true })
            }
          />
          <button type="submit">Sign up</button>
        </form>
      </div>

      <div className="login">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label htmlFor="chk" aria-hidden="true">
            Login
          </label>
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="pswd" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Auth;
