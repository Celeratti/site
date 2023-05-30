document.querySelector(".nomeEmpresa").innerHTML =GETNomeEmpresa()

var idRecebido =0;
        fetch("/maquinas/id").then(function (resposta) {
            if (resposta.ok) {
                console.log("AAEEEEEEEEEEEEEEEEEEEE")

                if (resposta.status == 204) {

                    throw "Nenhum resultado encontrado!!";
                }

                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));

                    console.log(resposta.length)

                for (let i = 0; i < resposta.length; i++) {
                    
                    var empresa = resposta[i]
                    idRecebido = empresa.id
            
                    
                }
                

                });
            } else {
                throw ('Houve um erro na API!');

            }
        }).catch(function (resposta) {
            console.error(resposta);

        });



var idTr = 0;
            var funcionarioSelecionado = 0;

            atualizarTabela();
            var acao =""
            var linhaEscolhida = "";

            function editar(andar, nome, so, fabricante, celulaLapis){
                document.getElementById('linha').disabled = true;
                document.getElementById('estacoes').disabled = true;


                document.querySelector(".modal-header").innerHTML = "Editar Máquina"
                modal.style.display = "block";               
                document.querySelector("#andar").value = andar
                document.querySelector("#nome").value = nome
                document.querySelector("#SO").value = so
                document.querySelector("#fabricante").value = fabricante
                acao ="Editar"

                funcionarioSelecionado = celulaLapis
            }   
            const modalEx = document.getElementById("modalEx");


            function Excluir(nome, celulaLixeira){
                modalEx.style.display = "block";
                document.querySelector("#lblExcluir").innerHTML = "Deseja excluir a máquina "+ nome+ "?"
                linhaEscolhida = celulaLixeira;
                document.querySelector(".modalEx-header").innerHTML = "Excluir Máquina?"
            }




var funcionarioSelecionado = 0;


        fetch("/maquinas/linhas").then(function (resposta) {
            if (resposta.ok) {
                console.log("AAEEEEEEEEEEEEEEEEEEEE")

                if (resposta.status == 204) {

                    throw "Nenhum resultado encontrado!!";
                }

                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));

                    console.log(resposta.length)

                for (let i = 0; i < resposta.length; i++) {
                    
                    var estacao = resposta[i]

                    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")

                    var selectElement = document.getElementById("linha");
                    var optionElement = document.createElement("option");
                    optionElement.value = estacao.id;
                    optionElement.text = estacao.nome;
                    selectElement.add(optionElement);
                    
                }
                

                });
            } else {
                throw ('Houve um erro na API!');

            }
        }).catch(function (resposta) {
            console.error(resposta);

        });

        
