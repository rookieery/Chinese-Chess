import Car from './car.js';
import Horse from './horse.js';
import Gun from './gun.js';
import Soldier from './soldier.js';
import Phase from './phase.js';
import Official from './official.js';
import General from './general.js';
import role from './role.js';
import text from './text.js';
import settings from './settings.js';
export default class Board {
    constructor() {
        this.init();
    }

    init() {
        this.id = 1;
        this.step = 1;
        this.readyPlay = false;
        this.isBackward = true;
        this.idBoard = [];
        this.startPosition = [];
        this.endPosition = [];
        this.positions = [];
        this.downPositions = [];
        this.historyRecord = [];
        this.historyIds = [];
        this.boardDom = document.getElementsByClassName('board-inner')[0];
        this.domChesses = document.getElementsByClassName('chess');
        this.chessUpSound = document.getElementById('chessUp');
        this.chessDownSound = document.getElementById('chessDown');
        this.warnGeneralSound = document.getElementById('warnGeneral');
        this.surrender = document.getElementById('surrender');
        this.backward = document.getElementById('backward');
        this.createChess();
        this.initBoard();
        this.createBoardDom();
        this.initEvents();
    }

    createChess() {
        this.redCar = new Car(text.redCar, role.red);
        this.blackCar = new Car(text.blackCar, role.black);
        this.redHorse = new Horse(text.redHorse, role.red);
        this.blackHorse = new Horse(text.blackHorse, role.black);
        this.redGun = new Gun(text.redGun, role.red);
        this.blackGun = new Gun(text.blackGun, role.black);
        this.redGeneral = new General(text.redGeneral, role.red);
        this.blackGeneral = new General(text.blackGeneral, role.black);
        this.redSoldier = new Soldier(text.redSoldier, role.red);
        this.blackSoldier = new Soldier(text.blackSoldier, role.black);
        this.redPhase = new Phase(text.redPhase, role.red);
        this.blackPhase = new Phase(text.blackPhase, role.black);
        this.redOfficial = new Official(text.redOfficial, role.red);
        this.blackOfficial = new Official(text.blackOfficial, role.black);
        this.empty = role.empty;
    }

    initBoard() {
        this.board = settings.isReverse
            ? [
                [this.redCar, this.redHorse, this.redPhase, this.redOfficial, this.redGeneral, this.redOfficial, this.redPhase, this.redHorse, this.redCar],
                [this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty],
                [this.empty, this.redGun, this.empty, this.empty, this.empty, this.empty, this.empty, this.redGun, this.empty],
                [this.redSoldier, this.empty, this.redSoldier, this.empty, this.redSoldier, this.empty, this.redSoldier, this.empty, this.redSoldier],
                [this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty],
                [this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty],
                [this.blackSoldier, this.empty, this.blackSoldier, this.empty, this.blackSoldier, this.empty, this.blackSoldier, this.empty, this.blackSoldier],
                [this.empty, this.blackGun, this.empty, this.empty, this.empty, this.empty, this.empty, this.blackGun, this.empty],
                [this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty],
                [this.blackCar, this.blackHorse, this.blackPhase, this.blackOfficial, this.blackGeneral, this.blackOfficial, this.blackPhase, this.blackHorse, this.blackCar],
            ]
            : [
                [this.blackCar, this.blackHorse, this.blackPhase, this.blackOfficial, this.blackGeneral, this.blackOfficial, this.blackPhase, this.blackHorse, this.blackCar],
                [this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty],
                [this.empty, this.blackGun, this.empty, this.empty, this.empty, this.empty, this.empty, this.blackGun, this.empty],
                [this.blackSoldier, this.empty, this.blackSoldier, this.empty, this.blackSoldier, this.empty, this.blackSoldier, this.empty, this.blackSoldier],
                [this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty],
                [this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty],
                [this.redSoldier, this.empty, this.redSoldier, this.empty, this.redSoldier, this.empty, this.redSoldier, this.empty, this.redSoldier],
                [this.empty, this.redGun, this.empty, this.empty, this.empty, this.empty, this.empty, this.redGun, this.empty],
                [this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty, this.empty],
                [this.redCar, this.redHorse, this.redPhase, this.redOfficial, this.redGeneral, this.redOfficial, this.redPhase, this.redHorse, this.redCar],
            ];
        this.historyRecord.push(this.deepClone(this.board));
    }


