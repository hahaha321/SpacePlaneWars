import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {
    @property
    bulletSpeed = 700;

    update(deltaTime: number) {
        const bulletCurrentPosition = this.node.position;
        this.node.setPosition(bulletCurrentPosition.x, bulletCurrentPosition.y + this.bulletSpeed * deltaTime);

        if (bulletCurrentPosition.y > 1000) {
            this.node.destroy();
        }
    }
}


