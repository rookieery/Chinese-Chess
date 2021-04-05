import role from './role.js';
import settings from './settings.js';
export default class Soldier {
    constructor(text, type) {
        this.text = text; // 兵，卒
        this.type = type; // red ，black
    }

    findTopPositions(rowIndex, colIndex, positions, board) {
        if (rowIndex <= 4 && board[rowIndex + 1][colIndex].type !== this.type) {
            positions.push([rowIndex + 1, colIndex]);
        } else if (rowIndex > 4) {
            if (colIndex !== 0 && board[rowIndex, colIndex - 1].type !== this.type) {
                positions.push([rowIndex, colIndex - 1]);
            }
            if (colIndex !== board[0].length - 1 && board[rowIndex, colIndex + 1].type !== this.type) {
                positions.push([rowIndex, colIndex + 1]);
            }
            if (rowIndex !== board.length - 1 && board[rowIndex + 1][colIndex].type !== this.type) {
                positions.push([rowIndex + 1, colIndex]);
            }
        }
    }

    findBottomPositions(rowIndex, colIndex, positions, board) {
        if (rowIndex >= 5 && board[rowIndex - 1][colIndex].type !== this.type) {
            positions.push([rowIndex - 1, colIndex]);
        } else {
            if (colIndex !== 0 && board[rowIndex + 1][colIndex].type !== this.type) {
                positions.push([rowIndex, colIndex - 1]);
            }
            if (colIndex !== board[0].length - 1 && board[rowIndex, colIndex + 1].type !== this.type) {
                positions.push([rowIndex, colIndex + 1]);
            }
            if (rowIndex !== 0 && board[rowIndex - 1][colIndex].type !== this.type) {
                positions.push([rowIndex - 1, colIndex]);
            }
        }
    }

    findPositions(rowIndex, colIndex, positions, board) {
        if (settings.isReverse) {
            this.type === role.black
                ? this.findBottomPositions(rowIndex, colIndex, positions, board)
                : this.findTopPositions(rowIndex, colIndex, positions, board);
        } else {
            this.type === role.black
                ? this.findTopPositions(rowIndex, colIndex, positions, board)
                : this.findBottomPositions(rowIndex, colIndex, positions, board);
        }
    }

    rule(position, board) {
        const positions = [];
        const rowIndex = position[0];
        const colIndex = position[1];
        this.findPositions(rowIndex, colIndex, positions, board);
        return positions;
    }
}