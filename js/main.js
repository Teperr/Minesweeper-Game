'use strict'

const SMILEY_ISON = '😀'
const SMILEY_ISON_FALSE = '😵'
const SMILEY_ISON_WINNER = '😎'

const MINE_IMG = '<img class="mine-img" src="img/mine.png">'
// const FLAG_IMG_SRC = 'img/flag.png'
const NO_MORE_LIVES_MSG = 'Be careful there are no more lives left 😢'

// Model:
var gLevel = { size: 4, mines: 2 }
var gBoard
var gGame = { isOn: true, shownCount: 0, markedCount: 0, secsPassed: 0, isUserLose: false, LivesLeftCount: 3 }
var gAllMineIdx = []
var gMarked = gLevel.mines
var gTimer = 0
var gIsFirstClick = false
var gFirstIdx = {}


function onInit() {

    gBoard = buildBoard()
    renderBoard(gBoard)

    console.log('%cMODEL************MODEL*************MODEL************MODEL************MODEL', 'background: red; color: white;');
    console.log('gBoard:', gBoard)
    console.log('gLevel:', gLevel)
    console.log('gGame:', gGame)
    console.log('%cMODEL************MODEL*************MODEL************MODEL************MODEL', 'background: red; color: white;');
    console.log('%cgAllMineIdx********gAllMineIdx********gAllMineIdx*******gAllMineIdx********gAllMineIdx', 'background: yellow; color: black;');
    console.log('gAllMineIdx:', gAllMineIdx)
    console.log('%cgAllMineIdx********gAllMineIdx********gAllMineIdx*******gAllMineIdx********gAllMineIdx', 'background: yellow; color: black;');

    gGame.isOn = true
    gGame.isUserLose = false
    gGame.shownCount = 0
    gGame.markedCount = 0
    gGame.LivesLeftCount = 3
    gMarked = gLevel.mines

    pauseAndResetTimer()

}

function buildBoard() {

    const board = createMat(gLevel.size)
    generateMinesIdx()

    if (gIsFirstClick) {

        for (var i = 0; i < gLevel.mines; i++) {
            board[gAllMineIdx[i].rowIdx][gAllMineIdx[i].colIdx] = { minesAroundCount: null, isShown: false, isMine: true, isMarked: false }
        }

        for (var i = 0; i < board.length; i++) {
            for (var j = 0; j < board[i].length; j++) {
                if (!board[i][j]) board[i][j] = { minesAroundCount: setMinesNegsCount(board, i, j), isShown: false, isMine: false, isMarked: false }
            }
        }

    } else {

        for (var i = 0; i < board.length; i++) {
            for (var j = 0; j < board[i].length; j++) {
                // if (!board[i][j]) board[i][j] = { minesAroundCount: setMinesNegsCount(board, i, j), isShown: false, isMine: false, isMarked: false }
                board[i][j] = { minesAroundCount: 0, isShown: false, isMine: false, isMarked: false }
            }
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
            if (board[i][j].isMine) count++
        }

    }
    return count
}


function generateMinesIdx() {
    for (var i = 0; i < gLevel.mines; i++) {
        var newMineIdx = {
            rowIdx: getRandomIntInclusive(0, gLevel.size - 1),
            colIdx: getRandomIntInclusive(0, gLevel.size - 1)
        };
       
        newMineIdx.rowIdx = Math.min(newMineIdx.rowIdx, newMineIdx.colIdx);
        newMineIdx.colIdx = Math.max(newMineIdx.rowIdx, newMineIdx.colIdx);
        
        var isDuplicate = gAllMineIdx.some(existingObject =>
            existingObject.rowIdx === newMineIdx.rowIdx &&
            existingObject.colIdx === newMineIdx.colIdx
        );
        
        var isSameAsFirstIdx = gFirstIdx.i === newMineIdx.rowIdx && gFirstIdx.j === newMineIdx.colIdx;
        

        while (isDuplicate || isSameAsFirstIdx) {
            newMineIdx.rowIdx = getRandomIntInclusive(0, gLevel.size - 1);
            newMineIdx.colIdx = getRandomIntInclusive(0, gLevel.size - 1);

            newMineIdx.rowIdx = Math.min(newMineIdx.rowIdx, newMineIdx.colIdx);
            newMineIdx.colIdx = Math.max(newMineIdx.rowIdx, newMineIdx.colIdx);

            isDuplicate = gAllMineIdx.some(existingObject =>
                existingObject.rowIdx === newMineIdx.rowIdx &&
                existingObject.colIdx === newMineIdx.colIdx
            );

            isSameAsFirstIdx = gFirstIdx.i === newMineIdx.rowIdx && gFirstIdx.j === newMineIdx.colIdx;
        }
        
        gAllMineIdx.push(newMineIdx);
    }
}


