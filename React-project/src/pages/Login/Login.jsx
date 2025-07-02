// --- IMPORTAÇÕES ---
import { useState } from 'react'; // Hook para gerenciar o estado (email, senha, mensagens).
import { useNavigate } from 'react-router-dom'; // Hook para navegação.
import './styleLogin.css'; // Importa os estilos.
import api from '../../services/api'; // Importa a configuração da API.

// --- COMPONENTE Login ---
function Login() {
    // --- HOOKS ---
    const navegar = useNavigate();

    // --- ESTADOS DO COMPONENTE ---
    const [senha, setSenha] = useState(''); // Armazena a senha digitada.
    const [email, setEmail] = useState(''); // Armazena o email digitado.
    const [mensagem, setMensagem] = useState(''); // Armazena mensagens de feedback.
    const [isLoading, setIsLoading] = useState(false); // Controla o estado de "carregando".
    const [mostrarBotaoHome, setMostrarBotaoHome] = useState(false); // Controla a exibição de botões extras.

    // --- FUNÇÕES ---
    // Envia a requisição para validar as credenciais do usuário.
    async function fazerLogin(e) {
        e.preventDefault(); // Impede o recarregamento da página.
        setIsLoading(true);
        setMensagem('');

        try {
            // --- VALIDAÇÃO DE PERFIL ---
            // Pega o perfil ('adm' ou 'usuario') que o usuário escolheu na tela Home.
            const perfilEsperado = localStorage.getItem('perfil');

            if (!perfilEsperado) {
                // Se nenhum perfil foi escolhido, exibe erro.
                setMensagem('Erro: Perfil de acesso não definido. Volte para a Home.');
                setIsLoading(false);
                return;
            }

            // --- REQUISIÇÃO À API ---
            // Envia as credenciais para a rota '/login' no backend.
            const resposta = await api.post('/login', { email, senha });
            const { sucesso, perfil: perfilReal } = resposta.data; // Pega o perfil real do usuário do banco de dados.

            if (sucesso) {
                // --- COMPARAÇÃO DE PERFIS ---
                // Compara o perfil que o usuário tentou acessar com o perfil real dele.
                if (perfilReal === perfilEsperado) {
                    // SUCESSO: Os perfis são iguais, o acesso é permitido.
                    if (perfilReal === 'adm') {
                        navegar('/FuncoesAdm'); // Redireciona para as funções de ADM.
                    } else {
                        navegar('/AcessoUsuario'); // Redireciona para a área do usuário.
                    }
                } else {
                    // FALHA: Os perfis são diferentes, o acesso é negado.
                    setMensagem(`Tente um login de '${perfilEsperado}'.`);
                    setMostrarBotaoHome(true);
                }
            }
        } catch (error) {
            // Erro de credenciais inválidas vindo da API.
            setMensagem('Email ou senha inválidos.');
            setMostrarBotaoHome(true);
        }
        setIsLoading(false); // Finaliza o estado de carregamento.
    }

    // Limpa as mensagens de feedback.
    function limparFeedback() {
        setMensagem('');
        setMostrarBotaoHome(false);
    }

    // --- RENDERIZAÇÃO DO COMPONENTE ---
    return (
        <div className='containerLogin'>
            {/* Formulário de Login */}
            <form className='formLogin' onSubmit={fazerLogin}>
                <h1 id='h1Login'>Login</h1>
                {/* Input de Email */}
                <input placeholder='Email' type='email' required value={email} onChange={e => setEmail(e.target.value)} onFocus={limparFeedback}/>
                {/* Input de Senha */}
                <input placeholder='Senha' type='password' required value={senha} onChange={e => setSenha(e.target.value)} onFocus={limparFeedback} />
                {/* Botão de Entrar */}
                <button id='butaoLogin' type="submit" disabled={isLoading}>
                    {isLoading ? 'Entrando...' : 'Entrar'}
                </button>
                {/* Exibe a mensagem de feedback se ela existir. */}
                {mensagem && <p className='mensagemLogin'>{mensagem}</p>}
            </form>

            {/* Botão condicional para ir para a recuperação de senha. */}
            {mostrarBotaoHome && (
                <button type='button' className='butaoVoltarHomeLogin' onClick={() => navegar('/RecuperarSenha')}>Recuperar Senha</button>
            )}
        </div>
    );
}

export default Login;