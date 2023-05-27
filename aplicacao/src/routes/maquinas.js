var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController");

console.log("Chegamos em máquinas")

router.post("/atualizarTabela", function (req, res) {
    maquinaController.atualizarTabela(req, res);
});


router.post("/estacoes", function (req, res) {
    maquinaController.estacoes(req, res);
});

router.get("/linhas", function (req, res) {
    maquinaController.linhas(req, res);
});


router.put("/deletar/:id", function (req, res) {
    maquinaController.deletar(req, res);
});

router.post("/cadastrar", function (req, res) {
    maquinaController.cadastrar(req, res);
})


router.put("/editar/:id", function (req, res) {
    maquinaController.editar(req, res);
});


module.exports = router;