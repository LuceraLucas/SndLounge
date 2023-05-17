import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CadastroCliente from './components/CadastroCliente'
import Login from './components/Login'
import SongSearchForm from './components/SongSearchForm';
import SongLyrics from './components/SongLyrics';
import { Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      
        <header className='divMain'>
        <h1 className="titulo-laranja">SoundLounge</h1>
          <nav className='nav'>
            <ul className='menu'>
              <li className="menu_item"><Link className='menu_link' to="/">Home</Link></li>
              <li className="menu_item"><Link className='menu_link' to="/nossa-historia">Nossa História</Link></li>
              <li className="menu_item"><Link className='menu_link' to="/contatos">Contatos</Link></li>
              <li className="menu_item"><Link className='menu_link'to="/cadastro">Cadastre-se</Link></li>
              <li className="menu_item"><Link className='menu_link' to="/login">Login</Link></li>
            </ul>
          </nav>
          
        </header>
        
        <main className='MainPage'>
        <Routes className='Route'>
          <Route  path="/cadastro" element={<CadastroCliente  />} />
          
          <Route  path="/login" element={<Login  />} />
          
        </Routes>
        </main>

        <footer className='divMain'>
        
        </footer>
        
      
    </BrowserRouter>
  );
}

export default App;