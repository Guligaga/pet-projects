// turn over the board //////////////////////////////////////////////////////////////////////////////////////////////////

import {board, notations, notationsContainer, rows} from "@/scripts/vars";
import {setCellsCoordinates, setPiecesSize} from "@/scripts/boardInit";

export function boardTurnHandler(e) {
    const resetPosition = e.currentTarget.value === 'light'? 'append' : 'prepend';
    function reverse(parents, grandparent) {
        parents.forEach(parent => {
            const children = [...parent.children];
            children.forEach(child => {
                child.remove();
                parent.prepend(child)
            });
            parent.remove();
            grandparent[resetPosition](parent)
        })
    }
    reverse(rows, board);
    reverse(notations, notationsContainer);

    setCellsCoordinates();
    setPiecesSize();
}
