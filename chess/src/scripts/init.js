// setup board state from FEN //////////////////////////////////////////////////////////////////////////////////////////////////
import {objOfCells, objOfPieces, theme, piecesContainer, moveOptions, pieces} from "@/scripts/vars";
import {els} from "@/scripts/utils";
import {setCellsCoordinates, setPiecesSize} from "@/scripts/boardInit";
import {setEnPassant, updateAllowedCells} from "@/scripts/move";
import {checkShahes} from "@/scripts/shah";

export function init(fen) {
    if(!validateFen(fen)) return alert('Fen is not valid');
    for (const key in objOfPieces) {
        delete objOfPieces[key]
    }
    for (const key in objOfCells) {
        objOfCells[key].side = null;
    }
    const [positions, turn, castling, enPassant, uncaptured, ] = fen.split(' ');

    initPositions(positions);
    renderPositions();
    initTurn(turn);
    initCastling(castling);
    initEnPassant(enPassant);
    initUncaptured(uncaptured);
    return fen;
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
    };
    let gap = 0;
    const posArr = positions.split('/').join('');
    posArr.split('').forEach((position, index) => {
        const cells = Object.entries(objOfCells);
        const side = position < 'a' ? 'light' : 'dark';
        if(position === '/') return;
        if(!isNaN(+position)) return gap += +position - 1;
        // print(index, position)

        // print(index, index + gap)

        const pieceName = setPieceName(aliases[position]);
        const cellName = cells[index + gap][0];

        objOfPieces[pieceName] = {
            cell: cellName,
            side: position < 'a' ? 'light' : 'dark',
            allowedCells: [],
            history: [],
            element: createPieceElement(pieceName)
        };
        objOfCells[cellName].side = side
    })
}

export function setPieceName(pieceName) {
    let counter = 1;
    while(objOfPieces.hasOwnProperty(pieceName + counter)) {
        counter++
    }
    return pieceName + counter;
}

export function createPieceElement(pieceName, temp = false) {
    const piece = document.createElement('div');
    piece.id = pieceName;
    const className0 = temp ? 'piece-modal' : 'piece';
    piece.classList.add(className0, pieceName.slice(0, -1));
    piece.dataset.theme = theme.forPieces;
    return piece;
}

export function renderPositions() {
    piecesContainer.innerHTML = '';
    Object.values(objOfPieces).forEach(piece => {
        piecesContainer.append(piece.element)
    });

    pieces.all = els('.piece');

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
    };
    // debugger
    const rooks = Object.keys(objOfPieces).filter(name => {
        return name.startsWith('rook');
    });
    rooks.forEach(name => {
        castling.split('').forEach(castle => {
            if(objOfPieces[name].cell === aliases[castle].cell) {
                objOfPieces[name].wing = aliases[castle].wing
            }
        });
        if(!objOfPieces[name].wing) {
            objOfPieces[name].history.push(objOfPieces[name].cell)
        }
    })
}

function initEnPassant(enPassantFen) {
    if(enPassantFen === '-') return moveOptions.enPassant = {};
    const shift = enPassantFen.slice(-1) === '3' ? 1 : -1;
    const pieceCell = enPassantFen.slice(0, 1) + (+enPassantFen.slice(-1) + shift);


    const [pieceName, piece] = Object.entries(objOfPieces).find(([, piece]) => piece.cell === pieceCell);
    const previousCell = enPassantFen.slice(0, 1) + (+enPassantFen.slice(-1) - shift);
    setEnPassant(pieceName, piece, previousCell)
}

function initUncaptured(uncaptured) {
    moveOptions.uncapturedMoves = uncaptured;
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
