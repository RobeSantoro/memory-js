import './style.css'

const app = document.getElementById('app')
const board = document.createElement('div')

app.innerHTML = '<h1>Memory</h1>'
app.appendChild(board)
board.className = 'board'

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
const colors = ['red', 'blue', 'green', 'cyan', 'yellow', 'magenta', 'black', 'orange']

colors.push(...colors)

// Shuffle Colors Array
colors.sort( ()=> {
  return Math.random() - 0.5;
})

const cards = []

// Create the board and the cards array
for (let i = 0; i < numbers.length; i++) {

  const number = numbers[i]
  const color = colors[i % colors.length]
  const card = { number, color, flipped: false }

  const cardElement = document.createElement('button')
  cardElement.className = 'card'

  cardElement.id = card.number
  cardElement.innerHTML = card.number

  board.appendChild(cardElement)
  cards.push(card)
}

const cardElements = document.querySelectorAll('.card')

let numFlipped = 0

// Cycle through created cards and listen to mouse click
cardElements.forEach(cardEl => {
  cardEl.addEventListener('mousedown', () => {

    // Flip the card
    if (cards[cardEl.id - 1].flipped == false) {
      numFlipped++
      cards[cardEl.id - 1].flipped = true;
      cardEl.style = `background-color : ${cards[cardEl.id - 1].color}`;

      // if two cards are flipped
      if (numFlipped == 2) {        
        
      }

    } else {
      numFlipped--
      cards[cardEl.id - 1].flipped = false;
      cardEl.style = 'none'
    }

    console.table(cards);
    //console.log('Flipped: ' + numFlipped);
  })
})

const button = document.getElementById('but')
button.style = 'font-size '






