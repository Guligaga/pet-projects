import '@/styles/styles.css'

import {pawnPromotionHandler, pieceDragHandler, stopDragHandler} from "@/scripts/boardActions";
import {boardTurnHandler} from "@/scripts/boardTurnUI";
import {
    boardThemeSelector,
    piecesThemeSelector,
    resetBtn,
    board,
    fenForm,
    fenToClipboard,
    fenInput,
    sideSelector,
    controllers
} from "@/scripts/vars";
import {resizer} from  "@/scripts/resizingUI";
import {resetGameHandler, startGame} from "@/scripts/chess";
import {historyMoveByKeysHandler, historyMoveHandler} from "@/scripts/history";
import {resizeBoardHandler, stopResizeHandler} from "@/scripts/resizingUI";
import {fenToClipboardHandler, loadFenHandler, readFromClipboardHandler} from "@/scripts/setupControlsUI";
import {changeBoardThemeHandler, changePieceThemeHandler, loadStartThemeHandler} from "@/scripts/themeUI";

startGame();

board.addEventListener('mousedown', pieceDragHandler);
window.addEventListener('mouseup', stopDragHandler);
board.addEventListener('mousedown', pawnPromotionHandler);

sideSelector.addEventListener('change', boardTurnHandler);
resetBtn.addEventListener('click', resetGameHandler);

controllers.forEach(controller => {
    controller.addEventListener('click', historyMoveHandler)
});
window.addEventListener('keydown', historyMoveByKeysHandler);

resizer.addEventListener('mousedown', resizeBoardHandler);
window.addEventListener('mouseup', stopResizeHandler);

fenForm.addEventListener('submit', loadFenHandler);
fenToClipboard.addEventListener('click', fenToClipboardHandler);
fenInput.addEventListener('mousedown', readFromClipboardHandler);

window.addEventListener('DOMContentLoaded', loadStartThemeHandler);
piecesThemeSelector.addEventListener('change', changePieceThemeHandler);
boardThemeSelector.addEventListener('change', changeBoardThemeHandler);
