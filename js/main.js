'use strict'

const MINE = '💣'
const FLAG = '🚩'

const MINE_IMG = '<img src="img/mine.png">'
const FLAG_IMG = '<img src="img/flag.png">'

// Model:
var gLevel = { size: 4, mines: 2 }
console.log('gLevel:', gLevel)
var gBoard
var gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 }
var gAllMineIdx = []
console.log('gAllMineIdx:', gAllMineIdx)

// console.log('gAllMineIdx j:', gAllMineIdx[1].j)

function onInit() {
    
    gBoard = buildBoard()
    renderBoard(gBoard)
    console.log(gBoard)

    gGame.isOn = true
    console.log(gGame)
    console.log('gGame:', gGame.isOn)

    
    

    

}


function buildBoard() {
    const board = createMat(gLevel.size)
    // gAllMineIdx.splice(0,gLevel.mines)
    
    for (var i = 0; i < gLevel.mines; i++) {
        var mineIndex = mineIdx()
        console.log('mineIndex:', mineIndex)


        board[mineIndex[0]][mineIndex[1]] = { minesAroundCount: setMinesNegsCount(board, board.i, board.j), isShown: false, isMine: true, isMarked: false }
        
    }
    


    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (!board[i][j]) board[i][j] = { minesAroundCount: setMinesNegsCount(board, i, j), isShown: false, isMine: false, isMarked: false }

            // console.log(`setMinesNegsCount(board, ${i}, ${j}):`, setMinesNegsCount(board, i, j))

        }
    }



    return board

}


function setMinesNegsCount(board, rowIdx, colIdx) {
    var count = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > board.length - 1) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > board[0].length - 1) continue
            if (i === rowIdx && j === colIdx) continue
            // var cell = board[i][j]
            if (board[i][j].isMine) count++
        }

    }
    return count
}


function mineIdx() {
    // TODO: FIX THE SAME IDX OF MINES
    var mineIdx = []
    
    

    // var usedIdxRow = []
    // var usedIdxCol = []

    var rowIdx = getRandomIntInclusive(0, gLevel.size - 1)
    var colIdx = getRandomIntInclusive(0, gLevel.size - 1)

    mineIdx.push(rowIdx, colIdx)

    
    gAllMineIdx.push({ rowIdx, colIdx })


    // usedIdxRow.push(rowIdx)
    // usedIdxCol.push(colIdx)

    // console.log('usedIdxRow:', usedIdxRow)
    // console.log('usedIdxCol:', usedIdxCol)

    // console.log('mineIdx:', mineIdx)
    return mineIdx

}


function renderBoard(board) {
    var strHTML = '<table border="1" oncontextmenu="return false;"><tbody>' //cellpadding="10"
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            var className = `cell cell-${i}-${j}`

            if (cell.isMine) className += ' mine'

            strHTML += `<td class="${className}" onclick="onCellClicked(this, ${i}, ${j})" onmousedown="onCellMarked(event,this, ${i}, ${j})">`
            // strHTML += `<button class="cell-button">`;
            if (cell.isMine) {
                strHTML += `<img src=""><span class="cell-invisible">${MINE_IMG}</span>`
            } else {
                strHTML += `<img src=""><span class="cell-invisible">${cell.minesAroundCount}</span>`
            }
            // strHTML += '</button>';
            strHTML += '</td>'
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elBoardContainer = document.querySelector('.board-container')
    elBoardContainer.innerHTML = strHTML

}


function gameLevel(elBtn) {
    const beginner = elBtn.getAttribute('data-4')
    const medium = elBtn.getAttribute('data-8')
    const expert = elBtn.getAttribute('data-12')

    if (+beginner === 4) {
        gLevel.size = +beginner
        gLevel.mines = 2
    } else if (+medium === 8) {
        gLevel.size = +medium
        gLevel.mines = 14
        
    } else if (+expert === 12) {
        gLevel.size = +expert
        gLevel.mines = 32
        
    }

    // console.log('gLevel:', gLevel)
    // gAllMineIdx.splice(0,gLevel.mines)
    gAllMineIdx.splice(0,32)
    onInit()
    
    console.log('gLevel:', gLevel)
}



function onCellClicked(elCell, i, j) {
    if (gBoard[i][j].isMine) {
        for (var k = 0; k < gAllMineIdx.length; k++) {
            const elSpanOpacity = document.querySelector(`.cell-${gAllMineIdx[k].rowIdx}-${gAllMineIdx[k].colIdx} span`)
            elSpanOpacity.classList.remove('cell-invisible')
            elCell.style.boxShadow = '0px 0px 0px 0px #000000';
            

            console.log('gAllMineIdx i:', `.cell-${gAllMineIdx[k].rowIdx}-${gAllMineIdx[k].colIdx} span`)
            console.log('k:', k)
            console.log('gAllMineIdx.length:', gAllMineIdx.length)
        }
    }

    if (gBoard[i][j].isMarked) return
    console.log('elCell:', elCell)
    elCell.style.boxShadow = '0px 0px 0px 0px #000000';

    //Model
    gBoard[i][j].isShown = true
    gGame.shownCount++


    // DOM
    const elSpanOpacity = document.querySelector(`.cell-${i}-${j} span`)
    elSpanOpacity.classList.remove('cell-invisible')
    // console.log(elCell.classList.contains('cell') )
    // console.log(elCell.classList )
    console.log(elSpanOpacity)




}


function onCellMarked(event, elBtn, i, j) {
    if (!gBoard[i][j].isMarked && !gBoard[i][j].isShown) {

        if (event.button === 2) {

            //Model
            gBoard[i][j].isMarked = true
            // console.log('gBoard:', gBoard)

            gGame.markedCount++



            //DOM
            const elImg = document.querySelector(`.cell-${i}-${j} img`)
            elImg.src = 'img/flag.png'

            const elSpanOpacity = document.querySelector(`.cell-${i}-${j} span`)
            elSpanOpacity.style.display = 'none'




        }

    } else {

        if (event.button === 2) {

            //Model 
            gBoard[i][j].isMarked = false
            gGame.markedCount--

            // console.log('gBoard1:', gBoard)


            //DOM
            const elImg = document.querySelector(`.cell-${i}-${j} img`)
            elImg.src = ''

            const elSpanOpacity = document.querySelector(`.cell-${i}-${j} span`)
            elSpanOpacity.style.display = ''


        }
    }

}



function mineMapIdx(i, j) {




}