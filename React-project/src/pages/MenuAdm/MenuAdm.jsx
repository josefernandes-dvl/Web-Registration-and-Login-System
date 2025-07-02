// --- IMPORTAÇÕES ---
import { useNavigate } from 'react-router-dom'; // Importa o hook para navegação.
import './styleMenuAdm.css'; // Importa os estilos da página.

// --- COMPONENTE MenuAdm ---
// Define o componente que exibe o menu de opções para o administrador.
function MenuAdm() {
    // --- HOOKS ---
    const navegar = useNavigate(); // Inicializa a função de navegação.

    // Armazena no Banco De Dados temporário do navegador o tipo do perfil
    const perfil = 'adm'
    localStorage.setItem('perfil', perfil);

    // --- RENDERIZAÇÃO DO COMPONENTE ---
    // Renderiza a página, que é um menu de navegação simples para o administrador.
    return (
        <div className='containerMenuAdm'>
            {/* Formulário usado como container para o conteúdo do menu */}
            <form className='formMenuAdm'>
                <h1 id='h1MenuAdm'>Menu Adm</h1>
                {/* Agrupamento dos botões de navegação. */}
                <div className='botoesMenuAdm'>
                    {/* Cada botão utiliza a função 'navegar' para redirecionar o administrador. */}
                    {/* Estes botões levam para funcionalidades que podem ser diferentes da visão do usuário comum. */}
                    <button type='button' onClick={() => navegar('/Cadastro')}>Cadastro</button>
                    <button type='button' onClick={() => navegar('/Login')}>Login</button>
                    <button type='button' onClick={() => navegar('/RecuperarSenha')}>Recuperação de Senha</button>
                    {/* Botão para retornar à página inicial */}
                    <button type='button' id='voltarHomeMenuAdm' onClick={() => navegar('/Home')}>Voltar ao Home</button>
                </div>
            </form>
        </div>
    );
}

export default MenuAdm;