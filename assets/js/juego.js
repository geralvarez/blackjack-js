// 2C = Two of Clubs
// 2D = Two of Diamonds
// 2H = Two of Hearts
// 2S = Two of Spades

let deck = [];
let tipos = ['C', 'D', 'H', 'S'];
let especiales = ['A', 'J', 'Q', 'K'];

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

    console.log( deck );
    deck = _.shuffle( deck );
    console.log( deck );
}

crearDeck();