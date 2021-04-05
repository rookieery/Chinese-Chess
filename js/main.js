import Board from './board.js';

class Main {
    constructor() {
        this.board = null;
    }
    start() {
        const start = document.getElementById('start');
        start.addEventListener('click', this.gameStart);
    }

    gameStart = () => {
        if (this.board !== null) {
            this.board.destroy();
            this.board.init();
        } else {
            this.board = new Board();
        }
        alert('游戏开始！');
    }
}

window.onload = function () {
    new Main().start();
};