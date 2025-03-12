import { _decorator, AudioClip, Component, Node } from 'cc';
import { AudioMgr } from './AudioMgr';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    private static _inst: GameManager;
    public static get inst(): GameManager {
        if (this._inst == null) {
            this._inst = new GameManager();
        }
        return this._inst;
    }

    @property(AudioClip)
    bgm: AudioClip;

    private _score: number = 0;

    public get score(): number { return this._score; }

    start() {
        AudioMgr.inst.play(this.bgm, 1.0);
        console.log("播放背景音乐成功。");
    }

    addScore(value: number = 1) { 
        this._score += value;
        console.log("当前得分：" + this.score);
    }

    gameOver() {
        AudioMgr.inst.stop();
        console.log("游戏结束。");
    }
}


