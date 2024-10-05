let jogador1 = { nome: '', pontuacao: 0 };
let jogador2 = { nome: '', pontuacao: 0 };
let velha = 0;
let ultimoGanhador = 0;

async function darNome(id) {
    const { value: nomeJogador } = await Swal.fire({
        title: `Digite o nome do ${id}!`,
        input: 'text',
        inputPlaceholder: 'Digite seu nome'
    });
    document.querySelector(`#${id}`).innerHTML = nomeJogador.toUpperCase();
    if (id == 'jogador1') {
        jogador1.nome = nomeJogador;
    } else {
        jogador2.nome = nomeJogador
    }
}

async function adicionarNomesJogadores() {
    await darNome('jogador1');
    await darNome('jogador2');
}
adicionarNomesJogadores()

let quadros = document.querySelectorAll('.quadros');
let pontuacaoJogador1 = document.querySelector('#Pontuacao-jogador1');
let pontuacaoJogador2 = document.querySelector('#Pontuacao-jogador2');
let velhaP = document.querySelector('#velha');
let jogador = 0;

function verificarVitoria(quadros) {
    const linhas = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let linha of linhas) {
        const [a, b, c] = linha;
        if (quadros[a].textContent && quadros[a].textContent === quadros[b].textContent && quadros[a].textContent === quadros[c].textContent) {
            return true;
        }
    }

    return false;
}

function zerar() {
    for (let i = 0; i < quadros.length; i++) {
        quadros[i].textContent = '';
    }
    if (ultimoGanhador == 0) {
        jogador = 0;
    } else if (ultimoGanhador == 1) {
        jogador = 1;
    }
}

function vezDoJogador() {
    const jogadorDaVez = document.querySelectorAll('.sua-vez');
    jogadorDaVez[(jogador + 1) % 2].classList.add('jogador-da-vez');
    jogadorDaVez[jogador].classList.remove('jogador-da-vez');
}

for (let i = 0; i < quadros.length; i++) {
    quadros[i].addEventListener("click", () => {
        vezDoJogador();
        if (quadros[i].textContent === '') {
            quadros[i].textContent = jogador === 0 ? 'O' : 'X';
            jogador = (jogador + 1) % 2;

            let camposPreenchidos = 0;
            for (let i = 0; i < quadros.length; i++) {
                if (quadros[i].textContent !== '') {
                    camposPreenchidos++;
                }
                if (camposPreenchidos == 9) {
                    Swal.fire({
                        icon: "question",
                        title: `Deu velha!`,
                        showConfirmButton: false,
                        timer: 5500
                    });
                    velha++;
                    velhaP.innerHTML = velha.toString().padStart(2, '0');
                    ultimoGanhador = (ultimoGanhador + 1) % 2;
                    vezDoJogador();
                    zerar();
                }
            }

            if (verificarVitoria(quadros)) {

                Swal.fire({
                    title: `Parabéns ${quadros[i].textContent == 'O' ? jogador1.nome.toUpperCase() : jogador2.nome.toUpperCase()} você ganhou!!`,
                    width: 600,
                    padding: "3em",
                    color: "#716add",
                    background: "#fff url(./assets/backgroud-comemoracao.png)",
                    backdrop: `
                      rgba(0,0,123,0.4)
                      url("./assets/nyan-cat.gif")
                      center top
                      no-repeat
                    `
                });
                if (quadros[i].textContent == 'O') {
                    jogador1.pontuacao++;
                    pontuacaoJogador1.innerHTML = jogador1.pontuacao.toString().padStart(2, '0');
                    ultimoGanhador = 0;
                } else {
                    jogador2.pontuacao++;
                    pontuacaoJogador2.innerHTML = jogador2.pontuacao.toString().padStart(2, '0');
                    ultimoGanhador = 1;
                }
                vezDoJogador();
                zerar();
            }
        }
    });
}