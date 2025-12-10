const gridContainer = document.getElementById('grid');
const gridSizeInput = document.getElementById('gridSize');
const resetButton = document.getElementById('resetButton');
const fadeToggleButton = document.getElementById('fadeToggleButton');
let gridSize = 16;
let fadeEffectEnabled = true;

gridSizeInput.addEventListener('change', (e) => {
    let newSize = parseInt(e.target.value);
    if (newSize < 1) newSize = 1;
    if (newSize > 100) newSize = 100;
    gridSize = newSize;
    createGrid(gridSize);
});

resetButton.addEventListener('click', () => {
    createGrid(gridSize);
});

fadeToggleButton.addEventListener('click', () => {
    fadeEffectEnabled = !fadeEffectEnabled;
    fadeToggleButton.textContent = fadeEffectEnabled ? 'Disable Fade' : 'Enable Fade';
});

function createGrid(size) {
    gridContainer.innerHTML = '';
    for (let i = 0; i < size; i++) {
        const row = document.createElement('div');
        row.classList.add('row');

        for (let j = 0; j < size; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            row.appendChild(cell);
        }
        gridContainer.appendChild(row);
    }
}

createGrid(16);

gridContainer.addEventListener('mouseover', function(event) {
    if (event.target.classList.contains('cell')) {
        event.target.style.backgroundColor = 'black';
    }
});

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
gridContainer.addEventListener('mouseout', async function(event) {
    if (!fadeEffectEnabled) return;
    const cell = event.target;

    if (!cell.classList.contains('cell')) return;

    const steps = 10;
    const delay = 30;

    for (let i = 0; i < steps; i++){
        const alpha = 1 - (i + 1) / steps;
        if (cell.classList.contains('cell')) {
            cell.style.backgroundColor = `rgba(0, 0, 0, ${alpha})`;
        } 
        await sleep(delay);
    }

    cell.style.backgroundColor = 'transparent';
});

