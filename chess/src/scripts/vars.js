// Board elements

import {el, els} from "@/scripts/utils";

const board = el('.chess-board');
const piecesContainer = el('.pieces');
const notationsContainer = el('.notation-container');
const notations = els('.notation');
const rows = els('.row');
const cells = els('.cell');

const promotionModal = el('.promotion-modal');
const gameoverModal = el('.gameover-modal');

const fenForm = el('#fen-form');
const fenInput = el('#fen-input');
const fenToClipboard = el('#fen-to-cb');
const controllers = els('.moves-history-controllers__item');

const sideSelector = el('#side-selector');
const piecesThemeSelector = el('#pieces-theme');
const boardThemeSelector = el('#board-theme');
const resetBtn = el('#reset-game');

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
};
const theme = {
    forBoard: localStorage.getItem('boardTheme') || 'marble',
    forPieces: localStorage.getItem('piecesTheme') || 'glass'
};
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
};

const movesHistory = [];

const moveOptions = {
    whoseTurn: 'light',
    checkingPieces: [],
    enPassant: {},
    uncapturedMoves: 0,
    isPromoted: false,
    moveIndex: 0,
};

const pieces = {
    all: els('.piece'),
    currentDraggable: null,
};

export {
    board,
    piecesContainer,
    notationsContainer,
    notations,
    rows,
    cells,
    pieces,
    promotionModal,
    gameoverModal,
    fenForm,
    fenInput,
    fenToClipboard,
    controllers,
    sideSelector,
    piecesThemeSelector,
    boardThemeSelector,
    resetBtn,
    objOfCells,
    objOfPieces,
    theme,
    cellsCoordinates,
    movesHistory,
    moveOptions,
}
