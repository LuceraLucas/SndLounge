import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react'; // Importe o useState

import CadastroCliente from './components/CadastroCliente';
import Login from './components/Login';
import Home from './components/Home';
import ListaMusicas from './components/ListaMusicas';
import CadastroMusica from './components/CadastroMusica';
import SongSearchForm from './components/SongSearchForm';
import SongLyrics from './components/SongLyrics';
import { Link } from 'react-router-dom';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado do usuário logado
  const [email, setEmail] = useState(''); // Estado do email do usuário
  const [nome, setNome] = useState(''); // Estado do nome

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setNome('');
  };

  return (
    <BrowserRouter>
      <header className='divMain'>
        <h1 className="titulo-laranja">SoundLounge</h1>
        <nav className='nav'>
          <ul className='menu'>
            
            <li className="menu_item"><Link className='menu_link' to="/home">Home</Link></li>
            <li className="menu_item"><Link className='menu_link' to="/cadastro-musica">Cadastrar Música</Link></li>
            <li className="menu_item"><Link className='menu_link' to="/lista-musica">Minhas Músicas</Link></li>
            <li className="menu_item"><Link className='menu_link' to="/cadastro">Cadastre-se</Link></li>
            {isLoggedIn ? (
              // Exibe informações do usuário logado
              <li className="menu_item"><p className='menu_link'>{email}<button className='button' onClick={handleLogout} type="button">Log-out</button></p></li>
              
            ) : (
              // Exibe link de login
              <li className="menu_item"><Link className='menu_link' to="/login">Login</Link></li>
            )}
          </ul>
        </nav>
      </header>

      <main className='MainPage'>
      
        <Routes className='Route'>
          <Route path="/cadastro" element={<CadastroCliente />} />
          <Route path="/login" element={<Login setNome = {setNome} setEmail = {setEmail} setIsLoggedIn = {setIsLoggedIn} />} />
          <Route path="/cadastro-musica" element={<CadastroMusica email = {email} isLoggedIn = {isLoggedIn} />} />
          <Route path="/lista-musica" element={<ListaMusicas email = {email} isLoggedIn = {isLoggedIn} />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </main>

      <footer className='divMain'> 
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} SoundLounge. Todos os direitos reservados.</p>
        <p>Entre em contato: <a className="footer-link" href="mailto:contato@soundlounge.com">contato@soundlounge.com</a></p>
      </div>
      </footer>
    </BrowserRouter>
  );
}

export default App;