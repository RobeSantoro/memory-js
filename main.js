import './style.css'

// PREP ARRAYs
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
const colors = ['red', 'blue', 'green', 'cyan', 'yellow', 'magenta', 'black', 'orange']

// Duplicate and shuffle the color array
colors.push(...colors)
colors.sort(() => {
  return Math.random() - 0.5;
})

const cards = []
let numFlipped = 0
let flipped = []
let moves = 0

// DOM
const app = document.getElementById('app')
const board = document.createElement('div')

app.innerHTML = '<h1>Memory</h1>'
app.appendChild(board)
board.className = 'board'

// Create the board and the cards array
numbers.forEach(number => {

})

function generateBoard() {
  // Card Creation
  for (let i = 0; i < numbers.length; i++) {

    const number = numbers[i]
    const color = colors[i]
    const element = document.createElement('button')
    const card = { number, color, flipped: false, element }

    element.className = 'card'
    element.id = card.number
    element.innerHTML = card.number
    board.appendChild(element)

    cards.push(card)
  }
}

generateBoard()

// Cycle through cards and game logic
cards.forEach(card => {

  card.element.addEventListener('mousedown', () => {

    if (numFlipped < 2 && card.flipped == false) {

      numFlipped++
      flipped.push(card)

      card.flipped = true
      card.element.style.backgroundColor = card.color

      // MATCH
      if (flipped.length == 2 && flipped[0].color == flipped[1].color) {

        let index = cards.map(obj => obj.color).indexOf(flipped[0].color)
        cards.splice(index, 1) // SKETCHY
        index = cards.map(obj => obj.color).indexOf(flipped[0].color)
        cards.splice(index, 1) // SKETCHY

        console.table(cards);

        flipped = []
        numFlipped = 0

        // WIN
        if (cards.length == 14) {
          board.style.display = 'none'
          app.innerHTML = '<h1>YOU WIN!</h1>'

          const playButton = document.createElement('button')
          playButton.innerText = 'Play Again'
          playButton.classList.add('button')
          app.appendChild(playButton)

          playButton.addEventListener('click', () => {
            
            generateBoard();
            playButton.style.display = 'none'
          })

          console.log('YOU WIN')
        }
      }

      // NO MATCH
      else if (flipped.length == 2) {

        setTimeout(() => {
          cards.forEach(card => {
            if (card.flipped == true) {
              card.flipped = false
              card.element.style = 'none'
            }
          })

          flipped = []
          numFlipped = 0

        }, 1000)
      }
    }
  })
})

console.table(cards);



