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

// function renderBoard(board) {
//     var colspanSizeSides = 1
//     var colspanSizeCenter = 2
//     if (gLevel.size === 8) {
//         colspanSizeSides = 2
//         colspanSizeCenter = 4
//     } else if (gLevel.size === 12) {
//         colspanSizeSides = 3
//         colspanSizeCenter = 6
//     }

//     var strHTML = `<table border="1" oncontextmenu="return false;"><thead><tr><th class="mine-count" colspan="${colspanSizeSides}">${gMarked}</th><th class="smiley" colspan="${colspanSizeCenter}" onclick="restartGame()">${SMILEY_ISON}</th><th class="timer" colspan="${colspanSizeSides}">${gTimer}</th></tr></thead><tbody>` //cellpadding="10"
//     // var strHTML = `<table border="1" oncontextmenu="return false;"><thead><tr colspan="4"><th class="mine-count">${gLevel.mines}</th><th class="smiley">${SMILEY_ISON}</th><th class="timer">0</th></tr></thead><tbody>` //cellpadding="10"
//     for (var i = 0; i < board.length; i++) {
//         strHTML += '<tr>'
//         for (var j = 0; j < board[0].length; j++) {

//             const cell = board[i][j]
//             var className = `cell cell-${i}-${j}`

//             if (cell.isMine) className += ' mine'

//             strHTML += `<td class="${className}" onclick="onCellClicked(this, ${i}, ${j})" onmousedown="onCellMarked(event,this, ${i}, ${j})">`
//             // strHTML += `<button class="cell-button">`;
//             if (cell.isMine) {
//                 strHTML += `<img src=""><span class="cell-invisible">${MINE_IMG}</span>`
//             } else {
//                 strHTML += `<img src=""><span class="cell-invisible">${cell.minesAroundCount}</span>`
//             }
//             // strHTML += '</button>';
//             strHTML += '</td>'
//         }
//         strHTML += '</tr>'
//     }
//     strHTML += '</tbody></table>'

//     const elBoardContainer = document.querySelector('.board-container')
//     elBoardContainer.innerHTML = strHTML

// }



function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}



// 'use strict'

// const SMILEY_ISON = '😀'
// const SMILEY_ISON_FALSE = '😢'
// const SMILEY_ISON_WINNER = '😎'

// const MINE_IMG = '<img src="img/mine.png">'
// const FLAG_IMG = '<img src="img/flag.png">'

// // Model:
// var gLevel = { size: 4, mines: 2 }
// var gBoard
// var gGame = { isOn: true, shownCount: 0, markedCount: 0, secsPassed: 0, isMine: false }
// var gAllMineIdx = []
// var gMarked = gLevel.mines
// var gTimer = 0
// var gIsFirstClick = false
// // var gFirstIdx = { i: 0, j: 0 }
// var gFirstIdx = {}
// console.log('gIsFirstClickqqqqqqqqqqqqqqqqq1111111111:', gIsFirstClick)

// console.log('gLevel:', gLevel)
// console.log('gGame:', gGame)
// console.log('gAllMineIdx:', gAllMineIdx)
// // console.log('gAllMineIdx j:', gAllMineIdx[1].j)


// function onInit() {

//     gBoard = buildBoard()
//     renderBoard(gBoard)


//     console.log('gBoard:', gBoard)
//     console.log('gLevel:', gLevel)
//     console.log('gGame:', gGame)
//     console.log('gAllMineIdx:', gAllMineIdx)

//     gGame.isOn = true

//     gGame.isMine = false
//     gGame.shownCount = 0

//     pauseAndResetTimer()
//     // gAllMineIdx.splice(0, 32)
//     // onInit()
// }

// function buildBoard() {

//     const board = createMat(gLevel.size)

//     for (var i = 0; i < gLevel.mines; i++) {
//         var mineIndex = mineIdx()
//         console.log('mineIndex:', mineIndex)
//         board[mineIndex[0]][mineIndex[1]] = { minesAroundCount: 0, isShown: false, isMine: true, isMarked: false }
//         // console.log(`minesAroundCount: setMinesNegsCount(board, [mineIndex[0]], [mineIndex[1]])1111:`, setMinesNegsCount(board, [mineIndex[0]], [mineIndex[1]]))

//     }

//     for (var i = 0; i < board.length; i++) {
//         for (var j = 0; j < board[i].length; j++) {
//             if (!board[i][j]) board[i][j] = { minesAroundCount: setMinesNegsCount(board, i, j), isShown: false, isMine: false, isMarked: false }
//             // console.log(`minesAroundCount: setMinesNegsCount(board, ${i}, ${j}):`, setMinesNegsCount(board, i, j))

//         }
//     }
//     return board
// }


// function setMinesNegsCount(board, rowIdx, colIdx) {
//     var count = 0
//     for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
//         if (i < 0 || i > board.length - 1) continue
//         for (var j = colIdx - 1; j <= colIdx + 1; j++) {
//             if (j < 0 || j > board[0].length - 1) continue
//             if (i === rowIdx && j === colIdx) continue
//             // var cell = board[i][j]
//             if (board[i][j].isMine) count++
//         }

