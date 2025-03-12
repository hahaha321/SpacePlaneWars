import { _decorator, Component, Node } from 'cc';
import { GameManager } from './Manager/GameManager';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {
    @property
    enemy0MoveSpeed: number = 300;

    protected update(dt: number): void {
        const currentPos = this.node.getPosition();
        this.node.setPosition(currentPos.x, currentPos.y - this.enemy0MoveSpeed * dt)

        if (currentPos.y < -1000) {
            this.node.destroy();
        }
    }

    underAttack() {
        GameManager.inst.addScore(1);
        this.scheduleOnce(() => { this.node.destroy() });
    }
}


