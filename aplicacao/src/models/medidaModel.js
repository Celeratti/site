var database = require("../database/config");

function buscarMaquinasEstacoes(idEstacao, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT TOP ${limite_linhas} m.id , m.nomeIdentificador,g.memoriaEmUso , g.discoUso, g.cpuUtilizacao FROM estacao as e JOIN maquina as m ON m.fkestacao = e.id JOIN grupoComponentes as g ON g.id = (
            SELECT MAX(id)
            FROM grupoComponentes
            WHERE fkMaquina = m.id
          ) WHERE e.id = ${idEstacao};`
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
        instrucaoSql = `SELECT TOP ${limite_linhas} cpuUtilizacao as cpu,
        dataHoraInsercao as momento,
        date_format(dataHoraInsercao,'%H:%i:%s') as momento_grafico
        FROM grupoComponentes WHERE fkMaquina = ${idMaquina} order by id DESC;`
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
        instrucaoSql = `SELECT TOP ${limite_linhas} CAST(round(discoUso, 2) as DECIMAL(10,2)) as disco,
        dataHoraInsercao as momento,
        date_format(dataHoraInsercao,'%H:%i:%s') as momento_grafico
        FROM grupoComponentes WHERE fkMaquina = ${idMaquina} order by id DESC;`
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
        instrucaoSql = `SELECT TOP ${limite_linhas} memoriaEmUso as memoria,
        dataHoraInsercao as momento,
        date_format(dataHoraInsercao,'%H:%i:%s') as momento_grafico
        FROM grupoComponentes WHERE fkMaquina = ${idMaquina} order by id DESC`
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT memoriaEmUso as memoria,
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

function buscarMedidasEmTempoRealCpu(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT TOP 1 cpuUtilizacao as cpu,
        dataHoraInsercao as momento,
        date_format(dataHoraInsercao,'%H:%i:%s') as momento_grafico
        FROM grupoComponentes WHERE fkMaquina = ${idMaquina} order by id DESC;`;
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
        instrucaoSql = `SELECT TOP 1 CAST(round(discoUso, 2) as DECIMAL(10,2)) as disco,
        dataHoraInsercao as momento,
        date_format(dataHoraInsercao,'%H:%i:%s') as momento_grafico
        FROM grupoComponentes WHERE fkMaquina = ${idMaquina} order by id DESC`;
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
        instrucaoSql = `SELECT TOP 1 memoriaEmUso as memoria,
        dataHoraInsercao as momento,
        date_format(dataHoraInsercao,'%H:%i:%s') as momento_grafico
        FROM grupoComponentes WHERE fkMaquina = ${idMaquina} order by id DESC`
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
        instrucaoSql = `SELECT
        e.id AS id_estacao,
        e.nome AS nome_estacao,
        COUNT(DISTINCT CASE WHEN gc.Insercao >= DATEADD(HOUR, -2, GETDATE()) THEN m.id END) AS maquinas_com_problemas,
        (SELECT COUNT(DISTINCT m2.id) FROM maquina m2 WHERE m2.fkEstacao = e.id) - COUNT(DISTINCT CASE WHEN gc.Insercao >= DATEADD(HOUR, -2, GETDATE()) THEN m.id END) AS maquinas_operando_normalmente
    FROM
        estacao e
        LEFT JOIN maquina m ON e.id = m.fkEstacao
        LEFT JOIN grupoComponentes gc ON m.id = gc.fkMaquina
        LEFT JOIN alertas a ON gc.id = a.fKGrupoComponentes
        LEFT JOIN tipoAlerta ta ON a.fkTipoAlerta = ta.id
    WHERE
        ta.cor IN ('Crítico', 'Urgente')
        OR (gc.Insercao IS NULL OR gc.Insercao < DATEADD(HOUR, -2, GETDATE()))
    GROUP BY
        e.id, e.nome;
    `
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT COUNT(DISTINCT maquina.id) AS maquinas_com_problemas,(SELECT COUNT(DISTINCT maquina.id) FROM maquina) - COUNT(DISTINCT maquina.id) AS maquinas_operando_normalmente FROM maquina LEFT JOIN grupoComponentes ON maquina.id = grupoComponentes.fkMaquina LEFT JOIN alertas ON grupoComponentes.id = alertas.fkGrupoComponentes LEFT JOIN tipoAlerta ON alertas.fkTipoAlerta = tipoAlerta.id WHERE tipoAlerta.cor IN ('Crítico', 'Urgente');`
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
