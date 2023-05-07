var express = require("express");
var router = express.Router();

var funcionarioController = require("../controllers/funcionarioController");

console.log("Cheguei nas rotas")

router.get("/atualizarTabela", function (req, res) {
    funcionarioController.atualizarTabela(req, res);
});

router.put("/deletar/:idfuncionario", function (req, res) {
    funcionarioController.deletar(req, res);
});

router.post("/cadastrar", function (req, res) {
    funcionarioController.cadastrar(req, res);
})


router.put("/editar/:idfuncionario", function (req, res) {
    funcionarioController.editar(req, res);
});


module.exports = router;