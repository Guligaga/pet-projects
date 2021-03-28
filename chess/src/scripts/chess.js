// print('rnbq1bnr/ppppkppp/8/4p2Q/4P3/8/PPPP1PPP/RNB1KBNR w KQkq - 2 3', 'mate')
// print('rnbqk3/ppppppPp/7r/6p1/4n3/7R/PPPPPPP1/RNBQKBN1 w Qq - 0 8', 'promotion')
// print('4k1n1/3b4/8/8/R1B5/5N2/8/6K1 b - - 1 30', 'draw nEp')
// Game start and reset //////////////////////////////////////////////////////////////////////////////////////////////////

import {movesHistory} from "@/scripts/vars";
import {addToHistory} from "@/scripts/history";
import {init} from "@/scripts/init";


export function resetGameHandler() {
    movesHistory.length = 0;
    localStorage.setItem('history', null);
    startGame()
}
export function startGame() {
    const history = JSON.parse(localStorage.getItem('history'));
    if(Array.isArray(history)) {
        init(history.pop());
        movesHistory.push(...history)
    } else {
        const startPosition = init('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
        addToHistory(startPosition);
    }
}
