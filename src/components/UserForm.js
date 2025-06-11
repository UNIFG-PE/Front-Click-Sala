import React, { useState } from 'react';

const UserForm = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: ''
  });

  const [mensagem, setMensagem] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nome || !formData.email || !formData.senha) {
      setMensagem('Preencha todos os campos!');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setMensagem('Usuário cadastrado com sucesso!');
        setFormData({ nome: '', email: '', senha: '' });
      } else {
        setMensagem('Erro ao cadastrar usuário.');
      }
    } catch (error) {
      console.error(error);
      setMensagem('Erro de rede.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nome:
        <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
      </label><br />
      <label>
        E-mail:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label><br />
      <label>
        Senha:
        <input type="password" name="senha" value={formData.senha} onChange={handleChange} required />
      </label><br />
      <button type="submit">Cadastrar Usuário</button>
      {mensagem && <p>{mensagem}</p>}
    </form>
  );
};

export default UserForm;
