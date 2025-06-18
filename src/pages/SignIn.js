import React, { useState } from 'react';
import './SignIn.css'; 

const SignIn = () => {
  const [formData, setFormData] = useState({ //cria os estados dos imputs
    fullName: '',
    cpf: '',
    phoneNumber: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => { //atualiza os estados dos imputs
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {//previne o comportamento padrão do form e pega os dados do form
    e.preventDefault();
    console.log(formData);
  };

  return ( //html do form de cadastro
    <div className="sign-in">
      <h2>Cadastre-se</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Nome completo:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cpf">CPF:</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Telefone:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            pattern="^(\+?\d{1,3})?[-.\s]?\(?\d{2,3}\)?[-.\s]?\d{4,5}[-.\s]?\d{4}$"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            pattern="^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$"
            required
            minLength={8}
            title="A senha deve conter pelo menos 8 caracteres, incluindo uma letra, um número e um caractere especial."
          />
        </div>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default SignIn;
