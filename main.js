import './style.css'

const app = document.getElementById('app')
const board = document.createElement('div')

app.innerHTML = '<h1>Memory</h1>'
board.className = 'board'
app.appendChild(board)

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
const colors = ['red', 'blue', 'green', 'cyan', 'yellow', 'magenta', 'black', 'orange']

const cards = []

for (let i = 0; i < numbers.length; i++) {
  const number = numbers[i]
  const color = colors[i % colors.length]
  const card = { number, color, flipped: false}

  cards.push(card)
}

cards.forEach(card => {
  const cardElement = document.createElement('div')
  cardElement.className = 'card'
  
  cardElement.innerHTML = `<div class="front" style="background-color: ${card.color}">${card.number}</div>
  <div class="back" style="background-color: ${card.color}"></div>`
  board.appendChild(cardElement)
})