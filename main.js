import './style.css'

const app = document.getElementById('app')
const board = document.createElement('div')

app.innerHTML = '<h1>Memory</h1>'
app.appendChild(board)
board.className = 'board'

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
const colors = ['red', 'blue', 'green', 'cyan', 'yellow', 'magenta', 'black', 'orange']

// Duplicate the color array
colors.push(...colors)

// Shuffle Colors Array
// colors.sort(() => {
//   return Math.random() - 0.5;
// })

const cards = []

// Create the board and the cards array
for (let i = 0; i < numbers.length; i++) {

  const number = numbers[i]
  const color = colors[i % colors.length]

  const element = document.createElement('button')
  element.className = 'card'

  const card = { number, color, flipped: false, element }
  element.id = card.number
  element.innerHTML = card.number

  board.appendChild(element)
  cards.push(card)
}

let numFlipped = 0
let flipped = []

// Cycle through created cards html element and listen to mouse click
cards.forEach(card => {
  const button = card.element
  button.addEventListener('mousedown', () => {

    if (numFlipped < 2 && card.flipped == false) {

      numFlipped++
      flipped.push(card)

      card.flipped = true
      button.style.backgroundColor = card.color

      // MATCH
      if (flipped.length == 2 && flipped[0].color == flipped[1].color) {

        let index = cards.map( obj =>  obj.color).indexOf(flipped[0].color)
        cards.splice(index,1)
        index = cards.map( obj =>  obj.color).indexOf(flipped[0].color)
        cards.splice(index,1)

        console.table(cards);

        flipped = []
        numFlipped = 0

        if (cards.length == 0) {
          console.log('YOU WIN')
        }
      }
      
      // NO MATCH
      else if (flipped.length == 2) {
        setTimeout( () => {

          cards.forEach( card => {
            if (card.flipped == true) {
              card.flipped = false
              card.element.style = 'none'
            }
          })

          flipped = []
          numFlipped = 0

        }, 2000)
        
        console.log(cards);


      }



    }



  })
})

console.table(cards);


/* // Cycle through created cards html element and listen to mouse click
let numFlipped = 0
const cardElements = document.querySelectorAll('.card')
cardElements.forEach(cardEl => {
  cardEl.addEventListener('mousedown', () => {

    // Flip the card if is not already flipped
    if (cards[cardEl.id - 1].flipped == false && numFlipped < 2) {

      numFlipped++
      cards[cardEl.id - 1].flipped = true;
      cardEl.style = `background-color : ${cards[cardEl.id - 1].color}`;

      // if two cards are flipped
      if (numFlipped == 2) {
        
        let flippedCards = []

        // Create Flipped Cards Array
        // SBAGLIATO
        cards.forEach( card => {
          if (card.flipped == true) {
            flippedCards.push(card)
          }          
        }) 

        // Cards not match
        if (flippedCards[0].color != flippedCards[1].color) {

          flippedCards[0].flipped = false
          flippedCards[1].flipped = false          
          const cardEl1 = document.getElementById(`${flippedCards[0].number}`)
          const cardEl2 = document.getElementById(`${flippedCards[1].number}`)
          cardEl1.style = 'none'
          cardEl2.style = 'none'

          numFlipped = 0
          
          console.log(flippedCards);
          flippedCards.pop();
          flippedCards.pop();
          console.log(flippedCards);

        } else {
          console.log('WIN');
          
          numFlipped = 0
          
          console.log(flippedCards);

          // flippedCards.pop();          
          // flippedCards.pop();
          // console.log(flippedCards);

        }

      }

    } else {
      numFlipped--
      cards[cardEl.id - 1].flipped = false;
      cardEl.style = 'none'
    }

    console.table(cards);
    console.log('numFlipped: ' + numFlipped);
  })
})
 */




