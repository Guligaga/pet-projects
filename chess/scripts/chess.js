const boardCotainer = el('.chess-main')
const board = el('.chess-board');
const piecesContainer = el('.pieces')
const notationsContainer = el('.notation-container');
const notations = els('.notation');
const rows = els('.row');
const cells = els('.cell');
let pieces = els('.piece');

const sideSelector = el('#side-selector');
const piecesThemeSelector = el('#pieces-theme');
const boardThemeSelector = el('#board-theme');
const resetBtn = el('#reset-game');

const promotionModal = el('.promotion-modal');
const gameoverModal = el('.gameover-modal');

// set Positions and Coordinates ////////////////////////////////////////////////////////////////////////////////////

const objOfCells = {
    a8: { side: 'dark', },
    b8: { side: 'dark', },
    c8: { side: 'dark', },
    d8: { side: 'dark', },
    e8: { side: 'dark', },
    f8: { side: 'dark', },
    g8: { side: 'dark', },
    h8: { side: 'dark', },

    a7: { side: 'dark', },
    b7: { side: 'dark', },
    c7: { side: 'dark', },
    d7: { side: 'dark', },
    e7: { side: 'dark', },
    f7: { side: 'dark', },
    g7: { side: 'dark', },
    h7: { side: 'dark', },

    a6: { side: null, },
    b6: { side: null, },
    c6: { side: null, },
    d6: { side: null, },
    e6: { side: null, },
    f6: { side: null, },
    g6: { side: null, },
    h6: { side: null, },

    a5: { side: null, },
    b5: { side: null, },
    c5: { side: null, },
    d5: { side: null, },
    e5: { side: null, },
    f5: { side: null, },
    g5: { side: null, },
    h5: { side: null, },

    a4: { side: null, },
    b4: { side: null, },
    c4: { side: null, },
    d4: { side: null, },
    e4: { side: null, },
    f4: { side: null, },
    g4: { side: null, },
    h4: { side: null, },

    a3: { side: null, },
    b3: { side: null, },
    c3: { side: null, },
    d3: { side: null, },
    e3: { side: null, },
    f3: { side: null, },
    g3: { side: null, },
    h3: { side: null, },

    a2: { side: 'light', },
    b2: { side: 'light', },
    c2: { side: 'light', },
    d2: { side: 'light', },
    e2: { side: 'light', },
    f2: { side: 'light', },
    g2: { side: 'light', },
    h2: { side: 'light', },

    a1: { side: 'light', },
    b1: { side: 'light', },
    c1: { side: 'light', },
    d1: { side: 'light', },
    e1: { side: 'light', },
    f1: { side: 'light', },
    g1: { side: 'light', },
    h1: { side: 'light', },
};
const objOfPieces = {
    'rook-dark1': {
        cell: 'a8',
        side: 'dark',
        history: [],
        allowedCells: [],
        element: el('#rook-dark1'),
        wing: 'queen',
    },
    'knight-dark1': {
        cell: 'b8',
        side: 'dark',
        history: [],
        allowedCells: [],
        element: el('#knight-dark1')
    },
    'bishop-dark1': {
        cell: 'c8',
        side: 'dark',
        history: [],
        allowedCells: [],
        element: el('#bishop-dark1')
    },
    'queen-dark1': {
        cell: 'd8',
        side: 'dark',
        history: [],
        allowedCells: [],
        element: el('#queen-dark1')
    },
    'king-dark1': {
        cell: 'e8',
        side: 'dark',
        history: [],
        allowedCells: [],
        element: el('#king-dark1'),
        underCheck: false,
    },
    'bishop-dark2': {
        cell: 'f8',
        side: 'dark',
        history: [],
        allowedCells: [],
        element: el('#bishop-dark2')
    },
    'knight-dark2': {
        cell: 'g8',
        side: 'dark',
        history: [],
        allowedCells: [],
        element: el('#knight-dark2')
    },
    'rook-dark2': {
        cell: 'h8',
        side: 'dark',
        history: [],
        allowedCells: [],
        element: el('#rook-dark2'),
        wing: 'king',
    },
    'pawn-dark1': {
        cell: 'a7',
        side: 'dark',
        history: [],
        allowedCells: ['a6', 'a5'],
        element: el('#pawn-dark1')
    },
    'pawn-dark2': {
        cell: 'b7',
        side: 'dark',
        history: [],
        allowedCells: ['b6', 'b5'],
        element: el('#pawn-dark2')
    },
    'pawn-dark3': {
        cell: 'c7',
        side: 'dark',
        history: [],
        allowedCells: ['c6', 'c5'],
        element: el('#pawn-dark3')
    },
    'pawn-dark4': {
        cell: 'd7',
        side: 'dark',
        history: [],
        allowedCells: ['d6', 'd5'],
        element: el('#pawn-dark4')
    },
    'pawn-dark5': {
        cell: 'e7',
        side: 'dark',
        history: [],
        allowedCells: ['e6', 'e5'],
        element: el('#pawn-dark5')
    },
    'pawn-dark6': {
        cell: 'f7',
        side: 'dark',
        history: [],
        allowedCells: ['f6', 'f5'],
        element: el('#pawn-dark6')
    },
    'pawn-dark7': {
        cell: 'g7',
        side: 'dark',
        history: [],
        allowedCells: ['g6', 'g5'],
        element: el('#pawn-dark7')
    },
    'pawn-dark8': {
        cell: 'h7',
        side: 'dark',
        history: [],
        allowedCells: ['h6', 'h5'],
        element: el('#pawn-dark8')
    },
    'pawn-light1': {
        cell: 'a2',
        side: 'light',
        history: [],
        allowedCells: ['a3', 'a4'],
        element: el('#pawn-light1')
    },
    'pawn-light2': {
        cell: 'b2',
        side: 'light',
        history: [],
        allowedCells: ['b3', 'b4'],
        element: el('#pawn-light2')
    },
    'pawn-light3': {
        cell: 'c2',
        side: 'light',
        history: [],
        allowedCells: ['c3', 'c4'],
        element: el('#pawn-light3')
    },
    'pawn-light4': {
        cell: 'd2',
        side: 'light',
        history: [],
        allowedCells: ['d3', 'd4'],
        element: el('#pawn-light4')
    },
    'pawn-light5': {
        cell: 'e2',
        side: 'light',
        history: [],
        allowedCells: ['e3', 'e4'],
        element: el('#pawn-light5')
    },
    'pawn-light6': {
        cell: 'f2',
        side: 'light',
        history: [],
        allowedCells: ['f3', 'f4'],
        element: el('#pawn-light6')
    },
    'pawn-light7': {
        cell: 'g2',
        side: 'light',
        history: [],
        allowedCells: ['g3', 'g4'],
        element: el('#pawn-light7')
    },
    'pawn-light8': {
        cell: 'h2',
        side: 'light',
        history: [],
        allowedCells: ['h3', 'h4'],
        element: el('#pawn-light8')
    },
    'rook-light1': {
        cell: 'a1',
        side: 'light',
        history: [],
        allowedCells: [],
        element: el('#rook-light1'),
        wing: 'queen',
    },
    'knight-light1': {
        cell: 'b1',
        side: 'light',
        history: [],
        allowedCells: [],
        element: el('#knight-light1')
    },
    'bishop-light1': {
        cell: 'c1',
        side: 'light',
        history: [],
        allowedCells: [],
        element: el('#bishop-light1')
    },
    'queen-light1': {
        cell: 'd1',
        side: 'light',
        history: [],
        allowedCells: [],
        element: el('#queen-light1')
    },
    'king-light1': {
        cell: 'e1',
        side: 'light',
        history: [],
        allowedCells: [],
        element: el('#king-light1'),
        underCheck: false,
    },
    'bishop-light2': {
        cell: 'f1',
        side: 'light',
        history: [],
        allowedCells: [],
        element: el('#bishop-light2')
    },
    'knight-light2': {
        cell: 'g1',
        side: 'light',
        history: [],
        allowedCells: [],
        element: el('#knight-light2')
    },
    'rook-light2': {
        cell: 'h1',
        side: 'light',
        history: [],
        allowedCells: [],
        element: el('#rook-light2'),
        wing: 'king',
    },
}
const theme = {
    forBoard: localStorage.getItem('boardTheme') || 'marble',
    forPieces: localStorage.getItem('piecesTheme') || 'glass'
}
const movesHistory = [];

