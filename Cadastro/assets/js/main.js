function CadastroEmpresa(){
    window.location.href ="file:///C:/Users/igor0/OneDrive/%C3%81rea%20de%20Trabalho/Celeratti/site/Login/login.html";
}

const input = document.querySelector('#cnpj')

input.addEventListener('keypress', () => {

console.log("Teste")

let inputLength = input.value.length

// MAX LENGHT 14  CPF
if (inputLength == 3 || inputLength == 7) {
    input.value += '.'
}else if (inputLength == 11) {
    input.value += '-'
}
})