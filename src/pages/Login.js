import React, { useState } from "react";
import "../style/custom.css";
import Logo from "../assets/logo.png";
import backgroundImage from "../assets/backG.jpg";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      setErro("Preencha todos os campos");
      return;
    }

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!validEmail.test(email)) {
      setErro("Insira um email válido");
      return;
    }

    if (email === "admin@ulife.com" && password === "admin123") {
      alert("Login como ADMIN");
      onLogin("ADMIN");
    } else if (email === "user@ulife.com" && password === "user123") {
      alert("Login como USUÁRIO");
      onLogin("USER");
    } else {
      setErro("Email ou senha inválidos");
    }
  };

  return (
    <div className="gradient">
      <div className="backG">
        <div
          className="backgroundImage"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="container">
            <img src={Logo} alt="ULife Logo" className="logoImage" />

            <div className="inputWrapper">
              <label htmlFor="email" className="formLabel">Email:</label>
              <input
                id="email"
                type="email"
                placeholder="professor@ulife.com.br"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErro("");
                }}
                className="input"
              />

              <label htmlFor="password" className="formLabel">Senha:</label>
              <input
                id="password"
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErro("");
                }}
                className="input"
              />

              {erro && <div className="erro">{erro}</div>}

              <div className="linkContainer">
                <button className="link" onClick={() => alert("Recuperar senha ainda não implementado")}>
                  Esqueci minha senha
                </button>
                <button className="link" onClick={() => alert("Cadastro ainda não implementado")}>
                  Ainda não tem conta? Cadastre-se
                </button>
              </div>
            </div>

            <button
              onClick={handleLogin}
              disabled={!email || !password}
              className="botao centeredButton"
              type="button"
            >
              <span className="textoBotao">Entrar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
