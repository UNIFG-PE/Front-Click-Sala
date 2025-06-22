import React, { useState } from 'react';

// Um ícone de avatar simples em SVG para deixar a página mais bonita
const AvatarIcon = () => (
  <svg viewBox="0 0 100 100" width="80" height="80" style={{ marginBottom: '15px' }}>
    <circle cx="50" cy="50" r="50" fill="#e9ecef" />
    <circle cx="50" cy="40" r="18" fill="#adb5bd" />
    <path d="M 50,65 A 35,35 0 0,0 50,100 A 35,35 0 0,0 50,65" fill="#adb5bd" />
  </svg>
);

// O componente continua recebendo as mesmas props: user, onLogout, e onSave
function MyProfilePage({ user, onLogout, onSave }) {
  
  // A lógica para editar os campos continua a mesma
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  // A função para salvar os dados continua a mesma
  const handleSave = (e) => {
    e.preventDefault();
    onSave({ ...user, name, email });
  };
  
  // ✅ ACRESCENTAMOS um novo conjunto de estilos para um visual profissional
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      padding: '40px 20px',
      backgroundColor: '#f0f2f5', // Fundo da página mais suave
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      minHeight: '80vh',
    },
    profileCard: {
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', // Sombra para dar profundidade
      width: '100%',
      maxWidth: '600px',
      overflow: 'hidden', // Garante que o header arredondado não vaze
    },
    cardHeader: {
      backgroundColor: '#007bff', // Um azul profissional para o cabeçalho
      color: 'white',
      padding: '25px',
      textAlign: 'center',
    },
    cardBody: {
      padding: '30px',
      textAlign: 'center',
    },
    userName: {
      margin: '0',
      fontSize: '24px',
      fontWeight: 'bold',
    },
    userRole: {
      margin: '5px 0 0',
      fontSize: '16px',
      opacity: '0.9',
    },
    form: {
      marginTop: '30px',
      textAlign: 'left',
    },
    formGroup: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      fontWeight: '600',
      marginBottom: '8px',
      color: '#495057', // Cor do texto mais suave
    },
    input: {
      width: '100%',
      padding: '12px',
      fontSize: '16px',
      border: '1px solid #ced4da',
      borderRadius: '6px',
      boxSizing: 'border-box',
    },
    readOnlyInput: {
      backgroundColor: '#e9ecef', // Fundo diferente para campos não-editáveis
      cursor: 'not-allowed',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '30px',
    },
    saveButton: {
       padding: '12px 25px',
       fontSize: '16px',
       fontWeight: 'bold',
       color: 'white',
       backgroundColor: '#28a745', // Verde para a ação principal (Salvar)
       border: 'none',
       borderRadius: '6px',
       cursor: 'pointer',
       transition: 'opacity 0.2s',
    },
    logoutButton: {
       padding: '12px 25px',
       fontSize: '16px',
       color: '#495057',
       backgroundColor: '#f8f9fa',
       border: '1px solid #ced4da',
       borderRadius: '6px',
       cursor: 'pointer',
       fontWeight: 'bold',
       transition: 'background-color 0.2s',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.profileCard}>
        {/* Cabeçalho colorido para dar destaque */}
        <div style={styles.cardHeader}>
            <h2 style={styles.userName}>{user.name}</h2>
            <p style={styles.userRole}>{user.permissao}</p>
        </div>
        
        {/* Corpo do cartão com o avatar e o formulário */}
        <div style={styles.cardBody}>
          <AvatarIcon />
          <form onSubmit={handleSave} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Matrícula</label>
              <input type="text" value={user.matricula} readOnly style={{...styles.input, ...styles.readOnlyInput}} />
            </div>
            
            <div style={styles.formGroup}>
              <label htmlFor="name" style={styles.label}>Nome Completo</label>
              <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} style={styles.input} />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>E-mail</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} />
            </div>

            {/* Botões com estilos diferentes para cada ação */}
            <div style={styles.buttonContainer}>
                <button type="button" onClick={onLogout} style={styles.logoutButton}>Sair</button>
                <button type="submit" style={styles.saveButton}>Atualizar Dados</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MyProfilePage;