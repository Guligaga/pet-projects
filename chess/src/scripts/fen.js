function setFEN() {
    const cellsArr = Object.keys(objOfCells)
    Object.entries(objOfPieces).forEach(([name, piece]) => {
        const cellIndex = cellsArr.indexOf(piece.cell);
        let pieceName = name.startsWith('knight') ? name.slice(1, 2) : name[0]
        pieceName = piece.side === 'light'? pieceName.toUpperCase() : pieceName;
        cellsArr[cellIndex] = pieceName
    })

    const positions = setFenPositions(cellsArr);
    const turn = moveOptions.whoseTurn === 'light' ? 'w ' : 'b ';
    const castling = setFenCastling();
    const enPassantFen = (moveOptions.enPassant.cell || '-') + ' ';
    const uncaptured = moveOptions.uncapturedMoves + ' ';
    const movesCount = setFenMovesCount(turn);
    return positions + turn + castling + enPassantFen + uncaptured + movesCount;
    
}

function setFenPositions(cellsArr) {
    let fen = '';
    cellsArr.reduce((acc, cell, index) => {
        if(cell.length === 2) {
            acc++;
        } else {
            if(acc) {
                fen += acc
            }
            fen += cell;
            acc = 0;
        }
        if((index + 1) % 8 === 0) {
            if(acc) {
                fen += acc
            }
            acc = 0
        }
        if((index + 1) % 8 === 0 && index !== 63) {
            fen += '/'
        }
        return acc;
    }, 0)
    return fen + ' ';
}

function setFenCastling() {
    const aliases = {
        a8: 'q',
        h8: 'k',
        a1: 'Q',
        h1: 'K'
    }
    const castling = Object.entries(objOfPieces).reduce((acc, [name, piece]) => {
        if(!name.startsWith('rook')) return acc;
        if(!piece.history.length) {
            return acc += aliases[piece.cell]
        }
        return acc;
    }, '').split('').reverse().join('');
    return (castling || '-') + ' ';
}

function setFenMovesCount(turn) {
    if(movesHistory.length === 1) return (movesHistory.length + 1) / 2;
    return turn === 'w ' ? (movesHistory.length + 2) / 2 : (movesHistory.length + 1) / 2;
}