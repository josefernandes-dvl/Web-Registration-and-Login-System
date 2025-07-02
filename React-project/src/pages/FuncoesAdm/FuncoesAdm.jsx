// --- IMPORTAÇÕES ---
import { useNavigate } from 'react-router-dom'; // Hook para navegação.
import { useEffect, useState } from 'react'; // Hooks para gerenciamento de estado e ciclo de vida.
import Lixeira from '../../assets/lixeira.svg'; // Importa o ícone da lixeira.
import api from '../../services/api'; // Importa a configuração da API.
import './styleFuncoesAdm.css'; // Importa os estilos.

// --- COMPONENTE FuncoesAdm ---
// Página com as funcionalidades exclusivas do administrador.
function FuncoesAdm() {
    // --- HOOKS ---
    const navegar = useNavigate();

    // --- ESTADOS DO COMPONENTE ---
    const [usuarios, setUsuarios] = useState([]); // Armazena a lista de usuários vinda da API.
    const [nome, setNome] = useState(''); // Armazena o texto digitado no campo de busca.
    const [selecionado, setSelecionado] = useState(false); // Controla o estado (marcado/desmarcado) do checkbox "Ver Todos".

    // --- FUNÇÕES DE API ---
    // Busca a lista completa de usuários na API.
    async function listar_todos_usuarios() {
        const response = await api.get('/usuarios'); // Requisição GET para /usuarios.
        setUsuarios(response.data); // Atualiza o estado com os dados recebidos.
    }

    // Busca usuários pelo nome digitado.
    async function procurar_usuario_por_nome(e) {
        e.preventDefault(); // Impede o formulário de recarregar a página.
        setSelecionado(false); // Desmarca o "Ver Todos" ao iniciar uma busca específica.

        if (nome === '') {
            setUsuarios([]); // Se a busca estiver vazia, limpa a lista.
        } else {
            // Se houver um nome, busca na API passando o nome como parâmetro de query.
            const response = await api.get(`/usuarios?nome=${nome}`);
            setUsuarios(response.data);
        }
    }

    // Exclui um usuário.
    async function excluir_usuarios(id) {
        await api.delete(`/usuarios/${id}`); // Requisição DELETE para /usuarios/:id.
        // Após excluir, atualiza a lista para refletir a mudança.
        if (selecionado) {
            listar_todos_usuarios(); // Se "Ver Todos" estiver ativo, recarrega a lista completa.
        } else {
            // Caso contrário, limpa a lista (ou poderia recarregar a busca atual).
            setUsuarios([]);
        }
    }

    // --- FUNÇÕES DE EVENTO ---
    // Chamada quando o checkbox "Ver Todos" é clicado.
    async function handleSelecaoChange(isChecked) {
        setSelecionado(isChecked);
        if (isChecked) {
            await listar_todos_usuarios(); // Se marcou, busca todos.
        } else {
            setUsuarios([]); // Se desmarcou, limpa a lista.
        }
    }

    // --- EFEITOS (useEffect) ---
    // Executa uma vez quando o componente é montado.
    useEffect(() => {
        setUsuarios([]); // Inicia a página com a lista de usuários vazia.
    }, []); // O array vazio [] garante que este efeito só rode na montagem inicial.

    // --- RENDERIZAÇÃO DO COMPONENTE ---
    return (
        <div className='pagina-funcoes-adm'>
            {/* Barra de Navegação Superior */}
            <nav className="barra-navegacao">
                <div className="conteudo-barra">
                    {/* Formulário de Busca */}
                    <form className="formulario-busca" onSubmit={procurar_usuario_por_nome}>
                        <input className="campo-busca" placeholder='Nome' type='text' value={nome} onChange={e => setNome(e.target.value)} />
                        <button className="botao-busca" type="submit">Buscar</button>
                        {/* Checkbox "Ver Todos" */}
                        <div className="selecao-todos-users">
                            <input id="checkbox-customizado" type="checkbox" checked={selecionado} onChange={(e) => handleSelecaoChange(e.target.checked)} />
                            <label htmlFor="checkbox-customizado" className="label-customizada">
                                Ver Todos
                            </label>
                        </div>
                    </form>
                </div>
                {/* Botões de Navegação (Home) */}
                <div className='botoes-fun-adm'>
                    <button type="button" onClick={() => navegar('/Home')}>Home</button>
                </div>
                <img src="./src/assets/icone.png" alt="Logo do sistema" className="logo-adm" />
            </nav>

            {/* Container onde os cards de usuário serão exibidos */}
            <main className='card-geral'>
                {/* Mapeia o array 'usuarios' para criar um card para cada usuário. */}
                {usuarios.map((usuario) => (
                    // 'key' é um identificador único para o React otimizar a renderização.
                    <div key={usuario.id} className='card'>
                        <div>
                            {/* Exibe os dados do usuário. */}
                            <p>Nome: <span>{usuario.nome}</span></p>
                            <p>Email: <span>{usuario.email}</span></p>
                            <p>Perfil: <span>{usuario.perfil}</span></p>
                        </div>
                        {/* Botão que chama a função de exclusão, passando o ID do usuário. */}
                        <button onClick={() => excluir_usuarios(usuario.id)}>
                            <img src={Lixeira} alt="Excluir" />
                        </button>
                    </div>
                ))}
            </main>
        </div>
    );
}

export default FuncoesAdm;