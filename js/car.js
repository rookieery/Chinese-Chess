import role from './role.js';
export default class Car {
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
        if (rowLeft >= 0 && board[rowLeft][colIndex].type !== this.type) {
            positions.push([rowLeft, colIndex]);
        }
        if (rowRight < board.length && board[rowRight][colIndex].type !== this.type) {
            positions.push([rowRight, colIndex]);
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
        if (colLeft >= 0 && board[rowIndex][colLeft].type !== this.type) {
            positions.push([rowIndex, colLeft]);
        }
        if (colRight < board[rowIndex].length && board[rowIndex][colRight].type !== this.type) {
            positions.push([rowIndex, colRight]);
        }
    }

    killRule(position, board) {
        const positions = [];
        const rowIndex = position[0];
        const colIndex = position[1];
        for (let i = 0; i < board.length; i++) {
            positions.push([i, colIndex]);
        }
        for (let j = 0; j < board[0].length; j++) {
            positions.push([rowIndex, j]);
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