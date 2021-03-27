function applyPieceMove(e) {
    const {target:piece, pageX, pageY} = e;
    const currentPiece = objOfPieces[piece.id];

    piece.hidden = true;
    const droppable = document.elementFromPoint(pageX, pageY);
    piece.hidden = false;

// Check if piece can be moved to aim cell
    const {previousCellName, cellName} = setMoveAimCellname(currentPiece, droppable)

// Update piece position and remove possible moves markers
    renderAfterMove(piece, cellName);

// Check if piece hasn't been moved
    if(cellName === previousCellName) return

// Remove piece, which has been eaten by current piece
    const isCaptured = captureRemove(droppable);
    
// Provide Castling
    if(piece.id.startsWith('king') && !currentPiece.history.length) {
        provideCastling(droppable.id)
    }
    
// Set new piece state and cell state
    updateState(currentPiece, cellName, previousCellName)

// Check if move lead to check/checkmate/stalemate or end enemy's check
    setCheckAndMateActions(currentPiece.side)

// Check if move lead to En Passant possibility
    moveOptions.enPassant = setEnPassant(piece.id, currentPiece, previousCellName);

// Set modal if pawn is on the last horizontal
    pawnPromotion(piece.id, currentPiece);

// Check if move was made by pawn or with capture
    checkPawnOrCapture(moveOptions.enPassant, isCaptured)

// Check if move lead to draw
    checkDraw();

// add move to history
    if(moveOptions.moveIndex !== movesHistory.length - 1) return;
    addToHistory(setFEN())

// Add history to localStorage
    localStorage.setItem('history', JSON.stringify(movesHistory))

// check if position repeats third time    
    setRepeatedMoves();
}

function setMoveAimCellname(currentPiece, droppable) {
// Set Cells where piece has been and current cell
    const previousCellName = currentPiece.cell
    const currentCellName = droppable.dataset.codename || objOfPieces[droppable.id].cell
// Check if move to current cell is allowed
    let cellName = currentPiece.allowedCells.includes(currentCellName) ?
        currentCellName : previousCellName;
// Check if it is current side turn 
    cellName = moveOptions.whoseTurn === currentPiece.side? currentCellName : previousCellName;
    return {
        previousCellName,
        currentCellName,
        cellName,
    }
}

function renderAfterMove(piece, cellName) {
    const currentPiece = objOfPieces[piece.id];
    // Put piece in center of new cell
    piece.style.setProperty('left', objOfCells[cellName].left + 'px')
    piece.style.setProperty('top', objOfCells[cellName].top + 'px')

// Update allowed cells variants
    currentPiece.allowedCells.forEach(cellName => {
        el(`#${cellName}`)
            .classList.remove('allowed-cell', 'allowed-cell-enemy');
    })
}

function captureRemove(droppable) {
    droppable = droppable.id === moveOptions.enPassant.cell ? 
        el(`#${moveOptions.enPassant.piece.name}`) : droppable
    if(droppable.classList.contains('piece')) {
        droppable.style.setProperty('z-index', '1000');
        droppable.remove();
        delete objOfPieces[droppable.id]
        const indexOfRemovable = pieces.indexOf(droppable)
        pieces.splice(indexOfRemovable, 1)
        return true;
    }
    return false;
}

function setRepeatedMoves() {
    const lastMove = movesHistory[movesHistory.length - 1].match(/[\w\/]+\s/)[0];
    const repeated = movesHistory.filter(move => move.match(/[\w\/]+\s/)[0] === lastMove)
    if(repeated.length === 3) {
        setGameOverModal('DRAW repeat')
    }
}

function checkDraw() {
    if(moveOptions.uncapturedMoves === 50) {
        setGameOverModal('DRAW 50')
    }
    const combinations = [
        ['king-dark', 'king-light'],
        ['king-dark', 'king-light', 'knight-light'],
        ['king-dark', 'king-light', 'knight-dark'],
        ['king-dark', 'king-light', 'knight-light', 'knight-dark'],
        ['king-dark', 'king-light', 'bishop-light'],
        ['king-dark', 'king-light', 'bishop-dark'],
        ['king-dark', 'king-light', 'bishop-light', 'bishop-dark'],
        ['king-dark', 'king-light', 'bishop-light', 'knight-dark'],
        ['king-dark', 'king-light', 'bishop-dark', 'knight-light'],
    ];
    combinations.forEach(combination => {
        combination.sort();
    })
    const piecesLeft = Object.keys(objOfPieces).map(name => name.slice(0, -1)).sort().toString();
    if(combinations.some(comb => comb.toString() === piecesLeft)) {
        setGameOverModal('DRAW Piece')
    }
}

