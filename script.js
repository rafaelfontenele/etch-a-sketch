const body = document.querySelector('body');
const grid = document.querySelector('.gridContainer');
const clearButton = document.querySelector('.reset-btn');
const gridSizeDisplay = document.querySelector('.grid-size-display');
const gridSizeRange = document.querySelector('.grid-size-range');
const bgColorChanger = document.querySelector('.bgColorChanger');
const pencilColorChanger = document.querySelector('.pencilColorChanger');
const eraserButton = document.querySelector('.toggle-switch,.eraser');
let eraser = false;
let pencilColor = '#000000';
let lastPencilColor = '';
let bgColor = '#008000';
let borderColor = '#000000';
let gridSize = '12';
gridSizeDisplay.textContent = `(${gridSize} x ${gridSize})`;
let globalLock = false;
let paintingLock = true;

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
    newSquare.style.background = bgColor;

    newSquare.addEventListener('mousedown', unlockPainting, false);
    newSquare.addEventListener('mouseover', paintSquare, false);
    newSquare.addEventListener('mouseup', lockPainting, false);
    
    
    grid.appendChild(newSquare);
  }
  grid.addEventListener('mouseleave', lockPainting, false);
}
  
function unlockPainting() {
  paintingLock = false;
  this.style.background = pencilColor;

}

function lockPainting() {
  paintingLock = true;
}

function paintSquare(event) {
  if (!paintingLock) {
    if (eraser == false) {
      event.target.style.background = pencilColor;
    }

    if (eraser == true) {
      event.target.style.background = bgColor;
    }
  }
}



function splitRgb(rgb) {
  let colorArr = rgb.slice(rgb.indexOf("(") + 1, rgb.indexOf(")")).split(", ");
  
  let obj = new Object();
  
  colorArr.forEach((k, i) => {
  obj[colors[i]] = k  })
  
}


function valueToHex(value) {
  return value.toString(16);
}


function RGBToHex(r,g,b) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
}

function clearGrid() {
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }

}

function changeGridSizeDisplay(newSize) {
  gridSizeDisplay.textContent = `(${newSize} x ${newSize})`;
}


function updateGridSize(newSize) {
  clearGrid();
  createGrid(newSize);
  
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


function changeBgColor(newColor) { // iterate every cell in the grid,
  // check if its unpainted, change color then update bg color
  const gridChildren = grid.children;
  for (let i=0;i<gridChildren.length;i++) {
    let item = gridChildren[i];
    item.style.background = newColor
  }
  bgColor = newColor;
 
}


function toggleEraserButton() {
  if (eraserButton.classList.contains('eraser-toggled')) {
    eraserButton.classList.remove('eraser-toggled');
  } else {
    eraserButton.classList.add('eraser-toggled');
  }
}

///rest of event listeners
eraserButton.addEventListener('click', function() {
  toggleEraserButton();
  if (eraser == false) {
    eraser = true;
  } else {
    eraser = false;
  }
})
clearButton.addEventListener('click', function() {
  clearGrid();
  createGrid(gridSize);
})
gridSizeRange.addEventListener('change', function() {
  const newGridSize = this.value;
  gridSize = newGridSize;
  changeGridSizeDisplay(newGridSize);
  updateGridSize(newGridSize);
})
pencilColorChanger.addEventListener('input', function() {
  const newColor = this.value;
  console.log(newColor);
  changePencilColor(newColor);
})
bgColorChanger.addEventListener('change', function() {
  const newColor = this.value;
  changeBgColor(newColor);
})


createGrid(gridSize);