    createBoardDom() {
        for (let i = 0; i < this.board.length; i++) {
            const ids = [];
            for (let j = 0; j < this.board[0].length; j++) {
                const chess = this.board[i][j];
                if (chess === role.empty) {
                    ids.push(0);
                    continue;
                }
                const chessDom = document.createElement('div');
                chessDom.classList.add('chess');
                chessDom.classList.add(chess.type);
                chessDom.innerText = chess.text;
                chessDom.setAttribute('id', this.id);
                chessDom.style.marginTop = `${1 + (11.49 * i)}%`;
                chessDom.style.marginLeft = `${0.5 + (11.56 * j)}%`;
                this.boardDom.appendChild(chessDom);
                ids.push(this.id);
                this.id++;
            }
            this.idBoard.push(ids);
        }
        this.historyIds.push(this.deepClone(this.idBoard));
    }

    initEvents() {
        this.boardDom.addEventListener('click', this.clickHandler);
        this.surrender.addEventListener('click', this.surrenderHandler);
        this.backward.addEventListener('click', this.backwardHandler);
    }

    destroy() {
        this.boardDom.removeEventListener('click', this.clickHHandler);
        this.boardDom.innerHTML = '';
        this.surrender.removeEventListener('click', this.surrenderHandler);
        this.backward.removeEventListener('click', this.backwardHandler);
    }

    surrenderHandler = () => {
        alert(`游戏结束！${this.step % 2 === 0 ? '红' : '黑'}方胜`);
        this.destroy();
    }

    getBackward(arr1, arr2) {
        const start = [];
        const end = [];
        for (let i = 0; i < arr1.length; i++) {
            for (let j = 0; j < arr2.length; j++) {
                if (arr1[i][j] !== arr2[i][j]) {
                    if (arr1[i][j] !== role.empty && arr2[i][j] === role.empty) {
                        start.push(i);
                        start.push(j);
                        start.push(arr1[i][j]);
                    } else {
                        end.push(i);
                        end.push(j);
                        end.push(arr1[i][j]);
                    }
                }
            }
        }
        return [start, end];
    }

    // 如果将pop()改进为index可以实现forWard
    backwardHandler = () => {
        if (!this.isBackward) {
            alert('提子无悔！');
            return;
        }
        if (this.historyIds.length === 1) {
            return;
        }
        const differences = this.getBackward(this.historyRecord[this.historyRecord.length - 2], this.historyRecord[this.historyRecord.length - 1]);
        const start = differences[0];
        const end = differences[1];
        //更新棋盘
        this.historyRecord.pop();
        this.board[start[0]][start[1]] = start[2];
        this.board[end[0]][end[1]] = end[2];
        this.historyIds.pop();
        const arr = this.historyIds[this.historyIds.length - 1];
        this.idBoard[start[0]][start[1]] = arr[start[0]][start[1]];
        this.idBoard[end[0]][end[1]] = arr[end[0]][end[1]];
        //更新dom
        this.renderBoard([start[0], start[1]]);
        if (end[2] !== role.empty) {
            this.recoverBoardDom([end[0], end[1]]);
        }
        this.clearBoard();
        this.step--;
    }

    recoverBoardDom(position) {
        const chess = this.board[position[0]][position[1]];
        const chessDom = document.createElement('div');
        chessDom.classList.add('chess');
        chessDom.classList.add(chess.type);
        chessDom.innerText = chess.text;
        chessDom.setAttribute('id', this.idBoard[position[0]][position[1]]);
        chessDom.style.marginTop = `${1 + (11.49 * position[0])}%`;
        chessDom.style.marginLeft = `${0.5 + (11.56 * position[1])}%`;
        this.boardDom.appendChild(chessDom);
    }