function setCheckAndMateActions(side) {
// Check shah
    checkShahes(side, false);
    const enemySide = side === 'light'? 'dark' : 'light'
    const enemyKing = objOfPieces[`king-${enemySide}1`]
    if(enemyKing.underCheck) {
        el(`#${enemyKing.cell}`).classList.add('under-check');
    }

    const isEnd = checkmateOrStalemate(side);
    if(isEnd) {
        setGameOverModal(isEnd)
    }

    const allyKing = objOfPieces[`king-${side}1`]
    if(!allyKing.underCheck) {
        if(moveOptions.checkingPieces.length && moveOptions.checkingPieces[0].side !== side) {
            moveOptions.checkingPieces = [];
            el(`#${allyKing.cell}`).classList.remove('under-check');
        }
    }
}

function setGameOverModal(title) {
    gameoverModal.classList.remove('d-none');
        gameoverModal.children[0].textContent = title;
        setTimeout(() => {
            gameoverModal.classList.add('d-none');
        }, 1e4)
}

function setEnPassant(pieceName, currentPiece, previousCellName) {
    if(!currentPiece.element.id.startsWith('pawn')) return {mes: 'other piece'};
    const cellName = currentPiece.cell;
    // print(currentPiece, cellName, previousCellName)
    const moveDistance = Math.abs(cellName.slice(-1) - previousCellName.slice(-1))
    if(moveDistance === 2) {
        // print(cellName.slice(-1) - previousCellName.slice(-1))
        const shift = currentPiece.side === 'light' ? -1 : 1;
        return {
            cell: cellName.slice(0, 1) + (+cellName.slice(-1) + shift),
            piece: {name: pieceName, ...currentPiece}
        }
    }
    return {mes: 'distance is 1'};
}


function pawnPromotion(pieceName, currentPiece) {
    if(!pieceName.startsWith('pawn')) return moveOptions.isPromoted = false;
    const {cell, side} = currentPiece;

    const horizontalPattern = side === 'light'? /^[a-h]8$/ : /^[a-h]1$/;
    if(!horizontalPattern.test(cell)) return moveOptions.isPromoted = false;
    setPawnModal(sideSelector.value, pieceName, currentPiece);
    return moveOptions.isPromoted = true;
}

function setPawnModal(position, pawnName, piece) {
    const {cell, side} = piece;
    const piecesTemp = [
        setPieceName(`queen-${side}`),
        setPieceName(`knight-${side}`),
        setPieceName(`rook-${side}`),
        setPieceName(`bishop-${side}`),
    ];
    
    promotionModal.innerHTML = '';
    promotionModal.removeAttribute('style');

    if(position === side) {
        const top = getSize(el(`#${cell}`)).rect.top - getSize(board).rect.top - 2;
        print('top', top)
        promotionModal.style.setProperty('top', top + 'px');
    } else {
        piecesTemp.reverse();
        const bottom = getSize(el(`#${cell}`)).rect.bottom - getSize(board).rect.bottom + 2;
        print('bottom', bottom)
        promotionModal.style.setProperty('bottom', bottom + 'px');
    }
    const left = getSize(el(`#${cell}`)).rect.left - getSize(board).rect.left - 2;
    print('left', left)
    promotionModal.style.setProperty('left', left + 'px');

    piecesTemp.forEach(pieceName => {
        const tempPiece = createPieceElement(pieceName, 'temp');
        tempPiece.dataset.cell = cell;
        tempPiece.dataset.side = side;
        tempPiece.dataset.pawn = pawnName;
        promotionModal.append(tempPiece);
    })
    promotionModal.classList.remove('d-none');
}

function checkPawnOrCapture(pawnMove, isCaptured) {
    
    if(pawnMove.mes !== 'other piece' || isCaptured) {
        moveOptions.uncapturedMoves = 0;
    } else {
        moveOptions.uncapturedMoves++;
    }
}

function updateState(currentPiece, cellName, previousCellName) {
// History
    currentPiece.history.push(cellName);

// Set new piece state and cell state
    moveOptions.whoseTurn = currentPiece.side === 'light'? 'dark' : 'light'
    currentPiece.cell = cellName;

    objOfCells[previousCellName].side = null;
    objOfCells[cellName].side = currentPiece.side;

    updateAllowedCells(currentPiece.side)
}

function updateAllowedCells(side) {

    // if(updateAllowedCells.caller.name === 'boardListener') {
    //     print(pieces)
    // }
    pieces.forEach(({id: pieceName}) => {
        const pieceData = objOfPieces[pieceName];
        pieceData.allowedCells = getAllowedMoves(pieceName)

        if(pieceData.side !== side) {
            if(updateAllowedCells.caller.name === 'boardListener') {
                print(pieceData)
            }
            pieceData.allowedCells = filterIfUnderCheck(pieceName, pieceData.allowedCells)
        }
    });
}