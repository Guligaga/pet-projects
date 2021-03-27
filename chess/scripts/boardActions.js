// Drag & Drop pieces ///////////////////////////////////////////////////////////////////////////////////////////////

function pieceDragHandler(piece) {
    piece.addEventListener('mousedown', e => {
        // print('mousedown')
        currentDraggablePiece = piece;

        piece.style.setProperty('cursor', 'grabbing')
        piece.style.setProperty('z-index', 1000)

        renderAllowedMoves(piece.id)

        moveAt(e);
        window.addEventListener('mousemove', dragPiece)
    })

    piece.addEventListener('dragstart', e => {
        e.preventDefault();
    })
}

function renderAllowedMoves(pieceName) {
    objOfPieces[pieceName].allowedCells = filterIfUnderCheck(pieceName, getAllowedMoves(pieceName))

    objOfPieces[pieceName].allowedCells.forEach(cellName => {
        const className = objOfCells[cellName].side ? 'allowed-cell-enemy' : 'allowed-cell';
        el(`#${cellName}`).classList.add(className);
    })
}

function moveAt({pageX, pageY, target:piece}) {
    piece.style.setProperty('left', pageX - board.getBoundingClientRect().left - getSize(piece).width / 2 + 'px');
    piece.style.setProperty('top', pageY - board.getBoundingClientRect().top - getSize(piece).height / 2 + 'px');
}

function dragPiece(e) {
    if(e.target.id !== currentDraggablePiece.id) {
        currentDraggablePiece.style.setProperty('left', objOfCells[currentPiece.id].left + 'px')
        currentDraggablePiece.style.setProperty('top', objOfCells[currentPiece.id].top + 'px')
    }
    
    moveAt(e)
    e.target.style.setProperty('cursor', 'grabbing')
}


window.addEventListener('mouseup', e => {
    // print('mouseup')
    const {target} = e;
    if(!target.classList.contains('piece')) return

    applyPieceMove(e)
    window.removeEventListener('mousemove', dragPiece)
// 
    target.style.setProperty('cursor', 'grab')
    target.style.setProperty('z-index', 1)
})

// Actions with pawn promotion modal

board.addEventListener('mousedown', ({ target }) => {
    const {cell, side, pawn} = target.dataset
    if(target.classList.contains('piece-modal')) {
        const pieceName = target.id;
        const pieceElement = createPieceElement(pieceName)
        objOfPieces[pieceName] = {
            cell,
            side,
            element: pieceElement,
            allowedCells: [],
            history: [ cell ],
        }
        delete objOfPieces[pawn];
        renderPositions();
        objOfPieces[pieceName].allowedCells = filterIfUnderCheck(pieceName, getAllowedMoves(pieceName))
        updateAllowedCells(side);
        setCheckAndMateActions(side);
        movesHistory.pop();
        addToHistory(setFEN());
    } else {
        if(moveOptions.isPromoted) {
            movesHistory.pop();
            moveOptions.moveIndex--;
            init(movesHistory[movesHistory.length - 1]);
        }
    }
    moveOptions.isPromoted = false;
    promotionModal.classList.add('d-none');
})