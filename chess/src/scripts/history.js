// History UI controls///////////////////////////////////////////////////////////////////////////////////////////

import {moveOptions, movesHistory} from "@/scripts/vars";
import {init} from "@/scripts/init";
import {el, print} from "@/scripts/utils";

export function historyMoveHandler(e) {
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
}


export function historyMoveByKeysHandler(e) {
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
                moveOptions.moveIndex = 0;
                return init(movesHistory[moveOptions.moveIndex]);
            case 'down':
                moveOptions.moveIndex = movesHistory.length - 1;
                return  init(movesHistory[moveOptions.moveIndex]);
        }
    }, 100)
}

export function addToHistory(fen) {
    const [positions, turn, , , , movesCount] = fen.split(' ');
    if(positions === 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR') {
        return movesHistory[0] = fen;
    }
    // print('moveIndex before', moveIndex, movesHistory.length - 1)
    const index = turn === 'w' ? movesCount*2 - 2 : movesCount*2 - 1;


    movesHistory[index] = fen;
    moveOptions.moveIndex = movesHistory.length - 1;
    el('#fen-input').value = movesHistory[index];
    return movesHistory[index]
}
