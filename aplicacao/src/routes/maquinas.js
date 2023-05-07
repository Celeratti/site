var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController");

console.log("Chegamos em máquinas")

router.get("/atualizarTabela", function (req, res) {
    maquinaController.atualizarTabela(req, res);
});




module.exports = router;