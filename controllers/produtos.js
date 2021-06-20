const express = require("express");
const Produto = require("../models/produtos");
const route = express.Router();

route.post("/produtos", async (req, res) => {
    await Produto.create(req.body, (err, ret) => {
        if (err) {
        	return res.send(err.message);
        }

        return res.send(ret);
    });
});

route.put("/produtos", async (req, res) => {
    const { _id, preco, nome, imagem, descricao, quantidade, ativo } = req.body;
    var dados = await Produto.findOne({ _id: _id });

    if (dados == null) {
        res.send("Produto não encontrado");
        return false;
    }
    var mudanca = '';
    if(preco != dados.preco){
        mudanca += 'Preço alterado com sucesso.\n';
    }
    if(nome != dados.nome){
        mudanca += 'Nome alterado com sucesso.\n';
    }
    if(imagem != dados.imagem){
        mudanca += 'Imagem alterada alterada com sucesso.\n';
    }
    if(descricao != dados.descricao){
        mudanca += 'Descrição alterado alterada com sucesso.\n';
    }
    if(quantidade != dados.quantidade){
        mudanca += 'Quantidade alterado alterada com sucesso.\n';
    }
    await Produto.updateOne({ _id: _id }, { $set: { nome: nome, preco: preco, imagem: imagem, descricao: descricao, quantidade: quantidade }});
    res.send(mudanca);
});

route.delete("/produtos", async (req, res) => {
    const { _id } = req.body;
    var dados = await Produto.findOne({ _id: _id });

    if (dados == null) {
        res.send("Produto não encontrado");
        return false;
    }
    
    await Produto.updateOne({ _id: _id }, { $set: { ativo: false }});
    var mudanca = "O produto removido com sucesso.";
    res.send(mudanca);
});

module.exports = app => app.use("/admin", route);