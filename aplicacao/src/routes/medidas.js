var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/cpu/:idMaquina", function (req, res) {
    medidaController.buscarUltimasMedidasCpu(req, res);
});

router.get("/ultimas/disco/:idMaquina", function (req, res) {
    medidaController.buscarUltimasMedidasDisco(req, res);
});

router.get("/tempo-real/cpu/:idMaquina", function (req, res) {
    medidaController.buscarMedidasEmTempoRealCpu(req, res);
})

router.get("/tempo-real/disco/:idMaquina", function (req, res) {
    medidaController.buscarMedidasEmTempoRealDisco(req, res);
})

router.get("/ultimas/Estacao", function (req, res) {
    medidaController.buscarUltimasMedidasEstacao(req, res);
});

// router.get("/ultimas/Estacao2/:idEstacao2", function (req, res) {
//     medidaController.buscarUltimasMedidasEstacao2(req, res);
// });

// router.get("/ultimas/Estacao3/:idEstacao3", function (req, res) {
//     medidaController.buscarUltimasMedidasEstacao3(req, res);
// });

// router.get("/ultimas/Estacao4/:idEstacao4", function (req, res) {
//     medidaController.buscarUltimasMedidasEstacao4(req, res);
// });

// router.get("/ultimas/Estacao5/:idEstacao5", function (req, res) {
//     medidaController.buscarUltimasMedidasEstacao5(req, res);
// });

// router.get("/ultimas/Estacao6/:idEstacao6", function (req, res) {
//     medidaController.buscarUltimasMedidasEstacao6(req, res);
// });

// router.get("/ultimas/Estacao7/:idEstacao7", function (req, res) {
//     medidaController.buscarUltimasMedidasEstacao7(req, res);
// });
module.exports = router;