//     }
//     return count
// }


// function mineIdx() {
//     // TODO: FIX THE SAME IDX OF MINES
//     var mineIdx = []
//     var rowIdx = getRandomIntInclusive(0, gLevel.size - 1)
//     var colIdx = getRandomIntInclusive(0, gLevel.size - 1)

//     mineIdx.push(rowIdx, colIdx)
//     gAllMineIdx.push({ rowIdx, colIdx })

//     return mineIdx
// }


// function renderBoard(board) {
//     var colspanSizeSides = 1
//     var colspanSizeCenter = 2
//     if (gLevel.size === 8) {
//         colspanSizeSides = 2
//         colspanSizeCenter = 4
//     } else if (gLevel.size === 12) {
//         colspanSizeSides = 3
//         colspanSizeCenter = 6
//     }



//     var strHTML = `<table oncontextmenu="return false;"><thead><tr><th class="mine-count" colspan="${colspanSizeSides}">${gMarked}</th><th class="smiley" colspan="${colspanSizeCenter}" onclick="restartGame()">${SMILEY_ISON}</th><th class="timer" colspan="${colspanSizeSides}">${gTimer}</th></tr></thead><tbody>` //cellpadding="10"
//     // var strHTML = `<table border="1" oncontextmenu="return false;"><thead><tr colspan="4"><th class="mine-count">${gLevel.mines}</th><th class="smiley">${SMILEY_ISON}</th><th class="timer">0</th></tr></thead><tbody>` //cellpadding="10"
//     for (var i = 0; i < board.length; i++) {
//         strHTML += '<tr>'
//         for (var j = 0; j < board[0].length; j++) {



//             const cell = board[i][j]
//             var className = `cell cell-${i}-${j}`

//             if (cell.isMine) className += ' mine'

//             strHTML += `<td class="${className}" onclick="onCellClicked(this, ${i}, ${j})" onmousedown="onCellMarked(event,this, ${i}, ${j})">`
//             // strHTML += `<button class="cell-button">`;
//             if (!cell.isMine) {

//                 strHTML += `<img src=""><span class="cell-invisible">${cell.minesAroundCount}</span>`

//             } else {
//                 strHTML += `<img src=""><span class="cell-invisible">${MINE_IMG}</span>`
//                 // strHTML += `<span class="cell-invisible"></span>`

//             }
//             // strHTML += '</button>';
//             strHTML += '</td>'




//         }
//         strHTML += '</tr>'
//     }
//     strHTML += '</tbody></table>'

//     const elBoardContainer = document.querySelector('.board-container')
//     elBoardContainer.innerHTML = strHTML

//     if (gIsFirstClick) {
//         const elCell = document.querySelector(`.cell-${gFirstIdx.i}-${gFirstIdx.j}`)
//         elCell.classList.add('cell-no-shadow')
//     }

// }




// function onCellClicked(elCell, i, j) {
//     if (!gGame.isOn) return
//     if (gBoard[i][j].isMarked) return

//     // elCell.classList.add('cell-no-shadow')

//     if (isFirstClick(i, j)) {
//         gIsFirstClick = true
//         gFirstIdx.i = i
//         gFirstIdx.j = j

//         gAllMineIdx.splice(0, 32)
//         onInit()

//         elCell.classList.add('cell-no-shadow')

//         //Model
//         gBoard[i][j].isShown = true
//         gGame.shownCount++
//         gBoard[i][j].isMine = false

//         // DOM
//         const elSpanOpacity = document.querySelector(`.cell-${i}-${j} span`)
//         console.log('elSpanOpacity:', elSpanOpacity)
//         elSpanOpacity.classList.remove('cell-invisible')
//         console.log('elSpanOpacity2:', elSpanOpacity)
//         console.log('elCell:', elCell)
//         // if (gBoard[i][j].minesAroundCount === 0) elSpanOpacity.style.opacity = '0';
//         console.log('gBoard:', gBoard)
//         console.log('gFirstIdx2:', gFirstIdx)

        
//     } else {
//         gIsFirstClick = false
//         elCell.classList.add('cell-no-shadow')

//         //Model
//         gBoard[i][j].isShown = true
//         gGame.shownCount++
//         // gBoard[i][j].isMine = true

//         // DOM
//         const elSpanOpacity = document.querySelector(`.cell-${i}-${j} span`)
//         console.log('elSpanOpacity:', elSpanOpacity)
//         elSpanOpacity.classList.remove('cell-invisible')
//         // if (gBoard[i][j].minesAroundCount === 0) elSpanOpacity.style.opacity = '0';
//         console.log('elCell:', elCell)
//         console.log('gBoard:', gBoard)

//     }



