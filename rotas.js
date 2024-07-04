const express = require('express');
const usuarios = require('./src/controladores/usuarios');
const login = require('./src/controladores/login')
const postagens = require('./src/controladores/postagens')

const rotas = express();

//cadastro de usuario
rotas.post('/usuarios', usuarios.cadastrarUsuario);

//login 
rotas.post('/login', login.login)

//postagens
rotas.post('/postagens', postagens.cadastrarPostagem)

module.exports = rotas;