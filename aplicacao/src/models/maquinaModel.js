var database = require("../database/config")




// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function atualizarTabela(nome, email, senha) {
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `select * from funcionario;`;

    return database.executar(instrucao);
}

module.exports = {
    atualizarTabela
};