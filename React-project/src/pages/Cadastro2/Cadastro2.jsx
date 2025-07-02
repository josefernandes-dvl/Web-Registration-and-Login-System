// --- IMPORTAÇÕES ---
import { useState, useEffect } from 'react'; // Hooks do React para estado e ciclo de vida.
import { useNavigate, useParams } from 'react-router-dom'; // Hooks para navegação e captura de parâmetros da URL.
import './styleCadastro2.css'; // Importa os estilos.
import api from '../../services/api'; // Importa a configuração da API.

// --- COMPONENTE Cadastro2 ---
// Define a segunda e última etapa do cadastro (pergunta e resposta secretas).
function Cadastro2() {
    // --- HOOKS ---
    const navegar = useNavigate();
    // O hook 'useParams' extrai o 'userId' da URL (ex: de "/Cadastro2/123", ele pega "123").
    const { userId } = useParams();

    // --- ESTADOS DO COMPONENTE ---
    const [pergunta, setPergunta] = useState(''); // Armazena o valor do input da pergunta.
    const [resposta, setResposta] = useState(''); // Armazena o valor do input da resposta.
    const [mensagem, setMensagem] = useState(''); // Armazena mensagens de feedback.
    const [isLoading, setIsLoading] = useState(false); // Controla o estado de "carregando".

    // --- EFEITOS (useEffect) ---
    // Executa assim que o componente é montado.
    useEffect(() => {
        // Verifica se a página foi carregada sem um ID de usuário na URL.
        if (!userId) {
            console.error("ERRO: A página Cadastro2 foi aberta sem um ID de usuário.");
            setMensagem("Erro: ID de usuário não encontrado. Voltando...");
            // Se não houver ID, redireciona o usuário de volta para a primeira etapa.
            setTimeout(() => navegar('/Cadastro'), 2000);
        }
    }, [userId, navegar]); // Dependências: o efeito roda se 'userId' ou 'navegar' mudarem.

    // --- FUNÇÕES DE EVENTO ---
    // Controla as mudanças no input da pergunta, limitando o número de caracteres.
    const handlePerguntaChange = (e) => {
        setPergunta(e.target.value.substring(0, 175));
    };

    // Controla as mudanças no input da resposta.
    const handleRespostaChange = (e) => {
        setResposta(e.target.value);
    };

    // --- FUNÇÕES DE API ---
    // Finaliza o cadastro enviando a pergunta e resposta para a API.
    async function finalizarCadastro() {
        // Validação simples para garantir que os campos não estão vazios.
        if (!pergunta || !resposta) {
            setMensagem('Por favor, preencha todos os campos.');
            return;
        }

        setIsLoading(true);
        setMensagem('');

        try {
            // --- REQUISIÇÃO À API ---
            // Envia uma requisição 'PUT' para ATUALIZAR o usuário existente com o ID fornecido.
            await api.put(`/usuarios/${userId}`, {
                pergunta: pergunta,
                resposta: resposta,
            });

            setMensagem('Cadastro finalizado com sucesso!');
            // Após 2 segundos, redireciona para a página de Login.
            setTimeout(() => navegar('/Login'), 2000);

        } catch (error) {
            setMensagem(error.response?.data?.mensagem || 'Erro ao finalizar o cadastro.');
            console.error("Erro ao tentar finalizar o cadastro:", error);
            setIsLoading(false); // Reativa o botão em caso de erro.
        }
    }

    // --- RENDERIZAÇÃO DO COMPONENTE ---
    return (
        <div className='containerCadastro2'>
            {/* Formulário da segunda etapa do Cadastro */}
            <form className='formCadastro2'>
                <h1 id='h1Cadastro2'>Cadastro</h1>

                {/* Grupo de input para a pergunta, incluindo o contador de caracteres. */}
                <div className="input-group">
                    <input
                        placeholder='Pergunta (ex: nome do seu pet?)'
                        name='pergunta' type='text'
                        value={pergunta}
                        onChange={handlePerguntaChange}
                    />
                    {/* Contador de caracteres para feedback visual. */}
                    <span className="char-counter">
                        {pergunta.length} / 175
                    </span>
                </div>

                {/* Input para a resposta secreta. */}
                <input
                    placeholder='Resposta'
                    name='resposta' type='text'
                    value={resposta}
                    onChange={handleRespostaChange}
                />

                {/* Botão para finalizar o cadastro. */}
                <button id='butaoCadastro2' type='button' onClick={finalizarCadastro} disabled={isLoading}>
                    {isLoading ? 'Finalizando...' : 'Finalizar Cadastro'}
                </button>

                {/* Exibição condicional da mensagem de feedback. */}
                {mensagem && (
                    <p id='mensagemCadastro2' className={mensagem.includes('sucesso') ? 'success' : 'error'}>
                        {mensagem}
                    </p>
                )}
            </form>
        </div>
    );
}

export default Cadastro2;