function carregarEstacoes(linha){



    var selectElement = document.getElementById("estacoes");

    while (selectElement.options.length > 0) {
        selectElement.remove(0);
      }

    fetch("/maquinas/estacoes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            linhaServer: linha
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                console.log(resposta.length)
                for (let i = 0; i < resposta.length; i++) {

                    var linha = resposta[i]


                    var selectElement = document.getElementById("estacoes");
                    var optionElement = document.createElement("option");
                    optionElement.value = linha.id;
                    optionElement.text = linha.nome;
                    selectElement.add(optionElement);
                }

            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}








        


var tabelaHtml = document.querySelector("#tabela")
function atualizarTabela() {
    document.getElementById('linha').disabled = false;
    document.getElementById('estacoes').disabled = false;
        //aguardar();
        var linhas = document.getElementsByTagName("tr");

        for (var i = linhas.length - 1; i > 0; i--) {
                        linhas[i].remove()
        }

        fetch("/maquinas/atualizarTabela", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                linhaServer: GETIdEmpresa()
            })
        }).then(function (resposta) {
            if (resposta.ok) {
                console.log("AAEEEEEEEEEEEEEEEEEEEE")

                if (resposta.status == 204) {

                    throw "Nenhum resultado encontrado!!";
                }

                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));


                    console.log(resposta.length)

                for (let i = 0; i < resposta.length; i++) {
                    
                    var maquina = resposta[i]
                    if(maquina.fkStatus ==1){
                    var novaLinha = document.createElement("tr");
                    novaLinha.setAttribute("id", maquina.id);
                    var colunaEstacao = document.createElement("td");
                    var colunaAndar = document.createElement("td");
                    var colunaNomeMaquina = document.createElement("td");
                    var colunaSo = document.createElement("td");
                    var colunaFabricante = document.createElement("td");
                    var colunaStatus = document.createElement("td");
                    var tdImagens = document.createElement("td");

                    var novaImagem = document.createElement("img");
                    novaImagem.id = "imgLapis";
                    novaImagem.src = "assets/img/lapisCF.png";
                    novaImagem.alt = "";
                    novaImagem.classList.add("opcoesTabela");
                    novaImagem.setAttribute("onclick", `editar('${maquina.andar}', '${maquina.nomeIdentificador}', '${maquina.sistemaOperacional}', '${maquina.fabricante}', ${maquina.id})`);
                    console.log("AAAAAAAAAAAAAAAA: "+maquina.id)

                    var novaImagem2= document.createElement("img");
                    novaImagem2.id = "imgLixeira";
                    novaImagem2.src = "assets/img/lixeiraCF.png";
                    novaImagem2.alt = "";
                    novaImagem2.classList.add("opcoesTabela");
                    novaImagem2.setAttribute("onclick", `Excluir('${maquina.nomeIdentificador}', ${maquina.id})`);


                    colunaEstacao.innerHTML =maquina.nomeEstacao
                    colunaAndar.innerHTML =maquina.andar
                    colunaNomeMaquina.innerHTML =maquina.nomeIdentificador
                    colunaSo.innerHTML =maquina.sistemaOperacional
                    colunaFabricante.innerHTML =maquina.fabricante
                    colunaStatus.innerHTML ="Ativa"


                    novaLinha.appendChild(colunaEstacao);
                    novaLinha.appendChild(colunaAndar);
                    novaLinha.appendChild(colunaNomeMaquina);
                    novaLinha.appendChild(colunaSo);
                    novaLinha.appendChild(colunaFabricante);
                    novaLinha.appendChild(colunaStatus);


                    var imagem = document.querySelector("#imgLapis")

                    tdImagens.appendChild(novaImagem)
                    tdImagens.appendChild(novaImagem2)

                    novaLinha.appendChild(tdImagens);               

                    var tabela = document.getElementById("tabela").getElementsByTagName("tbody")[0];
                    tabela.appendChild(novaLinha);
                    }
                    
                }

                });
            } else {
                throw ('Houve um erro na API!');

            }
        }).catch(function (resposta) {
            console.error(resposta);

        });
    }
            function Salvarr(){



                

                var selectElement = document.getElementById("estacoes");
                var estacaoRecebida = selectElement.value;


                var andarRecebido = document.querySelector("#andar").value
                var nomeMaquinaRecebido = document.querySelector("#nome").value
                var soRecebido = document.querySelector("#SO").value
                var fabricanteRecebido = document.querySelector("#fabricante").value

                //var selectElement3 = document.getElementById("cargo");
                

            if(acao == "Salvar"){



                fetch("/maquinas/cadastrar", {
                 method: "POST",
                 headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                
                estacaoServer: estacaoRecebida,
                andarServer: andarRecebido,
                nomeMaquinaServer: nomeMaquinaRecebido,
                soServer: soRecebido,
                andarServer: andarRecebido,
                fabricanteServer: fabricanteRecebido,
                idServer: idRecebido
            })
                }).then(function (resposta) {
                
                console.log("resposta: ", resposta);
                
            if (resposta.ok) {
                atualizarTabela()
                openModal()
                
                limparFormulario();
            } else {
                throw ("Houve um erro ao tentar realizar o cadastro!");
                }
                }).catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
                });

                
            }
                else{
                    


                    fetch(`/maquinas/editar/${funcionarioSelecionado}`, {
                    method: "PUT",
                    headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                estacaoServer: estacaoRecebida,
                andarServer: andarRecebido,
                nomeMaquinaServer: nomeMaquinaRecebido,
                soServer: soRecebido,
                fabricanteServer: fabricanteRecebido,
                idServer: funcionarioSelecionado,
                statusServer: statusRecebido,
                empresaServer: GETIdEmpresa()


                })
                }).then(function (resposta) {
                    atualizarTabela()

                }).catch(function (resposta) {
                    console.log(`#ERRO: ${resposta}`);
                });
                            
                
                    
                        modal.style.display = "none";
                }

                modal.style.display = "none";


            }

            const modal = document.getElementById("modal");
            const btnModal = document.getElementById("btn_add");
            const botaoCancel = document.getElementById("btnCancel");
            const botaoSave = document.getElementById("btnSave");
        
            btnModal.onclick = function() {
                document.querySelector("#nome").value=""
                document.querySelector("#fabricante").value =""
                document.querySelector("#SO").value = ""
                modal.style.display = "block";
                document.querySelector(".modal-header").innerHTML = "Cadastrar Máquina"
                acao ="Salvar"

                
            }
            botaoCancel.onclick = function() {
                modal.style.display = "none";
            }        
            
            function validarEstacao(){
                var estacao = document.querySelector("#estacoes").value
                if(estacao==""){
                    document.querySelector("#labelNome").style.display = "block"
                }
                else{
                    document.querySelector("#labelNome").style.display = "none"
                    return estacao
                }
            }

            function validarNome(){
                var nome = document.querySelector("#nome").value
                if(nome==""){
                    document.querySelector("#labelSobrenome").style.display = "block"
                }
                else{
                    document.querySelector("#labelSobrenome").style.display = "none"
                    return nome
                }
            }
            function validarSO(){
                var nome = document.querySelector("#SO").value
                if(nome==""){
                    document.querySelector("#labelAndar").style.display = "block"
                }
                else{
                    document.querySelector("#labelAndar").style.display = "none"
                    return nome
                }
            }

            

            function Adicionar(){
                   
                acao = "Editar"
            }

