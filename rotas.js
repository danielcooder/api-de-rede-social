const express = require('express');
const usuarios = require('./src/controladores/usuarios');
const login = require('./src/controladores/login')
const postagens = require('./src/controladores/postagens');
const verificaLogin = require('./src/controladores/filtros/verificaLogin');

const rotas = express();

//cadastro de usuario
rotas.post('/usuarios', usuarios.cadastrarUsuario);

//login 
rotas.post('/login', login.login)

//feed principal
rotas.get('/', postagens.todasPostagens);

rotas.use(verificaLogin);

//postagens
rotas.get('/postagens', postagens.postagemUsuarios);
rotas.post('/postagens', postagens.cadastrarPostagem);
rotas.patch('/postagens/:id', postagens.atualizarPostagem);
rotas.delete('/postagens/:id', postagens.excluirPostagens);

module.exports = rotas;