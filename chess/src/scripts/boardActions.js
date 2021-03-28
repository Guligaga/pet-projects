// Drag & Drop pieces ///////////////////////////////////////////////////////////////////////////////////////////////

import {pieces, moveOptions, movesHistory, objOfCells, objOfPieces, board, promotionModal} from "@/scripts/vars";
import {el, getSize} from "@/scripts/utils";
import {applyPieceMove, setCheckAndMateActions, updateAllowedCells} from "@/scripts/move";
import {getAllowedMoves} from "@/scripts/allowedMoves";
import {filterIfUnderCheck} from "@/scripts/shah";
import {createPieceElement, init, renderPositions} from "@/scripts/init";
import {addToHistory} from "@/scripts/history";
import {setFEN} from "@/scripts/fen";

export function pieceDragHandler(e) {
    // print('mousedown')
    if(!e.target.classList.contains('piece')) return;
    const piece = e.target;
    pieces.currentDraggable = piece;

    piece.style.setProperty('cursor', 'grabbing');
    piece.style.setProperty('z-index', '1000');

    renderAllowedMoves(piece.id);

    moveAt(e.target, e.pageX, e.pageY);
    window.addEventListener('mousemove', dragPiece);

    piece.addEventListener('dragstart', e => {
        e.preventDefault();
    })
}

function renderAllowedMoves(pieceName) {
    objOfPieces[pieceName].allowedCells = filterIfUnderCheck(pieceName, getAllowedMoves(pieceName));

    objOfPieces[pieceName].allowedCells.forEach(cellName => {
        const className = objOfCells[cellName].side ? 'allowed-cell-enemy' : 'allowed-cell';
        el(`#${cellName}`).classList.add(className);
    })
}

function moveAt(piece, pageX, pageY) {
    piece.style.setProperty('left', pageX - board.getBoundingClientRect().left - getSize(piece).width / 2 + 'px');
    piece.style.setProperty('top', pageY - board.getBoundingClientRect().top - getSize(piece).height / 2 + 'px');
}

function dragPiece(e) {
    if(e.target.id === pieces.currentDraggable.id) {
        moveAt(e.target, e.pageX, e.pageY);
        e.target.style.setProperty('cursor', 'grabbing')
    } else {
        moveAt(pieces.currentDraggable, e.pageX, e.pageY);
    }

}



export function stopDragHandler(e) {
    // print('mouseup')
    const {target} = e;
    if(!target.classList.contains('piece')) return;

    applyPieceMove(e);
    window.removeEventListener('mousemove', dragPiece);
//
    target.style.setProperty('cursor', 'grab');
    target.style.setProperty('z-index', '1');
}

// Actions with pawn promotion modal


export function pawnPromotionHandler({ target }) {
    const {cell, side, pawn} = target.dataset;
    if(target.classList.contains('piece-modal')) {
        const pieceName = target.id;
        const pieceElement = createPieceElement(pieceName);
        objOfPieces[pieceName] = {
            cell,
            side,
            element: pieceElement,
            allowedCells: [],
            history: [ cell ],
        };
        delete objOfPieces[pawn];
        renderPositions();
        objOfPieces[pieceName].allowedCells = filterIfUnderCheck(pieceName, getAllowedMoves(pieceName));
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
}
