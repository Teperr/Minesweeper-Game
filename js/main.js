'use strict'

const SMILEY_ISON = '😀'
const SMILEY_ISON_FALSE = '😢'
const SMILEY_ISON_WINNER = '😎'

const MINE_IMG = '<img class="mine-img" src="img/mine.png">'
const FLAG_IMG = '<img src="img/flag.png">'

// Model:
var gLevel = { size: 4, mines: 2 }
var gBoard
var gGame = { isOn: true, shownCount: 0, markedCount: 0, secsPassed: 0, isUserLose: false , LivesLeftCount: 0 }

var gAllMineIdx = []
var gPreviousMineIdx = []

var gMarked = gLevel.mines
var gTimer = 0
var gIsFirstClick = false
var gFirstIdx = {}




function onInit() {

    gBoard = buildBoard()
    renderBoard(gBoard)


    // console.log('gAllMineIdx:[0]', gAllMineIdx[0])
    // console.log('gAllMineIdx[0].rowIdx', gAllMineIdx[0].rowIdx)
    // console.log('gAllMineIdx[0].colIdx', gAllMineIdx[0].colIdx)
    // console.log('------------------------------------------------');
    // console.log('gAllMineIdx:[1]', gAllMineIdx[1])
    // console.log('gAllMineIdx[1].rowIdx', gAllMineIdx[1].rowIdx)
    // console.log('gAllMineIdx[1].colIdx', gAllMineIdx[1].colIdx)
    // isDuplicate(gAllMineIdx)
    // console.log('gAllMineIdx:', gAllMineIdx)
    // removeDuplicate()



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
    gGame.LivesLeftCount = 0
    pauseAndResetTimer()

}

function buildBoard() {

    const board = createMat(gLevel.size)

    for (var i = 0; i < gLevel.mines; i++) {
        var mineIndex = mineIdx()
        // removeDuplicate(gAllMineIdx)
        // console.log('gAllMineIdx:', gAllMineIdx)
        // console.log('mineIndex:', mineIndex)

        board[mineIndex[0]][mineIndex[1]] = { minesAroundCount: null, isShown: false, isMine: true, isMarked: false }
    }

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (!board[i][j]) board[i][j] = { minesAroundCount: setMinesNegsCount(board, i, j), isShown: false, isMine: false, isMarked: false }
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

    var rowIdx = getRandomIntInclusive(0, gLevel.size - 1)
    var colIdx = getRandomIntInclusive(0, gLevel.size - 1)
    mineIdx.push(rowIdx, colIdx)
    gAllMineIdx.push({ rowIdx, colIdx })


    return mineIdx
}


/////// TO SLOW - NEED OTHER FUNCTION /////////
// removeDuplicate(gAllMineIdx)
// function removeDuplicate() {
//     var duplicateNums = []
//     var restartMineIdx = false
//     console.log('restartMineIdx1:', restartMineIdx)


//     var firstRowIdx = gFirstIdx.i
//     var firstColIdx = gFirstIdx.j
//     console.log('firstRowIdx , firstColIdx:', firstRowIdx, firstColIdx)

//     console.log('gFirstIdx:', gFirstIdx)


//     for (var i = 0; i < gAllMineIdx.length; i++) {
//         var rowIdx = gAllMineIdx[i].rowIdx
//         var colIdx = gAllMineIdx[i].colIdx
//         // console.log('*****************************************************************************************');
//         console.log(`rowIdx${i},colIdx${i}:`, rowIdx, colIdx)



//         for (var j = 0; j < gAllMineIdx.length; j++) {
//             var allRowIdx = gAllMineIdx[j].rowIdx
//             var allColIdx = gAllMineIdx[j].colIdx




//             if (i === j) continue

//             // if (duplicateNums.includes(j) || duplicateNums.includes(i)) continue

//             console.log(`allRowIdx${j},allColIdx${j}:`, allRowIdx, allColIdx)

