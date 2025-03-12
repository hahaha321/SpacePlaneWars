import { _decorator, Collider2D, Component, Contact2DType, IPhysics2DContact, Node } from 'cc';
import { Enemy } from './Enemy';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {
    @property
    bulletSpeed:number = 700;

    private collider: Collider2D;

    protected onLoad(): void {
        // 注册单个碰撞体的回调函数
        this.collider = this.getComponent(Collider2D);
        if (this.collider) {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }

    }

    update(deltaTime: number) {
        const bulletCurrentPosition = this.node.position;
        this.node.setPosition(bulletCurrentPosition.x, bulletCurrentPosition.y + this.bulletSpeed * deltaTime);

        if (bulletCurrentPosition.y > 1000) {
            this.node.destroy();
        }
    }

    protected onDestroy(): void {
        // 注销碰撞体回调函数
        if (this.collider) {
            this.collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact);
        }
    }

    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体开始接触时被调用一次
        let enemy0 = otherCollider.node.getComponent(Enemy);
        if (enemy0) {
            enemy0.underAttack();
            this.collider.enabled = false;
            this.scheduleOnce(()=>this.node.destroy());
        }

    }

}