    removeChess() {
        for (let i = 0; i < this.domChesses.length; i++) {
            const chess = this.domChesses[i];
            if (chess.getAttribute('id') == this.idBoard[this.endPosition[0]][this.endPosition[1]]) {
                this.boardDom.removeChild(chess);
                break;
            }
        }
    }

    changeBoard() {
        if (this.board[this.endPosition[0]][this.endPosition[1]] === this.empty) {
            let tmp = this.board[this.startPosition[0]][this.startPosition[1]];
            this.board[this.startPosition[0]][this.startPosition[1]] = this.board[this.endPosition[0]][this.endPosition[1]];
            this.board[this.endPosition[0]][this.endPosition[1]] = tmp;
            tmp = this.idBoard[this.startPosition[0]][this.startPosition[1]];
            this.idBoard[this.startPosition[0]][this.startPosition[1]] = this.idBoard[this.endPosition[0]][this.endPosition[1]];
            this.idBoard[this.endPosition[0]][this.endPosition[1]] = tmp;
        } else {
            // 删除被吃掉的dom元素
            this.removeChess();
            this.board[this.endPosition[0]][this.endPosition[1]] = this.board[this.startPosition[0]][this.startPosition[1]];
            this.board[this.startPosition[0]][this.startPosition[1]] = this.empty;
            this.idBoard[this.endPosition[0]][this.endPosition[1]] = this.idBoard[this.startPosition[0]][this.startPosition[1]];
            this.idBoard[this.startPosition[0]][this.startPosition[1]] = 0;
        }
    }

    renderBoard(position) {
        for (let i = 0; i < this.domChesses.length; i++) {
            const chess = this.domChesses[i];
            if (chess.getAttribute('id') == this.idBoard[position[0]][position[1]]) {
                chess.style.marginTop = `${1 + (11.49 * position[0])}%`;
                chess.style.marginLeft = `${0.5 + (11.56 * position[1])}%`;
                break;
            }
        }
    }

    setBorder() {
        for (let i = 0; i < this.domChesses.length; i++) {
            const chess = this.domChesses[i];
            if (chess.getAttribute('id') == this.idBoard[this.startPosition[0]][this.startPosition[1]]) {
                chess.classList.add('border');
                break;
            }
        }
    }

    removeBorder() {
        for (let i = 0; i < this.domChesses.length; i++) {
            const chess = this.domChesses[i];
            if (chess.getAttribute('id') == this.idBoard[this.startPosition[0]][this.startPosition[1]]) {
                chess.classList.remove('border');
                break;
            }
        }
    }

    changeChessPosition() {
        this.changeBoard();
        this.renderBoard(this.endPosition);
    }

    getEmptyPosition(offsetX, offsetY) {
        const width = this.boardDom.clientWidth;
        const height = this.boardDom.clientHeight;
        const colIndex = Math.round((offsetX / width - 0.0374) * 100 / 11.56);
        const rowIndex = Math.round((offsetY / height * 1.116 - 0.039) * 100 / 11.49);
        return [rowIndex, colIndex];
    }

    getChessPosition(id) {
        for (let i = 0; i < this.idBoard.length; i++) {
            for (let j = 0; j < this.idBoard[0].length; j++) {
                const chessId = this.idBoard[i][j];
                if (chessId == id) {
                    return [i, j];
                }
            }
        }
    }

    includes(position, positions) {
        for (let i = 0; i < positions.length; i++) {
            if (positions[i][0] === position[0] && positions[i][1] === position[1]) {
                return true;
            }
        }
        return false;
    }

    canDown(position) {
        // 判断是否是同类
        if (this.invalidPlayer(position)) {
            return false;
        }
        if (!this.includes(position, this.positions)) {
            return false;
        }
        return true;
    }

