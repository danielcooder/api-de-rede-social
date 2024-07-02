const express = require('express');
const usuarios = require('./src/controladores/usuarios');
const login = require('./src/controladores/login')

const rotas = express();

//cadastro de usuario
rotas.post('/usuarios', usuarios.cadastrarUsuario);

//login 
rotas.post('/login', login.login)

module.exports = rotas;