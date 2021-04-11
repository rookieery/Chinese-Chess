import role from './role.js';
export default class Gun {
    constructor(text, type) {
        this.text = text;
        this.type = type; // red ，black
    }

    findRowPositions(rowIndex, colIndex, positions, board) {
        let rowLeft = rowIndex - 1;
        let rowRight = rowIndex + 1;
        // 移动
        while (rowLeft >= 0 && board[rowLeft][colIndex] === role.empty) {
            positions.push([rowLeft, colIndex]);
            rowLeft--;
        }
        while (rowRight < board.length && board[rowRight][colIndex] === role.empty) {
            positions.push([rowRight, colIndex]);
            rowRight++;
        }
        // 吃棋
        if (rowLeft >= 0 && board[rowLeft][colIndex] !== role.empty) {
            rowLeft--;
            while (rowLeft >= 0 && board[rowLeft][colIndex] === role.empty) {
                rowLeft--;
            }
            if (rowLeft >= 0 && board[rowLeft][colIndex].type !== this.type) {
                positions.push([rowLeft, colIndex])
            }
        }
        if (rowRight < board.length && board[rowRight][colIndex] !== role.empty) {
            rowRight++;
            while (rowRight < board.length && board[rowRight][colIndex] === role.empty) {
                rowRight++;
            }
            if (rowRight < board.length && board[rowRight][colIndex].type !== this.type) {
                positions.push([rowRight, colIndex])
            }
        }
    }

    findColPositions(rowIndex, colIndex, positions, board) {
        let colLeft = colIndex - 1;
        let colRight = colIndex + 1;
        // 移动
        while (colLeft >= 0 && board[rowIndex][colLeft] === role.empty) {
            positions.push([rowIndex, colLeft]);
            colLeft--;
        }
        while (colRight < board[rowIndex].length && board[rowIndex][colRight] === role.empty) {
            positions.push([rowIndex, colRight]);
            colRight++;
        }
        // 吃棋
        if (colLeft >= 0 && board[rowIndex][colLeft] !== role.empty) {
            colLeft--;
            while (colLeft >= 0 && board[rowIndex][colLeft] === role.empty) {
                colLeft--;
            }
            if (colLeft >= 0 && board[rowIndex][colLeft].type !== this.type) {
                positions.push([rowIndex, colLeft])
            }
        }
        if (colRight < board[rowIndex].length && board[rowIndex][colRight] !== role.empty) {
            colRight++;
            while (colRight < board[rowIndex].length && board[rowIndex][colRight] === role.empty) {
                colRight++;
            }
            if (colRight < board[rowIndex].length && board[rowIndex][colRight].type !== this.type) {
                positions.push([rowIndex, colRight])
            }
        }
    }

    killRule(position, board) {
        const positions = [];
        const rowIndex = position[0];
        const colIndex = position[1];
        let rowLeft = rowIndex - 1;
        let rowRight = rowIndex + 1;
        // 移动
        while (rowLeft >= 0 && board[rowLeft][colIndex] === role.empty) {
            rowLeft--;
        }
        rowLeft--;
        while (rowRight < board.length && board[rowRight][colIndex] === role.empty) {
            rowRight++;
        }
        rowRight++;
        while (rowLeft >= 0) {
            positions.push([rowLeft, colIndex]);
            rowLeft--;
        }
        while (rowRight < board.length) {
            positions.push([rowRight, colIndex]);
            rowRight++;
        }
        let colLeft = colIndex - 1;
        let colRight = colIndex + 1;
        // 移动
        while (colLeft >= 0 && board[rowIndex][colLeft] === role.empty) {
            colLeft--;
        }
        colLeft--;
        while (colRight < board[rowIndex].length && board[rowIndex][colRight] === role.empty) {
            colRight++;
        }
        colRight++;
        while (colLeft >= 0) {
            positions.push([rowIndex, colLeft]);
            colLeft--;
        }
        while (colRight < board[0].length) {
            positions.push([rowIndex, colRight]);
            colRight++;
        }
        return positions;
    }

    getDisturb(position, targetPosition, board) {
        const positions = [];
        let rowIndex = position[0];
        let colIndex = position[1];
        if (position[1] === targetPosition[1]) {
            if (position[0] > targetPosition[0]) {
                rowIndex--;
                while (board[rowIndex][colIndex] === role.empty) {
                    rowIndex--;
                }
            } else {
                rowIndex++;
                while (board[rowIndex][colIndex] === role.empty) {
                    rowIndex++;
                }
            }
        } else {
            if (position[1] > targetPosition[1]) {
                colIndex--;
                while (board[rowIndex][colIndex] === role.empty) {
                    colIndex--;
                }
            } else {
                colIndex++;
                while (board[rowIndex][colIndex] === role.empty) {
                    colIndex++;
                }
            }
        }
        if (rowIndex === position[0]) {
            if (colIndex < position[1]) {
                for (let j = colIndex + 1; j < position[1]; j++) {
                    positions.push([rowIndex, j]);
                }
            } else {
                for (let j = position[1] + 1; j < colIndex; j++) {
                    positions.push([rowIndex, j]);
                }
            }
        } else {
            if (rowIndex < position[0]) {
                for (let i = rowIndex + 1; i < position[0]; i++) {
                    positions.push([i, colIndex]);
                }
            } else {
                for (let i = position[0] + 1; i < rowIndex; i++) {
                    positions.push([i, colIndex]);
                }
            }
        }
        if (board[rowIndex][colIndex].type === board[position[0]][position[1]].type &&
            board[rowIndex][colIndex].text === board[position[0]][position[1]].text) {

        } else {
            if (rowIndex === targetPosition[0]) {
                if (colIndex < targetPosition[1]) {
                    for (let j = colIndex + 1; j < targetPosition[1]; j++) {
                        positions.push([rowIndex, j]);
                    }
                } else {
                    for (let j = targetPosition[1] + 1; j < colIndex; j++) {
                        positions.push([rowIndex, j]);
                    }
                }
            } else {
                if (rowIndex < targetPosition[0]) {
                    for (let i = rowIndex + 1; i < targetPosition[0]; i++) {
                        positions.push([i, colIndex]);
                    }
                } else {
                    for (let i = targetPosition[0] + 1; i < rowIndex; i++) {
                        positions.push([i, colIndex]);
                    }
                }
            }
        }
        return positions;
    }

    rule(position, board) {
        const positions = [];
        const rowIndex = position[0];
        const colIndex = position[1];
        this.findRowPositions(rowIndex, colIndex, positions, board);
        this.findColPositions(rowIndex, colIndex, positions, board);
        return positions;
    }
}