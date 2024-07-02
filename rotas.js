const express = require('express');
const usuarios = require('./src/controladores/usuarios');

const rotas = express();

//cadastro de usuario
rotas.post('/usuarios', usuarios.cadastrarUsuario);

module.exports = rotas;