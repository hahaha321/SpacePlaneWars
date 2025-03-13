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
        }

        director.preloadScene('02-Game-Level1', (completedCount:number, totalCount:number)=> {
            let progress = completedCount / totalCount;
            this.progressBar.progress = progress;
        }, ()=> {})
    }
    /**
     * 开始游戏
     */
    startGame() {
        if (this.progressBar.progress == 1) {
            director.loadScene('02-Game-Level1');
        }
    }
}


