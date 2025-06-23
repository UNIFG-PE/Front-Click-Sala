import React, { useState } from 'react';
import './App.css';
import './pages/faq'

// Importação dos componentes
import Header from './components/Header';
import Footer from './components/Footer';

// Importação das páginas
import HomePage from './pages/HomePage';
import RoomsPage from './pages/RoomsPage';
import MyReservationsPage from './pages/MyReservationsPage';
import CadastroUsuarioPage from './pages/CadastroUsuarioPage';
import SignIn from './pages/SignIn';
import FAQ from './pages/faq'; // Importe a página de FAQ

function App() {
  // O estado continua controlando qual página é exibida
  const [currentPage, setCurrentPage] = useState('home');

  // ADICIONADO: Função centralizada para ser chamada pelos componentes filhos
  // Esta função será passada como uma "prop" para o Header
  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  // A função que renderiza a página correta com base no estado
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'salas':
        return <RoomsPage />;
      case 'reservas':
        return <MyReservationsPage />;
      case 'cadastro-usuario':
        return <SignIn />;
      case 'cadastro':
        return <CadastroUsuarioPage />;
      // ADICIONADO: Caso para a página de FAQ, que estava faltando na lógica
      case 'faq':
        return <FAQ/>;
      default:
        return <HomePage />;
    }
  };

  // REMOVIDO: O React.useEffect com o listener global foi removido.
  // A navegação agora é controlada de forma explícita através de props.

  return (
    <div className="App">
      {/* MODIFICADO: Passando a função 'handleNavigate' como uma prop chamada 'onNavigate' para o Header */}
      <Header onNavigate={handleNavigate} />
      
      <main className="main-content">
        {renderPage()}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;