// 2C = Two of Clubs
// 2D = Two of Diamonds
// 2H = Two of Hearts
// 2S = Two of Spades

// ----------------------------------------
// Variables
// ----------------------------------------

let deck = [];
let tipos = ['C', 'D', 'H', 'S'];
let especiales = ['A', 'J', 'Q', 'K'];

let puntajeJugador = 0;
let puntajeComputadora = 0;

// ----------------------------------------
// Referencias HTML
// ----------------------------------------

const btnPedirCarta   = document.querySelector('#btn-pedir-carta');
const btnNuevoJuego   = document.querySelector('#btn-nuevo-juego');
const btnDetenerJuego = document.querySelector('#btn-detener-juego');

const smlPuntaje = document.querySelectorAll('small');
const PUNTAJE_JUGADOR = 0;
const PUNTAJE_COMPUTADORA = 1;

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

// ----------------------------------------
// Funciones
// ----------------------------------------

// Crea una nueva baraja.
const crearDeck = () => {

    for (let i = 2; i <= 10; i++) {
        for (let j = 0; j < tipos.length; j++) {
            deck.push( i + tipos[j] );
        }
    }

    for (let tipo of tipos) {
        for(let especial of especiales) {
            deck.push( especial + tipo );
        }
    }

    deck = _.shuffle( deck );
}

// Saca una carta de la parte superior de la baraja.
const pedirCarta = () => {
    
    if (deck.length === 0) {
        throw 'No hay cartas en el deck' 
    }

    const carta = deck.pop();
    return carta;
}

const valorCarta = ( carta ) => {

    const valor = carta.substring(0, carta.length - 1);
    return ( isNaN( valor ) ) ? ( valor === 'A' ) ? 11 : 10 : Number(valor);
}

// Turno de la computadora.
const turnoComputadora = ( puntajeMinimo ) => {

    do {
        const carta = pedirCarta();
        puntajeComputadora += valorCarta( carta );
        smlPuntaje[PUNTAJE_COMPUTADORA].innerText = puntajeComputadora;
        
        // <img class="carta" src="assets/cartas/10C.png" alt="Carta">
        const imgCarta = document.createElement('img');
        imgCarta.classList.add('carta');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.alt='Carta';
    
        divCartasComputadora.append( imgCarta );

    } while( (puntajeMinimo <= 21) && (puntajeComputadora < puntajeMinimo));

    setTimeout(() => {
        declararGanador( puntajeMinimo );
    }, 100);
};

crearDeck();


const declararGanador = ( puntajeJugador ) => {

    if ( puntajeComputadora === puntajeJugador) {
        alert('Nadie ganó :(');
    }

    else if ( puntajeJugador > 21 ) {
        alert('Ganó la computadora.');
    }

    else if ( puntajeComputadora > puntajeJugador && puntajeComputadora <= 21) {
        alert('Ganó la computadora.');
    }

    else if ( puntajeComputadora > 21 ) {
        alert('Ganó el jugador :D');
    }

};

// ----------------------------------------
// Eventos
// ----------------------------------------

btnPedirCarta.addEventListener('click', () => {
    const carta = pedirCarta();
    puntajeJugador += valorCarta( carta );
    smlPuntaje[PUNTAJE_JUGADOR].innerText = puntajeJugador;
    
    // <img class="carta" src="assets/cartas/10C.png" alt="Carta">
    const imgCarta = document.createElement('img');
    imgCarta.classList.add('carta');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.alt='Carta';

    divCartasJugador.append( imgCarta );

    if(puntajeJugador > 21) {
        btnPedirCarta.disabled = true;
        btnDetenerJuego.disabled = true;
        console.warn( 'Has perdido.' );
        turnoComputadora( puntajeJugador );
    }
    else if (puntajeJugador === 21) {
        btnPedirCarta.disabled = true;
        console.warn( 'Has ganado!' );
    }
    
    console.log({ carta, puntajeJugador });
});


btnDetenerJuego.addEventListener('click', () => {
    btnPedirCarta.disabled = true;
    btnDetenerJuego.disabled = true;
    turnoComputadora(puntajeJugador);
});

btnNuevoJuego.addEventListener('click', () => {
    
    puntajeJugador = 0;
    puntajeComputadora = 0;
    smlPuntaje[PUNTAJE_JUGADOR].innerText = puntajeJugador;
    smlPuntaje[PUNTAJE_COMPUTADORA].innerText = puntajeComputadora;
    divCartasJugador.innerHTML = '';
    divCartasComputadora.innerHTML = '';
    
    deck = [];
    crearDeck();

    btnPedirCarta.disabled = false;
    btnDetenerJuego.disabled = false;
});