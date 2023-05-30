var database = require("../database/config")

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao


function atualizarTabela(idEmpresa) {
   // SELECT m.fabricante, m.id, m.nomeIdentificador, m.sistemaOperacional, m.fkStatus, m.andar, e.nome as nomeEstacao
   /// FROM celeratti.maquina m
   /// INNER JOIN celeratti.estacao e ON e.id = m.fkestacao
   // WHERE fkEmpresa =${linha};
 var instrucao = `
SELECT e.nome AS Estação, m.andar, m.id, m.nomeIdentificador AS [nomeMaquina], m.sistemaOperacional, m.fabricante, m.fkStatus AS Status
FROM maquina m
INNER JOIN estacao e ON e.id = m.fkestacao where fkempresa =${idEmpresa}
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function estacoes(estacoes) {

    var instrucao = `
    SELECT * from estacao where fkLinha = ${estacoes};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function linhas() {

    var instrucao = `
    SELECT * from linha;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletar(id) {
    var instrucao = `
        UPDATE maquina SET status = "Inativa" where id = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrar(fabricante, nomeIdentificador, sistemaOperacional, fkEmpresa, andar, fkEstacao) {
    var instrucao = `
        INSERT INTO maquina (fabricante, nomeIdentificador, sistemaOperacional, fkStatus, fkEmpresa, andar, fkEstacao)  VALUES ('${fabricante}', '${nomeIdentificador}', '${sistemaOperacional}', 2 , ${fkEmpresa}, '${andar}', ${fkEstacao});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function editar(fabricante, nomeMaquina, so, id) {
    var instrucao = `
        UPDATE maquina SET fabricante = '${fabricante}', nomeIdentificador = '${nomeMaquina}', sistemaOperacional = '${so}' WHERE id = ${id}
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    atualizarTabela,
    estacoes,
    deletar,
    cadastrar,
    editar,
    linhas,
};