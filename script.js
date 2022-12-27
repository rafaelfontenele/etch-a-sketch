const body = document.querySelector('body');
const grid = document.querySelector('.gridContainer');


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
    grid.appendChild(newSquare);
  }
  

}



function playAudio(url) {
    new Audio(url).play();
  }

function openUrl() {
    var url = 'https://github.com/etzoider?tab=repositories';
    window.open(url);
}


createGrid(12);
