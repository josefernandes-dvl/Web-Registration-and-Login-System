// --- IMPORTAÇÕES ---
import { useState } from 'react'; // Hook para gerenciar o estado do componente (email, mensagens, etc.).
import { useNavigate } from 'react-router-dom'; // Hook para navegar entre as páginas.
import api from '../../services/api'; // Importa a configuração da API.
import './styleRecuperarSenha.css'; // Importa os estilos da página.

// --- COMPONENTE RecuperarSenha ---
function RecuperarSenha() {
    // --- HOOKS ---
    const navegar = useNavigate(); // Inicializa a função de navegação.

    // --- ESTADOS DO COMPONENTE ---
    const [tentativaEmail, setTentativaEmail] = useState(''); // Armazena o email digitado pelo usuário.
    const [mensagem, setMensagem] = useState(''); // Armazena mensagens de feedback (sucesso ou erro).
    const [isLoading, setIsLoading] = useState(false); // Controla o estado de "carregando" do botão.
    const [isSuccess, setIsSuccess] = useState(false); // Controla se a mensagem é de sucesso (para estilização).
    const [mostrarBotaoHome, setMostrarBotaoHome] = useState(false); // Controla a exibição do botão "Home".

    // --- FUNÇÕES ---
    // Limpa as mensagens de feedback ao focar no input.
    function limparFeedback() {
        setMensagem('');
        setMostrarBotaoHome(false);
        setIsSuccess(false);
    }

    // Envia a requisição para buscar o usuário pelo email.
    async function buscaEmail(e) {
        e.preventDefault(); // Impede o recarregamento da página ao submeter o formulário.
        setIsLoading(true); // Ativa o estado de "carregando".
        limparFeedback();

        try {
            // --- REQUISIÇÃO À API ---
            // Envia o email para a rota '/buscaUsuario' no backend.
            const resposta = await api.post('/buscaUsuario', { tentativaEmail });
            const { sucesso, id, pergunta } = resposta.data;

            if (sucesso) {
                // Se o usuário for encontrado...
                setIsSuccess(true);
                setMensagem('Usuário encontrado! Redirecionando...');
                
                // Aguarda 2 segundos e navega para a página da pergunta secreta.
                setTimeout(() => {
                    localStorage.setItem('pergunta', pergunta); // Salva a pergunta no navegador.
                    navegar(`/PerguntaSecreta/${id}`); // Navega para a próxima etapa com o ID do usuário.
                }, 2000); 

            } else {
                // Caso a API retorne sucesso: false.
                setMensagem(`Este usuário não existe.`);
                setMostrarBotaoHome(true);
                setIsLoading(false);
            }
        } catch (error) {
            // Se a requisição falhar (ex: erro 404)...
            setMensagem(error.response?.data?.mensagem || 'Usuário não encontrado.');
            setMostrarBotaoHome(true);
            setIsLoading(false); // Para o carregamento.
        }
    }

    // --- RENDERIZAÇÃO DO COMPONENTE ---
    return (
        <div className='containerRecpSenha'>
            {/* Formulário de Recuperação de Senha */}
            <form className='formRecpSenha' onSubmit={buscaEmail}>
                <h1 id='h1RecpSenha'>Recuperação de Senha</h1>
                <p className="mensagem-instrucao">Digite seu e-mail para a recuperação de senha</p>
                {/* Input de Email */}
                <input
                    placeholder='Email'
                    type='email'
                    required
                    value={tentativaEmail}
                    onChange={e => setTentativaEmail(e.target.value)}
                    onFocus={limparFeedback} // Limpa mensagens ao focar.
                />
                {/* Botão de Confirmação */}
                <button id='butaoRecpSenha' type='submit' disabled={isLoading}>
                    {isLoading ? 'Confirmando...' : 'Confirmar'}
                </button>
                
                {/* Exibe a mensagem de feedback se ela existir. */}
                {mensagem && (
                    <p className={isSuccess ? "mensagem-sucesso" : "mensagem-erro"}>
                        {mensagem}
                    </p>
                )}
            </form>

            {/* Botão para voltar à Home, exibido condicionalmente. */}
            {mostrarBotaoHome && (
                <button type='button' className='butaoVoltarHomeRecSenha' onClick={() => navegar('/Home')}>Home</button>
            )}
        </div>
    );
}

export default RecuperarSenha;