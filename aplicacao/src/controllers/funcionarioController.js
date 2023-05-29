const e = require("express");
var funcionarioModel = require("../models/funcionarioModel");

var sessoes = [];









function deletar(req, res) {
    var id = req.body.id;
    funcionarioModel.deletar(id)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var sobrenome = req.body.sobreNomeServer;
    var telefone = req.body.telefoneServer;
    var email = req.body.emailServer;
    var cargo = req.body.cargoServer;
    var fkempresa = req.body.empresaServer;

    var senha1 =  telefone.substr(-4);
    var senha2 = sobrenome.slice(0, 2);
    var senhaFinal = senha2+ senha1




    funcionarioModel.cadastrar(nome, sobrenome, email,senhaFinal, telefone, cargo, fkempresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            )
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    
}


function atualizarTabela(req, res) {

    var linha = req.body.linhaServer;



    funcionarioModel.atualizarTabela(linha).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function editar(req, res) {
    var novoNome = req.body.nome;
    var novoSobreNome = req.body.sobreNome;

    var emailRecebido = req.body.email;
    var telefoneRecebido = req.body.telefone;

    console.log("novoSobreNome controller: "+novoSobreNome)

    var novoCargo = req.body.cargo;
    var id = req.body.id;
 

    console.log("TESTEEEEEEEEEEEEEEEE: "+id)

    funcionarioModel.editar(novoNome, novoSobreNome, emailRecebido,telefoneRecebido, novoCargo, id)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

}





module.exports = {
    atualizarTabela,
    deletar,
    cadastrar,
    editar,
}