var database = require("../database/config");

function buscarAlertas(idLinha) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT mc.id, mc.NomeIdentificador, ec.nome,gc.insercao, ta.tipo AS TipoAlerta
        FROM GrupoComponentes gc
        JOIN Alertas a ON gc.id = a.FkGrupoComponentes
        JOIN ComponenteCausa cc ON a.FkComponenteCausa = cc.Id
        JOIN Maquina mc ON gc.FkMaquina = mc.Id
        JOIN TipoAlerta ta ON a.FkTipoAlerta = ta.Id
        JOIN estacao ec ON ec.id = mc.fkEstacao
        WHERE gc.Insercao >= DATEADD(minute, -182, GETDATE()) AND ta.tipo = 'URGENTE' AND e.fkLinha = ${idLinha} ORDER BY gc.Insercao DESC;`
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = ``
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
            return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

function buscarMaquinasEstacoes(idEstacao, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT TOP ${limite_linhas} m.id , m.nomeIdentificador,g.memoriaEmUso , g.discoUso, g.cpuUtilizacao,g.latencia FROM estacao as e JOIN maquina as m ON m.fkestacao = e.id JOIN grupoComponentes as g ON g.id = (
            SELECT MAX(id)
            FROM grupoComponentes
            WHERE fkMaquina = m.id
          ) WHERE e.id = ${idEstacao} AND g.Insercao >= DATEADD(HOUR, -4, GETDATE()) ;`
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
        Insercao AS momento,
        FORMAT(Insercao, 'HH:mm') AS momento_grafico
        FROM grupoComponentes WHERE fkMaquina = ${idMaquina} order by id DESC;`
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT cpuUtilizacao as cpu,
        Insercao as momento,
        date_format(Insercao,'%H:%i:%s') as momento_grafico
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
        Insercao AS momento,
        FORMAT(Insercao, 'HH:mm') AS momento_grafico
        FROM grupoComponentes WHERE fkMaquina = ${idMaquina} order by id DESC;`
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT CAST(round(discoUso, 2) as DECIMAL(10,2)) as disco,
        Insercao as momento,
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
        instrucaoSql = `SELECT TOP ${limite_linhas} CAST(memoriaEmUso AS DECIMAL(10, 2)) AS memoria,Insercao AS momento,
        FORMAT(Insercao, 'HH:mm') AS momento_grafico FROM grupoComponentes WHERE fkMaquina = ${idMaquina} ORDER BY id DESC
    `
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

