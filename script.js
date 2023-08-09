const colorPicker = document.getElementById('colorPicker');
const grid = document.getElementById('grid');
const resetButton = document.getElementById('resetButton');
const gridSizeInput = document.getElementById('gridSize');
const generateButton = document.getElementById('generateButton');

colorPicker.addEventListener('input', (event) => {
    const selectedColor = event.target.value;
    colorPicker.dataset.selectedColor = selectedColor;
});

grid.addEventListener('click', (event) => {
    const selectedColor = colorPicker.dataset.selectedColor;
    const clickedSquare = event.target;

    if (selectedColor && clickedSquare.classList.contains('square')) {
        if (clickedSquare.style.backgroundColor !== selectedColor) {
            clickedSquare.style.backgroundColor = selectedColor;
        } else {
            clickedSquare.style.backgroundColor = 'white';
        }
    }
});

resetButton.addEventListener('click', () => {
    const squares = grid.getElementsByClassName('square');
    for (const square of squares) {
        square.style.backgroundColor = 'white';
    }
});

generateButton.addEventListener('click', () => {
    const newSize = parseInt(gridSizeInput.value);
    if (!isNaN(newSize)) {
        generateGrid(newSize);
    }
});

function generateGrid(size) {
    grid.innerHTML = '';
    grid.style.gridTemplateColumns = `repeat(${size}, 40px)`;

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        grid.appendChild(square);
    }
}

// Initial grid generation
generateGrid(10);