//     if (gBoard[i][j].isMine) {
//         // gGame.shownCount++
//         gGame.isMine = true
//         for (var k = 0; k < gAllMineIdx.length; k++) {
//             //Model
//             gBoard[gAllMineIdx[k].rowIdx][gAllMineIdx[k].colIdx].isShown = true

//             // DOM
//             const elSpanOpacity = document.querySelector(`.cell-${gAllMineIdx[k].rowIdx}-${gAllMineIdx[k].colIdx} span`)
//             elSpanOpacity.classList.remove('cell-invisible')
//             elCell.style.backgroundColor = 'red';

//             const elCellShadow = document.querySelector(`.cell-${gAllMineIdx[k].rowIdx}-${gAllMineIdx[k].colIdx}`)
//             elCellShadow.classList.add('cell-no-shadow')

//         }
//     }


//     // elCell.classList.add('cell-no-shadow')

//     // //Model
//     // gBoard[i][j].isShown = true
//     // gGame.shownCount++

//     // // DOM
//     // const elSpanOpacity = document.querySelector(`.cell-${i}-${j} span`)
//     // elSpanOpacity.classList.remove('cell-invisible')
//     // // if (+elSpanOpacity.innerText === 0) elSpanOpacity.style.opacity = '0';
//     // // console.log('+gBoard.minesAroundCount === 0:', gBoard[i][j].minesAroundCount === 0)
//     // if (gBoard[i][j].minesAroundCount === 0) elSpanOpacity.style.opacity = '0';

//     // console.log('elCell:', elCell)

//     checkGameOver()
//     if (gGame.shownCount === 1) timer()

    

// }


// function gameLevel(elBtn) {
//     const beginner = elBtn.getAttribute('data-4')
//     const medium = elBtn.getAttribute('data-8')
//     const expert = elBtn.getAttribute('data-12')

//     if (+beginner === 4) {
//         gLevel.size = +beginner
//         gLevel.mines = 2
//         gMarked = 2
//     } else if (+medium === 8) {
//         gLevel.size = +medium
//         gLevel.mines = 14
//         gMarked = 14
//     } else if (+expert === 12) {
//         gLevel.size = +expert
//         gLevel.mines = 32
//         gMarked = 32

//     }

//     restartGame()
//     gGame.isOn = true

// }



// function onCellMarked(event, elBtn, i, j) {
//     if (!gGame.isOn) return
//     if (!gBoard[i][j].isMarked && !gBoard[i][j].isShown) {
//         if (event.button === 2) {
//             //Model
//             gBoard[i][j].isMarked = true
//             gGame.markedCount++
//             gMarked--

//             //DOM
//             const elImg = document.querySelector(`.cell-${i}-${j} img`)
//             elImg.src = 'img/flag.png'

//             const elSpanOpacity = document.querySelector(`.cell-${i}-${j} span`)
//             elSpanOpacity.style.display = 'none'

//             const elMineCount = document.querySelector('.mine-count')
//             elMineCount.innerText = gMarked
//         }

//     } else {
//         if (event.button === 2) {
//             //Model 
//             gBoard[i][j].isMarked = false
//             gGame.markedCount--

//             if (!gBoard[i][j].isShown) {
//                 //Model 
//                 gMarked++

//                 //DOM
//                 const elMineCount = document.querySelector('.mine-count')
//                 elMineCount.innerText = gMarked
//             }

//             //DOM
//             const elImg = document.querySelector(`.cell-${i}-${j} img`)
//             elImg.src = ''

//             const elSpanOpacity = document.querySelector(`.cell-${i}-${j} span`)
//             elSpanOpacity.style.display = ''

//         }
//     }

    
// }


// function checkGameOver() {
//     var elSmiley = document.querySelector('.smiley')

//     if (gGame.shownCount === (gLevel.size ** 2 - 2)) {
//         gGame.isOn = false
//         clearInterval(gTimer)
//         elSmiley.innerText = SMILEY_ISON_WINNER
//     } else if (gGame.isMine) {
//         gGame.isOn = false
//         clearInterval(gTimer)
//         elSmiley.innerText = SMILEY_ISON_FALSE
//     }
// }


// function timer() {
//     var elTimer = document.querySelector('.timer')
//     var sec = 0

//     gTimer = setInterval(() => {
//         elTimer.innerHTML = sec
//         sec++
//         gGame.secsPassed++

//     }, 1000)
// }


// function pauseAndResetTimer() {
//     clearInterval(gTimer)
//     var elTimer = document.querySelector('.timer')
//     elTimer.innerHTML = '0'
//     gGame.secsPassed = 0
// }



// function restartGame() {

    
//     gAllMineIdx.splice(0, 32)
//     onInit()
    
//     const elCell = document.querySelector(`.cell-${gFirstIdx.i}-${gFirstIdx.j}`)
    
//     if (!elCell) return
        
//     elCell.classList.remove('cell-no-shadow')

//     gFirstIdx = {}
// }


// function isFirstClick(i, j) {
//     if (gGame.shownCount === 0 && gBoard[i][j].isMine) {
//         return true
//     }
//     return false
// }