const cellsCoordinates = {
    a8: [1,8],
    b8: [2,8],
    c8: [3,8],
    d8: [4,8],
    e8: [5,8],
    f8: [6,8],
    g8: [7,8],
    h8: [8,8],
    a7: [1,7],
    b7: [2,7],
    c7: [3,7],
    d7: [4,7],
    e7: [5,7],
    f7: [6,7],
    g7: [7,7],
    h7: [8,7],
    a6: [1,6],
    b6: [2,6],
    c6: [3,6],
    d6: [4,6],
    e6: [5,6],
    f6: [6,6],
    g6: [7,6],
    h6: [8,6],
    a5: [1,5],
    b5: [2,5],
    c5: [3,5],
    d5: [4,5],
    e5: [5,5],
    f5: [6,5],
    g5: [7,5],
    h5: [8,5],
    a4: [1,4],
    b4: [2,4],
    c4: [3,4],
    d4: [4,4],
    e4: [5,4],
    f4: [6,4],
    g4: [7,4],
    h4: [8,4],
    a3: [1,3],
    b3: [2,3],
    c3: [3,3],
    d3: [4,3],
    e3: [5,3],
    f3: [6,3],
    g3: [7,3],
    h3: [8,3],
    a2: [1,2],
    b2: [2,2],
    c2: [3,2],
    d2: [4,2],
    e2: [5,2],
    f2: [6,2],
    g2: [7,2],
    h2: [8,2],
    a1: [1,1],
    b1: [2,1],
    c1: [3,1],
    d1: [4,1],
    e1: [5,1],
    f1: [6,1],
    g1: [7,1],
    h1: [8,1],
}

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

