var timerId = null //Variavel que armazena a chamada da funçao  setTimeout

function iniciajogo() {
  var url = window.location.search
  var nivel_jogo = url.replace('?', '')

  var tempo_segundos = 0

  if (nivel_jogo == 1) {
    //1 facil --120 segundos
    tempo_segundos = 120
  }

  if (nivel_jogo == 2) {
    // 2 normal -- 60 segundos
    tempo_segundos = 60
  }

  if (nivel_jogo == 3) {
    // 3 dificil -- 30 segundos
    tempo_segundos = 30
  }

  //Inserir os segundos no cronometro
  document.getElementById('cronometro').innerHTML = tempo_segundos

  //quantidade de patos
  var qtde_patos = 40
  criar_patos(qtde_patos)

  //Contador de patos vivos
  document.getElementById('patos_vivos').innerHTML = qtde_patos

  //Contador de patos mortos
  document.getElementById('patos_mortos').innerHTML = 0

  contagem_tempo(tempo_segundos + 1)
}

function contagem_tempo(segundos) {
  segundos = segundos - 1
  if (segundos == -1) {
    clearTimeout(timerId) //para a execuçao da funçao  do setTimeout
    game_over();
    return false
  }

  document.getElementById('cronometro').innerHTML = segundos

  timerId = setTimeout('contagem_tempo(' + segundos + ')', 1000)
}

function game_over() {
  remove_eventos_patos()
  alert('Fim de Jogo! Alguns Patos Fugiram!!!')
}

function criar_patos(qtde_patos) {
  for (var i = 1; i <= qtde_patos; i++) {
    var patos = document.createElement("img")
    patos.src = 'img/pato.png'
    patos.id = 'p' + i;
    patos.onclick = function () {
      matar(this);
    }

    document.getElementById('cenario').appendChild(patos);
  }
}

function matar(m) {
  var id_patos = m.id;

  document.getElementById(id_patos).setAttribute("onclick", "");
  document.getElementById(id_patos).src = 'img/pato_morto.png';

  pontuacao(-1);
}

function pontuacao(acao) {
  var patos_vivos = document.getElementById('patos_vivos').innerHTML;
  var patos_mortos = document.getElementById('patos_mortos').innerHTML;

  patos_vivos = parseInt(patos_vivos);
  patos_mortos = parseInt(patos_mortos);

  patos_vivos = patos_vivos + acao;
  patos_mortos = patos_mortos - acao;

  document.getElementById('patos_vivos').innerHTML = patos_vivos;
  document.getElementById('patos_mortos').innerHTML = patos_mortos;

  situacao_jogo(patos_vivos);
}

function remove_eventos_patos() {
  var i = 1 //contador para recuperar baloes por id

  //percorrer os elementos de acordo com o id e só ira sair  do laço quando nao houver  correspondencia com os elementos
  while (document.getElementById('p' + i)) {
    //retira o evento onclick do elemento
    document.getElementById('p' + i).onclick = "";
    i++ //faz a iteraçao da variavel i
  }
}

function situacao_jogo(patos_vivos) {
  if (patos_vivos == 0) {
    alert('Parabéns!! Todos os Patos Foram Mortos!!!!');
    para_jogo();
  }
}

function para_jogo() {
  clearTimeout(timerId);
}
