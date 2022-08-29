import './style.css'
import { uniqueNamesGenerator, NumberDictionary, names } from 'unique-names-generator';

const app = document.getElementById('app')

function newGame() {

  let flippedNum = 0
  let flippedCards = []
  let moves = 0
  let seconds = 0
  const leaderBoardObj = {}

  // BOARD
  const container = document.createElement('div')
  container.className = 'container'
  app.appendChild(container)

  const h1 = document.createElement('h1')
  h1.innerText = 'Memory'
  container.appendChild(h1)

  const board = document.createElement('div')
  board.className = 'board'
  container.appendChild(board)

  // UI
  const ui = document.createElement('div')
  ui.className = 'ui'
  container.appendChild(ui)

  // SECONDS COUNTER
  const timerDisplay = document.createElement('p')
  timerDisplay.innerText = `${seconds} seconds`
  timerDisplay.style.float = 'left'
  ui.appendChild(timerDisplay)

  let timer = setInterval(() => {
    seconds += 1;
    timerDisplay.innerText = `${seconds} seconds`
  }, 1000)

  // MOVES COUNTER
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
        if (flippedCards.length == 2 && flippedCards[0].color == flippedCards[1].color ) {

          let indexToDelete = cards.map(obj => obj.color).indexOf(flippedCards[0].color)
          cards.splice(indexToDelete, 1)

          indexToDelete = cards.map(obj => obj.color).indexOf(flippedCards[0].color)
          cards.splice(indexToDelete, 1)

          flippedCards = []
          flippedNum = 0
          moves++

          // WIN
          if (cards.length == 0) {

            clearInterval(timer)

            board.style.display = 'none'
            h1.innerHTML = 'YOU WIN!'


            // 4 LEADERBOARD
            const inputName = document.createElement('input')
            inputName.placeholder = 'Insert your name'
            container.appendChild(inputName)

            // RANDOM NAME GENERATOR
            const characterName = uniqueNamesGenerator({ dictionaries: [names] });
            inputName.value = characterName

            const submitName = document.createElement('button')
            submitName.innerText = 'Sumbit'
            submitName.className = 'button'
            container.appendChild(submitName)

            submitName.addEventListener('click', () => {

              leaderBoardObj.name = inputName.value
              leaderBoardObj.moves = moves
              leaderBoardObj.seconds = seconds

              container.removeChild(ui)
              container.removeChild(inputName)
              container.removeChild(submitName)

              addToLeaderBoard(leaderBoardObj)

            })

            // NEW GANE
            const playButton = document.createElement('button')
            playButton.innerText = 'Play Again'
            playButton.classList.add('button')
            app.appendChild(playButton)

            playButton.addEventListener('click', () => {
              board.innerHTML = ''
              app.removeChild(playButton)
              if (document.querySelector('.container')) {
                app.removeChild(container)
              }
              newGame();
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

        }

        movesNum.innerText = `${moves} moves`



      }
    })
  })

  return leaderBoardObj
}

function addToLeaderBoard(leaderBoardObj) {

  // DOM
  document.querySelector('h1').innerText = 'LeaderBoard'
  const container = document.querySelector('.container')

  const leaderBoardDiv = document.createElement('div')
  leaderBoardDiv.className = 'leaderBoard'
  container.appendChild(leaderBoardDiv)

  createLeaderBoardRow(leaderBoardDiv)

  // LEADERBOARD LOGIC
  let actualLeaderBoard = localStorage.getItem("Leader Board")

  if (actualLeaderBoard == null) {

    actualLeaderBoard = []
    actualLeaderBoard.push(leaderBoardObj)
    localStorage.setItem("Leader Board", JSON.stringify(actualLeaderBoard))

  } else {

    actualLeaderBoard = JSON.parse(actualLeaderBoard)
    actualLeaderBoard.push(leaderBoardObj)

    // SORT LEADERBOARD ARRAY
    actualLeaderBoard.sort((a, b) => {
      return (a.moves + a.seconds) - (b.moves + b.seconds)
    })

    localStorage.setItem("Leader Board", JSON.stringify(actualLeaderBoard))
  }

  // DOM POPULATE
  for (let i = 0; i < actualLeaderBoard.length; i++) {

    const leader = actualLeaderBoard[i];
    const pos = i + 1 + '.'
    const name = leader.name
    const moves = leader.moves
    const secs = leader.seconds

    createLeaderBoardRow(leaderBoardDiv, pos, name, moves, secs,)
  }

}

function createLeaderBoardRow(
  leaderBoardEl,
  pos = '',
  name = 'name',
  moves = 'moves',
  secs = 'seconds') {

  const leaderPosition = document.createElement('div')
  const leaderName = document.createElement('div')
  const leaderMoves = document.createElement('div')
  const leaderSeconds = document.createElement('div')

  leaderPosition.innerText = pos
  leaderName.innerText = name
  leaderMoves.innerText = moves
  leaderSeconds.innerText = secs

  leaderBoardEl.appendChild(leaderPosition)
  leaderBoardEl.appendChild(leaderName)
  leaderBoardEl.appendChild(leaderMoves)
  leaderBoardEl.appendChild(leaderSeconds)

}

newGame()




