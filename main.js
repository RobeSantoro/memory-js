import './style.css'

// DOM
const app = document.getElementById('app')
const h1 = document.createElement('h1')
const board = document.createElement('div')

board.className = 'board'

app.appendChild(h1)
app.appendChild(board)

function newGame() {
  
  h1.innerHTML = 'Memory'

  let numFlipped = 0
  let flipped = []
  let moves = 0

  // PREP ARRAYs
  const cards = []
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
  const colors = ['red', 'blue', 'green', 'cyan', 'yellow', 'magenta', 'black', 'orange']

  // Duplicate and shuffle the color array
  colors.push(...colors)
  colors.sort(() => {
    return Math.random() - 0.5;
  })

  // Card Creation
  for (let i = 0; i < numbers.length; i++) {

    const number = numbers[i]
    const color = colors[i]
    const element = document.createElement('button')
    const card = { number, color, flipped: false, element }

    element.className = 'card'
    element.id = card.number
    element.innerHTML = card.number
    board.style.display = 'grid'
    board.appendChild(element)

    cards.push(card)
  }

  // Cycle through created cards and game logic
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

          /* console.table(cards); */

          flipped = []
          numFlipped = 0

          // WIN
          if (cards.length == 0) {

            board.style.display = 'none'
            h1.innerHTML = 'YOU WIN!'

            const playButton = document.createElement('button')
            playButton.innerText = 'Play Again'
            playButton.classList.add('button')
            app.appendChild(playButton)

            playButton.addEventListener('click', () => {
              board.innerHTML = ''
              newGame();
              app.removeChild(playButton)
            })
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
  return cards
}

newGame()





