import { _decorator, Animation, Collider2D, Color, color, Component, Contact2DType, EventTouch, input, Input, instantiate, IPhysics2DContact, Node, Prefab, Sprite, tween, UITransform } from 'cc';
import { Enemy } from './Enemy';
import { AudioMgr } from './Manager/AudioMgr';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
    @property(Prefab)
    bulletPrefab: Prefab = null;
    @property(Animation)
    anim: Animation = null;
    @property
    ShootRate:number = 2;


    private HP: number = 3;
    private collider: Collider2D = null;
    private isInvincible: boolean = false;

    protected onLoad(): void {
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.schedule(this.shoot, this.ShootRate);

        this.collider = this.node.getComponent(Collider2D);
        this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);


    }

    protected onDestroy(): void {
        input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.unschedule(this.shoot);

        this.collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }

    /**
     * 在触摸移动时触发的事件处理函数
     *
     * @param event 触摸移动事件对象
     */
    onTouchMove(event: EventTouch) {
        if (event) {
            // 获取当前玩家节点的位置
            const currentPlayerPosition = this.node.position;
            // 获取触摸移动的水平距离
            const deltaX = event.getDeltaX();
            // 获取触摸移动的垂直距离
            const deltaY = event.getDeltaY();
            // 计算目标位置的X坐标
            const targetPositionX = currentPlayerPosition.x + deltaX;

            // 如果目标位置的X坐标超出了允许的范围，则返回
            if (targetPositionX <= -338 || targetPositionX >= 338) return;

            // 计算目标位置的Y坐标
            const targetPositionY = currentPlayerPosition.y + deltaY;

            // 如果目标位置的Y坐标超出了允许的范围，则返回
            if (targetPositionY <= -588 || targetPositionY >= 588) return;

            // 设置玩家节点的位置为目标位置
            this.node.setPosition(targetPositionX, targetPositionY);
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 当碰撞到的是子弹时，不进行处理
        if (otherCollider.tag == 10) return;

        // 当碰撞到的是enemy0时，自己受伤，并让敌人受伤
        if (otherCollider.tag == 20) {
            this.underAttack();
            otherCollider.getComponent(Enemy).underAttack();
        }

    }

    /**
     * 发射子弹
     */
    shoot() {
        // 判断 bulletPrefab 是否存在
        if (this.bulletPrefab) {
            // 实例化 bulletPrefab
            const bullet = instantiate(this.bulletPrefab);
            // 设置子弹位置为当前节点位置
            bullet.setPosition(this.node.position);
            // 将子弹节点添加到当前节点的子节点中
            this.node.parent?.addChild(bullet);
            // 播放射击音乐
            AudioMgr.inst.playOneShot('Audio/Sound/shoot');

        }
    }

    /**
     * 玩家受到攻击
     */
    public underAttack() {
        if (this.isInvincible) return;

        // 播放受伤动画
        this.anim.play('Player_UnderAttack');

        // 设置无敌时间，防止连续受到伤害
        this.isInvincible = true;
        setTimeout(() => this.isInvincible = false, 1000);

        // 减少生命值
        this.HP -= 1;
        console.log(this.HP);
        if (this.HP <= 0) {
            console.log("玩家挂了");
            this.unschedule(this.shoot);
        }
    }

    
}