//             if ((rowIdx === allRowIdx && colIdx === allColIdx) || (firstRowIdx === allRowIdx && firstColIdx === allColIdx)) {
//                 console.log('true---------true----------true--------true:', true)

//                 // duplicateNums.push(j)

//                 // console.log('nums:', duplicateNums)
//                 restartMineIdx = true
//                 console.log('restartMineIdx   2   true:', restartMineIdx)


//                 // console.log('nums:', duplicateNums)



//             }
//             // else {
//             //     // console.log('false---------false----------false--------false:', false)
//             //     // return false
//             // }

//         }

//         // console.log('*****************************************************************************************');
//     }

//     while (restartMineIdx) {
//         restartGame()
//         restartMineIdx = false
//     }



//     console.log('nums:', duplicateNums)
//     restartMineIdx = false
//     console.log('restartMineIdx   3   false:', restartMineIdx)

// }
/////// TO SLOW - NEED OTHER FUNCTION /////////



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

            strHTML += `<td class="${className}" onclick="onCellClicked(this, ${i}, ${j})" onmousedown="onCellMarked(event,this, ${i}, ${j})">`
            // strHTML += `<button class="cell-button">`;
            if (!cell.isMine) {
                strHTML += `<img src=""><span class="cell-invisible">${cell.minesAroundCount}</span>`

            } else {
                strHTML += `<img class="flag-img" src=""><span class="cell-invisible" >${MINE_IMG}</span>`

            }
            // strHTML += '</button>';
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

    if (isFirstClick(i, j)) {
        gIsFirstClick = true
        gFirstIdx.i = i
        gFirstIdx.j = j

        gAllMineIdx.splice(0, 32)
        onInit()

        //Model
        gBoard[i][j].isShown = true
        gGame.shownCount++


    } else {
        gIsFirstClick = false

        //Model
        gBoard[i][j].isShown = true
        gGame.shownCount++

    }

    if (gBoard[i][j].isMine) {
        // gGame.shownCount++
        gGame.isUserLose = true

        // console.log('livesCount iffffxxxxxxxxxxxxx:', livesCount)
        console.log(' gGame.isUserLose222xxxxxxxxxxx:', gGame.isUserLose)

        

        // if (isLivesLeft()) return
        

        // console.log('livesCount iffffxxxxxxxxxxxxxyyyyyyyyyyyy:', livesCount)
        console.log(' gGame.isUserLose222xxxxxxxxxxxyyyyyyyyyyy:', gGame.isUserLose)

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
    if (gGame.shownCount === 1) timer()

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


function onCellMarked(event, elBtn, i, j) {
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
    var elSmiley = document.querySelector('.smiley')

    if (gGame.shownCount === (gLevel.size ** 2 - gLevel.mines)) {
        gGame.isOn = false
        clearInterval(gTimer)
        elSmiley.innerText = SMILEY_ISON_WINNER

        var elMinesClass = document.querySelectorAll('.flag-img')
        var elMinesImgPrevious = document.querySelectorAll('.mine-img')

        console.log('elMinesClass:', elMinesClass)
        for (var i = 0; i < elMinesClass.length; i++) {
            // elMinesImgPrevious[i].classList.add('cell-invisible')
            // elMinesImgPrevious[i].classList.remove('mine-img')

            elMinesClass[i].src = 'img/flag.png'
            elMinesImgPrevious[i].src = ''

        }

    } else if (gGame.isUserLose) {
        gGame.isOn = false
        clearInterval(gTimer)
        elSmiley.innerText = SMILEY_ISON_FALSE
    }
}


function expandShown(board, elCell, i, j) {
    console.log('board:', board)
    console.log('elCell:', elCell)
    console.log('gGame.shownCount:', gGame.shownCount)
    console.log('gGame:', gGame)

    var currClickedNegs = setMinesNegsCount(board, i, j)
    console.log('i,j:', i, j, '||||| currNegs:', currClickedNegs)
    if (currClickedNegs >= 1 || gBoard[i][j].isMine) return
    console.log('gBoard[currNegsIdx[i].rowIdx][currNegsIdx[j].colIdx].isMine:', gBoard[i][j].isMine)


    var currNegsIdxArr = getIdxOfNegs(board, i, j)
    console.log('currNegsIdxArr:', currNegsIdxArr)

    for (var k = 0; k < currNegsIdxArr.length; k++) {

        var currNegsIdx = getIdxOfNegs(board, i, j)
        console.log('currNegsIdx:', currNegsIdx[k])

        console.log('gBoard[currNegsIdx[k].rowIdx][currNegsIdx[k].colIdx].isMine:', gBoard[currNegsIdx[k].rowIdx][currNegsIdx[k].colIdx])
        // if (gBoard[currNegsIdx[k].rowIdx][currNegsIdx[k].colIdx].isMine){
        // }

        // if (currClickedNegs <=  1)
        if (currNegsIdx[k].minesAroundCount === null) return
        if (currClickedNegs === 0 || currNegsIdx[k].minesAroundCount === 0 || currNegsIdx[k].minesAroundCount === 1) {
            console.log('omer the king:')
            const elCellShadow = document.querySelector(`.cell-${currNegsIdx[k].rowIdx}-${currNegsIdx[k].colIdx}`)
            elCellShadow.classList.add('cell-no-shadow')

            if (gBoard[currNegsIdx[k].rowIdx][currNegsIdx[k].colIdx].isShown) gGame.shownCount--
            gGame.shownCount++
            gBoard[currNegsIdx[k].rowIdx][currNegsIdx[k].colIdx].isShown = true
        }

        if (k === currNegsIdxArr.length - 1) return




        console.log('gGame.shownCount:', gGame.shownCount)

    }
    expandShown(board, elCell, i, j)
    console.log('%c*************************************************', 'background: red; color: white;');


}


function getIdxOfNegs(board, rowIdx, colIdx) {
    // var minesAroundCount = 0
    var negsIdx = []

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > board.length - 1) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > board[0].length - 1) continue
            if (i === rowIdx && j === colIdx) continue
            var cell = board[i][j].minesAroundCount
            // console.log('cell:', cell)

            // console.log(' rowIdx, colIdx:', i, j)
            // if (board[i][j].isMine) minesAroundCount++
            negsIdx.push({ rowIdx: i, colIdx: j, minesAroundCount: cell })

        }

    }

    return negsIdx


}

