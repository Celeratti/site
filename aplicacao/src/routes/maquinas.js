var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController");

console.log("Chegamos em máquinas")

router.get("/atualizarTabela", function (req, res) {
    maquinaController.atualizarTabela(req, res);
});


router.get("/estacoes", function (req, res) {
    maquinaController.estacoes(req, res);
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