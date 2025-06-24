// src/auth.js (versão atualizada)

const AUTH_KEY = 'oda_current_user';

// ✅ Função para realizar o login, agora salva o objeto do usuário
export function performLogin(userData) {
  if (!userData) return;
  localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
}

// ✅ Função que retorna o objeto do usuário logado (ou null)
export function getLoggedInUser() {
  const user = localStorage.getItem(AUTH_KEY);
  return user ? JSON.parse(user) : null;
}

// ✅ Função que verifica se há alguém logado
export function isLoggedIn() {
  return getLoggedInUser() !== null;
}

// Função de logout permanece a mesma
export function performLogout() {
  localStorage.removeItem(AUTH_KEY);
}