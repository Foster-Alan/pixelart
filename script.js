const color = document.querySelectorAll('.color');
const boardLineClass = '.board-line';
let boardSize = 5;
let boardPixels = document.querySelectorAll('.pixel');
let boardLine = document.querySelectorAll(boardLineClass);

function makeColors() {
  const numbers = [];

  for (let index = 0; index < 9; index += 1) {
    numbers.push(Math.floor(Math.random() * 255));
  }

  const color2 = `rgb(${numbers[0]},${numbers[1]},${numbers[2]})`;
  const color3 = `rgb(${numbers[3]},${numbers[4]},${numbers[5]})`;
  const color4 = `rgb(${numbers[6]},${numbers[7]},${numbers[8]})`;

  color[0].style.backgroundColor = 'rgb(0,0,0)';
  color[1].style.backgroundColor = color2;
  color[2].style.backgroundColor = color3;
  color[3].style.backgroundColor = color4;
}

function handleSelection(event) {
  const currentColor = event.target.classList;
  const previousColor = document.querySelector('.selected');

  if (!currentColor.contains('selected')) {
    currentColor.add('selected');
    if (previousColor != null) {
      previousColor.classList.remove('selected');
    }
  }
}

function coloring(event) {
  const selectedElement = document.querySelector('.selected');
  const quadrado = event.target;

  if (selectedElement != null) {
    const selectedColor = window
      .getComputedStyle(selectedElement)
      .getPropertyValue('background-color');
    quadrado.style.backgroundColor = selectedColor;
  } else {
    quadrado.style.backgroundColor = 'rgb(255,255,255)';
  }
}

function makePixelBoard() {
  boardLine = document.querySelectorAll(boardLineClass);

  for (let index = 1; index <= boardSize; index += 1) {
    const line = document.createElement('div');
    line.classList.add('board-line'); 

    document.querySelector('#pixel-board').appendChild(line);
    for (let index2 = 1; index2 <= boardSize; index2 += 1) {
      const pixel = document.createElement('div');
      pixel.classList.add('pixel');

      document.querySelectorAll(boardLineClass)[index - 1].appendChild(pixel);
    }
  }
}

function removeBoard() {
  boardPixels = document.querySelectorAll('.pixel');
  boardLine = document.querySelectorAll(boardLineClass);

  for (let index = 0; index < boardPixels.length; index += 1) {
    boardPixels[index].remove();
  }

  for (let index = 0; index < boardLine.length; index += 1) {
    boardLine[index].remove();
  }
}

function makeNewBoard() {
  if (!document.querySelector('#board-size').value > 0) {
    window.alert('Board inválido!');
    return null;
  }

  boardSize = document.querySelector('#board-size').value;
  if (boardSize < 5) {
    boardSize = 5;
  }
  if (boardSize > 50) {
    boardSize = 50;
  }

  removeBoard();
  makePixelBoard();

  boardPixels = document.querySelectorAll('.pixel');

  for (let index = 0; index < boardPixels.length; index += 1) {
    boardPixels[index].addEventListener('click', coloring);
  }
}
    
function handleClearBoard() {
  for (let index = 0; index < boardPixels.length; index += 1) {
    boardPixels[index].style.backgroundColor = 'rgb(255,255,255)';
  }
}

makePixelBoard();
makeColors();

for (let index = 0; index < color.length; index += 1) {
  color[index].addEventListener('click', handleSelection);
}

boardPixels = document.querySelectorAll('.pixel');
for (let index = 0; index < boardPixels.length; index += 1) {
  boardPixels[index].addEventListener('click', coloring);
}
document
  .querySelector('#clear-board')
  .addEventListener('click', handleClearBoard);
document
  .querySelector('#generate-board')
  .addEventListener('click', makeNewBoard);
