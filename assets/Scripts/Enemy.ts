import { _decorator, Component, Node, tween, Vec3 } from 'cc';
import { GameManager } from './Manager/GameManager';
import { EnemyManager } from './Manager/EnemyManager';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {

    protected start(): void {
// 将自己添加到敌人管理列表中
    EnemyManager.inst.addEnemy(this.node);
    }
    
    underAttack() {
        GameManager.inst.addScore(1);
        this.scheduleOnce(() => { 
            EnemyManager.inst.removeEnemy(this.node);
            this.node.destroy()
         });
    }
}


