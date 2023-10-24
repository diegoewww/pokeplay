let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 50;
let timerInicial = 50;
let tiempoRegresivoId = null;

let winAudio = new Audio("./sounds/win.wav")
let loseAudio = new Audio("./sounds/lose.wav")
let rightAudio = new Audio("./sounds/right.wav")
let wrongAudio = new Audio("./sounds/wrong.wav")
let clickAudio = new Audio("./sounds/click.wav")

let mostrarMovimiento = document.getElementById("movimientos")
let mostrarAcierto = document.getElementById("aciertos")
let mostrarTiempo = document.getElementById("t-restante")


let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]

numeros = numeros.sort(()=> { return Math.random() - 0.5})

function contartTiempo() {
    tiempoRegresivoId = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`
        if(timer === 0){
            clearInterval(tiempoRegresivoId)
            bloquearTarjetas();
            loseAudio.play();
        }
    }, 1000);
}

function bloquearTarjetas() {
    for(let i = 0; i< numeros.length ; i++){
        let tarjetaBloqueada = document.getElementById(i)
        tarjetaBloqueada.innerHTML = `<img src="./img/${numeros[i]}.png" >`;
        tarjetaBloqueada.disable = true;
    }
}

function destapar(id) {
    if(temporizador === false){
        contartTiempo();
        temporizador = true
    }
    tarjetasDestapadas++;

    if(tarjetasDestapadas == 1){
        tarjeta1 = document.getElementById(id)
        primerResultado = numeros[id];
        tarjeta1.innerHTML = `<img src="./img/${primerResultado}.png">`;
        clickAudio.play()
        tarjeta1.disable = true;
    }else if(tarjetasDestapadas == 2){
        tarjeta2 = document.getElementById(id)
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = `<img src="./img/${segundoResultado}.png">`;
        tarjeta2.disable = true;
        movimientos++;
        mostrarMovimiento.innerHTML = `Movimientos ${movimientos}`
        if(primerResultado === segundoResultado){
            tarjetasDestapadas = 0;
            aciertos++;
            mostrarAcierto.innerHTML = `Aciertos :${aciertos}`
            rightAudio.play()
            if(aciertos == 8){
                clearInterval(tiempoRegresivoId)
                mostrarAcierto.innerHTML = `Aciertos :${aciertos}`
                mostrarMovimiento.innerHTML = `Movimientos :${movimientos}`
                mostrarTiempo.innerHTML = `Fantastico :${timerInicial - timer} segundos`
                winAudio.play()
            }
        }else{
            setTimeout(() => {
                tarjeta1.innerHTML = '';
                tarjeta2.innerHTML = '';
                tarjeta1.disable= false;
                tarjeta2.disable= false;
                tarjetasDestapadas = 0;
                wrongAudio.play()
            }, 700);
        }
    }
}