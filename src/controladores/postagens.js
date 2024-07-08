const jwt = require('jsonwebtoken');
const segredo = require('./segredo');
const conexao = require('../../conexao');

const todasPostagens = async (req, res) => {

  try {

  const postagens = await conexao.query('select * from postagens');

  return res.status(200).json(postagens.rows);

 } catch (error) {
 }  return res.status(400).json(error.message);

}

const postagemUsuarios = async (req, res) => {

  const { usuario } = req; 

  try {

    const postagens = await conexao.query('select * from postagens where usuario_id = $1', [usuario.id]);
  
    return res.status(200).json(postagens.rows);
  
   } catch (error) {
   }  return res.status(400).json(error.message);


}

const cadastrarPostagem = async (req, res) => {
  const { texto } = req.body;
  const { usuario } = req;

  if (!texto) {
    return res.status(400).json('O campo texto é obrigatório.');
  }

  try {
    const queryPostagem = 'INSERT INTO postagens (usuario_id, texto) VALUES ($1, $2)';
    const postagem = await conexao.query(queryPostagem, [usuario.id, texto]);

    if (postagem.rowCount === 0) {
      return res.status(400).json('Não foi possível cadastrar a postagem.');
    }

    return res.status(200).json('Postagem foi cadastrada com sucesso.');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const atualizarPostagem = async (req, res) => {
  const { texto } = req.body;
  const { usuario } = req;
  const { id: idPostagem } = req.params;

  if (!texto) {
    return res.status(400).json('O campo texto é obrigatório.');
  }

  try {
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

const excluirPostagens = async (req, res) => {
  const { usuario } = req;
  const { id } = req.params;

  try {
    const queryPostagemExistente = 'SELECT * FROM postagens WHERE id = $1 AND usuario_id = $2';
    const postagemExistente = await conexao.query(queryPostagemExistente, [id, usuario.id]);

    if (postagemExistente.rowCount === 0) {
      return res.status(404).json('A postagem não foi encontrada.');
    }

    const queryDeletePostagem = 'DELETE FROM postagens WHERE id = $1 AND usuario_id = $2';
    const { rowCount } = await conexao.query(queryDeletePostagem, [id, usuario.id]);

    if (rowCount === 0) {
      return res.status(400).json('Não foi possível excluir a postagem.');
    }

    return res.status(200).json('Postagem excluída com sucesso.');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};


module.exports = {
  cadastrarPostagem,
  atualizarPostagem,
  excluirPostagens, 
  todasPostagens,
  postagemUsuarios
};
