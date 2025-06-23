import React, { useState, useEffect, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

// Componente do ícone de avatar padrão (sem alterações)
const AvatarIcon = ({ size = 90 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} style={{ marginBottom: '15px' }}>
    <circle cx="50" cy="50" r="50" fill="#e9ecef" />
    <circle cx="50" cy="40" r="18" fill="#adb5bd" />
    <path d="M 50,65 A 35,35 0 0,0 50,100 A 35,35 0 0,0 50,65" fill="#adb5bd" />
  </svg>
);

function MyProfilePage({ user, onLogout, onSave }) {
  // Estados para os campos do formulário (sem alterações)
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password ?? '');
  const [displayName, setDisplayName] = useState(user.name);

  // ALTERADO: O estado da imagem agora começa como nulo.
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  // Efeito para atualizar os dados se o objeto 'user' mudar
  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setPassword(user.password ?? '');
    setDisplayName(user.name);
  }, [user]);

  // NOVO: Efeito para carregar a foto específica do usuário.
  // Ele roda toda vez que o objeto 'user' muda.
  useEffect(() => {
    if (user && user.matricula) {
      // Cria a chave única para a foto do usuário (ex: 'userProfileImage_12345')
      const userImageKey = `userProfileImage_${user.matricula}`;
      const savedImage = localStorage.getItem(userImageKey);
      setProfileImage(savedImage); // Carrega a foto salva, se existir
    }
  }, [user]); // A dependência [user] garante que isso rode ao carregar o perfil de um novo usuário

  // Função de logout (sem alterações)
  const handleLogout = () => {
    if (typeof onLogout === 'function') {
        onLogout();
    }
  };

  // Função para salvar as alterações (sem alterações)
  const handleSave = (e) => {
    e.preventDefault();
    if (typeof onSave === 'function') {
      onSave({ ...user, name, email, password, profileImage });
    }
    setDisplayName(name);
  };

  // ALTERADO: A função de mudança de imagem agora salva usando a chave única do usuário.
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && user && user.matricula) { // Garante que temos um usuário com matrícula
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result;
        setProfileImage(imageDataUrl);

        // Cria a chave única e salva a foto nela
        const userImageKey = `userProfileImage_${user.matricula}`;
        localStorage.setItem(userImageKey, imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  // Função para acionar o clique no input de arquivo oculto (sem alterações)
  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  // Objeto de estilos para o componente (sem alterações)
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px 20px',
      backgroundImage: "linear-gradient(120deg, #d7e8fa22 0%, #468ee822 100%), url('') center center/cover no-repeat",
      backgroundAttachment: 'fixed',
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
    avatarContainer: {
        position: 'relative',
        cursor: 'pointer',
        marginBottom: '15px',
    },
    profileAvatar: {
        width: '90px',
        height: '90px',
        borderRadius: '50%',
        objectFit: 'cover',
        border: '3px solid #e9ecef',
    },
    hiddenFileInput: {
        display: 'none',
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
      backgroundColor: '#28a745',
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
      backgroundColor: '#fd7e14',
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
    <div style={styles.container}>
      <div style={styles.profileCard}>
        <div style={styles.cardHeader}>
          <h2 style={styles.userName}>{displayName}</h2>
          <p style={styles.userRole}>{user.permissao || user.role}</p>
        </div>

        <div style={styles.cardBody}>
          <div style={styles.cardContentWrapper}>

            <div style={styles.leftColumn}>

              <input
                type="file"
                style={styles.hiddenFileInput}
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/png, image/jpeg"
              />

              <div style={styles.avatarContainer} onClick={handleAvatarClick} title="Clique para alterar a foto">
                {profileImage ? (
                  <img src={profileImage} alt="Avatar" style={styles.profileAvatar} />
                ) : (
                  <AvatarIcon />
                )}
              </div>

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