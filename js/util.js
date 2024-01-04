'use strict'

function createMat(size) {
    const mat = []
    for (var i = 0; i < size; i++) {
        const row = []
        for (var j = 0; j < size; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}


