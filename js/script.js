"use strict";


function couple(array) {
    for (let i = 0; i< array.lenght; i++) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
