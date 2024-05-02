const Html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-buttton--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const bandeira = document.querySelector('.app__imagem')
const título = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-butão')
const startPauseBt = document.querySelector('#start-pausa')
const musicaFocoInput = document.querySelector('#alternar-musica')
const iniciarOuPausarBt = document.querySelector('#intervalo de início-pausa')
const iniciarOuPausarBtIcone = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer')

const musica = new Áudio('/sons/luna-rise-part-one.mp3')
const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Áudio('./sons/beep.mp3')


let tempoDecorridoEmSegundos = 1500
let intervaloId = null

musica.loop = true

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    } else{
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
   alterarContexto('foco')
   focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
              <strong class="app__title-strong">mergulhe no que importa.</strong>
            ` 
            break;
        case "descanso-curto":  
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar a superfície.<strong class="app__title-strong">Faça uma pausa longa!</strong>
            `
        default:
            break;
    }
}

const contagemRegressiva = () =>{
    if(tempoDecorridoEmSeundos <= 0){
        audioTempoFinalizado.play()
        alert('Tempo finalizado!')
        zerar()
        return
    }
       tempoDecorridoEmSegundos -= 1
       mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar(){
    if(intervaloId){
        audioPausa.play()
        zerar()
        return
    }  
    audioPlay.play() 
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
    iniciarOuPausarBtIcone.setAttribute('src', `/imagens/play.png`)
}

function zerar() {
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar"
    iniciarOuPausarBtIcone.setAttribute('src', `/imagens/play_arrow.png`)
    intervaloId = null 
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleDateString('pt-Br', {minute:'2-digit', second:'2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()