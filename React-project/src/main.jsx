// --- IMPORTAÇÕES ESSENCIAIS ---
import { StrictMode } from 'react'; // Ativa verificações e avisos adicionais para desenvolvimento.
import { createRoot } from 'react-dom/client'; // Importa a função para renderizar a aplicação React.
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importa os componentes para gerenciar as rotas de navegação.
import './index.css'; // Importa os estilos globais.

// --- IMPORTAÇÃO DAS PÁGINAS (COMPONENTES) ---
import Home from './pages/Home/Home';
import MenuUsuario from './pages/MenuUsuario/MenuUsuario';
import MenuAdm from './pages/MenuAdm/MenuAdm';
import Cadastro from './pages/Cadastro/Cadastro';
import Cadastro2  from './pages/Cadastro2/Cadastro2';
import Login from './pages/Login/Login';
import FuncoesAdm from './pages/FuncoesAdm/FuncoesAdm';
import RecuperarSenha from './pages/RecuperarSenha/RecuperarSenha';
import AcessoUsuario from './pages/AcessoUsuario/AcessoUsuario';
import PerguntaSecreta from './pages/PerguntaSecreta/PerguntaSecreta';
import MudarSenha from './pages/MudarSenha/MudarSenha';

// --- RENDERIZAÇÃO DA APLICAÇÃO ---
// Seleciona o elemento 'root' no HTML e renderiza a aplicação dentro dele.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* O BrowserRouter habilita a navegação baseada em URL. */}
    <BrowserRouter>
      {/* O Routes é o container para todas as rotas individuais. */}
      <Routes>
        {/* --- DEFINIÇÃO DAS ROTAS --- */}
        {/* Cada Route define um caminho (URL) e o componente que será exibido. */}
        <Route path="/Home" element={<Home />} />
        <Route path="/MenuUsuario" element={<MenuUsuario />} />
        <Route path="/MenuAdm" element={<MenuAdm />} />
        <Route path="/Cadastro" element={<Cadastro />} />
        {/* Rota com parâmetro: :userId é um valor dinâmico, como o ID do usuário. */}
        <Route path="/Cadastro2/:userId" element={<Cadastro2 />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/FuncoesAdm" element={<FuncoesAdm />} />
        <Route path="/RecuperarSenha" element={<RecuperarSenha />} />
        <Route path="/AcessoUsuario" element={<AcessoUsuario />} />
        <Route path="/PerguntaSecreta/:id" element={<PerguntaSecreta />} />
        <Route path="/MudarSenha/:id" element={<MudarSenha />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);