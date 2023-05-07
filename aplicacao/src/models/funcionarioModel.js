var database = require("../database/config")


function deletar(novoNome, id) {
    var instrucao = `
        UPDATE funcionario SET esta_ativo = 0 where idfuncionario = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function cadastrar(nome, sobrenome, telefone, email, senha, cargo, fkempresa) {
    console.log("Nome: "+nome+ "Sobrenome: "+sobrenome+ "Telefone: "+telefone+ "Email: "+email+ "Senha: "+senha+"Cargo: "+cargo+ "Fkempresa: "+fkempresa)
    var instrucao = `
        INSERT INTO funcionario (nome, sobrenome, telefone, email, senha, cargo,esta_ativo, fkempresa)  VALUES ('${nome}', '${sobrenome}', '11111111111', '${email}', '${senha}', '${cargo}',1,1 );
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function atualizarTabela() {

    var instrucao = `
        select * from funcionario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function editar(novoNome, novoSobreNome, emailRecebido,telefoneRecebido, novoCargo, id) {
    var instrucao = `
        UPDATE funcionario SET nome = '${novoNome}', sobrenome = '${novoSobreNome}', email = '${emailRecebido}', telefone = '${telefoneRecebido}', cargo = '${novoCargo}' WHERE idfuncionario = ${id};
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