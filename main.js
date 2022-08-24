import './style.css'

const app = document.getElementById('app')


function newGame() {
  
  let flippedNum = 0
  let flippedCards = []
  let moves = 0
  let timer = 0
  
  // DOM
  const container = document.createElement('div')
  container.className = 'container'
  app.appendChild(container)

  const h1 = document.createElement('h1')
  h1.innerText = 'Memory'
  container.appendChild(h1)

  const board = document.createElement('div')
  board.className = 'board'
  container.appendChild(board)

  const ui = document.createElement('div')
  ui.className = 'ui'
  container.appendChild(ui)

  const timerDisplay = document.createElement('p')
  timerDisplay.innerText = `${timer} seconds`
  timerDisplay.style.float = 'left'
  ui.appendChild(timerDisplay)

  const movesNum = document.createElement('p')
  movesNum.innerText = `${moves} moves`
  movesNum.style.float = 'right'
  ui.appendChild(movesNum)

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

      if (flippedNum < 2 && card.flipped == false) {

        flippedNum++
        flippedCards.push(card)

        card.flipped = true
        card.element.style.backgroundColor = card.color

        // MATCH
        if (flippedCards.length == 2 && flippedCards[0].color == flippedCards[1].color) {

          let index = cards.map(obj => obj.color).indexOf(flippedCards[0].color)
          cards.splice(index, 1) // SKETCHY
          index = cards.map(obj => obj.color).indexOf(flippedCards[0].color)
          cards.splice(index, 1) // SKETCHY

          // console.table(cards)

          flippedCards = []
          flippedNum = 0
          moves++

          // console.log(moves);

          // WIN
          if (cards.length == 14) {

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
              app.removeChild(container)
            })
          }
        }

        // NO MATCH
        else if (flippedCards.length == 2) {

          setTimeout(() => {
            cards.forEach(card => {
              if (card.flipped == true) {
                card.flipped = false
                card.element.style = 'none'
              }
            })

            flippedCards = []
            flippedNum = 0

          }, 1000)

          moves++

          // console.log(moves)

        }

        movesNum.innerText = `${moves} moves`

      }
    })
  })

  console.table(cards);
  return cards
}

newGame()





