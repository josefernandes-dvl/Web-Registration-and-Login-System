// --- IMPORTAÇÕES ---
import { useNavigate } from 'react-router-dom'; // Hook para navegar entre as páginas.
import './styleAcessoUsuario.css'; // Importa os estilos da página.

// --- COMPONENTE AcessoUsuario ---
// Componente que mostra uma tela de sucesso após o login bem-sucedido do usuário.
function AcessoUsuario() {
  // --- HOOKS ---
  const navegar = useNavigate(); // Inicializa a função de navegação.

  // --- RENDERIZAÇÃO DO COMPONENTE ---
  return (
    // Container principal da página.
    <div className='containerAcesso'>
      {/* Formulário usado como um container para agrupar o conteúdo. */}
      <form className='formAcesso'>
        {/* Título da página. */}
        <h1 className='acessoH1'>Acesso Liberado ao Sistema de Cadastro e Login!</h1>
        {/* Agrupa os botões de navegação. */}
        <div className='botoesAcesso'>
          {/* Botão para navegar de volta para a Home. */}
          <button type='button' onClick={() => navegar('/Home')}>Home</button>
        </div>
        {/* Logo do sistema */}
        <img src="./src/assets/icone.png" alt="Logo do sistema" className="logoAcesso" />
      </form>
    </div>
  );
}

// Exporta o componente para ser usado em outras partes da aplicação.
export default AcessoUsuario;