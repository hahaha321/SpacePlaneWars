import { _decorator, Component, director, Node, ProgressBar, tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StartUI')
export class StartUI extends Component {
    @property(ProgressBar)
    private progressBar: ProgressBar | null = null;
    protected start(): void {
        if (this.progressBar) {
            // 初始化进度为 0
            this.progressBar.progress = 0;

            // 使用 tween 实现进度条动画
            tween(this.progressBar)
                .to(3, { progress: 1 }) // 在 3 秒内将进度从 0 变为 1
                .start();
        }
    }
    /**
     * 开始游戏
     */
    startGame() {
        if (this.progressBar.progress == 1) {
            director.loadScene('02-Game');
        }
    }
}


