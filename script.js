let jogador1 ={nome: '', pontuacao: 0};
let jogador2 ={nome: '', pontuacao: 0};
let velha = 0;
function adicionarNomesJogadores(){
    
    jogador1.nome = prompt("Digite seu nome.", "Jogador1");
    
    if (jogador1 == null || jogador1 == "") {
        alert("Seu nome será jogador1!");
        jogador1 = "jogador1";
    }
    
    jogador2.nome = prompt("Digete seu nome.", "Jogador2");

    if(jogador2 == null || jogador2 == "") {
        alert("Seu nome será jogador2!");
        jogador2 = "jogador2";
    }
    document.querySelector('#jogador1').innerHTML = jogador1.nome;
    document.querySelector('#jogador2').innerHTML = jogador2.nome;
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
    jogador - 1;
}

for (let i = 0; i < quadros.length; i++) {
    quadros[i].addEventListener("click", () => {
        //console.log(quadros[i].textContent == '')
        if (quadros[i].textContent === '') {
            quadros[i].textContent = jogador === 0 ? 'O' : 'X';
            jogador = (jogador + 1) % 2; // Alterna entre 0 e 1

            let camposPreenchidos = 0;
            for (let i = 0; i < quadros.length; i++) {
                if(quadros[i].textContent !== '') {
                    camposPreenchidos++;
                    //console.log(camposPreenchidos);
                }
                if(camposPreenchidos == 9) {
                    alert('terminou');
                    velha++;
                    velhaP.innerHTML = velha;
                    zerar();
                }
            }

            if (verificarVitoria(quadros)) {
                alert(`Parabéns Jogador ${quadros[i].textContent} você ganhou!!`);
                if(quadros[i].textContent == 'O') {
                    jogador1.pontuacao++;
                    pontuacaoJogador1.innerHTML = jogador1.pontuacao;
                } else {
                    jogador2.pontuacao++;
                    pontuacaoJogador2.innerHTML = jogador2.pontuacao;
                }
                zerar();
            }
        }
    });
}