import React, { useState } from 'react';
import './SignIn.css';

const SignIn = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    cpf: '',
    phoneNumber: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    // CPF: exatamente 11 dígitos numéricos
    if (!/^\d{11}$/.test(formData.cpf)) {
      newErrors.cpf = 'CPF deve conter exatamente 11 números.';
    }

    // Telefone: formato comum brasileiro
    if (!/^(\+?\d{1,3})?[\s-]?\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Telefone inválido. Ex: (11) 91234-5678';
    }

    // E-mail: formato padrão
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido.';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // limpa erro ao digitar
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log('Dados válidos:', formData);
    // Aqui você pode enviar os dados para o backend
  };

  return (
    <div className="sign-in-container">
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
            className={errors.cpf ? 'input-error' : ''}
          />
          {errors.cpf && <span className="error-text">{errors.cpf}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Telefone:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className={errors.phoneNumber ? 'input-error' : ''}
          />
          {errors.phoneNumber && <span className="error-text">{errors.phoneNumber}</span>}
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
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
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
    </div>
  );
};

export default SignIn;
