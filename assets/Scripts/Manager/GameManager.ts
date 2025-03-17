import { _decorator, AudioClip, Component, director, Node } from 'cc';
import { AudioMgr } from './AudioMgr';
import { EnemyManager } from './EnemyManager';
import { GameUI } from '../UI/GameUI';
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
    @property(Node)
    bulletParentNode: Node;
    @property(GameUI)
    gameUI:GameUI = null;
    @property(Node)
    gameOverUI: Node;

    private _score: number = 0;

    public get score(): number { return this._score; }

    start() {
        GameManager._inst = this;
        AudioMgr.inst.play(this.bgm, 0.5);
        console.log("播放背景音乐成功。");
    }

    addScore(value: number = 1) { 
        this._score += value;
        console.log("当前得分：" + this.score);
    }

    gameOver() {
        this.gameUI.updateDisplay();
        director.pause();
        AudioMgr.inst.stop();
        EnemyManager.inst.stopSpawn();
        console.log("游戏结束。");
        this.gameOverUI.active = true;

    }

    gamePass() {
        console.log("游戏通关。");
        director.loadScene("03-Game-Level2");
    }

    restart() {
        director.loadScene('03-Game-Level2');
        director.resume();
        AudioMgr.inst.play(this.bgm, 0.5);
        EnemyManager.inst.startSpawn();
        this.gameOverUI.active = false;
        console.log("重置游戏。");
    }
}


