const miModulo = (() => {
    'use strict'

    // ----------------------------------------
    // Variables
    // ----------------------------------------

    let deck = [];
    let tipos = ['C', 'D', 'H', 'S'];
    let especiales = ['A', 'J', 'Q', 'K'];
    let puntajes = [];

    // ----------------------------------------
    // Referencias HTML
    // ----------------------------------------

    const btnPedirCarta   = document.querySelector('#btn-pedir-carta');
    const btnNuevoJuego   = document.querySelector('#btn-nuevo-juego');
    const btnDetenerJuego = document.querySelector('#btn-detener-juego');
    const smlPuntaje = document.querySelectorAll('small');
    const divCartasJugadores = document.querySelectorAll('.divCartas');

    // ----------------------------------------
    // Funciones
    // ----------------------------------------

    // Crea una nueva baraja.
    const crearDeck = () => {

        deck = [];

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

        return _.shuffle( deck );
    }

    // Inicializa el juego.
    const inicializarJuego = ( cantJugadores = 2) => {
        // Inicializo la baraja.
        deck = crearDeck();

        // Inicializo la puntuación.
        puntajes = [];
        for(let i = 0; i < cantJugadores; i++) {
            puntajes.push(0);
        }
        
        smlPuntaje.forEach(
            smallTag => smallTag.innerText = 0
        );
        
        // Inicializo las cartas en mano de los jugadores.
        divCartasJugadores.forEach(cartas => cartas.innerHTML = '');
        
        // Habilitamos la botonera.
        btnPedirCarta.disabled = false;
        btnDetenerJuego.disabled = false;
    }

    // Saca una carta de la parte superior de la baraja.
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'No hay cartas en el deck' 
        }
        return deck.pop();
    }

    const valorCarta = ( carta ) => {
        const valor = carta.substring(0, carta.length - 1);
        return ( isNaN( valor ) ) ? ( valor === 'A' ) ? 11 : 10 : Number(valor);
    }

    const acumularPuntos = ( jugador, carta ) => {
        puntajes[jugador] += valorCarta(carta);
        smlPuntaje[jugador].innerText = puntajes[jugador];
        return puntajes[jugador];
    }
    
    const crearCarta = (jugador, carta) => {
        const imgCarta = document.createElement('img');
        imgCarta.classList.add('carta');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.alt=`${carta} card`;
        divCartasJugadores[jugador].append(imgCarta);
    }

    // Turno de la computadora.
    const turnoComputadora = ( puntajeMinimo ) => {
        let puntajeComputadora = 0;

        do {
            const carta = pedirCarta();
            puntajeComputadora = acumularPuntos(puntajes.length - 1, carta);
            crearCarta(puntajes.length - 1, carta);
        } while(puntajeMinimo <= 21 && puntajeComputadora < puntajeMinimo);

        
            declararGanador( puntajeMinimo );
    };

    const declararGanador = ( puntajeJugador ) => {
        const puntajeComputadora = puntajes[puntajes.length - 1];        
        setTimeout(() => {
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
        }, 100);
    };

    // ----------------------------------------
    // Eventos
    // ----------------------------------------

    btnPedirCarta.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntajeJugador = acumularPuntos(0, carta);

        crearCarta(0, carta);

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
        turnoComputadora(puntajes[0]);
    });

    btnNuevoJuego.addEventListener('click', () => {
        inicializarJuego(2);
    });
    
    return {
        nuevoJuego: inicializarJuego
    };

})();

