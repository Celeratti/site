var database = require("../database/config")


function deletar(id) {
    var instrucao = `
        UPDATE funcionario SET esta_ativo = 0 where id = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function cadastrar(nome, sobrenome, email,senha, telefone, cargo, fkempresa) {
    var instrucao = `
        INSERT INTO funcionario (nome, sobrenome, telefone, email, senha, fkCargo, esta_ativo, fkempresa)  VALUES ('${nome}', '${sobrenome}', '${telefone}', '${email}','${senha}', ${cargo}, 1, ${fkempresa});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function atualizarTabela(linha) {

    var instrucao = `
        select * from funcionario where fkEmpresa =${linha};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function editar(novoNome, novoSobreNome, emailRecebido,telefoneRecebido, novoCargo, id) {
    var instrucao = `
        UPDATE funcionario SET nome = '${novoNome}', sobrenome = '${novoSobreNome}', email = '${emailRecebido}', telefone = '${telefoneRecebido}', fkCargo = ${novoCargo} WHERE id = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    atualizarTabela,
    deletar,
    cadastrar,
    editar
};