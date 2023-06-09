const cellsArray = new Array(9).fill('');
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
const gameInfo = document.getElementById('gameInfo');
let shifts = 0;
const victoriesOfO = document.getElementById('victoriesOfO');
const victoriesOfX = document.getElementById('victoriesOfX');

function start() {
  gameInfo.textContent = 'Começa com "O"';
  loadVictories(victoriesOfO, "O",localStorage.getItem('signalO') || 0);
  loadVictories(victoriesOfX, "X", localStorage.getItem('signalX') || 0);
}

start();

function loadVictories(element, signal,value) {
  element.textContent = `Vitórias do "${signal}": ${value}`;
}

cellsArray.forEach((_, index) => {
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
    saveInLocalStorage(signal);
  }

  if (shifts === 9 && !hasWinner) {
    gameInfo.textContent = `Empate!`;
    restartBtn.style.display = 'block';
  }
}

function saveInLocalStorage(signal) {
  const key = `signal${signal}`;
  let currentValue = localStorage.getItem(key) || 0;
  currentValue++;
  localStorage.setItem(key, currentValue);
  loadVictories(document.getElementById(`victoriesOf${signal}`), signal, currentValue); // Atualizando valor na tela sem refresh da página
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