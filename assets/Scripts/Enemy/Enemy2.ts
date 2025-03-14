import { _decorator, Component, Node } from 'cc';
import { Enemy1 } from './Enemy1';
import { GameManager } from '../Manager/GameManager';
import { PlayerLevelManager } from '../Manager/PlayerLevelManager';
const { ccclass, property } = _decorator;

@ccclass('Enemy2')
export class Enemy2 extends Enemy1 {
    @property
    private hp: number = 2;

    underAttack() {
        super.underAttack();
        // GameManager.inst.addScore(1);
        // PlayerLevelManager.inst.addExp(this.expReward);
        this.hp -= 1;
        if (this.hp <= 0) {
            console.log("Enemy2 被击中，消失");
            // this.scheduleOnce(() => {
            //     this.node.destroy();
            // });
        }
    }
}
