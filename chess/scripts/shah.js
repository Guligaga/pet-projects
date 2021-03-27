// Shah //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function checkShah(cellName, enemy) {
    return cellName === objOfPieces[`king-${enemy}1`].cell
}

function checkShahes(currentSide) {
    // print(piecesCopy)
    objOfPieces[`king-light1`].underCheck = false;
    objOfPieces[`king-dark1`].underCheck = false;

    Object.entries(objOfPieces).forEach(([name, piece]) => {
        const {allowedCells, side} = piece
        if(side !== currentSide) return;

        const enemy = side === 'light'? 'dark' : 'light';
        allowedCells.forEach(move => {
            if(checkShah(move, enemy)) {
                const pieceCopy = {name, ...piece}
                moveOptions.checkingPieces.push(pieceCopy);
                objOfPieces[`king-${enemy}1`].underCheck = true;
            }
        })
    })
}

function checkPossibleShahes(side) {
    const enemySide = side === 'light'? 'dark' : 'light';

    objOfPieces[`king-light1`].underPossibleCheck = false;
    objOfPieces[`king-dark1`].underPossibleCheck = false;

    Object.entries(objOfPieces).forEach(([name, piece]) => {
        if(!objOfPieces.hasOwnProperty(name)) return;
        const {allowedCells, side} = piece;
        if(side === enemySide) {
            if(allowedCells.length || name.startsWith('pawn')) {
                getAllowedMoves(name);
            }
        }
    })
}

function checkmateOrStalemate(side) {
    const enemySide = side === 'light'? 'dark' : 'light'
    const checkAllowedMoves = Object.values(objOfPieces).filter(({side}) => side === enemySide)
        .some( ({allowedCells}) => allowedCells.length);

    if(!checkAllowedMoves) {
        return objOfPieces[`king-${enemySide}1`].underCheck ? 'MATE' : 'STALE'
    }
    return null;
}

function filterIfUnderCheck(pieceName, moves) {
    const currentCell = objOfPieces[pieceName].cell
    const side = objOfPieces[pieceName].side

    const res = moves.filter(filterMoves);
    function filterMoves(move) {

        objOfCells[currentCell].side = null;
        objOfPieces[pieceName].cell = move;

        const currentSide = objOfCells[move].side
        objOfCells[move].side = side

        checkPossibleShahes(side, true);
        objOfCells[move].side = currentSide;
        const possibleCheckCell = objOfPieces[`king-${side}1`].underPossibleCheck.cell
        if(possibleCheckCell === move) {
            return true;
        }
        return !objOfPieces[`king-${side}1`].underPossibleCheck;
    }

    if(pieceName.startsWith('king')) {
        objOfPieces[pieceName].underPossibleCheck = false;
    }
    objOfPieces[pieceName].cell = currentCell; 
    objOfCells[currentCell].side = objOfPieces[pieceName].side
    return res
}