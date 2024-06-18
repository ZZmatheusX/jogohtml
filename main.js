const telaBoasVindas = document.getElementById('tela-de-boas-vindas');
const telaJogo = document.getElementById('tela-do-jogo');
const telaResultado = document.getElementById('tela-de-resultado');

const formularioBoasVindas = document.getElementById('formulario-de-boas-vindas');
const entradaNomeUsuario = document.getElementById('nome-usuario');
const entradaEmailUsuario = document.getElementById('nome-usuario-email');
const mensagemBoasVindas = document.getElementById('mensagem-de-boas-vindas');

const entradaAdivinhacao = document.getElementById('entrada-adivinhacao');
const botaoAdivinhar = document.getElementById('botao-adivinhar');
const mensagemFeedback = document.getElementById('mensagem-de-feedback');

const mensagemResultado = document.getElementById('mensagem-de-resultado');
const numeroCorretoDisplay = document.getElementById('numero-correto');
const mensagemPontuacao = document.getElementById('mensagem-de-pontuacao');
const botaoJogarNovamente = document.getElementById('botao-jogar-novamente');

let numeroCorreto;
let tentativas;
let nomeUsuario;

formularioBoasVindas.addEventListener('submit', function(event) {
    event.preventDefault();

    // Captura os valores do formulário
    nomeUsuario = entradaNomeUsuario.value;
    const emailUsuario = entradaEmailUsuario.value;

    // Validação básica do nome de usuário e email
    if (nomeUsuario.trim() === '' || emailUsuario.trim() === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Envio do formulário para FormSubmit
    const formData = new FormData();
    formData.append('nome-usuario', nomeUsuario);
    formData.append('nome-usuario-email', emailUsuario);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://formsubmit.co/your-email-here', true);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log('Formulário enviado com sucesso para o email.');
                iniciarJogo();
            } else {
                console.error('Erro ao enviar formulário:', xhr.status);
                // Aqui você pode tratar o erro conforme necessário
            }
        }
    };
    xhr.send(formData);
});
        

botaoAdivinhar.addEventListener('click', () => {
    const palpite = parseInt(entradaAdivinhacao.value);
    if (isNaN(palpite) || palpite < 1 || palpite > 100) {
        mensagemFeedback.textContent = 'Por favor, insira um número válido entre 1 e 100.';
        return;
    }
    tentativas++;
    if (palpite === numeroCorreto) {
        finalizarJogo();
    } else if (palpite < numeroCorreto) {
        mensagemFeedback.textContent = 'O número correto é maior.';
    } else {
        mensagemFeedback.textContent = 'O número correto é menor.';
    }
});

botaoJogarNovamente.addEventListener('click', iniciarJogo);

function iniciarJogo() {
    numeroCorreto = Math.floor(Math.random() * 100) + 1;
    tentativas = 0;
    mensagemBoasVindas.textContent = `Bem-vindo, ${nomeUsuario}!`;
    mensagemFeedback.textContent = '';
    entradaAdivinhacao.value = '';
    trocarTela(telaJogo);
}

function finalizarJogo() {
    mensagemResultado.textContent = `Parabéns, ${nomeUsuario}! Você acertou o número!`;
    numeroCorretoDisplay.textContent = `O número correto era: ${numeroCorreto}`;
    mensagemPontuacao.textContent = `Você fez ${tentativas} tentativa(s).`;
    trocarTela(telaResultado);
}

function trocarTela(tela) {
    telaBoasVindas.classList.remove('ativa');
    telaJogo.classList.remove('ativa');
    telaResultado.classList.remove('ativa');
    tela.classList.add('ativa');
}

trocarTela(telaBoasVindas);