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

rotas.use(verificaLogin);
//postagens
rotas.post('/postagens', postagens.cadastrarPostagem);
rotas.patch('/postagens/:id', postagens.atualizarPostagem)

module.exports = rotas;