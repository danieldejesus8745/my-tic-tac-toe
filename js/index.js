const sizeOfCellsArray = new Array(9).fill('');
const board = document.getElementById('board');
let currentSignal = 'O';
const possibleCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
let hasWinner = false;
const gameInfo = document.getElementById('game-info');
let shifts = 0;
const restartBtn = document.getElementById('restartBtn');

function start() {
  gameInfo.textContent = 'Começa com "O"';
}

start();

sizeOfCellsArray.forEach((cell, index) => { // try use lodash
  const divCell = document.createElement('div');
  divCell.classList.add('cell');
  divCell.setAttribute('id', index);
  divCell.setAttribute('onClick', `clickCell(${index})`)
  setBorders(divCell, index);
  board.append(divCell);
});

function clickCell(index) {
  if (currentSignal === 'O') {
    markCell(index, 'O', 'X');
  } else {
    markCell(index, 'X', 'O');
  }
}

function markCell(index, signal, nextSignal) {
  const span = document.createElement('span');
  span.textContent = signal;
  span.classList.add('span');
  const cell = document.getElementById(index);
  if (cell.childElementCount <= 0 && !hasWinner) {
    cell.innerHTML = '';
    cell.append(span);
    currentSignal = nextSignal;
    gameInfo.textContent = `É a vez do "${nextSignal}"`;
    shifts++;
    checkWinningPlayer(signal);
  }
}

function checkWinningPlayer(signal) {
  if (isWinner(signal)) {
    hasWinner = true;
    gameInfo.textContent = `"${signal}" ganhou!`;
    restartBtn.style.display = 'block';
  }

  if (shifts === 9 && !hasWinner) {
    gameInfo.textContent = `Empate!`;
    restartBtn.style.display = 'block';
  }
}

function isWinner(signal) {
  return possibleCombinations.some(combination => {
    const result = combination.every(index => {
      const cell = document.getElementById(index);
      return cell?.firstChild?.firstChild?.nodeValue === signal;
    });

    if (result) markWinnerCells(combination);

    return result;
  });
}

function markWinnerCells(combination) {
  combination.forEach(index => {
    const cell = document.getElementById(index);
    cell.classList.add('winnerCell');
  });
}

function restart() {
  location.reload();
  restartBtn.style.display = 'none';
}

function setBorders(cell, index) {
  if (index === 0) {
    cell.style.borderRight = '1px solid black';
    cell.style.borderBottom = '1px solid black';
  }

  if (index === 1) {
    cell.style.borderRight = '1px solid black';
    cell.style.borderBottom = '1px solid black';
    cell.style.borderLeft = '1px solid black';
  }

  if (index === 2) {
    cell.style.borderBottom = '1px solid black';
    cell.style.borderLeft = '1px solid black';
  }

  if (index === 3) {
    cell.style.borderTop = '1px solid black';
    cell.style.borderRight = '1px solid black';
    cell.style.borderBottom = '1px solid black';
  }

  if (index === 4) {
    cell.style.borderTop = '1px solid black';
    cell.style.borderRight = '1px solid black';
    cell.style.borderBottom = '1px solid black';
    cell.style.borderLeft = '1px solid black';
  }

  if (index === 5) {
    cell.style.borderTop = '1px solid black';
    cell.style.borderBottom = '1px solid black';
    cell.style.borderLeft = '1px solid black';
  }

  if (index === 6) {
    cell.style.borderTop = '1px solid black';
    cell.style.borderRight = '1px solid black';
  }

  if (index === 7) {
    cell.style.borderTop = '1px solid black';
    cell.style.borderRight = '1px solid black';
    cell.style.borderLeft = '1px solid black';
  }

  if (index === 8) {
    cell.style.borderTop = '1px solid black';
    cell.style.borderLeft = '1px solid black';
  }
}