import { _decorator, Component, find, instantiate, Node, Prefab, randomRange } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('EnemyManager')
export class EnemyManager extends Component {
    private static _inst: EnemyManager;
    public static get inst(): EnemyManager {
        if (this._inst == null) {
            this._inst = new EnemyManager();
        }
        return this._inst;
    }


    @property(Prefab)
    enemy0Prefab: Prefab = null;
    @property([Node])
    enemies: Node[] = [];

    @property(Prefab)
    enemy1Prefab: Prefab = null;
    @property
    enemy1SpawnRate: number = 1;

    start() {
        this.schedule(this.spawnEnemy1, this.enemy1SpawnRate);
    }

    spawnEnemy1() {
        const enemy1 = instantiate(this.enemy1Prefab);
        const parent = find('Canvas/Game/Enemies');
        parent.addChild(enemy1);
        enemy1.setPosition(randomRange(-337,338), 660);
    }

    addEnemy(enemy: Node) {
        this.enemies.push(enemy);
    }

    removeEnemy(enemy: Node) {
        const index = this.enemies.indexOf(enemy);
        if (index > -1) {
            this.enemies.splice(index, 1);
            // 检查是否所有敌人都已死亡
            if (this.enemies.length === 0) {
                this.onAllEnemiesDead();
            }
        }
    }

    // 所有敌人死亡时触发的逻辑
    private onAllEnemiesDead() {
        // 游戏通关的逻辑
        GameManager.inst.gamePass();
    }

}


