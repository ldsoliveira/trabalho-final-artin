const jwt = require("jsonwebtoken");
require("dotenv/config");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (token == undefined) {
    return res.send("Token não encontrado.")
  }

  const valor = token.split(" ");
  const [ baerer, valToken ] = valor;
  if (!/^Bearer$/i.test(baerer)) {
    return res.send("Erro na formatação do token.");
  }

  await jwt.verify( valToken, process.env.SAFE_KEY, (err, data) => {
    if (err) {
      return res.send("Token inválido ou expirado.");
    }

    req.Id = data.userId;
    req.nome = data.userNome;
  })

  return next();
}