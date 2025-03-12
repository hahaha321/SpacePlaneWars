import { _decorator, Component, find, instantiate, Node, Prefab, randomRange } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnemyManager')
export class EnemyManager extends Component {
    @property(Prefab)
    enemy0Prefab: Prefab = null;
    @property
    enemy0SpawnRate: number = 1;


    start() {
        this.schedule(this.spawnEnemy0, this.enemy0SpawnRate);
    }

    spawnEnemy0() {
        const enemy0 = instantiate(this.enemy0Prefab);
        const parent = find('Canvas/Enemies');
        parent.addChild(enemy0);
        enemy0.setPosition(randomRange(-337,338), 660);
    }

}


