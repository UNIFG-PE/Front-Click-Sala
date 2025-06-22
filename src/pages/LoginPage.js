import React, { useState } from 'react';

// ✅ 1. SIMULAÇÃO DE BANCO DE DADOS
// Em um projeto real, isso viria de uma API.
const mockUsers = [
  {
    matricula: '20230101',
    name: 'João Paulo (Admin)',
    email: 'admin@oda.com',
    password: 'admin123', // Senha do Admin
    permissao: 'Administrador'
  },
  {
    matricula: '20220215',
    name: 'Petros Barreto (Professor)',
    email: 'professor@oda.com',
    password: 'prof123', // Senha do Professor
    permissao: 'Professor'
  }
];

// ✅ 2. COMPONENTE COM NOVO DESIGN E LÓGICA DE SENHA
function LoginPage({ onLoginSuccess }) {
  // Estados para controlar os inputs e mensagens de erro
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Estado para controlar o efeito de "hover" no botão via JavaScript
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(''); // Limpa erros anteriores

    // Procura o usuário pelo e-mail no nosso "banco de dados"
    const foundUser = mockUsers.find(user => user.email === email);

    // Verifica se o usuário foi encontrado E se a senha está correta
    if (foundUser && foundUser.password === password) {
      console.log('Login bem-sucedido para:', foundUser.name);
      onLoginSuccess(foundUser); // Envia os dados do usuário para o App.js
    } else {
      // Se não encontrou ou a senha está errada, mostra uma mensagem de erro
      setError('E-mail ou senha inválidos. Tente novamente.');
    }
  };

  // ✅ 3. ESTILOS PARA "DAR VIDA" AOS ELEMENTOS (CSS-in-JS)
  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      backgroundColor: '#f0f2f5',
    },
    loginBox: {
      padding: '40px',
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '400px',
      textAlign: 'center',
    },
    title: {
      color: '#1c1e21',
      fontSize: '28px',
      fontWeight: '600',
      marginBottom: '10px',
    },
    subtitle: {
      color: '#606770',
      fontSize: '16px',
      marginBottom: '30px',
    },
    input: {
      width: '100%',
      padding: '14px',
      fontSize: '16px',
      border: '1px solid #dddfe2',
      borderRadius: '6px',
      marginBottom: '15px',
      boxSizing: 'border-box', // Garante que o padding não aumente a largura
    },
    button: {
      width: '100%',
      padding: '14px',
      fontSize: '18px',
      fontWeight: 'bold',
      color: 'white',
      backgroundColor: '#1877f2',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      // Efeito de hover dinâmico
      ...(isHovered && { backgroundColor: '#166fe5' })
    },
    error: {
      color: '#fa383e',
      marginTop: '15px',
      fontSize: '14px',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h2 style={styles.title}>Bem-vindo ao ODA</h2>
        <p style={styles.subtitle}>Faça login para continuar</p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button
            type="submit"
            style={styles.button}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Entrar
          </button>
        </form>

        {error && <p style={styles.error}>{error}</p>}

      </div>
    </div>
  );
}

export default LoginPage;