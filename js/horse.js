import role from './role.js';
export default class Horse {
    constructor(text, type) {
        this.text = text;
        this.type = type; // red ，black
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
            positions.push([rowIndex, colIndex]);
        }
    }

    getDisturb(position, board) {
        const positions = [];
        const rowIndex = position[0];
        const colIndex = position[1];
        const stumblePositions = [
            [rowIndex - 1, colIndex], [rowIndex - 1, colIndex], [rowIndex, colIndex - 1], [rowIndex, colIndex + 1],
            [rowIndex + 1, colIndex], [rowIndex + 1, colIndex], [rowIndex, colIndex - 1], [rowIndex, colIndex + 1],
        ];
        for (let i = 0; i < stumblePositions.length; i++) {
            const stumblePosition = stumblePositions[i];
            if (stumblePosition[0] < 0 || stumblePosition[0] >= board.length || stumblePosition[1] < 0 || stumblePosition[1] >= board[0].length) {
                continue;
            }
            positions.push([stumblePosition[0], stumblePosition[1]]);
        }
        return positions;
    }

    rule(position, board) {
        const positions = [];
        const rowIndex = position[0];
        const colIndex = position[1];
        const targetPositions = [
            [rowIndex - 2, colIndex - 1], [rowIndex - 2, colIndex + 1], [rowIndex - 1, colIndex - 2], [rowIndex - 1, colIndex + 2],
            [rowIndex + 2, colIndex - 1], [rowIndex + 2, colIndex + 1], [rowIndex + 1, colIndex - 2], [rowIndex + 1, colIndex + 2],
        ];
        const stumblePositions = [
            [rowIndex - 1, colIndex], [rowIndex - 1, colIndex], [rowIndex, colIndex - 1], [rowIndex, colIndex + 1],
            [rowIndex + 1, colIndex], [rowIndex + 1, colIndex], [rowIndex, colIndex - 1], [rowIndex, colIndex + 1],
        ];
        // 四个点 逐一排除
        this.findPositions(targetPositions, stumblePositions, positions, board);
        return positions;
    }
}