var maquinaModel = require("../models/maquinaModel");

var sessoes = [];

function cadastrar(req, res) {
    var estacao = req.body.estacaoServer;
    var andar = req.body.andarServer;
    var nomeMaquina = req.body.nomeMaquinaServer;
    var so = req.body.soServer;
    var empresa = req.body.empresaServer;
    var fabricante = req.body.fabricanteServer;

    maquinaModel.cadastrar(fabricante, nomeMaquina, so,  empresa, andar, estacao)
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

    var idEmpresa = req.body.idEmpresaServer;



    maquinaModel.atualizarTabela(idEmpresa).then(function (resultado) {
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



function estacoes(req, res) {

        var linha = req.body.linhaServer;
    
    
            maquinaModel.estacoes(linha)
            .then(function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!")
                }
            }).catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );

}


function id(req, res) {
    maquinaModel.id().then(function (resultado) {
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





function linhas(req, res) {
    maquinaModel.linhas().then(function (resultado) {
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


function deletar(req, res) {
    var id = req.body.id;
    maquinaModel.deletar(id)
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






function editar(req, res) {
    var estacao = req.body.estacaoServer;
    var status = req.body.statusServer;

    console.log("sa{PFMO`FMA`MFSAO`M "+status)

    var nomeMaquina = req.body.nomeMaquinaServer;
    var so = req.body.soServer;

    var fabricante = req.body.fabricanteServer;
    var id = req.body.idServer;

    console.log("ERRO000000000000: "+id)
 
    maquinaModel.editar(fabricante, nomeMaquina, so, id)
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
    estacoes,
    deletar,
    cadastrar, 
    editar,
    linhas,
    id
}