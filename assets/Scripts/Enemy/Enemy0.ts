import { _decorator, Component, Node, tween, Vec3 } from 'cc';
import { EnemyManager } from '../Manager/EnemyManager';
import { GameManager } from '../Manager/GameManager';
import { EnemyBase } from './EnemyBase';
const { ccclass, property } = _decorator;

@ccclass('Enemy0')
export class Enemy0 extends EnemyBase {
    onLoad() {
        this.expReward = 0;
        this.enemyMoveSpeed = 0;

        EnemyManager.inst.addEnemy(this.node);
    }

    onDestroy() {
        EnemyManager.inst.removeEnemy(this.node);
    }

}


