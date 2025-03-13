import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Enemies')
export class Enemies extends Component {
    @property
    moveSpeed: number = 100;
    private moveDirection: number = 1;
    private initialPosition: Vec3;
    private moveDistance: number = 50;
    private currentPosition: Vec3;
    start() {
        this.initialPosition = this.node.getPosition()
    }

    update(deltaTime: number) {
        this.currentPosition = this.node.getPosition()
        switch (this.moveDirection) {
            case 1:
                this.moveRight(deltaTime)
                if (this.currentPosition.x >= this.initialPosition.x + this.moveDistance) {
                    this.moveDirection = -1
                }
                break;
            case -1:
                this.moveLeft(deltaTime)
                if (this.currentPosition.x <= this.initialPosition.x - this.moveDistance) {
                    this.moveDirection = 1
                }
                break;
        }
    }

    private moveRight(dt: number) {
        this.node.setPosition(this.currentPosition.x + this.moveSpeed * dt, this.currentPosition.y)
        this.currentPosition = this.node.getPosition()
    }

    private moveLeft(dt: number) {
        this.node.setPosition(this.currentPosition.x - this.moveSpeed * dt, this.currentPosition.y)
        this.currentPosition = this.node.getPosition()
    }

}


