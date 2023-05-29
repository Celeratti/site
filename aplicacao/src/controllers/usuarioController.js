var usuarioModel = require("../models/usuarioModel");

var sessoes = [];


const nodemailer = require('nodemailer');

function enviarEmail(req, res) {

    var assunto = req.body.assuntoServer;
    var corpo = req.body.corpoServer;
    var email = req.body.emailServer;


    const transport = nodemailer.createTransport({
      host: 'outlook.office365.com',
      port: 587,
      secure: false,
      auth:{
        user: 'celeratti@outlook.com',
        pass: '#Gfgrupo7',
      }
    });
  
    return transport.sendMail({
      from: 'CELERATTI <celeratti@outlook.com>',
      to: 'celeratti@outlook.com',
      replyTo: `${email}`,
      subject: `${assunto}`,
      html: `<p>${corpo}</p>`
    });
  }

function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    usuarioModel.listar()
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
    usuarioModel.id().then(function (resultado) {
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



function entrar(req, res) {
    var cnpj = req.body.cnpjServer;
    var senha = req.body.senhaServer;





    if (cnpj == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        
        usuarioModel.entrar(cnpj, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var nome2 = req.body.nome2Server;
    var cnpj = req.body.cnpjServer;
    var senha = req.body.senhaServer;
    var id = req.body.idServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Sua Razão Social está undefined!");
    } else if (nome2 == undefined) {
        res.status(400).send("Seu Nome fantasia está undefined!");    
    } else if (cnpj == undefined) {
        res.status(400).send("Seu CNPJ está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua Senha está undefined!"); 
    } else {
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, nome2, cnpj, senha, id)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    entrar,
    cadastrar,
    listar,
    testar,
    enviarEmail,
    id
}