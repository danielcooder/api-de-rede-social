const conexao = require('../../conexao');
const bcrypt = require('bcrypt');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    // Verifica se todos os campos obrigatórios foram fornecidos
    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios: nome, email, senha' });
    }

    try {
        // Consulta para verificar se o email já está cadastrado
        const queryConsultaEmail = 'SELECT * FROM usuarios WHERE email = $1';
        const { rowCount: quantidadeDeUsuarios } = await conexao.query(queryConsultaEmail, [email]);

        if (quantidadeDeUsuarios > 0) {
            return res.status(400).json({ mensagem: 'O email informado já está cadastrado' });
        }

        // Criptografa a senha antes de inserir no banco de dados
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        // Insere o usuário no banco de dados
        const queryInserirUsuario = 'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)';
        const usuarioCadastrado = await conexao.query(queryInserirUsuario, [nome, email, senhaCriptografada]);

        if (usuarioCadastrado.rowCount === 0) {
            return res.status(400).json({ mensagem: 'Não foi possível cadastrar o usuário' });
        }

        // Retorna uma resposta de sucesso
        return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso' });

    } catch (error) {
        // Captura e trata erros
        console.error('Erro ao cadastrar usuário:', error);
        return res.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
}

module.exports = {
    cadastrarUsuario
};
