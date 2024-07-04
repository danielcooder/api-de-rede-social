// implementar cadastro e atualização de uma postagem

const jwt = require('jsonwebtoken');
const segredo = require('../controladores/segredo');
const conexao = require('../../conexao');

const cadastrarPostagem = async (req, res) => {
  const { texto, token } = req.body;

  if (!texto) {
    return res.status(400).json('O campo texto é obrigatório.');
  }

  if (!token) {
    return res.status(400).json('O campo texto é obrigatório.');
  }

  try {
    const { id } = jwt.verify(token, segredo);

    const query = 'select * from usuarios where id = 1$';
    const { rows, rowCount } = await conexao.query(query, [id]);

    if (rowCount === 0) {

        return res.status(404).json('O usuário não foi encontrado');
    }

    const usuario = rows[0];

    const queryPostagem = 'insert into postagens (usuario_id, texto) values ($1, $1)';
    const postagem = await conexao.query(queryPostagem, [usuario.id, texto]);

    if (postagem.rowCount === 0) {
        return res.status(400).json('Não foi possível cadastrar a postagem.');
    }

    return res.status(200).json('Postagem foi cadastrada com sucesso.')

  } catch (error) {
    
    return res.status(400).json(error.message);
  }


}

const atualizarPostagem = async (req, res) => {

}


module.exports = {
    cadastrarPostagem,
    atualizarPostagem
}
