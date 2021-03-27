// Castling

function calculateCastling(pieceName) {
    if (!pieceName.startsWith('king')) return [];
    const currentPiece = objOfPieces[pieceName]
    const currentCell = currentPiece.cell
    const {x, y} = objOfCells[currentCell];
    if(currentPiece.history.length) return [];
    if(currentPiece.underCheck) return [];

    const rooks = Object.keys(objOfPieces).filter(name => {
        return name.startsWith(`rook-${currentPiece.side}`)
    })
    // print(rooks)

    const castlingMoves = [];

    for(let i = -2; i <= 2; i+=2) {
        if(!i) continue;

        const wing = i < 0 ? 'queen' : 'king';
        const rookName = rooks.find(name => {
            return objOfPieces[name].wing === wing
        })
        // print(rookName)
        const rook = objOfPieces[rookName]
        if(!rook) continue;
        if(rook.history.length) continue;
        const move = numToChar(x + i) + y;
        if(objOfCells[move].side) continue;
        if(i < 0 && objOfCells[numToChar(x - 3) + y].side) continue;
        const nearbyMove = numToChar(x + i/2) + y;
        if(currentPiece.allowedCells.includes(nearbyMove)) {
            castlingMoves.push(move);
        }
    }
    return castlingMoves;
}

function provideCastling(cell) {

    function getRookName() {
        return Object.keys(objOfPieces).find(pieceName => objOfPieces[pieceName].cell === this.cellBefore)
    }
    const cellsDefinition = { 
        c1: { name: getRookName, cell: 'd1', cellBefore: 'a1' },
        g1: { name: getRookName, cell: 'f1', cellBefore: 'h1' },
        c8: { name: getRookName, cell: 'd8', cellBefore: 'a8' },
        g8: { name: getRookName, cell: 'f8', cellBefore: 'h8' },
    }
    if(!cellsDefinition.hasOwnProperty(cell)) return;

    const newRookData = cellsDefinition[cell];
    const rookName = newRookData.name() || 'false';
    // print(rookName)
    if(!rookName.startsWith('rook')) return;
    
    const rook = objOfPieces[rookName];

    objOfCells[newRookData.cellBefore].side = null;
    rook.cell = newRookData.cell
    rook.history.push(newRookData.cell)
    
    objOfCells[newRookData.cell].side = rook.side;

    const rookDOM = el(`#${rookName}`)
    rookDOM.style.setProperty('top', objOfCells[newRookData.cell].top + 'px')
    rookDOM.style.setProperty('left', objOfCells[newRookData.cell].left + 'px')
}

function numToChar(num) {
    const numToChar = { 1: 'a', 2: 'b', 3: 'c', 4: 'd', 5: 'e', 6: 'f', 7: 'g', 8: 'h', }
    return numToChar[num];
}