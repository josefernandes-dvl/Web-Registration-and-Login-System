// --- IMPORTAÇÕES ---
import { useState } from 'react'; // Hook para gerenciar o estado (senhas, mensagens).
import { useNavigate, useParams } from 'react-router-dom'; // Hooks para navegação e captura de parâmetros da URL.
import './styleMudarSenha.css'; // Importa os estilos.
import api from '../../services/api'; // Importa a configuração da API.

// --- COMPONENTE MudarSenha ---
function MudarSenha() {
    // --- HOOKS ---
    const navegar = useNavigate(); // Inicializa a função de navegação.
    const { id } = useParams(); // Captura o 'id' do usuário da URL.

    // --- ESTADOS DO COMPONENTE ---
    const [senha1, setSenha1] = useState(''); // Armazena a nova senha.
    const [senha2, setSenha2] = useState(''); // Armazena a confirmação da nova senha.
    const [mensagem, setMensagem] = useState(''); // Armazena mensagens de feedback.
    const [isLoading, setIsLoading] = useState(false); // Controla o estado de "carregando".

    // --- FUNÇÕES ---
    // Limpa a mensagem de feedback ao focar em um input.
    function limparFeedback() {
        setMensagem('');
    }

    // Envia a requisição para alterar a senha.
    async function submitAlterarSenha(e) {
        e.preventDefault(); // Impede o recarregamento da página.

        // Validação: verifica se as senhas coincidem.
        if (senha1 !== senha2) {
            setMensagem('As senhas não coincidem.');
            return;
        }

        // Validação: verifica se a senha não está vazia.
        if (!senha1) {
            setMensagem('Por favor, insira uma nova senha.');
            return;
        }

        setIsLoading(true);
        setMensagem('');

        try {
            // --- REQUISIÇÃO À API ---
            // Envia uma requisição para a rota '/mudarSenha' com o ID e a nova senha.
            const respostaApi = await api.post('/mudarSenha', {
                id: id,
                NovaSenha: senha1
            });

            setMensagem('Senha alterada com sucesso! Redirecionando...');
            const perfil = respostaApi.data.perfil;
            // Define para qual menu redirecionar com base no perfil do usuário.
            const redirectPath = perfil === 'adm' ? '/MenuAdm' : '/MenuUsuario';
            // Aguarda 2 segundos e redireciona.
            setTimeout(() => navegar(redirectPath), 2000);

        } catch (error) {
            // Se houver um erro na API...
            setMensagem(error.response?.data?.mensagem || 'Ocorreu um erro ao alterar a senha.');
        } finally {
            // Este bloco é executado sempre, seja com sucesso ou erro.
            setIsLoading(false); // Para o estado de "carregando".
        }
    }

    // --- RENDERIZAÇÃO DO COMPONENTE ---
    return (
        <div className='containerMudarSenha'>
            {/* Formulário para Mudar Senha */}
            <form className='formMudarSenha' onSubmit={submitAlterarSenha}>
                <h1 id='h1MudarSenha'>Mudar Senha</h1>
                {/* Input para a nova senha */}
                <input placeholder='Nova Senha' type='password' required value={senha1}
                    onChange={e => setSenha1(e.target.value)}
                    onFocus={limparFeedback} />
                {/* Input para confirmar a nova senha */}
                <input placeholder='Confirmar Senha' type='password' required value={senha2}
                    onChange={e => setSenha2(e.target.value)}
                    onFocus={limparFeedback} />
                {/* Botão de Confirmação */}
                <button id='butaoMudarSenha' type="submit" disabled={isLoading}>
                    {isLoading ? 'Alterando...' : 'Confirmar'}
                </button>
                {/* Exibe a mensagem de feedback. */}
                {mensagem && <p className='feedback-message'>{mensagem}</p>}
            </form>
        </div>
    );
}

export default MudarSenha;