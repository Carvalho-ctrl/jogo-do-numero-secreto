// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do número secreto';

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

// Criando uma função para fazer as coisas do código acima, visto que
// Fazem exatamente a mesma coisa para dois campos diferentes

function exibirTextoNaTela(tag, texto){ // Sempre a primeira palavra começa com minúsculo
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}
exibirMensagemInicial();

let listaDeNumerosSorteados = []; // Criando uma lista para saber todos os
// números que já foram sorteados e ai não acabar sorteando eles denovo
let numeroLimite = 10; // Número máximo de valores que podem ser sorteados
let numeroSecreto = gerarNumeroAleatorio(); // Gerando um número aleatório
let tentativas = 1;

// let button = document.querySelector('button').

// Funções: Colocar nomes intuitivos para entender o que a função faz
// Por padrão, definimos que nossas funções tenham apenas 1 responsabilidade
// Façam apenas 1 coisa - boas práticas de programação

function verificarChute(){ // Mesmo nome de função que está no HTML  
    //console.log('O botão foi clicado');
    let chute = document.querySelector('input').value; // obtém apenas o valor
    // do campo input
    if(chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou!!');
        // Se a gente passar o template string (``) diretamente na função,
        // talvez o HTML não entenda, pois ele está esperando uma 
        // string e não um template string
        // exibirTextoNaTela('p', 'Você descobriu o número secreto com x tentativas');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`; 
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if(chute > numeroSecreto){
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else{
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }      
}

// No HTML: <input type="number" min="1" max="10" class="container__input">

// No HTML: <button onclick="verificarChute()" class="container__botao">Chutar</button>

function gerarNumeroAleatorio() { // Número aleatório de 1 a 10
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == 3){
        listaDeNumerosSorteados = [];
    }
    // verifica se o número escolhido está na lista (função includes)
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio(); // Aqui temos uma recursão, isso é, a função
        // retorna ela mesmo e começa tudo de novo // Função com recursão deve-se tomar
        // cuidado ao utilizar // Aqui quando for sorteado todos os números
        // vai ocorrer um erro de loop infinito 
        // RangeError: Maximum call stack size exceeded at Math.random (<anonymous>)
    } else{
        listaDeNumerosSorteados.push(numeroEscolhido); // Adiciona o item ao fim
        // da lista de números que já foram sorteados
        console.log('Lista números sorteados: ' + listaDeNumerosSorteados)
        return numeroEscolhido;
    }
    
}

function limparCampo(){  // Limpa o campo onde o usuário insere o número
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1; 
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