// Drag & Drop pieces ///////////////////////////////////////////////////////////////////////////////////////////////

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

let currentPiece = null;
pieces.forEach(pieceDragHandler);
function pieceDragHandler(piece) {
    piece.addEventListener('mousedown', e => {
        // print('mousedown')
        currentPiece = piece;

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
    if(e.target.id !== currentPiece.id) {
        currentPiece.style.setProperty('left', objOfCells[currentPiece.id].left + 'px')
        currentPiece.style.setProperty('top', objOfCells[currentPiece.id].top + 'px')
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
////////////////////////////////////////////////////////////


const moveOptions = {
    whoseTurn: 'light',
    checkingPieces: [],
    enPassant: {},
    uncapturedMoves: 0,
    isPromoted: false,
    moveIndex: 0,
}

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
    // print('allowedPawnMoves')
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

// Shah //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

// turn over the board //////////////////////////////////////////////////////////////////////////////////////////////////

sideSelector.addEventListener('change', e => {
    // print(e.currentTarget.value)
    const side = e.currentTarget.value
    turnOverCellsPlacement(side)
})

function turnOverCellsPlacement(side) {
    const resetPosition = side === 'light'? 'append' : 'prepend'
    
    function reverse(parents, grandparent) {
        parents.forEach(parent => {
            const children = [...parent.children]
            children.forEach(child => {
                child.remove()
                parent.prepend(child)
            })
            parent.remove()
            grandparent[resetPosition](parent)
        })
    }
    reverse(rows, board)
    reverse(notations, notationsContainer)

    setCellsCoordinates();
    setPiecesSize();
}


// setup board state from FEN //////////////////////////////////////////////////////////////////////////////////////////////////
// const tempObj = {};
function init(fen) {
    if(!validateFen(fen)) return alert('Fen is not valid')
    for (const key in objOfPieces) {
        delete objOfPieces[key]
    }
    for (const key in objOfCells) {
        objOfCells[key].side = null;
    }
    const [positions, turn, castling, enPassant, uncaptured, ] = fen.split(' ');
    // print(positions)

    initPositions(positions);
    renderPositions();
    initTurn(turn);
    initCastling(castling);
    initEnPassant(enPassant);
    initUncaptured(uncaptured);
    return fen;
    // print(objOfPieces)
    // print(objOfCells)
    
}

function validateFen(fen) {
    const pattern = /^(\w+\/){7}\w+ [wb-] [KQkq-]+ ([a-h][1-8]|-)( \d+){2}$/;
    return pattern.test(fen)
}

function initPositions(positions) {
    const aliases = {
        r: 'rook-dark',
        n: 'knight-dark',
        b: 'bishop-dark',
        q: 'queen-dark',
        k: 'king-dark',
        p: 'pawn-dark',
        R: 'rook-light',
        N: 'knight-light',
        B: 'bishop-light',
        Q: 'queen-light',
        K: 'king-light',
        P: 'pawn-light'
    }
    let gap = 0;
    const posArr = positions.split('/').join('');
    posArr.split('').forEach((position, index) => {
        const cells = Object.entries(objOfCells);
        const side = position < 'a' ? 'light' : 'dark';
        if(position === '/') return;
        if(!isNaN(+position)) return gap += +position - 1;
        // print(index, position)
        
        // print(index, index + gap)

        const pieceName = setPieceName(aliases[position])
        const cellName = cells[index + gap][0];

        objOfPieces[pieceName] = {
            cell: cellName,
            side: position < 'a' ? 'light' : 'dark',
            allowedCells: [],
            history: [],
            element: createPieceElement(pieceName)
        }
        objOfCells[cellName].side = side
    })
}

function setPieceName(pieceName) {
    let counter = 1;
    while(objOfPieces.hasOwnProperty(pieceName + counter)) {
        counter++
    }
    return pieceName + counter;
}

function createPieceElement(pieceName, temp = false) {
    const piece = document.createElement('div');
    piece.id = pieceName;
    const className0 = temp ? 'piece-modal' : 'piece';
    piece.classList.add(className0, pieceName.slice(0, -1))
    piece.dataset.theme = theme.forPieces;
    return piece;
}

function renderPositions() {
    piecesContainer.innerHTML = '';
    Object.values(objOfPieces).forEach(piece => {
        piecesContainer.append(piece.element)
    })

    pieces = els('.piece');
    pieces.forEach(pieceDragHandler);

    setCellsCoordinates();
    setPiecesSize();
}

function initTurn(turn) {
    moveOptions.whoseTurn = turn === 'w' ? 'light' : 'dark';
    const lastTurn = turn === 'w' ? 'dark': 'light';
    updateAllowedCells(lastTurn);
    checkShahes(lastTurn)
}

function initCastling(castling) {
    const aliases = {
        q: {cell: 'a8', wing: 'queen'},
        k: {cell: 'h8', wing: 'king'},
        Q: {cell: 'a1', wing: 'queen'},
        K: {cell: 'h1', wing: 'king'},
        '-': {}
    }
    // debugger
    const rooks = Object.keys(objOfPieces).filter(name => {
        return name.startsWith('rook');
    })
    rooks.forEach(name => {
        castling.split('').forEach(castle => {
            if(objOfPieces[name].cell === aliases[castle].cell) {
                objOfPieces[name].wing = aliases[castle].wing
            }
        })
        if(!objOfPieces[name].wing) {
            objOfPieces[name].history.push(objOfPieces[name].cell)
        }
    })
}

function initEnPassant(enPassantFen) {
    if(enPassantFen === '-') return moveOptions.enPassant = {};
    const shift = enPassantFen.slice(-1) === '3' ? 1 : -1;
    const pieceCell = enPassantFen.slice(0, 1) + (+enPassantFen.slice(-1) + shift);
    

    const [pieceName, piece] = Object.entries(objOfPieces).find(([name, piece]) => piece.cell === pieceCell)
    const previousCell = enPassantFen.slice(0, 1) + (+enPassantFen.slice(-1) - shift);
    setEnPassant(pieceName, piece, previousCell)
}

function initUncaptured(uncaptured) {
    moveOptions.uncapturedMoves = uncaptured;
}

function addToHistory(fen) {
    const [positions, turn, , , , movesCount] = fen.split(' ');
    if(positions === 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR') {
        return movesHistory[0] = fen;
    }
    // print('moveIndex before', moveIndex, movesHistory.length - 1)
    const index = turn === 'w' ? movesCount*2 - 2 : movesCount*2 - 1;


    movesHistory[index] = fen
    moveOptions.moveIndex = movesHistory.length - 1;
    el('#fen-input').value = movesHistory[index]
    return movesHistory[index]
}

// init('rnbqkbnr/pppppppp/8/8/8/5P2/PPPPP1PP/RNBQKBNR b KQkq - 0 1')
// init('rnbqkbnr/ppp1pppp/8/3p4/8/5P2/PPPPP1PP/RNBQKBNR w KQkq d6 0 2')
// init('rnbqkbnr/ppp1pppp/8/3p4/8/2P2P2/PP1PP1PP/RNBQKBNR b KQkq - 0 2')
// init('rnbqkbnr/ppp1pppp/8/8/3p4/2P2P2/PP1PP1PP/RNBQKBNR w KQkq - 0 3')
// init('rnbqkbnr/ppp1pppp/8/8/3pP3/2P2P2/PP1P2PP/RNBQKBNR b KQkq e3 0 3')

// init('rn1qkbnr/ppp2bpp/3p1p2/3N1Q2/3pP3/8/PPP2PPP/R1B1KBNR w KQkq - 0 7')//1 3 6 7 9 12 13 15 18 21 29 31 32 33
// init('r3k2B/pp2b2p/3p1p2/3n4/3KP3/2P5/P4PPP/3q4 w - - 1 25')
// init('8/4k1pp/1p3p2/5R2/8/N1P1KP1P/p2r4/8 b - - 3 49')
// init('B3k2r/pp2b2p/3p1p2/3n4/3KP3/2P5/P4PPP/3q4 w k - 1 25')

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

// board setup UI controls /////////////////////////////////////////////////////////////////////////////////////////////////

const fenForm = el('#fen-form');
const fenInput = el('#fen-input');
const fenToClipboard = el('#fen-to-cb');
const fenFromClipboard = el('#fen-from-cb');

fenForm.addEventListener('submit', e => {
    e.preventDefault();
    const initFen = init(fenInput.value)
    if(initFen) {
        addToHistory(fenInput.value)
        fenForm.reset();
    }
})

fenToClipboard.addEventListener('click', e => {
    navigator.clipboard.writeText(fenInput.value)
    .then(() => {}) 
    .catch(err => {
        console.error(err);
    });
})

fenInput.addEventListener('mousedown', e => {
    navigator.clipboard.readText()
    .then(data => {
        const pattern = /^(\w+\/){7}\w+ [wb-] [KQkq-]+ ([a-h][1-8]|-)( \d+){2}$/;
        if(pattern.test(data)) {
            fenInput.value = data
        }
    }) 
    .catch(err => {
        console.error(err);
    });
})

// History ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// let moveIndex = 0;

const controllers = els('.moves-history-controllers__item');
controllers.forEach(controller => {
    controller.addEventListener('click', e => {
        print(e.target.id)
        if(e.currentTarget.id === 'history-back') {
            if(!moveOptions.moveIndex) {
                return print('Can not move back.')
            }
            init(movesHistory[--moveOptions.moveIndex])
        }
        if(e.currentTarget.id === 'history-forward') {
            if(moveOptions.moveIndex === movesHistory.length - 1) {
                return print('Can not move forward.')
            }
            init(movesHistory[++moveOptions.moveIndex])
        }
    })
})

window.addEventListener('keydown', e => {
    if(e.target.localName === 'input') return;
    setTimeout(() => {
        switch (e.key.slice(5).toLowerCase()) {
            case 'left':
                if(moveOptions.moveIndex) {
                    return init(movesHistory[--moveOptions.moveIndex]);
                } else {
                    return print('Can not move back.')
                }
            case 'right':
                if(moveOptions.moveIndex < movesHistory.length - 1) {
                    return init(movesHistory[++moveOptions.moveIndex]);
                } else {
                    return print('Can not move forward.')
                }
            case 'up':
                moveOptions.moveIndex = 0
                return init(movesHistory[moveOptions.moveIndex]);
            case 'down':
                moveOptions.moveIndex = movesHistory.length - 1
                return  init(movesHistory[moveOptions.moveIndex]);
        }
    }, 100)
    
})

// Themes switch //////////////////////////////////////////////////////////////////////////////////////
window.addEventListener('DOMContentLoaded', e => {
    board.dataset.theme = theme.forBoard;
    cells.forEach(cell => {
        cell.dataset.theme = theme.forBoard;
    })

    piecesThemeSelector.querySelector(`option[value="${theme.forPieces}"]`)
        .setAttribute('selected', '');
    boardThemeSelector.querySelector(`option[value="${theme.forBoard}"]`)
        .setAttribute('selected', '');
})

piecesThemeSelector.addEventListener('change', e => {
    e.currentTarget.querySelector('option[selected]').removeAttribute('selected');
    e.target.selectedOptions[0].setAttribute('selected', '')

    theme.forPieces = e.currentTarget.value;
    els('.piece').forEach(piece => {
        piece.dataset.theme = theme.forPieces;
    })
    localStorage.setItem('piecesTheme', theme.forPieces)
})

boardThemeSelector.addEventListener('change', e => {
    e.currentTarget.querySelector('option[selected]').removeAttribute('selected');
    e.target.selectedOptions[0].setAttribute('selected', '')

    theme.forBoard = e.currentTarget.value;
    board.dataset.theme = theme.forBoard;
    cells.forEach(cell => {
        cell.dataset.theme = theme.forBoard;
    })
    localStorage.setItem('boardTheme', theme.forBoard)
})



// print('rnbq1bnr/ppppkppp/8/4p2Q/4P3/8/PPPP1PPP/RNB1KBNR w KQkq - 2 3', 'mate')
// print('rnbqk3/ppppppPp/7r/6p1/4n3/7R/PPPPPPP1/RNBQKBN1 w Qq - 0 8', 'promotion')
// print('4k1n1/3b4/8/8/R1B5/5N2/8/6K1 b - - 1 30', 'draw nEp')

// Game start and reset

resetBtn.addEventListener('click', e => {
    movesHistory.length = 0;
    localStorage.setItem('history', null)
    startGame()
})

function startGame() {
    const history = JSON.parse(localStorage.getItem('history'))
    if(Array.isArray(history)) {
        init(history.pop())
        movesHistory.push(...history)
    } else {
        const startPosition = init('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
        addToHistory(startPosition);
    }
}
startGame();