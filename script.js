const body = document.querySelector('body');
const grid = document.querySelector('.gridContainer');
const clearButton = document.querySelector('.reset-btn');
const gridSizeDisplay = document.querySelector('.grid-size-display');
const gridSizeRange = document.querySelector('.grid-size-range');
const pencilColor = '#000000';
const bgColor = '#008000';
const bgColorChanger = document.querySelector('.bgColorChanger');
const pencilColorChanger = document.querySelector('.pencilColorChanger');
let gridSize = '12';
gridSizeDisplay.textContent = `${gridSize} x ${gridSize}`;
let globalLock = false;
let paintingLock = false;

function createGrid(size) { /// createGrid(4) means a grid of 4 x 4
  const gridWidth = grid.offsetWidth;
  const squareSize = gridWidth / size;



  //setting up grid rows/columns size
  grid.style.gridTemplateColumns = `repeat(${size}, ${squareSize}px)`
  grid.style.gridTemplateRows = `repeat(${size}, ${squareSize}px)`
  

  //adding size*size squares to grid container
  for (let i=0;i<size**2;i++) {

    let newSquare = document.createElement('div');
    newSquare.classList.add('gridItem');

    //newSquare.addEventListener('mousedown', unlockPainting, false);
    newSquare.addEventListener('mouseover', paintSquare, false);
    //ewSquare.addEventListener('mouseup', lockPainting, false);
    //newSquare.addEventListener('mouseout', lockPainting, false);


    grid.appendChild(newSquare);
  }
}
  
function unlockPainting() {
  paintingLock = false;
}

function lockPainting() {
  paintingLock = true;
}
function paintSquare(event) {
  if (!paintingLock) {
    event.target.style.background = pencilColor;
  }
}
function clearGrid() {
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }

}

function changeGridSizeDisplay(newSize) {
  gridSizeDisplay.textContent = `(${newSize} x ${newSize}`;
}

function updateGridSize(newSize) {
  if (!globalLock) {
    clearGrid();
    createGrid(newSize);
  }
}

function playAudio(url) {
    new Audio(url).play();
  }

function openUrl() {
    var url = 'https://github.com/etzoider?tab=repositories';
    window.open(url);
}

function changePencilColor(newColor) {
  pencilColor = newColor;
}

function changeBgColor(newColor) {
  bgColor = newColor;
}

///event listeners
clearButton.addEventListener('click', function() {
  clearGrid();
})
gridSizeRange.addEventListener('change', function() {
  const newGridSize = this.value;
  changeGridSizeDisplay(newGridSize);
  updateGridSize(newGridSize);
})
pencilColorChanger.addEventListener('change', function() {
  const newColor = this.value;
  changePencilColor(`${newColor}`);
})
bgColorChanger.addEventListener('change', function() {
  const newColor = this.value;
  changeBgColor(`${newColor}`);
})


createGrid(12);
