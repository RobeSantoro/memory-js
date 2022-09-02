import './style.css'
import { uniqueNamesGenerator, names } from 'unique-names-generator';

const app = document.getElementById('app')
const DEBUG_LEADERBOARD = false

function createBackFaces(option) {

  let backFaces = []

  if (option == 'colors') {
    const colors = [
      'red', 'blue', 'green', 'cyan', 'yellow', 'magenta', 'black', 'orange'
    ]

    backFaces = colors
  }

  if (option == 'photos') {

    const photos = [
      "url('./photo_01.jpg')",
      "url('./photo_02.jpg')",
      "url('./photo_03.jpg')",
      "url('./photo_04.jpg')",
      "url('./photo_05.jpg')",
      "url('./photo_06.jpg')",
      "url('./photo_07.jpg')",
      "url('./photo_08.jpg')",
    ]

    backFaces = photos
  }

  return backFaces
}

function newMemory(backFaces) {

  let flippedNum = 0
  let flippedCards = []
  let moves = 0
  let seconds = 0

  const leaderBoardObj = {}

  // BOARD
  const container = document.createElement('div')
  container.className = 'container'
  app.appendChild(container)

  const h1Title = document.createElement('h1')
  h1Title.innerText = 'Memory'
  container.appendChild(h1Title)

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

  // Duplicate and shuffle the color array
  backFaces.push(...backFaces)
  backFaces.sort(() => {
    return Math.random() - 0.5;
  })

  const frontNumbers = []

  for (let i = 0; i < backFaces.length; i++) {
    frontNumbers.push(i + 1)
  }

  // Cards Creation
  const cards = []

  for (let i = 0; i < frontNumbers.length; i++) {

    const frontNumber = frontNumbers[i]
    const backFace = backFaces[i]
    const cardElement = document.createElement('button')
    const cardObject = {
      number: frontNumber,
      backface: backFace,
      flipped: false,
      /* solved: false, */
      element: cardElement
    }

    cardElement.className = 'card'
    cardElement.id = cardObject.number
    cardElement.innerHTML = cardObject.number
    board.style.display = 'grid'
    board.appendChild(cardElement)

    cards.push(cardObject)
  }

  // Cycle through created cards and game logic
  cards.forEach(card => {

    card.element.addEventListener('mousedown', () => {

      if (card.flipped == false && flippedNum < 2) {

        flippedNum++
        flippedCards.push(card)

        card.flipped = true
        card.element.style.backgroundColor = card.backface
        card.element.style.backgroundImage = card.backface

        card.element.style.color = 'rgba(0,0,0,0)'

        // MATCH
        if (flippedCards.length == 2 && flippedCards[0].backface == flippedCards[1].backface || DEBUG_LEADERBOARD) {

          let indexToDelete = cards.map(obj => obj.backface).indexOf(flippedCards[0].backface)
          cards.splice(indexToDelete, 1)

          indexToDelete = cards.map(obj => obj.backface).indexOf(flippedCards[0].backface)
          cards.splice(indexToDelete, 1)

          flippedCards = []
          flippedNum = 0
          moves++

          // WIN
          if (cards.length == 0 || DEBUG_LEADERBOARD) {

            clearInterval(timer)

            board.style.display = 'none'
            h1Title.innerHTML = 'YOU WIN!'


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

              const date = new Date

              leaderBoardObj.name = inputName.value
              leaderBoardObj.moves = moves
              leaderBoardObj.seconds = seconds
              leaderBoardObj.date = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`

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

              newMemory(createBackFaces('photos'))

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
                card.element.style.color = 'rgba(255,255,255,1)'
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

  return
}

function addToLeaderBoard(leaderBoardObj) {

  // DOM
  document.querySelector('h1').innerText = 'LeaderBoard'
  const container = document.querySelector('.container')

  const leaderBoardDiv = document.createElement('div')
  leaderBoardDiv.className = 'leaderBoard'
  container.appendChild(leaderBoardDiv)

  createLeaderBoardRow(leaderBoardDiv)

  if (DEBUG_LEADERBOARD == true) {
    leaderBoardObj.seconds = Math.floor(Math.random() * (100 - 30 + 1)) + 30;
    leaderBoardObj.moves = Math.floor(Math.random() * (40 - 16 + 1)) + 16;
  }

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

    actualLeaderBoard = actualLeaderBoard.slice(0,10)

    localStorage.setItem("Leader Board", JSON.stringify(actualLeaderBoard))
  }

  // DOM POPULATE
  for (let i = 0; i < actualLeaderBoard.length; i++) {

    const leader = actualLeaderBoard[i];
    const pos = i + 1 + '.'
    const name = leader.name
    const moves = leader.moves
    const secs = leader.seconds
    const date = leader.date

    createLeaderBoardRow(leaderBoardDiv, pos, name, moves, secs, date)
  }

  return
}

function createLeaderBoardRow(leaderBoardDiv,
  pos = '',
  name = 'name',
  moves = 'moves',
  secs = 'secs',
  date = 'date') {

  const leaderPosition = document.createElement('div')
  const leaderName = document.createElement('div')
  const leaderMoves = document.createElement('div')
  const leaderSeconds = document.createElement('div')
  const leaderDate = document.createElement('div')

  leaderPosition.innerText = pos
  leaderName.innerText = name
  leaderMoves.innerText = moves
  leaderSeconds.innerText = secs
  leaderDate.innerText = date

  leaderPosition.style.textAlign = 'right'
  leaderName.style.textAlign = 'left'
  leaderName.style.border = '1px solid #fff;'


  leaderBoardDiv.appendChild(leaderPosition)
  leaderBoardDiv.appendChild(leaderName)
  leaderBoardDiv.appendChild(leaderMoves)
  leaderBoardDiv.appendChild(leaderSeconds)
  leaderBoardDiv.appendChild(leaderDate)

  return leaderBoardDiv
}

newMemory(createBackFaces('photos'))





