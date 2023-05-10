var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/cpu/:idMaquina", function (req, res) {
    medidaController.buscarUltimasMedidasCpu(req, res);
});

router.get("/ultimas/disco/:idMaquina", function (req, res) {
    medidaController.buscarUltimasMedidasDisco(req, res);
});

router.get("/ultimas/memoria/:idMaquina", function (req, res) {
    medidaController.buscarUltimasMedidasMemoria(req, res);
});

router.get("/tempo-real/cpu/:idMaquina", function (req, res) {
    medidaController.buscarMedidasEmTempoRealCpu(req, res);
})

router.get("/tempo-real/disco/:idMaquina", function (req, res) {
    medidaController.buscarMedidasEmTempoRealDisco(req, res);
})

router.get("/tempo-real/memoria/:idMaquina", function (req, res) {
    medidaController.buscarMedidasEmTempoRealMemoria(req, res);
})

router.get("/ultimas/Estacao", function (req, res) {
    medidaController.buscarUltimasMedidasEstacao(req, res);
});

router.get("/estacoes/maquinas/:idEstacao", function (req, res) {
    medidaController.buscarMaquinasEstacoes(req, res);
});

router.get("/tempo-real/maquinas:idEstacao", function (req, res) {
    medidaController.buscarTempoRealMaquinas(req, res);
})

module.exports = router;