function renderBoard(board) {

    var colspanSizeSides = 1
    var colspanSizeCenter = 2
    if (gLevel.size === 8) {
        colspanSizeSides = 2
        colspanSizeCenter = 4
    } else if (gLevel.size === 12) {
        colspanSizeSides = 3
        colspanSizeCenter = 6
    }

    var strHTML = `<table oncontextmenu="return false;"><thead><tr><th class="mine-count" colspan="${colspanSizeSides}">${gMarked}</th><th class="smiley" colspan="${colspanSizeCenter}" onclick="restartGame()">${SMILEY_ISON}</th><th class="timer" colspan="${colspanSizeSides}">${gTimer}</th></tr></thead><tbody>` //cellpadding="10"

    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            var className = `cell cell-${i}-${j}`

            if (cell.isMine) className += ' mine'

            strHTML += `<td class="${className}" onclick="onCellClicked(this, ${i}, ${j})" onmousedown="onCellMarked(event, ${i}, ${j})">`
            
            if (!cell.isMine) {
                strHTML += `<img src=""><span class="cell-invisible">${cell.minesAroundCount}</span>`

            } else {
                strHTML += `<img class="flag-img" src=""><span class="cell-invisible" >${MINE_IMG}</span>`

            }
            
            strHTML += '</td>'
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elBoardContainer = document.querySelector('.board-container')
    elBoardContainer.innerHTML = strHTML

    if (gIsFirstClick) {
        const elCell = document.querySelector(`.cell-${gFirstIdx.i}-${gFirstIdx.j}`)
        elCell.classList.add('cell-no-shadow')
    }

}


function onCellClicked(elCell, i, j) {

    if (!gGame.isOn) return
    if (gBoard[i][j].isMarked) return
    if (gBoard[i][j].isShown) return

    const elSpanOpacity = document.querySelector(`.cell-${i}-${j} span`)
    elSpanOpacity.classList.remove('cell-invisible')

    if (gBoard[i][j].minesAroundCount === 0) elSpanOpacity.style.opacity = '0';

    elCell.classList.add('cell-no-shadow')

    if (isFirstClick()) {
        gIsFirstClick = true
        gFirstIdx.i = i
        gFirstIdx.j = j
        gAllMineIdx.splice(0, 32)
        onInit()

        //Model
        gBoard[i][j].isShown = true
        gGame.shownCount++

        if (gGame.shownCount >= 1 && gGame.LivesLeftCount === 3) {
            timer()
        }

    } else {
        //Model
        gIsFirstClick = false
        gBoard[i][j].isShown = true
        gGame.shownCount++

    }

    if (gBoard[i][j].isMine) {

        gGame.isUserLose = true

        // var livesLeft = isLivesLeft()
        if (isLivesLeft()) return

        for (var k = 0; k < gAllMineIdx.length; k++) {
            //Model
            gBoard[gAllMineIdx[k].rowIdx][gAllMineIdx[k].colIdx].isShown = true

            // DOM
            const elSpanOpacity = document.querySelector(`.cell-${gAllMineIdx[k].rowIdx}-${gAllMineIdx[k].colIdx} span`)
            elSpanOpacity.classList.remove('cell-invisible')
            elCell.style.backgroundColor = 'red';

            const elCellShadow = document.querySelector(`.cell-${gAllMineIdx[k].rowIdx}-${gAllMineIdx[k].colIdx}`)
            elCellShadow.classList.add('cell-no-shadow')

        }
    }
    expandShown(gBoard, elCell, i, j)
    checkGameOver()
}


function gameLevel(elBtn) {

    const beginner = elBtn.getAttribute('data-4')
    const medium = elBtn.getAttribute('data-8')
    const expert = elBtn.getAttribute('data-12')

    if (+beginner === 4) {
        gLevel.size = +beginner
        gLevel.mines = 2
        gMarked = 2
    } else if (+medium === 8) {
        gLevel.size = +medium
        gLevel.mines = 14
        gMarked = 14
    } else if (+expert === 12) {
        gLevel.size = +expert
        gLevel.mines = 32
        gMarked = 32
    }

    restartGame()
    gGame.isOn = true
}


function onCellMarked(event, i, j) {
    if (!gGame.isOn) return
    if (!gBoard[i][j].isMarked && !gBoard[i][j].isShown) {
        if (event.button === 2) {
            //Model
            gBoard[i][j].isMarked = true
            gGame.markedCount++
            gMarked--

            //DOM
            const elImg = document.querySelector(`.cell-${i}-${j} img`)
            elImg.src = 'img/flag.png'

            const elSpanOpacity = document.querySelector(`.cell-${i}-${j} span`)
            elSpanOpacity.style.display = 'none'

            const elMineCount = document.querySelector('.mine-count')
            elMineCount.innerText = gMarked
        }

    } else {
        if (event.button === 2) {
            //Model 
            gBoard[i][j].isMarked = false
            gGame.markedCount--

            if (!gBoard[i][j].isShown) {
                //Model 
                gMarked++

                //DOM
                const elMineCount = document.querySelector('.mine-count')
                elMineCount.innerText = gMarked
            }

            //DOM
            const elImg = document.querySelector(`.cell-${i}-${j} img`)
            elImg.src = ''

            const elSpanOpacity = document.querySelector(`.cell-${i}-${j} span`)
            elSpanOpacity.style.display = ''

        }
    }


}