    invalidPlayer(position) {
        const play = this.board[position[0]][position[1]];
        if (play === role.empty) {
            return false;
        }
        if (this.isSimilar(position)) {
            return false;
        }
        if ((play.type !== this.board[this.startPosition[0]][this.startPosition[1]].type)) {
            return false;
        }
        return true;
    }

    isSimilar(position) {
        return (this.board[position[0]][position[1]].type === role.red && this.step % 2 === 1)
            || (this.board[position[0]][position[1]].type === role.black && this.step % 2 === 0)
    }

    // 坐标回头再调调
    renderPositions() {
        for (let i = 0; i < this.positions.length; i++) {
            const rowIndex = this.positions[i][0];
            const colIndex = this.positions[i][1];
            const point = document.createElement('div');
            point.classList.add('point');
            point.style.marginTop = `${3.5 + (11.55 * rowIndex)}%`;
            point.style.marginLeft = `${3 + (11.55 * colIndex)}%`;
            this.boardDom.appendChild(point);
        }
    }

    showCanDown(position) {
        const play = this.board[position[0]][position[1]];
        this.positions = play.rule(position, this.board);
        if (this.positions.length === 0) {
            return;
        }
        // 显示可以落子的位置
        if (settings.isShowPoints) {
            this.renderPositions();
        }
    }

    removeCanDown() {
        const points = this.boardDom.getElementsByClassName('point');
        // 循环删除自己
        while (points.length !== 0) {
            points[0].remove();
        }
    }

    clearBoard() {
        this.removeBorder();
        this.removeCanDown();
    }

