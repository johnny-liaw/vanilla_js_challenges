document.addEventListener('DOMContentLoaded', () => {
    const width = 10
    const height = 10
    const board = createBoard()
    const cells = []
    const directionEnum = {
        1: 'left',
        2: 'right',
        3: 'up',
        4: 'down',
    }
    function createBoard() {
        const board = document.createElement('div')
        board.classList.add('board')
        document.getElementById('main').appendChild(board)
        return board
    }
    function createCells() {
        for (let j = 0; j < height; j++) {
            const row = []
            for (let i = 0; i < width; i++) {
                const cell = document.createElement('div')
                cell.classList.add('cell')
                cell.i = i
                cell.j = j
                row.push(cell)
                board.appendChild(cell)
            }
            cells.push(row)
        }
    }
    function getVisitOptions(i, j) {
        const options = {
            left: false,
            up: false,
            right: false,
            down: false,
        }
        if (i % 10 !== 0 && !cells[j][i - 1].classList.contains('visited')) options.left = true
        if (i % 10 !== 9 && !cells[j][i + 1].classList.contains('visited')) options.right = true
        if (j > 0 && !cells[j - 1][i].classList.contains('visited')) options.up = true
        if (j < 9 && !cells[j + 1][i].classList.contains('visited')) options.down = true
        return options
    }
    function selectRandomDirection(i, j) {
        const options = getVisitOptions(i, j)
        const noOptions = Object.values(options).every(value => !value)
        if (noOptions) return null
        const randomNum = Math.floor(Math.random() * 3.99 + 1)
        const randomDir = directionEnum[randomNum]
        if (options[randomDir]) return randomDir
        else return selectRandomDirection(i, j)
    }
    function removeWall(i, j, dir) {
        if(!cells[j][i]) return null
        else {
            if(dir === 'left') cells[j][i].style.borderLeft = 'none'
            if(dir === 'right') cells[j][i].style.borderRight = 'none'
            if(dir === 'up') cells[j][i].style.borderTop = 'none'
            if(dir === 'down') cells[j][i].style.borderBottom = 'none'
        }
    }
    function getOppositeDir(dir) {
        if(dir === 'left') return 'right'
        if(dir === 'right') return 'left'
        if(dir === 'down') return 'up'
        if(dir === 'up') return 'down'
    }
    function generateMaze(i=0, j=0, prevDir=null) {
        cells[j][i].classList.add('visited')
        let direction = selectRandomDirection(i, j)
        if(prevDir) removeWall(i, j, prevDir)
        while(direction !== null) {
            direction = selectRandomDirection(i, j)
            removeWall(i, j, direction)
            if (direction === 'down') j += 1
            if (direction === 'up') j -= 1
            if (direction === 'right') i += 1
            if (direction === 'left') i -= 1
            generateMaze(i, j, getOppositeDir(direction))
        }
        return
    }
    createCells()
    generateMaze()
})