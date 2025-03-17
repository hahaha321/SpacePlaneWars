import { _decorator, Component, Node } from 'cc';
import { EnemyManager } from '../Manager/EnemyManager';
import { GameManager } from '../Manager/GameManager';
import { PlayerLevelManager } from '../Manager/PlayerLevelManager';
const { ccclass, property } = _decorator;

@ccclass('EnemyBase')
export class EnemyBase extends Component {
    @property
    enemyMoveSpeed: number = 300;
    @property
    expReward: number = 10; // 怪物被击败后给予的经验值
    @property
    scoreReward: number = 1; // 怪物被击败后给予的分数
    @property
    protected hp: number = 1;

    protected update(dt: number): void {
        const currentPos = this.node.getPosition();
        this.node.setPosition(currentPos.x, currentPos.y - this.enemyMoveSpeed * dt)

        if (currentPos.y < -1000) {
            EnemyManager.inst.removeEnemy(this.node);
            this.node.destroy();
        }
    }

    underAttack() {
        this.hp -= 1;

        if (this.hp <= 0) {
            GameManager.inst.addScore(this.scoreReward);
            PlayerLevelManager.inst.addExp(this.expReward);
            console.log("Enemy死亡");
            EnemyManager.inst.removeEnemy(this.node);
            this.scheduleOnce(() => {
                this.node.destroy();
            });
        }
    }

    stopMove() {
        this.enemyMoveSpeed = 0;
    }
}

