// --- IMPORTAÇÕES ---
import { useNavigate } from 'react-router-dom'; // Importa o hook para navegação.
import './styleMenuUsuario.css'; // Importa os estilos da página.

// --- COMPONENTE MenuUsuario ---
// Define o componente que exibe o menu de opções para o usuário comum.
function MenuUsuario() {
    // --- HOOKS ---
    const navegar = useNavigate(); // Inicializa a função de navegação.

    // Armazena no Banco De Dados temporário do navegador o tipo do perfil
    const perfil = 'usuario'
    localStorage.setItem('perfil', perfil);

    // --- RENDERIZAÇÃO DO COMPONENTE ---
    // Renderiza a página, que é um menu de navegação simples para usuários.
    return (
        <div className='containerMenuUsuario'>
            {/* Formulário usado como container para o conteúdo do menu */}
            <form className='formMenuUsuario'>
                <h1 id='h1MenuUsuario'>Menu Usuário</h1>
                {/* Agrupamento dos botões de navegação. */}
                <div className='botoesMenuUsuario'>
                    {/* Cada botão utiliza a função 'navegar' para redirecionar o usuário para a página correspondente. */}
                    <button type='button' onClick={() => navegar('/Cadastro')}>Cadastro</button>
                    <button type='button' onClick={() => navegar('/Login')} >Login</button>
                    <button type='button' onClick={() => navegar('/RecuperarSenha')}>Recuperação de Senha</button>
                    {/* Botão para retornar à página inicial */}
                    <button type='button' id='voltarHomeMenuUsuario' onClick={() => navegar('/Home')}>Voltar ao Home</button>
                </div>
            </form>
        </div>
    );
}

export default MenuUsuario;