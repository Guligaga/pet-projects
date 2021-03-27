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