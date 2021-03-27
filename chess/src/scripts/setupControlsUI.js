// board setup UI controls /////////////////////////////////////////////////////////////////////////////////////////////////

fenForm.addEventListener('submit', e => {
    e.preventDefault();
    const initFen = init(fenInput.value)
    if(initFen) {
        addToHistory(fenInput.value)
        fenForm.reset();
    }
})

fenToClipboard.addEventListener('click', e => {
    navigator.clipboard.writeText(fenInput.value)
    .then(() => {}) 
    .catch(err => {
        console.error(err);
    });
})

fenInput.addEventListener('mousedown', e => {
    navigator.clipboard.readText()
    .then(data => {
        const pattern = /^(\w+\/){7}\w+ [wb-] [KQkq-]+ ([a-h][1-8]|-)( \d+){2}$/;
        if(pattern.test(data)) {
            fenInput.value = data
        }
    }) 
    .catch(err => {
        console.error(err);
    });
})