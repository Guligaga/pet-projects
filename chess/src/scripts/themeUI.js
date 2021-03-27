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