function ExcluirFinal(){
    var linhas = document.getElementsByTagName("tr");

// Loop para excluir cada linha
    for (var i = linhas.length - 1; i > 0; i--) {
    
        if(linhas[i].id == linhaEscolhida){

                fetch(`/maquinas/deletar/${linhaEscolhida}`, {
                    method: "PUT",
                    headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                id: linhaEscolhida
                })
                }).then(function (resposta) {
                    atualizarTabela()
                }).catch(function (resposta) {
                    console.log(`#ERRO: ${resposta}`);
                });
                            
                

  }
  else{
  }
}
}
function CancelarEx(){
    modalEx.style.display = "none";
}





var campoPesquisa = document.getElementById("ipt_pesquisar");
var tabela = document.getElementById("tabela");
campoPesquisa.addEventListener("input", function() {
  // Obter o valor do campo de pesquisa
  var valor = campoPesquisa.value.toLowerCase();
  // Obter todas as linhas da tabela (exceto o cabeçalho)
  var linhas = tabela.getElementsByTagName("tr");




  for (var i = 1; i < linhas.length; i++) {
    var andar = linhas[i].getElementsByTagName("td")[0].textContent.toLowerCase();
    var nome = linhas[i].getElementsByTagName("td")[1].textContent.toLowerCase();
    console.log(nome.indexOf(valor))
    if (nome.indexOf(valor) >= 0 || andar.indexOf(valor) >= 0) {
      linhas[i].style.display = "";
    } else {
      linhas[i].style.display = "none";
    }
  }
});
   
var selectLinhas = document.getElementById('linha');

// Adiciona um ouvinte de evento para o evento 'change'
selectLinhas.addEventListener('change', function() {
  // Código a ser executado quando o valor do <select> for alterado
  var selectedValue = selectLinhas.value;
  var selectedText = selectLinhas.options[selectLinhas.selectedIndex].text;
  carregarEstacoes(selectedValue)

});
  

function openModal() {
    document.getElementById("modalAlertaCadastro").classList.add("show");
    setTimeout(function() {
      closeModal();
    }, 5000); // Fechar a modal após 5 segundos (5000 milissegundos)
  }

  function closeModal() {
    var modal = document.getElementById("modalAlertaCadastro");
    modal.classList.add("hide");
    setTimeout(function() {
      modal.classList.remove("show");
      modal.classList.remove("hide");
    }, 300); // Remover a modal após a transição de 0.3s (300 milissegundos)
  }