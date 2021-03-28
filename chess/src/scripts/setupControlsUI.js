// board setup UI controls /////////////////////////////////////////////////////////////////////////////////////////////////

import {fenInput, fenForm} from "@/scripts/vars"
import {init} from "@/scripts/init";
import {addToHistory} from "@/scripts/history";


export function loadFenHandler(e) {
    e.preventDefault();
    const initFen = init(fenInput.value);
    if(initFen) {
        addToHistory(fenInput.value);
        fenForm.reset();
    }
}


export function fenToClipboardHandler() {
    navigator.clipboard.writeText(fenInput.value)
        .then(() => {})
        .catch(err => {
            console.error(err);
        });
}



export function readFromClipboardHandler() {
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
}
