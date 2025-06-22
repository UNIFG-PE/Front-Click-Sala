import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

// O componente AvatarIcon permanece o mesmo
const AvatarIcon = () => (
  <svg viewBox="0 0 100 100" width="80" height="80" style={{ marginBottom: '15px' }}>
    <circle cx="50" cy="50" r="50" fill="#e9ecef" />
    <circle cx="50" cy="40" r="18" fill="#adb5bd" />
    <path d="M 50,65 A 35,35 0 0,0 50,100 A 35,35 0 0,0 50,65" fill="#adb5bd" />
  </svg>
);

function MyProfilePage({ user, onLogout, onSave }) {
  // A lógica do componente (estados e handlers) permanece intacta
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password ?? '');
  const [displayName, setDisplayName] = useState(user.name);

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setPassword(user.password ?? '');
    setDisplayName(user.name);
  }, [user]);

  const handleLogout = onLogout || (() => { });
  const handleSave = (e) => {
    e.preventDefault();
    if (typeof onSave === 'function') {
      onSave({ ...user, name, email, password });
    }
    setDisplayName(name);
  };

  // Objeto de estilos com a cor do cabeçalho revertida
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px 20px',
      backgroundImage: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      minHeight: '100vh',
      boxSizing: 'border-box',
    },
    profileCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
      width: '100%',
      maxWidth: '850px',
      overflow: 'hidden',
    },
    cardHeader: {
      // MUDANÇA: Cor revertida para o azul original
      backgroundColor: '#007bff', 
      color: 'white',
      padding: '25px',
      textAlign: 'center',
    },
    cardBody: {
      padding: '30px 40px',
    },
    cardContentWrapper: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '40px',
    },
    leftColumn: {
        flex: '0 0 130px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    },
    rightColumn: {
        flex: '1',
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
      marginTop: '0',
      textAlign: 'left',
    },
    formRow: {
      display: 'flex',
      gap: '20px',
      marginBottom: '20px',
    },
    formGroup: {
      flex: 1,
    },
    label: {
      display: 'block',
      fontWeight: '600',
      marginBottom: '8px',
      color: '#495057',
    },
    input: {
      width: '100%',
      padding: '12px',
      fontSize: '16px',
      border: '1px solid #ced4da',
      borderRadius: '6px',
      boxSizing: 'border-box',
      transition: 'border-color 0.2s, box-shadow 0.2s',
    },
    readOnlyInput: {
      backgroundColor: '#e9ecef',
      cursor: 'not-allowed',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '15px',
      marginTop: '30px',
    },
    saveButton: {
      padding: '12px 25px',
      fontSize: '16px',
      fontWeight: 'bold',
      color: 'white',
      backgroundColor: '#28a745', // Verde mantido para a ação primária de salvar
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'opacity 0.2s',
    },
    logoutButton: {
      padding: '12px 25px',
      fontSize: '16px',
      fontWeight: 'bold',
      color: 'white',
      backgroundColor: '#fd7e14', // Laranja mantido para a ação secundária
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'opacity 0.2s',
    },
    qrcode: {
      marginTop: '20px',
    },
    qrLabel: {
      color: '#888',
      fontSize: '13px',
      marginTop: '7px'
    }
  };

  return (
    // O JSX não foi alterado
    <div style={styles.container}>
      <div style={styles.profileCard}>
        <div style={styles.cardHeader}>
          <h2 style={styles.userName}>{displayName}</h2>
          <p style={styles.userRole}>{user.permissao || user.role}</p>
        </div>
        
        <div style={styles.cardBody}>
          <div style={styles.cardContentWrapper}>
            
            <div style={styles.leftColumn}>
              <AvatarIcon />
              <div style={styles.qrcode}>
                <QRCodeCanvas value={user.matricula || user.email || ''} size={128} />
                <div style={styles.qrLabel}>Seu QR Code</div>
              </div>
            </div>

            <div style={styles.rightColumn}>
              <form onSubmit={handleSave} style={styles.form} autoComplete="off">
                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Matrícula</label>
                    <input type="text" value={user.matricula} readOnly style={{ ...styles.input, ...styles.readOnlyInput }} />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Permissão</label>
                    <input type="text" value={user.permissao || user.role} readOnly style={{ ...styles.input, ...styles.readOnlyInput }} />
                  </div>
                </div>

                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label htmlFor="name" style={styles.label}>Nome Completo</label>
                    <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label htmlFor="email" style={styles.label}>E-mail</label>
                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} />
                  </div>
                </div>

                <div style={{...styles.formRow, marginBottom: '0'}}>
                    <div style={styles.formGroup}>
                        <label htmlFor="password" style={styles.label}>Senha</label>
                        <input id="password" type="password" value={password} placeholder="••••••••" readOnly style={{ ...styles.input, ...styles.readOnlyInput }} />
                    </div>
                </div>

                <div style={styles.buttonContainer}>
                  <button type="button" onClick={handleLogout} style={styles.logoutButton}>Sair</button>
                  <button type="submit" style={styles.saveButton}>Atualizar Dados</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MyProfilePage;