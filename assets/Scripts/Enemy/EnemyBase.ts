import { _decorator, Component, Node } from 'cc';
import { EnemyManager } from '../Manager/EnemyManager';
import { GameManager } from '../Manager/GameManager';
const { ccclass, property } = _decorator;

@ccclass('EnemyBase')
export class EnemyBase extends Component {
    underAttack() {
        this.scheduleOnce(() => {
            EnemyManager.inst.removeEnemy(this.node);
            this.node.destroy()
        });
    }
}

