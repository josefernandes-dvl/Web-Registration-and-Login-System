// --- IMPORTAÇÕES ---
import { useEffect, useState } from 'react'; // Hooks para efeitos colaterais e gerenciamento de estado.
import { useNavigate, useParams } from 'react-router-dom'; // Hooks para navegação e captura de parâmetros da URL.
import api from '../../services/api'; // Importa a configuração da API.
import './stylePerguntaSecreta.css'; // Importa os estilos.

// --- COMPONENTE PerguntaSecreta ---
function PerguntaSecreta() {
    // --- HOOKS ---
    const navegar = useNavigate(); // Inicializa a função de navegação.
    const { id } = useParams(); // Captura o 'id' do usuário da URL (ex: /PerguntaSecreta/123).

    // --- ESTADOS DO COMPONENTE ---
    const [pergunta, setPergunta] = useState(''); // Armazena a pergunta secreta a ser exibida.
    const [tentativaResposta, setTentativaResposta] = useState(''); // Armazena a resposta digitada.
    const [mensagem, setMensagem] = useState(''); // Armazena mensagens de feedback.
    const [isLoading, setIsLoading] = useState(false); // Controla o estado de "carregando".
    const [isSuccess, setIsSuccess] = useState(false); // Controla o estilo da mensagem (sucesso/erro).

    // --- EFEITOS (useEffect) ---
    // Executa assim que o componente é montado.
    useEffect(() => {
        // Busca a pergunta secreta que foi salva no localStorage na etapa anterior.
        const perguntaSalva = localStorage.getItem('pergunta');
        if (perguntaSalva) {
            setPergunta(perguntaSalva); // Se encontrou, define no estado para exibição.
        } else {
            // Se não encontrou, exibe um erro e redireciona de volta.
            setMensagem("Erro: Pergunta não encontrada. A redirecionar...");
            setTimeout(() => navegar('/RecuperarSenha'), 2000);
        }
    }, [navegar]); // O efeito depende da função 'navegar'.

    // --- FUNÇÕES ---
    // Envia a requisição para verificar se a resposta secreta está correta.
    async function verificarResposta(e) {
        e.preventDefault();
        if (!tentativaResposta) {
            setMensagem("Por favor, preencha a sua resposta.");
            setIsSuccess(false);
            return;
        }

        setIsLoading(true); // Ativa o "carregando".
        setMensagem('');
        setIsSuccess(false);

        try {
            // --- REQUISIÇÃO À API ---
            // Envia o ID do usuário e a resposta para o backend.
            const respostaApi = await api.post('/verificar-resposta', {
                id: id,
                tentativaResposta: tentativaResposta
            });

            if (respostaApi.data.sucesso) {
                // Se a resposta estiver correta...
                setIsSuccess(true);
                setMensagem('Resposta correta! Redirecionando...');

                // Aguarda 2 segundos e navega para a página de mudança de senha.
                setTimeout(() => {
                    navegar(`/MudarSenha/${id}`);
                }, 2000);
            }
        } catch (error) {
            // Se a resposta estiver errada ou houver outro erro...
            setMensagem(error.response?.data?.mensagem || 'Ocorreu um erro.');
            setIsLoading(false); // Para o "carregando".
        }
    }

    // --- RENDERIZAÇÃO DO COMPONENTE ---
    return (
        <div className='containerPerguntaSecreta'>
            {/* Formulário da Pergunta Secreta */}
            <form className='formPerguntaSecreta' onSubmit={verificarResposta}>
                <h1 id='h1PerguntaSecreta'>Pergunta Secreta</h1>
                {/* Exibe a pergunta carregada do localStorage. */}
                <p className='pergunta-exibida'>{pergunta || "A carregar pergunta..."}</p>

                {/* Input para a resposta */}
                <input
                    placeholder='A sua Resposta' name='resposta'
                    type='text'
                    value={tentativaResposta}
                    onChange={(e) => setTentativaResposta(e.target.value)}
                    onFocus={() => { setMensagem(''); setIsSuccess(false); }} // Limpa mensagem ao focar.
                    required
                />

                {/* Botão de Confirmação */}
                <button id='butaoConfirma' type='submit' disabled={isLoading}>
                    {isLoading ? 'A verificar...' : 'Confirmar Resposta'}
                </button>

                {/* Exibe a mensagem de feedback com a classe de estilo correta. */}
                {mensagem && (
                    <p className={isSuccess ? "mensagem-sucesso" : "mensagem-erro"}>
                        {mensagem}
                    </p>
                )}
            </form>
        </div>
    );
}

export default PerguntaSecreta;