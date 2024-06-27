let listaDeNumerosSorteados = [];
let dificuldade = 1;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

console.log(numeroSecreto);

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Por favor, selecione um nível de dificuldade primeiro');
}

exibirMensagemInicial();
document.querySelectorAll('.container__botao__dificuldade').forEach(botao => botao.removeAttribute('disabled'));


function verificarChute() {
    let chute = document.querySelector('input').value;
    console.log(numeroSecreto);
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}, caso queira continuar clique em Novo Jogo!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function niveisDeDificuldade(event) {
    let valor = event.target.dataset.value;

    switch (valor) {
        case 'facil':
            dificuldade = 10;
            exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
            break;
        
        case 'medio':
            dificuldade = 100
            exibirTextoNaTela('p', 'Escolha um número entre 1 e 100');
            break;

        case 'dificil':
            dificuldade =1000
            exibirTextoNaTela('p', 'Escolha um número entre 1 e 1000');
            break;
    }

    numeroSecreto = gerarNumeroAleatorio(); // Gera o número secreto após definir a dificuldade
    tentativas = 1; // Reseta as tentativas
    console.log(numeroSecreto);

    desabilitarOutrosBotoes(event.target);

}

//Captura o butão pelo class
let botoes = document.querySelectorAll('.container__botao__dificuldade');

//Verifica todos os botões com a mesma class
botoes.forEach(function(botao) {
    botao.addEventListener('click', niveisDeDificuldade);
});
    

function gerarNumeroAleatorio() {
    if (dificuldade === 0) {
        console.log("Por favor, selecione um nível de dificuldade primeiro.");
        return;
    }

    let numeroEscolhido = parseInt(Math.random() * dificuldade + 1);

    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    if (quantidadeDeElementosNaLista == dificuldade) {
      listaDeNumerosSorteados = [];
    }
    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
      return gerarNumeroAleatorio();
    }else {
      listaDeNumerosSorteados.push(numeroEscolhido);
      console.log(listaDeNumerosSorteados)
      return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.querySelectorAll('.container__botao__dificuldade').forEach(botao => botao.removeAttribute('disabled'));
}

function desabilitarOutrosBotoes(botaoClicado) {
    document.querySelectorAll('.container__botao__dificuldade').forEach(botao => {
        if (botao !== botaoClicado) {
            botao.setAttribute('disabled', true);
        }
    });
}





