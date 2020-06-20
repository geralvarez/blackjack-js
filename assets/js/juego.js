// 2C = Two of Clubs
// 2D = Two of Diamonds
// 2H = Two of Hearts
// 2S = Two of Spades

let deck = [];
let tipos = ['C', 'D', 'H', 'S'];
let especiales = ['A', 'J', 'Q', 'K'];

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