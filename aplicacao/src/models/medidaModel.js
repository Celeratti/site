var database = require("../database/config");

function buscarMaquinasEstacoes(idEstacao, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}`
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT m.id , m.nomeIdentificador,g.memoriaEmUso , g.discoUso, g.cpuUtilizacao FROM estacao as e JOIN maquina as m ON m.fkestacao = e.id JOIN grupoComponentes as g ON g.id = (
            SELECT MAX(id)
            FROM grupoComponentes
            WHERE fkMaquina = m.id
          ) WHERE e.id = ${idEstacao} LIMIT ${limite_linhas};`
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasCpu(idMaquina, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}`
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT cpuUtilizacao as cpu,
        dataHoraInsercao as momento,
        date_format(dataHoraInsercao,'%H:%i:%s') as momento_grafico
        FROM grupoComponentes WHERE fkMaquina = ${idMaquina} order by id DESC LIMIT ${limite_linhas};`
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasDisco(idMaquina, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}`
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT CAST(round(discoUso, 2) as DECIMAL(10,2)) as disco,
        dataHoraInsercao as momento,
        date_format(dataHoraInsercao,'%H:%i:%s') as momento_grafico
        FROM grupoComponentes WHERE fkMaquina = ${idMaquina} order by id DESC LIMIT ${limite_linhas};`
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarUltimasMedidasMemoria(idMaquina, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}`
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT memoriaEmUso as memoria,
        dataHoraInsercao as momento,
        date_format(dataHoraInsercao,'%H:%i:%s') as momento_grafico
        FROM grupoComponentes WHERE fkMaquina = ${idMaquina} order by id DESC LIMIT ${limite_linhas};       `
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealCpu(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        CONVERT(varchar, momento, 108) as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT cpuUtilizacao as cpu,
        dataHoraInsercao as momento,
        date_format(dataHoraInsercao,'%H:%i:%s') as momento_grafico
        FROM grupoComponentes WHERE fkMaquina = ${idMaquina} order by id DESC LIMIT 1;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealDisco(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        CONVERT(varchar, momento, 108) as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT CAST(round(discoUso, 2) as DECIMAL(10,2)) as disco,
        dataHoraInsercao as momento,
        date_format(dataHoraInsercao,'%H:%i:%s') as momento_grafico
        FROM grupoComponentes WHERE fkMaquina = ${idMaquina} order by id DESC LIMIT 1;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarMedidasEmTempoRealMemoria(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        CONVERT(varchar, momento, 108) as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT memoriaEmUso as memoria,
        dataHoraInsercao as momento,
        date_format(dataHoraInsercao,'%H:%i:%s') as momento_grafico
        FROM grupoComponentes WHERE fkMaquina = ${idMaquina} order by id DESC LIMIT 1;`
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



function buscarUltimasMedidasEstacao(limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}`
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT * FROM estacao limit ${limite_linhas}`
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarTempoRealMaquinas(idEstacao) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        CONVERT(varchar, momento, 108) as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = ``;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidasCpu,
    buscarMedidasEmTempoRealCpu,
    buscarUltimasMedidasDisco,
    buscarMedidasEmTempoRealDisco, 
    buscarUltimasMedidasEstacao,
    buscarUltimasMedidasMemoria,
    buscarMedidasEmTempoRealMemoria,
    buscarMaquinasEstacoes,
    buscarTempoRealMaquinas
}