// livesLeft()
// function isLivesLeft() {
//     // var livesCount = 1
//     if (gGame.LivesLeftCount > 3) return false
//     console.log(' gGame.isUserLose:', gGame.isUserLose)
//     // console.log('livesCount:', livesCount)


//     if (gGame.isUserLose) {
//         gGame.LivesLeftCount++
//         gGame.isUserLose = false

//         console.log(' gGame.LivesLeftCount:', gGame.LivesLeftCount)

//         var elLivesLeft = document.querySelector(`.lives-left-${gGame.LivesLeftCount}`)
//         elLivesLeft.classList.remove('cell-invisible')
//         return false

//     }

//     // console.log('livesCount iffff:', livesCount)
//     console.log(' gGame.isUserLose222:', gGame.isUserLose)
//     console.log(' gGame.LivesLeftCount:', gGame.LivesLeftCount)


//     return true


// }


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


    gAllMineIdx.splice(0, 32)
    onInit()

    const elCell = document.querySelector(`.cell-${gFirstIdx.i}-${gFirstIdx.j}`)

    if (!elCell) return

    elCell.classList.remove('cell-no-shadow')

    gFirstIdx = {}


}


function isFirstClick(i, j) {
    if (gGame.shownCount === 0 && gBoard[i][j].isMine) {
        return true
    }
    return false
}

