// PlayerLevelManager.ts
import { _decorator, AudioClip, Component, Node } from 'cc';
import { Player } from '../Player';
const { ccclass, property } = _decorator;

@ccclass('PlayerLevelManager')
export class PlayerLevelManager extends Component{
    private static _inst: PlayerLevelManager;
    public static get inst(): PlayerLevelManager {
        if (this._inst == null) {
            this._inst = new PlayerLevelManager();
        }
        return this._inst;
    }

    @property(Player)
    player: Player = null;
    

    private level: number = 1;
    private currentExp: number = 0;
    // 存储每一级升级所需的经验值
    private expToLevelUp: number[] = [10, 10, 10, 10, 10, 10]; 

    protected onLoad(): void {
        PlayerLevelManager._inst = this;
    }
    // 获取当前等级
    public getLevel() {
        return this.level;
    }

    // 获取当前经验值
    public getCurrentExp() {
        return this.currentExp;
    }

    // 增加经验值
    public addExp(exp: number) {
        this.currentExp += exp;
        this.checkLevelUp();
    }

    // 检查是否可以升级
    private checkLevelUp() {
        if (this.level < this.expToLevelUp.length) {
            const requiredExp = this.expToLevelUp[this.level - 1];
            if (this.currentExp >= requiredExp) {
                this.currentExp -= requiredExp;
                this.level++;
                console.log(`恭喜，升级到等级 ${this.level}`);
                // 可以在这里添加升级后的属性提升逻辑
                // console.log(this.playernode);
                this.player.ShootRate -= 0.2;
                if(this.player.ShootRate <= 0.05) this.player.ShootRate = 0.05;
            }
        }
    }
}

