import React, { useState } from 'react';

// Simulação de banco de dados
const mockUsers = [
  {
    matricula: '20230101',
    name: 'João Paulo (Admin)',
    email: 'admin@oda.com',
    password: 'admin123',
    permissao: 'Administrador'
  },
  {
    matricula: '20220215',
    name: 'Petros Barreto (Professor)',
    email: 'professor@oda.com',
    password: 'prof123',
    permissao: 'Professor',
  },
  { matricula: '20240330',
    name: 'Carla Dias',
    email: 'carla.dias@unifg.br',
    role: 'Aluno',
    password: '123',
    status: 'Pendente',
    qrcodeValue: '20240330'
  },
  { matricula: '20210520',
    name: 'Daniel Martins',
    email: 'daniel.martins@unifg.br',
    role: 'Aluno',
    password: '123',
    status: 'Inativo',
    qrcodeValue: '20210520'
  },
];

function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);

  const emailIsValid = /^\S+@\S+\.\S+$/.test(email);

  const handleEmailBlur = () => setEmailTouched(true);

  const handlePasswordKeyUp = (e) => {
    setCapsLockOn(e.getModifierState && e.getModifierState('CapsLock'));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    setEmailTouched(true);
    if (!emailIsValid) {
      setError('Digite um e-mail válido.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      const foundUser = mockUsers.find(user => user.email === email);
      if (foundUser && foundUser.password === password) {
        if (rememberMe) {
          localStorage.setItem('oda-login', JSON.stringify({ email, date: new Date() }));
        } else {
          localStorage.removeItem('oda-login');
        }
        setError('');
        onLoginSuccess(foundUser);
      } else {
        setError('E-mail ou senha inválidos. Tente novamente.');
      }
      setIsLoading(false);
    }, 1200);
  };

  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      // PLANO DE FUNDO modernizado com gradiente + imagem:
      background: "linear-gradient(120deg, #d7e8fa22 0%, #468ee822 100%), url('') center center/cover no-repeat",
      backgroundAttachment: 'fixed'
    },
    loginBox: {
      padding: '40px 32px 36px 32px',
      backgroundColor: 'white',
      borderRadius: '14px',
      boxShadow: '0 6px 30px rgba(50,110,160,0.12)',
      width: '100%',
      maxWidth: '410px',
      textAlign: 'center'
    },
    title: {
      color: '#18498d',
      fontSize: '28px',
      fontWeight: '700',
      marginBottom: '5px'
    },
    subtitle: {
      color: '#468ee8',
      fontSize: '17px',
      marginBottom: '26px'
    },
    inputGroup: {
      marginBottom: '19px',
      textAlign: 'left'
    },
    label: {
      fontWeight: 500,
      color: "#1a397d",
      marginBottom: '5px',
      marginLeft: '3px',
      fontSize: "15px",
      display: "block"
    },
    input: {
      width: '100%',
      padding: '13px 12px 13px 12px',
      fontSize: '16px',
      border: '1.6px solid #b6d6fa',
      borderRadius: '7px',
      boxSizing: 'border-box',
      outline: 'none',
      background: '#f6faff',
      fontWeight: 500,
      letterSpacing: 0.02,
      transition: 'border-color 0.19s, background 0.18s'
    },
    inputError: {
      borderColor: '#fa383e',
      backgroundColor: '#ffeeee'
    },
    pwdField: {
      display: 'flex',
      alignItems: 'center',
      background: '#f6faff',
      borderRadius: '7px',
      border: '1.6px solid #b6d6fa',
      boxSizing: 'border-box',
      padding: 0
    },
    showBtn: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      marginRight: '8px',
      marginLeft: '6px',
      padding: 0
    },
    pwdInput: {
      flex: 1,
      border: 'none',
      background: 'transparent',
      fontSize: '16px',
      padding: '13px 12px',
      outline: 'none',
      fontWeight: 500,
      letterSpacing: 0.02,
      color: "#274a77"
    },
    remember: {
      fontSize: '14px',
      color: '#468ee8',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      margin: '9px 0 14px 1px',
      userSelect: 'none'
    },
    button: {
      width: '100%',
      padding: '13px',
      fontSize: '18px',
      fontWeight: 'bold',
      color: 'white',
      backgroundColor: isLoading ? '#d3e8fa' : (isHovered ? '#3391f9' : '#2776d8'),
      border: 'none',
      borderRadius: '8px',
      cursor: isLoading ? 'not-allowed' : 'pointer',
      transition: 'background-color 0.28s',
      marginBottom: '10px'
    },
    error: {
      color: '#fa383e',
      marginTop: '11px',
      fontSize: '14px',
      minHeight: '17px',
      textAlign: 'center'
    },
    capsLock: {
      color: '#247bc9',
      fontSize: '13px',
      marginTop: '-7px',
      marginBottom: '8px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox} aria-label="Tela de login do ODA">
        <h2 style={styles.title}>Bem-vindo ao ODA</h2>
        <p style={styles.subtitle}>Faça login para continuar</p>
        <form onSubmit={handleSubmit} autoComplete="on" spellCheck="false">
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="login-email">E-mail</label>
            <input
              id="login-email"
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              autoFocus
              autoComplete="username"
              style={{
                ...styles.input,
                ...(emailTouched && !emailIsValid ? styles.inputError : {})
              }}
              onChange={e => { setEmail(e.target.value); setError(''); }}
              onBlur={handleEmailBlur}
              aria-label="E-mail"
              required
            />
          </div>
          {emailTouched && !emailIsValid && (
            <div style={styles.error}>Por favor, insira um e-mail válido.</div>
          )}

          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="login-pwd">Senha</label>
            <div style={styles.pwdField}>
              <input
                id="login-pwd"
                type={showPassword ? 'text' : 'password'}
                placeholder="Digite sua senha"
                value={password}
                autoComplete="current-password"
                style={styles.pwdInput}
                onChange={e => setPassword(e.target.value)}
                onKeyUp={handlePasswordKeyUp}
                aria-label="Senha"
                required
              />
              <button
                type="button"
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                style={styles.showBtn}
                onClick={() => setShowPassword(s => !s)}
                tabIndex={0}
              >
                {/* Ícone azul */}
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="none" viewBox="0 0 22 22">
                    <path fill="#2776d8" d="M11 5c-4.213 0-7.373 3.668-8.527 5.173a.948.948 0 0 0 0 1.154C3.627 12.832 6.787 16.5 11 16.5s7.373-3.668 8.527-5.173a.948.948 0 0 0 0-1.154C18.373 8.668 15.213 5 11 5zm0 9.167a3.334 3.334 0 1 1 0-6.667 3.334 3.334 0 0 1 0 6.667zm0-5.334a2 2 0 1 0 0 4.001 2 2 0 0 0 0-4Z"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="none" viewBox="0 0 22 22">
                    <path fill="#2776d8" d="M1.75 11.327c1.154-1.505 4.314-5.173 8.527-5.173 1.074 0 2.081.154 2.991.415l-1.289 1.289a3.34 3.34 0 0 0-3.008 4.621l-3.52 3.52c-1.435-1.514-3.366-3.972-4.13-4.672a.948.948 0 0 1 0-1.154zM19.158 19.158l-1.414-1.415-2.062-2.062C16.48 14.25 17.573 13.139 18.373 12.09c.833-1.083.833-1.841 0-2.924-.31-.405-1.227-1.47-2.53-2.591a9.507 9.507 0 0 0-2.09-1.388L15.25 3.243l-1.414-1.414L2.843 17.746 4.257 19.16l3.328-3.327c1.505.813 3.46 1.176 4.992 1.176 4.213 0 7.373-3.668 8.527-5.173a.948.948 0 0 0 0-1.154c-.513-.67-1.565-2.073-2.949-3.505l-1.032 1.032c.784.721 1.453 1.498 1.695 1.767.833 1.083.833 1.841 0 2.924-.8 1.049-1.893 2.16-2.928 3.142l2.061 2.06 1.414 1.414zm-8.158-7.159a2 2 0 0 0 2-2c0-.368-.053-.72-.148-1.057l2.108-2.108c.368.266.642.582.859.85-1.452 1.192-4.564 3.889-6.406 4.627z"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
          {capsLockOn && (
            <div style={styles.capsLock}>Caps Lock está ativado</div>
          )}

          <label style={styles.remember}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
              style={{ accentColor: "#2776d8", height: '15px', width: '15px' }}
            />
            Lembrar-me neste dispositivo
          </label>
          <button
            type="submit"
            style={styles.button}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            disabled={isLoading}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
          <div style={styles.error}>{error}</div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