    deepClone(arr) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            const tmp = [];
            for (let j = 0; j < arr[0].length; j++) {
                tmp.push(arr[i][j]);
            }
            result.push(tmp);
        }
        return result;
    }

    warnGeneral(position) {
        const play = this.board[position[0]][position[1]];
        // 不止一个点，可能有双将军，士相可以过滤掉
        const positions = [];
        const allPositions = [];
        const generalPosition = this.getGeneralPosition(play.type);
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[0].length; j++) {
                const targetPlay = this.board[i][j];
                if (play.type === role.red) {
                    if (targetPlay.type !== role.red) {
                        continue;
                    }
                    if (targetPlay.text === text.redOfficial || targetPlay.text === text.redPhase) {
                        continue;
                    }
                } else {
                    if (targetPlay.type !== role.black) {
                        continue;
                    }
                    if (targetPlay.text === text.blackOfficial || targetPlay.text === text.blackPhase) {
                        continue;
                    }
                }
                allPositions.push([i, j]);
                const willPositions = targetPlay.rule([i, j], this.board);
                if (this.includes(generalPosition, willPositions)) {
                    positions.push([i, j]);
                }
            }
        }
        return [positions, allPositions];
    }

    getGeneralPosition(type) {
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[0].length; j++) {
                if ((type === role.black && this.board[i][j].text === text.redGeneral) ||
                    type === role.red && this.board[i][j].text === text.blackGeneral) {
                    return [i, j];
                }
            }
        }
    }

    isWarnGeneral(playType) {
        const generalPosition = this.getGeneralPosition(playType);
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[0].length; j++) {
                const targetPlay = this.board[i][j];
                if (playType === role.red) {
                    if (targetPlay.type !== role.red) {
                        continue;
                    }
                    if (targetPlay.text === text.redOfficial || targetPlay.text === text.redPhase) {
                        continue;
                    }
                } else {
                    if (targetPlay.type !== role.black) {
                        continue;
                    }
                    if (targetPlay.text === text.blackOfficial || targetPlay.text === text.blackPhase) {
                        continue;
                    }
                }
                const willPositions = targetPlay.rule([i, j], this.board);
                if (this.includes(generalPosition, willPositions)) {
                    return true;
                }
            }
        }
        return false;
    }

    //判断棋盘中的这个棋子是否能够落在目标位置（可能这个棋子为了保护将军并不能移动，比如充当炮或者车的挡板）
    canGo(i, j, target) {
        // 先将棋子移过去，判断对方棋子是否会对自己造成将军
        const oldEle = this.board[target[0]][target[1]];
        this.board[target[0]][target[1]] = this.board[i][j];
        this.board[i][j] = this.empty;
        const result = this.isWarnGeneral(oldEle.type);
        // 还原
        this.board[i][j] = this.board[target[0]][target[1]];
        this.board[target[0]][target[1]] = oldEle;
        return !result;
    }

    // 有点复杂TODO
    absoluteKill(position, allPositions) {
        // 确定将军当前能移动的范围
        const play = this.board[position[0]][position[1]];
        const generalPosition = this.getGeneralPosition(play.type);
        const generalMoves = this.board[generalPosition[0]][generalPosition[1]].rule(generalPosition, this.board);
        // 判断此范围是否有安全位置
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[0].length; j++) {
                const chess = this.board[i][j];
                if (chess === this.empty || chess.type !== this.board[position[0]][position[1]].type) {
                    continue;
                }
                const positions = (chess.text === text.redCar || chess.text === text.redGun || chess.text === text.blackCar || chess.text === text.blackGun)
                    ? chess.killRule([i, j], this.board)
                    : chess.rule([i, j], this.board);
                for (let k = 0; k < generalMoves.length; k++) {
                    if (this.includes(generalMoves[k], positions)) {
                        generalMoves.splice(k, 1);
                        k--;
                    }
                }
            }
        }
        if (generalMoves.length > 0) {
            return false;
        }
        // 判断是否能够干掉造成将军的棋子
        if (allPositions.length === 1) {
            const target = allPositions[0];
            for (let i = 0; i < this.board.length; i++) {
                for (let j = 0; j < this.board[0].length; j++) {
                    const chess = this.board[i][j];
                    if (chess === this.empty || chess.type === this.board[target[0]][target[1]].type) {
                        continue;
                    }
                    const positions = chess.rule([i, j], this.board);
                    if (this.includes(target, positions) && this.canGo(i, j, target)) {
                        return false;
                    }
                }
            }
        }
        // 找到干扰造成将军的所有棋子的位置（仅限于车马炮）
        const disturbPositions = [];
        for (let i = 0; i < allPositions.length; i++) {
            const chessPosition = allPositions[i];
            const chess = this.board[chessPosition[0]][chessPosition[1]];
            if (chess.text === text.blackCar || chess.text === text.redCar) {
                const positions = chess.getDisturb([chessPosition[0], chessPosition[1]], generalPosition);
                disturbPositions.push([...positions]);
            } else if (chess.text === text.blackGun || chess.text === text.redGun) {
                const positions = chess.getDisturb([chessPosition[0], chessPosition[1]], generalPosition, this.board);
                disturbPositions.push([...positions]);
            } else if (chess.text === text.blackHorse || chess.text === text.redHorse) {
                const positions = chess.getDisturb([chessPosition[0], chessPosition[1]], this.board);
                disturbPositions.push([...positions]);
            }
        }
        let targetPositions = [];
        let doubleKill = false;
        for (let i = 0; i < disturbPositions.length; i++) {
            let flag = false;
            const positions = disturbPositions[i];
            if (positions.length === 0) {
                return true;
            }
            for (let j = 0; j < positions.length; j++) {
                const targetPosition = positions[j];
                if (this.includes(targetPosition, targetPositions)) {
                    doubleKill = true;
                    flag = true;
                    targetPositions = [];
                    break;
                } else {
                    targetPositions.push([...targetPosition]);
                }
            }
            if (flag) {
                break;
            }
        }
        if (doubleKill) {
            const tmpPositions = [];
            for (let i = 0; i < disturbPositions.length; i++) {
                const positions = disturbPositions[i];
                for (let j = 0; j < positions.length; j++) {
                    const targetPosition = positions[j];
                    if (this.includes(targetPosition, tmpPositions)) {
                        targetPositions.push([...targetPosition]);
                    } else {
                        tmpPositions.push([...targetPosition]);
                    }
                }
            }
        }
        // 判断是否能到达这些位置
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[0].length; j++) {
                const chess = this.board[i][j];
                if (chess === this.empty || chess.type === this.board[position[0]][position[1]].type) {
                    continue;
                }
                const positions = chess.rule([i, j], this.board);
                for (let k = 0; k < targetPositions.length; k++) {
                    if (this.includes(targetPositions[k], positions)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    specialHandler(position) {
        const result = this.warnGeneral(position);
        if (result[0].length !== 0 && this.absoluteKill(position, result[0])) {
            console.log('绝杀');
            return true;
        } else if (result[0].length !== 0) {
            console.log('将军');
            this.warnGeneralSound.play();
            return false;
        }
        return false;
    }

    gameOver() {
        let redWin = true;
        let blackWin = true;
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[0].length; j++) {
                if (this.board[i][j] == this.blackGeneral) {
                    redWin = false;
                }
                if (this.board[i][j] == this.redGeneral) {
                    blackWin = false;
                }
            }
        }
        return redWin || blackWin;
    }

    // 逻辑再重新整理一下
    clickHandler = (e) => {
        // 点击棋子
        if (e.target != this.boardDom) {
            const playerPosition = this.getChessPosition(e.target.id);
            if (this.invalidPlayer(playerPosition)) {
                return;
            }
            const flag = this.canDown(playerPosition);
            // 已经选中了一个棋子并即将落子
            if (this.readyPlay && flag) {
                this.clearBoard();
                // 需要判断是否是能落子的位置 如果不能落子则清空选择
                this.endPosition = playerPosition;
                this.changeChessPosition();
                this.readyPlay = false;
                this.chessDownSound.play();
                if (this.gameOver()) {
                    setTimeout(() => {
                        alert(`游戏结束！${this.step % 2 === 1 ? '红' : '黑'}方胜`);
                        this.destroy();
                    }, 500);
                    return;
                }
                if (this.specialHandler(playerPosition)) {
                    setTimeout(() => {
                        alert(`绝杀！${this.step % 2 === 1 ? '红' : '黑'}方胜`);
                        this.destroy();
                    }, 500);
                    return;
                }
                this.step++;
                this.historyRecord.push(this.deepClone(this.board));
                this.historyIds.push(this.deepClone(this.idBoard));
                this.isBackward = true;
            } else {
                // 更换选中的棋子
                this.chessUpSound.play();
                if (this.readyPlay && !flag) {
                    this.clearBoard();
                }
                // 如果是不同类
                if (!this.isSimilar(playerPosition)) {
                    return;
                }
                // 如果是同类
                this.startPosition = playerPosition;
                this.setBorder();
                this.readyPlay = true;
                this.isBackward = false;
                // 获取可以落子的位置
                this.showCanDown(playerPosition);
            }
        } else {
            // 点击棋盘
            if (this.readyPlay) {
                this.clearBoard();
                const playerPosition = this.getEmptyPosition(e.offsetX, e.offsetY);
                const flag = this.canDown(playerPosition);
                this.readyPlay = false;
                if (!flag) {
                    return;
                }
                this.endPosition = playerPosition;
                this.changeChessPosition();
                this.chessDownSound.play();
                if (this.specialHandler(playerPosition)) {
                    setTimeout(() => {
                        alert(`绝杀！${this.step % 2 === 1 ? '红' : '黑'}方胜`);
                        this.destroy();
                    }, 500);
                    return;
                }
                this.step++;
                this.historyRecord.push(this.deepClone(this.board));
                this.historyIds.push(this.deepClone(this.idBoard));
                this.isBackward = true;
            }
        }
    }
}