function buscarUltimasMedidasRede(idMaquina, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT TOP ${limite_linhas}
        CAST(ROUND(latencia, 2) AS DECIMAL(10, 2)) AS latencia,
        Insercao AS momento,
        FORMAT(Insercao, 'HH:mm') AS momento_grafico
        FROM grupoComponentes
        WHERE fkMaquina = ${idMaquina}
        ORDER BY id DESC`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = ``
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
        Insercao AS momento,
        FORMAT(Insercao, 'HH:mm') AS momento_grafico
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
        instrucaoSql = `SELECT TOP 1 
        CAST(ROUND(discoUso, 2) AS DECIMAL(10, 2)) AS disco,
        Insercao AS momento,
        FORMAT(Insercao, 'HH:mm') AS momento_grafico
        FROM grupoComponentes
        WHERE fkMaquina = ${idMaquina}
        ORDER BY id DESC;`;
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
        Insercao AS momento,
        FORMAT(Insercao, 'HH:mm') AS momento_grafico
        FROM grupoComponentes WHERE fkMaquina = ${idMaquina} order by id DESC`
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT memoriaEmUso as memoria,
        Insercao as momento,
        date_format(dataHoraInsercao,'%H:%i:%s') as momento_grafico
        FROM grupoComponentes WHERE fkMaquina = ${idMaquina} order by id DESC LIMIT 1;`
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarMedidasEmTempoRealRede(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT TOP 1 latencia as latencia, Insercao AS momento,
        FORMAT(Insercao, 'HH:mm') AS momento_grafico
        FROM grupoComponentes WHERE fkMaquina = ${idMaquina} order by id DESC`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = ``
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

    


function buscarUltimasMedidasEstacao(limite_linhas,idLinha) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT TOP ${limite_linhas}
        COALESCE(t1.id_estacao, t2.estacao_id) AS estacao_id,
        COALESCE(t1.nome_estacao, t2.estacao_nome) AS estacao_nome,
        COALESCE(t1.maquinas_com_problemas, 0) AS maquinas_com_problemas,
        COALESCE(t1.maquinas_operando_normalmente, 0) AS maquinas_operando_normalmente,
        COALESCE(t2.quantidade_maquinas, 0) AS quantidade_maquinas,
        COALESCE(t2.quantidade_emergente, 0) AS quantidade_emergente,
        COALESCE(t2.quantidade_critico, 0) AS quantidade_critico,
        COALESCE(t2.quantidade_urgente, 0) AS quantidade_urgente
    FROM
        (SELECT
            e.id AS id_estacao,
            e.nome AS nome_estacao,
            COUNT(DISTINCT CASE WHEN gc.Insercao >= DATEADD(MINUTE, -195, GETDATE()) THEN m.id END) AS maquinas_com_problemas,
            (SELECT COUNT(DISTINCT m2.id) FROM maquina m2 WHERE m2.fkEstacao = e.id) - COUNT(DISTINCT CASE WHEN gc.Insercao >= DATEADD(HOUR, -4, GETDATE()) THEN m.id END) AS maquinas_operando_normalmente
        FROM
            estacao e
            LEFT JOIN maquina m ON e.id = m.fkEstacao
            LEFT JOIN grupoComponentes gc ON m.id = gc.fkMaquina
            LEFT JOIN alertas a ON gc.id = a.fkGrupoComponentes
            LEFT JOIN tipoAlerta ta ON a.fkTipoAlerta = ta.id
        WHERE
            (ta.tipo IN ('URGENTE') OR gc.Insercao IS NULL)
            AND (gc.Insercao >= DATEADD(MINUTE, -195, GETDATE()) OR m.id IS NULL)
            AND e.fkLinha = ${idLinha}
        GROUP BY
            e.id, e.nome) AS t1
    FULL OUTER JOIN
        (SELECT
            e.id AS estacao_id,
            e.nome AS estacao_nome,
            COUNT(DISTINCT m.id) AS quantidade_maquinas,
            SUM(CASE WHEN ta.tipo = 'EMERGENTE' THEN 1 ELSE 0 END) AS quantidade_emergente,
            SUM(CASE WHEN ta.tipo = 'CRITICO' THEN 1 ELSE 0 END) AS quantidade_critico,
            SUM(CASE WHEN ta.tipo = 'URGENTE' THEN 1 ELSE 0 END) AS quantidade_urgente
        FROM
            estacao e
            LEFT JOIN maquina m ON e.id = m.fkestacao
            LEFT JOIN grupoComponentes gc ON m.id = gc.fkMaquina
            LEFT JOIN alertas a ON gc.id = a.fkGrupoComponentes
            LEFT JOIN tipoAlerta ta ON a.fkTipoAlerta = ta.id
        WHERE
            gc.insercao >= DATEADD(MINUTE, -195, GETDATE())
            AND e.fkLinha = ${idLinha} 
        GROUP BY
            e.id,
            e.nome) AS t2 ON t1.id_estacao = t2.estacao_id;`
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT COUNT(DISTINCT maquina.id) AS maquinas_com_problemas,(SELECT COUNT(DISTINCT maquina.id) FROM maquina) - COUNT(DISTINCT maquina.id) AS maquinas_operando_normalmente FROM maquina LEFT JOIN grupoComponentes ON maquina.id = grupoComponentes.fkMaquina LEFT JOIN alertas ON grupoComponentes.id = alertas.fkGrupoComponentes LEFT JOIN tipoAlerta ON alertas.fkTipoAlerta = tipoAlerta.id WHERE tipoAlerta.tipo IN ('CRITICO', 'URGENTE');`
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
        instrucaoSql = `SELECT m.id , m.nomeIdentificador,g.memoriaEmUso , g.discoUso, g.cpuUtilizacao,g.latencia FROM estacao as e JOIN maquina as m ON m.fkestacao = e.id JOIN grupoComponentes as g ON g.id = (
            SELECT MAX(id)
            FROM grupoComponentes
            WHERE fkMaquina = m.id
          ) WHERE e.id = ${idEstacao};`;

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
    buscarTempoRealMaquinas,
    buscarUltimasMedidasRede,
    buscarMedidasEmTempoRealRede,
    buscarAlertas
}
