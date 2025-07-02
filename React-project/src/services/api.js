// --- CONFIGURAÇÃO DA API ---
import axios from 'axios'; // Importa a biblioteca Axios para fazer requisições HTTP.

// --- CRIAÇÃO DA INSTÂNCIA DO AXIOS ---
// Cria uma instância do Axios com uma configuração base.
const api = axios.create({
    // Define a URL base para todas as requisições.
    // Assim, não é preciso digitar 'http://localhost:3000' em toda chamada.
    baseURL: 'http://localhost:3000'
});

// --- EXPORTAÇÃO ---
// Exporta a instância configurada para ser usada em outras partes da aplicação.
export default api;