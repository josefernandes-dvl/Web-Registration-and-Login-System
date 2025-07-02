// --- IMPORTAÇÕES ---
import { useNavigate } from 'react-router-dom'; // Importa o hook para navegação.
import './styleHome.css'; // Importa os estilos da página.

// --- COMPONENTE Home ---
// Define o componente da página inicial, onde o usuário escolhe o perfil de acesso.
function Home() {
    // --- HOOKS ---
    const navegar = useNavigate(); // Inicializa a função de navegação.

    // --- RENDERIZAÇÃO DO COMPONENTE ---
    return (
        <div className='containerHome'>
            {/* Formulário usado como container para o conteúdo */}
            <form className='formHome'>
                <h1 id='h1Home'>Sistema de Cadastro e Login</h1>
                {/* Div para agrupar os botões de escolha de perfil. */}
                <div className='botoesHome'>
                    {/* Botão para o perfil de usuário. Ao clicar, chama a função 'escolherPerfil' passando 'usuario'. */}
                    <button type='button' onClick={() => navegar('/MenuUsuario')}>Menu Usuário</button>
                    {/* Botão para o perfil de administrador. Ao clicar, chama a função 'escolherPerfil' passando 'adm'. */}
                    <button type='button' onClick={() => navegar('/MenuAdm')}>Menu Adm</button>
                </div>
                {/* Logo do sistema */}
                <img src="./src/assets/icone.png" alt="Logo do sistema" className="logoHome" />
            </form>
        </div>
    );
}

export default Home;