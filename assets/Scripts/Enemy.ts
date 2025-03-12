import { _decorator, Component, Node, tween, Vec3 } from 'cc';
import { GameManager } from './Manager/GameManager';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {
    @property
    enemy0MoveSpeed: number = 200;

    // private switchTime: number = 0.5;
    // private switchTimer: number = 0;
    private moveDirection: number = 1;
    private initialPosition: Vec3;
    private moveDistance: number = 50;
    private currentPosition: Vec3;

    protected start(): void {
        this.initialPosition = this.node.getPosition()
    }

    protected update(dt: number): void {
        this.currentPosition = this.node.getPosition()
        switch (this.moveDirection) {
            case 1:
                this.moveRight(dt)
                if (this.currentPosition.x >= this.initialPosition.x + this.moveDistance) {
                    this.moveDirection = -1
                }
                break;
            case -1:
                this.moveLeft(dt)
                if (this.currentPosition.x <= this.initialPosition.x - this.moveDistance) {
                    this.moveDirection = 1
                }
                break;
        }
    }

    private moveRight(dt: number) {
        this.node.setPosition(this.currentPosition.x + this.enemy0MoveSpeed * dt, this.currentPosition.y)
        this.currentPosition = this.node.getPosition()
    }

    private moveLeft(dt: number) {
        this.node.setPosition(this.currentPosition.x - this.enemy0MoveSpeed * dt, this.currentPosition.y)
        this.currentPosition = this.node.getPosition()
    }

    underAttack() {
        GameManager.inst.addScore(1);
        this.scheduleOnce(() => { this.node.destroy() });
    }
}


