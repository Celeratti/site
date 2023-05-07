var maquinaModel = require("../models/maquinaModel");

var sessoes = [];


function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function atualizarTabela(req, res) {
    maquinaModel.atualizarTabela()
        .then(function (resultado) {
            console.log("Chegamos na controller")
        }).catch(
            function (erro) {
                console.log("Deu erro: "+erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    atualizarTabela
}