function checkGameOver() {
    const elSmiley = document.querySelector('.smiley')

    if (gGame.shownCount === (gLevel.size ** 2 - gLevel.mines)) {
        gGame.isOn = false
        clearInterval(gTimer)
        elSmiley.innerText = SMILEY_ISON_WINNER
        gMarked = 0

        const elMinesCount = document.querySelector('.mine-count')
        elMinesCount.innerText = gMarked
        
        var elMinesClass = document.querySelectorAll('.flag-img')
        var elMinesImgPrevious = document.querySelectorAll('.mine-img')
        
        for (var i = 0; i < elMinesClass.length; i++) {

            elMinesClass[i].src = 'img/flag.png'
            // elMinesClass[i].src = FLAG_IMG_SRC
            elMinesImgPrevious[i].src = ''
        }

    } else if (gGame.isUserLose) {
        gGame.isOn = false
        clearInterval(gTimer)
        elSmiley.innerText = SMILEY_ISON_FALSE
    }
}


function expandShown(board, elCell, i, j) {
    var currClickedNegs = setMinesNegsCount(board, i, j)
    if (currClickedNegs >= 1 || gBoard[i][j].isMine) return

    var currNegsIdxArr = getIdxOfNegs(board, i, j)
    
    for (var k = 0; k < currNegsIdxArr.length; k++) {

        var currNegsIdx = getIdxOfNegs(board, i, j)
        
        if (currNegsIdx[k].minesAroundCount === null) return
        if (currClickedNegs === 0 || currNegsIdx[k].minesAroundCount === 0 || currNegsIdx[k].minesAroundCount === 1) {

            const elCellShadow = document.querySelector(`.cell-${currNegsIdx[k].rowIdx}-${currNegsIdx[k].colIdx}`)
            elCellShadow.classList.add('cell-no-shadow')

            if (gBoard[currNegsIdx[k].rowIdx][currNegsIdx[k].colIdx].isShown) gGame.shownCount--
            gGame.shownCount++
            gBoard[currNegsIdx[k].rowIdx][currNegsIdx[k].colIdx].isShown = true

            if (currNegsIdx[k].isMarked) {
                elCellShadow.classList.remove('cell-no-shadow')
                gGame.shownCount--
                gBoard[currNegsIdx[k].rowIdx][currNegsIdx[k].colIdx].isShown = false

            }

        }

        if (k === currNegsIdxArr.length - 1) return
    }

    expandShown(board, elCell, i, j)
}


function getIdxOfNegs(board, rowIdx, colIdx) {
    var negsIdx = []

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > board.length - 1) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > board[0].length - 1) continue
            if (i === rowIdx && j === colIdx) continue

            negsIdx.push({ rowIdx: i, colIdx: j, minesAroundCount: board[i][j].minesAroundCount, isMarked: board[i][j].isMarked })
        }

    }
    return negsIdx
}


function isLivesLeft() {

    if (gGame.isUserLose) {
        gGame.LivesLeftCount--
        gGame.shownCount--
        gGame.isUserLose = false
        var elLivesLeft = document.querySelector(`.lives-left-${gGame.LivesLeftCount + 1}`)
        var elHeader = document.querySelector(`.header`)

        if (gGame.LivesLeftCount === 0) {
            // elHeader.innerText = 'Be careful there are no more lives left 😢'
            elHeader.innerText = NO_MORE_LIVES_MSG
        }

        if (gGame.LivesLeftCount < 0) {
            gGame.isUserLose = true
            return false
        }

        elLivesLeft.classList.add('cell-invisible')
        
        return true
    }
    return false
}


function timer() {
    var elTimer = document.querySelector('.timer')
    var sec = 0

    gTimer = setInterval(() => {
        elTimer.innerHTML = sec
        sec++
        gGame.secsPassed++
    }, 1000)
}


function pauseAndResetTimer() {
    clearInterval(gTimer)
    var elTimer = document.querySelector('.timer')
    elTimer.innerHTML = '0'
    gGame.secsPassed = 0
}


function restartGame() {
    
    gIsFirstClick = false
    gAllMineIdx.splice(0, 32)
    onInit()

    const elCell = document.querySelector(`.cell-${gFirstIdx.i}-${gFirstIdx.j}`)

    if (elCell) {

        elCell.classList.remove('cell-no-shadow')
        gFirstIdx = {}
    }

    var elLivesLeftAll = document.querySelectorAll(`.lives`)
    elLivesLeftAll[0].classList.remove('cell-invisible')
    elLivesLeftAll[1].classList.remove('cell-invisible')
    elLivesLeftAll[2].classList.remove('cell-invisible')

    var elHeader = document.querySelector(`.header`)
    elHeader.innerText = 'Lives Left'

    gMarked = gLevel.mines

    var elMinesCount = document.querySelector('.mine-count')
    elMinesCount.innerText = gMarked

}


function isFirstClick() {
    if (gGame.shownCount === 0) {
        return true
    }
    return false
}

