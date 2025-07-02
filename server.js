// --- CONFIGURAÇÃO INICIAL ---
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { PrismaClient } from './generated/prisma/index.js'; // Dica: Altere para o import padrão
import cors from 'cors';
import bcrypt from 'bcrypt'; // Biblioteca para criptografar senhas

const prisma = new PrismaClient();
const app = express();
const saltRounds = 10; // "Força" da criptografia

app.use(express.json());
app.use(cors());

// --- ROTAS DE USUÁRIOS (CRUD) ---

// Rota para CRIAR um novo usuário (versão corrigida)
app.post('/usuarios', async (req, res) => {
    try {
        // 1. Recebe apenas os dados que o primeiro formulário envia
        const { email, nome, senha, perfil } = req.body;

        // Validação para garantir que os campos essenciais chegaram
        if (!email || !nome || !senha || !perfil) {
            return res.status(400).json({ mensagem: "Dados incompletos para o cadastro." });
        }

        // 2. Criptografa a senha
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds);

        // 3. Cria o usuário no banco APENAS com os dados recebidos
        const novoUsuario = await prisma.usuario.create({
            data: {
                email,
                nome,
                senha: senhaCriptografada,
                perfil
            }
        });

        // 4. Retorna o usuário criado com sucesso
        res.status(201).json(novoUsuario);
        
    } catch (error) {
        // Loga o erro no terminal para depuração
        console.error("Erro ao criar usuário:", error); 
        
        // Trata erros de campos únicos (ex: email já existe)
        if (error.code === 'P2002') {
            const campo = error.meta.target.join(', ');
            return res.status(409).json({ mensagem: `O campo ${campo} já está em uso.` });
        }

        // Para todos os outros erros, retorna o 500
        res.status(500).json({ mensagem: 'Ocorreu um erro interno no servidor.' });
    }
});


// Rota para ATUALIZAR um usuário existente por ID
app.put('/usuarios/:id', async (req, res) => {
    try {
        // Se uma nova senha for enviada, criptografa ela também
        if (req.body.senha) {
            req.body.senha = await bcrypt.hash(req.body.senha, saltRounds);
        }
        const usuarioAtualizado = await prisma.usuario.update({
            where: { id: req.params.id },
            data: req.body // Prisma atualiza apenas os campos que foram enviados
        });
        res.status(200).json(usuarioAtualizado);
    } catch (error) {
        // Trata erros de campos únicos (ex: CPF duplicado na atualização)
        if (error.code === 'P2002') {
            return res.status(409).json({ mensagem: `Erro: O campo ${error.meta.target.join(', ')} já está em uso.` });
        }
        console.error("Erro na rota PUT /usuarios/:id :", error);
        res.status(500).json({ mensagem: 'Ocorreu um erro interno no servidor.' });
    }
});

// Rota para LISTAR usuários (com ou sem filtros)
app.get('/usuarios', async (req, res) => {
    try {
        const { nome, email } = req.query;
        const where = {};
        if (nome) where.nome = { contains: nome, mode: 'insensitive' };
        if (email) where.email = email;

        const usuarios = await prisma.usuario.findMany({ where });
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ mensagem: 'Ocorreu um erro interno no servidor.' });
    }
});

// Rota para DELETAR um usuário por ID
app.delete('/usuarios/:id', async (req, res) => {
    try {
        await prisma.usuario.delete({
            where: { id: req.params.id },
        });
        res.status(200).json({ message: 'Usuário deletado!' });
    } catch (error) {
        res.status(500).json({ mensagem: 'Ocorreu um erro interno no servidor.' });
    }
});

// --- ROTA DE AUTENTICAÇÃO ---

// Rota para LOGIN
app.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;
        // Busca o usuário apenas pelo e-mail (que é único)
        const usuario = await prisma.usuario.findUnique({
            where: { email: email }
        });
        // Se não encontrou usuário, retorna erro
        if (!usuario) {
            return res.status(401).json({ sucesso: false, mensagem: 'Credenciais inválidas' });
        }
        // Compara a senha enviada com a senha criptografada no banco
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (senhaCorreta) {
            res.status(200).json({ sucesso: true, perfil: usuario.perfil });
        } else {
            res.status(401).json({ sucesso: false, mensagem: 'Credenciais inválidas' });
        }
    } catch (error) {
        res.status(500).json({ mensagem: 'Ocorreu um erro interno no servidor.' });
    }
});

// --- ROTAS PARA RECUPERAÇÃO DE SENHA ---

// Rota para verificar se o e-mail existe no banco
app.post('/buscaUsuario', async (req, res) => {
    const { tentativaEmail } = req.body;

    try {
        const usuario = await prisma.usuario.findUnique({
            where: { email: tentativaEmail }
        });

        if (usuario) {
            res.status(200).json({ sucesso: true, id: usuario.id, pergunta: usuario.pergunta });
        } else {
            res.status(404).json({ sucesso: false, mensagem: 'Usuário não encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ sucesso: false, mensagem: 'Ocorreu um erro interno no servidor.' });
    }
});

// Rota para verificar se a resposta é correta
app.post('/verificar-resposta', async (req, res) => {
    try {
        const { id, tentativaResposta } = req.body;

        if (!id || !tentativaResposta) {
            return res.status(400).json({ sucesso: false, mensagem: 'Dados incompletos.' });
        }

        const usuario = await prisma.usuario.findUnique({
            where: { id: id }
        });

        if (!usuario) {
            return res.status(404).json({ sucesso: false, mensagem: 'Utilizador não encontrado.' });
        }

        if (usuario.resposta === tentativaResposta) {
            res.status(200).json({ sucesso: true });
        } else {
            res.status(401).json({ sucesso: false, mensagem: 'Resposta de segurança incorreta.' });
        }
    } catch (error) {
        console.error("Erro na rota /verificar-resposta:", error);
        res.status(500).json({ sucesso: false, mensagem: 'Ocorreu um erro interno no servidor.' });
    }
});


// Rota para mudar a senha
app.post('/mudarSenha', async (req, res) => {
    try {
        const { id, NovaSenha } = req.body;

        if (!id || !NovaSenha) {
            return res.status(400).json({ sucesso: false, mensagem: 'ID do usuário e nova senha são obrigatórios.' });
        }
        
        const usuario = await prisma.usuario.findUnique({
            where: { id: id }
        });

        if (!usuario) {
            return res.status(404).json({ sucesso: false, mensagem: 'Usuário não encontrado.' });
        }

        const novaSenhaCriptografada = await bcrypt.hash(NovaSenha, 10);

        await prisma.usuario.update({
            where: { id: id },
            data: { senha: novaSenhaCriptografada }
        });

        res.status(200).json({ 
            sucesso: true, 
            mensagem: 'Senha atualizada com sucesso!', 
            perfil: usuario.perfil
        });

    } catch (error) {
        console.error("Erro ao mudar a senha:", error); 
        res.status(500).json({ sucesso: false, mensagem: 'Ocorreu um erro interno no servidor.' });
    }
});

// --- INICIALIZAÇÃO DO SERVIDOR ---
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});