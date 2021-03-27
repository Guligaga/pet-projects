// set Positions and Coordinates ////////////////////////////////////////////////////////////////////////////////////

function setCellsCoordinates() {
    cells.forEach(cell => {
        // cell.textContent = cell.dataset.coordinates; //////////////////////////////////////////////////
        objOfCells[cell.dataset.codename] = {
            side: objOfCells[cell.dataset.codename].side,
            x: cellsCoordinates[cell.dataset.codename][0],
            y: cellsCoordinates[cell.dataset.codename][1],
            left: cell.getBoundingClientRect().left - board.getBoundingClientRect().left - 2,
            top: cell.getBoundingClientRect().top - board.getBoundingClientRect().top - 2,
        }
    })
}

function setPiecesSize() {
    pieces.forEach(piece => {
        const cellSize = getSize(cells[0]).width
        piece.style.setProperty('width', cellSize + 'px');
        piece.style.setProperty('height', cellSize + 'px');
    })
    Object.entries(objOfPieces).forEach(([name, pieceData],i) => {
        const cellX = objOfCells[pieceData.cell].left;
        const cellY = objOfCells[pieceData.cell].top;
    
        pieceData.element.style.setProperty('left', cellX + 'px');
        pieceData.element.style.setProperty('top',  cellY + 'px');
    })
}

print(objOfCells)
print(objOfPieces)