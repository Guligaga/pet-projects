// Allowed positions /////////////////////////////////////////////////////////////////////////////////////////////////////////

function getAllowedMoves(pieceName) {
    const enemy = objOfPieces[pieceName].side === 'light'? 'dark' : 'light'
    switch(pieceName.slice(0, pieceName.indexOf('-'))) {
        case 'pawn':
            return allowedPawnMoves(pieceName, enemy);
        case 'rook':
            return allowedRookMoves(pieceName, enemy);
        case 'knight':
            return allowedKnightMoves(pieceName, enemy);
        case 'bishop':
            return allowedBishopMoves(pieceName, enemy);
        case 'queen':
            return allowedQueenMoves(pieceName, enemy);
        case 'king':
            return allowedKingMoves(pieceName, enemy);
    }
}

function allowedPawnMoves(piece, enemy) {
    const currentCell = objOfPieces[piece].cell
    const {x, y} = objOfCells[currentCell];

    const direction = objOfPieces[piece].side === 'light' ? 1 : -1
    const allowed = [];
// Forward move
    for(let i = 1; i <= 2; i++) {
        if(!(y + i * direction) || y + i * direction > 8) break;
        const move = numToChar(x) + (y + i * direction);
        if(objOfCells[move].side === null) {
            allowed.push(move);
        } else {
            break;
        }
        if(objOfPieces[piece].history.length) break
    }
// Move with capture
    for(let i = -1; i <= 1; i++) {
        if(!i) continue;
        if(!(y + 1 * direction) || y + 1 * direction > 8) break;
        if(!(x + i) || (x + i) > 8) continue;
        const move = numToChar(x + i) + (y + 1 * direction);
        const side = objOfCells[move].side
    // check if move will lead to check for opposite side king
        if(checkShah(move, enemy)) {
            objOfPieces[`king-${enemy}1`].underPossibleCheck = objOfPieces[piece];
        } 
        if(side && side === enemy) {
            allowed.push(move);
        } else if(move === moveOptions.enPassant.cell) {
            if(moveOptions.enPassant.piece.side === enemy) {
                allowed.push(move);
            }
            
        }
    }
    return allowed;
}

function allowedRookMoves(piece) {
    const currentCell = objOfPieces[piece].cell
    const {x, y} = objOfCells[currentCell];

    const allowed = [];
    ['n', 'e', 's', 'w'].forEach(direction => {
        allowed.push(...addToMovesList(direction, x, y, piece))
    })
    return allowed;
}

function allowedBishopMoves(piece) {
    const currentCell = objOfPieces[piece].cell
    const {x, y} = objOfCells[currentCell];

    const allowed = [];
    ['ne', 'se', 'sw', 'nw'].forEach(direction => {
        allowed.push(...addToMovesList(direction, x, y, piece))
    })
    return allowed;
}

function allowedQueenMoves(piece) {
    const currentCell = objOfPieces[piece].cell
    const {x, y} = objOfCells[currentCell];

    const allowed = [];
    ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'].forEach(direction => {
        allowed.push(...addToMovesList(direction, x, y, piece))
    })
    return allowed;
}

function allowedKnightMoves(piece, enemy) {
    const currentCell = objOfPieces[piece].cell
    const {x, y} = objOfCells[currentCell];
    const shifts = [
        [1, 2], [-1, 2], [1, -2], [-1, -2], [2, 1], [-2, 1], [2, -1], [-2, -1]
    ]
    const allowed = []
    for(let i = 0; i < shifts.length; i++) {
        const conditionX = x + shifts[i][0] < 1 || x + shifts[i][0] > 8;
        const conditionY = y + shifts[i][1] < 1 || y + shifts[i][1] > 8;
        if(conditionX || conditionY) continue; 
        const move = numToChar(x + shifts[i][0]) + (y + shifts[i][1]);
        const side = objOfCells[move].side
        if(side === objOfPieces[piece].side) continue;
        allowed.push(move)
    // check if move will lead to check for opposite side king
        if(checkShah(move, enemy)) {
            objOfPieces[`king-${enemy}1`].underPossibleCheck = objOfPieces[piece];
        } 
    }
    return allowed;
}

function allowedKingMoves(piece) {
    const currentCell = objOfPieces[piece].cell
    const {x, y} = objOfCells[currentCell];
    const allowed = [];
    ['nK', 'eK', 'sK', 'wK', 'neK', 'seK', 'swK', 'nwK'].forEach(direction => {
        allowed.push(...addToMovesList(direction, x, y, piece))
    })
    allowed.push(...calculateCastling(piece))
    return allowed;
}

function addToMovesList(direction, x, y, piece) {
    const currentCell = objOfPieces[piece].cell
    const nesw = {
        n:  {cond: i =>  i <= 8 - y, x: 0, y: 1},
        e:  {cond: i =>  i <= 8 - x, x: 1, y: 0},
        s:  {cond: i =>  i < y ,     x: 0, y: -1},
        w:  {cond: i =>  i < x ,     x: -1, y: 0},

        ne: {cond: i =>  i <= 8 - x && i <= 8 - y, x: 1, y: 1},
        se: {cond: i =>  i <= 8 - x && i < y,      x: 1, y: -1},
        sw: {cond: i =>  i < x && i < y,           x: -1, y: -1},
        nw: {cond: i =>  i < x && i <= 8 - y,      x: -1, y: 1},

        nK:  {cond: i =>  i === 1 && i <= 8 - y, x: 0, y: 1},
        eK:  {cond: i =>  i === 1 && i <= 8 - x, x: 1, y: 0},
        sK:  {cond: i =>  i === 1 && i < y ,     x: 0, y: -1},
        wK:  {cond: i =>  i === 1 && i < x ,     x: -1, y: 0},
        neK: {cond: i =>  i === 1 && i <= 8 - x && i <= 8 - y, x: 1, y: 1},
        seK: {cond: i =>  i === 1 && i <= 8 - x && i < y,      x: 1, y: -1},
        swK: {cond: i =>  i === 1 && i < x && i < y,           x: -1, y: -1},
        nwK: {cond: i =>  i === 1 && i < x && i <= 8 - y,      x: -1, y: 1},
    }
    const enemy = objOfPieces[piece].side === 'light'? 'dark' : 'light'
    direction = nesw[direction];

    const allowed = [];
    for(let i = 1; direction.cond(i); i++) {
        const move = numToChar(x + i * direction.x) + (y + i * direction.y);
        const side = objOfCells[move].side
        if(side === objOfPieces[piece].side) break;
        // objOfPieces[piece].allowedCells.push(move);
        allowed.push(move);
    // check if move will lead to check for opposite side king
        if(checkShah(move, enemy)) {
            objOfPieces[`king-${enemy}1`].underPossibleCheck = objOfPieces[piece];
        } 
        if(side && side === enemy) break;
    }
    return allowed;
}