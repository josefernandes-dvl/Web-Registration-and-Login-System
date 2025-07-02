// --- IMPORTAÇÕES ---
import { useState } from 'react'; // Hook para gerenciar o estado dos inputs e mensagens.
import { useNavigate } from 'react-router-dom'; // Hook para navegar entre as páginas.
import api from '../../services/api'; // Importa a configuração da API.
import './styleCadastro.css'; // Importa os estilos da página.

// --- COMPONENTE Cadastro ---
// Primeira etapa do processo de cadastro de usuário.
function Cadastro() {
    // --- HOOKS ---
    const navegar = useNavigate();

    // --- ESTADOS DO COMPONENTE ---
    const [nome, setNome] = useState(''); // Armazena o nome digitado.
    const [email, setEmail] = useState(''); // Armazena o email digitado.
    const [senha, setSenha] = useState(''); // Armazena a senha digitada.
    const [mensagem, setMensagem] = useState(''); // Armazena mensagens de feedback (erro/sucesso).
    const [isSuccess, setIsSuccess] = useState(false); // Define se a mensagem é de sucesso (para estilização).
    const [mostrarBotaoHome, setMostrarBotaoHome] = useState(false); // Controla a exibição do botão "Home".
    const [isLoading, setIsLoading] = useState(false); // Controla o estado de "carregando" do botão.

    // Pega o perfil ('adm' ou 'usuario') definido na Home e salvo no localStorage.
    const perfil = localStorage.getItem('perfil') || 'usuario';

    // --- FUNÇÕES ---
    // Limpa as mensagens de feedback ao focar em um input.
    function limparFeedback() {
        setMensagem('');
        setMostrarBotaoHome(false);
        setIsSuccess(false);
    }

    // Envia os dados iniciais do cadastro para a API.
    async function proximaEtapa(e) {
        e.preventDefault(); // Impede o recarregamento da página ao submeter o formulário.
        limparFeedback();
        setIsLoading(true);

        try {
            // --- REQUISIÇÃO À API ---
            // Envia uma requisição POST para a rota '/usuarios' para criar um novo usuário.
            const response = await api.post('/usuarios', {
                nome: nome,
                senha: senha,
                email: email,
                perfil: perfil // Envia o perfil escolhido.
            });

            const novoUsuario = response.data;
            // Navega diretamente para a segunda etapa do cadastro, passando o ID do novo usuário na URL.
            navegar(`/Cadastro2/${novoUsuario.id}`);

        } catch (error) {
            // Em caso de erro (ex: email já cadastrado), exibe a mensagem retornada pela API.
            const errorMsg = error.response?.data?.mensagem || 'Erro ao cadastrar. Tente novamente.';
            setMensagem(errorMsg);
            // Se o erro for de conflito (409), mostra o botão para voltar à Home.
            if (error.response?.status === 409) {
                setMostrarBotaoHome(true);
            }
            setIsLoading(false); // Para o estado de "carregando".
        }
    }

    // --- RENDERIZAÇÃO DO COMPONENTE ---
    return (
        <div className='containerCadastro'>
            {/* Formulário de Cadastro */}
            <form className='formCadastro' onSubmit={proximaEtapa}>
                <h1 id='h1Cadastro'>Cadastro</h1>
                
                {/* Input de Nome */}
                <input 
                    placeholder='Nome' name='nome' type='text' required 
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    onFocus={limparFeedback}
                />
                {/* Input de Email */}
                <input 
                    placeholder='Email' name='email' type='email' required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={limparFeedback}
                />
                {/* Input de Senha */}
                <input 
                    placeholder='Senha' name='senha' type='password' required 
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    onFocus={limparFeedback}
                />

                {/* Botão para ir para a próxima etapa */}
                <button id='butaoCadastro' type='submit' disabled={isLoading}>
                    {isLoading ? 'Aguarde...' : 'Próximo'}
                </button>

                {/* Exibe a mensagem de feedback com a classe de estilo correta. */}
                {mensagem && (
                    <p id='mensagemCadastro' className={isSuccess ? 'success' : 'error'}>
                        {mensagem}
                    </p>
                )}
            </form>

            {/* Botão para voltar à Home, exibido condicionalmente em caso de erro. */}
            {mostrarBotaoHome && (
                <button type='button' className='butaoVoltarHome' onClick={() => navegar('/Home')}>Home</button>
            )}
        </div>
    );
}

export default Cadastro;