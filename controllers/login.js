const express = require("express");
const jwt = require("jsonwebtoken");
const route = express.Router();
require("dotenv/config");

const Usuario = require("../models/usuarios");
const Produto = require("../models/produtos");

route.post("/login", async (req, res) => {
  const { usuario, senha } = req.body;
  var dados = await Usuario.findOne({ usuario: usuario });

  if (dados) {
    if (dados.senha === senha) {
      const token = await jwt.sign({
          userId: dados._id,
          userNome: dados.nome
      }, process.env.SAFE_KEY, { expiresIn: 86400 });

      return res.send({ token });
    } else {
      return res.send("A senha esta incorreta");
    }
  }
  return res.send("Usuário não foi encontrado");
});

route.get("/lista/produtos", async (req, res) => {
  var lista = await Produto.find({ ativo: true });
  return res.send(lista);
});

module.exports = app => app.use("", route);
