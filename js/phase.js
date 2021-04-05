import role from './role.js';
import settings from './settings.js';
export default class Phase {
    constructor(text, type) {
        this.text = text;
        this.type = type;
    }

    findPositions(targetPositions, stumblePositions, positions, board) {
        for (let i = 0; i < targetPositions.length; i++) {
            const targetPosition = targetPositions[i];
            const rowIndex = targetPosition[0];
            const colIndex = targetPosition[1];
            if (rowIndex < 0 || rowIndex >= board.length || colIndex < 0 || colIndex >= board[0].length) {
                continue;
            }
            if (board[rowIndex][colIndex].type === this.type) {
                continue;
            }
            if (board[stumblePositions[i][0]][stumblePositions[i][1]] !== role.empty) {
                continue;
            }
            // 判断过河
            if (settings.isReverse) {
                if (this.type === role.red && rowIndex > 4) {
                    continue;
                }
                if (this.type === role.black && rowIndex < 5) {
                    continue;
                }
            } else {
                if (this.type === role.black && rowIndex > 4) {
                    continue;
                }
                if (this.type === role.red && rowIndex < 5) {
                    continue;
                }
            }
            positions.push([rowIndex, colIndex]);
        }
    }

    rule(position, board) {
        const positions = [];
        const rowIndex = position[0];
        const colIndex = position[1];
        const targetPositions = [
            [rowIndex - 2, colIndex - 2], [rowIndex - 2, colIndex + 2],
            [rowIndex + 2, colIndex - 2], [rowIndex + 2, colIndex + 2]
        ];
        const stumblePositions = [
            [rowIndex - 1, colIndex - 1], [rowIndex - 1, colIndex + 1],
            [rowIndex + 1, colIndex - 1], [rowIndex + 1, colIndex + 1]
        ];
        // 四个点 逐一排除
        this.findPositions(targetPositions, stumblePositions, positions, board);
        return positions;
    }
}