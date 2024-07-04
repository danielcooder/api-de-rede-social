const jwt = require('jsonwebtoken');
const segredo = require('../controladores/segredo');
const conexao = require('../../conexao');

const cadastrarPostagem = async (req, res) => {
  const { texto, token } = req.body;

  if (!texto) {
    return res.status(400).json('O campo texto é obrigatório.');
  }

  if (!token) {
    return res.status(400).json('O campo token é obrigatório.');
  }

  try {
    const { id } = jwt.verify(token, segredo);

    const query = 'SELECT * FROM usuarios WHERE id = $1';
    const { rows, rowCount } = await conexao.query(query, [id]);

    if (rowCount === 0) {
        return res.status(404).json('O usuário não foi encontrado');
    }

    const usuario = rows[0];

    const queryPostagem = 'INSERT INTO postagens (usuario_id, texto) VALUES ($1, $2)';
    const postagem = await conexao.query(queryPostagem, [usuario.id, texto]);

    if (postagem.rowCount === 0) {
        return res.status(400).json('Não foi possível cadastrar a postagem.');
    }

    return res.status(200).json('Postagem foi cadastrada com sucesso.');

  } catch (error) {
    return res.status(400).json(error.message);
  }
}

const atualizarPostagem = async (req, res) => {
  const { texto, token } = req.body;
  const { id: idPostagem } = req.params;

  if (!texto) {
    return res.status(400).json('O campo texto é obrigatório.');
  }

  if (!token) {
    return res.status(400).json('O campo token é obrigatório.');
  }

  try {
    const { id } = jwt.verify(token, segredo);
    
    const query = 'SELECT * FROM usuarios WHERE id = $1';
    const { rows, rowCount } = await conexao.query(query, [id]);

    if (rowCount === 0) {
        return res.status(404).json('O usuário não foi encontrado');
    }

    const usuario = rows[0];

    const queryPostagemExistente = 'SELECT * FROM postagens WHERE id = $1 AND usuario_id = $2';
    const postagemExistente = await conexao.query(queryPostagemExistente, [idPostagem, usuario.id]);

    if (postagemExistente.rowCount === 0) {
        return res.status(404).json('A postagem não foi encontrada.');
    }

    const queryPostagem = 'UPDATE postagens SET texto = $1 WHERE id = $2 AND usuario_id = $3';
    const postagem = await conexao.query(queryPostagem, [texto, idPostagem, usuario.id]);

    if (postagem.rowCount === 0) {
        return res.status(400).json('Não foi possível atualizar a postagem.');
    }

    return res.status(200).json('Postagem foi atualizada com sucesso.');

  } catch (error) {
    return res.status(400).json(error.message);
  }
}

module.exports = {
  cadastrarPostagem,
  atualizarPostagem
}
