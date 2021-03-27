const container = document.querySelector('.container')
const resizables = document.querySelectorAll('.resizable');
const field = document.querySelector('.resizable');
const resizer = document.querySelector('.resizer#se');

// setCellSize(getSize(board).width)

let initialSize = 0;

const limits = {
    maxBoardSize: 620,
    minBoardSize: 280,
}

const coordinates = {
    x: field.getBoundingClientRect().left, 
    y: field.getBoundingClientRect().top,
    getDistance(x, y) {
        x = x - this.x;
        y = y - this.y;
        return Math.sqrt(2 * (x * x + y * y)) / 2;
        // return { x, y, sqrt: Math.sqrt(x * x + y * y) }
    }
}

const offsets = {
    x: 0,
    y: 0,
}


resizer.addEventListener('mousedown', e => {
    coordinates.x = field.getBoundingClientRect().left;
    coordinates.y = field.getBoundingClientRect().top;
    offsets.x = getSize(e.currentTarget).width - e.offsetX + getSize(e.currentTarget).inset.right;
    offsets.y = getSize(e.currentTarget).height - e.offsetY + getSize(e.currentTarget).inset.bottom;
    window.addEventListener('mousemove', diagonalMoveBoth)

})

function diagonalMoveX(e) {
    const distance = (e.clientX - coordinates.x + offsets.x)// * 1.7;
    if(distance < 30) return;
    field.style.setProperty('width', initialSize + distance + 'px');
    field.style.setProperty('height', initialSize + distance + 'px');
    setCellSize(distance)
}

window.addEventListener('mouseup', e => {
    window.removeEventListener('mousemove', diagonalMoveBoth)
})

function diagonalMoveBoth(e) {
    const distance = coordinates.getDistance(e.pageX + offsets.x, e.pageY + offsets.y);
    const compareX = e.pageX + offsets.x < coordinates.x;
    const compareY = e.pageY + offsets.y < coordinates.y;
    if(compareX || compareY) return;
    if(distance > limits.maxBoardSize || distance < limits.minBoardSize) return;

    resizables.forEach(field => {
        field.style.setProperty('width', distance + 'px');
        field.style.setProperty('height', distance + 'px');
    })
    setCellsCoordinates()
    setPiecesSize()
}