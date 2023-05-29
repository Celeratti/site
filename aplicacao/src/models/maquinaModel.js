var database = require("../database/config")

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao


function atualizarTabela(linha) {
    var instrucao = `
    SELECT m.fabricante, m.id, m.nomeIdentificador, m.sistemaOperacional, m.fkStatus, m.andar, e.nome as nomeEstacao 
    FROM celeratti.maquina m
    INNER JOIN celeratti.estacao e ON e.id = m.fkestacao where fkEmpresa =${linha};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function estacoes() {

    var instrucao = `
    SELECT * from estacao;
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

function editar(fabricante, nomeMaquina, so, status, estacao, id) {
    var instrucao = `
        UPDATE maquina SET fabricante = '${fabricante}', nomeIdentificador = '${nomeMaquina}', sistemaOperacional = '${so}', fkStatus = '${status}', fkEstacao = '${estacao}' WHERE id = ${id};
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
    linhas
};