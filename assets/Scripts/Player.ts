import { _decorator, Animation, Collider2D, Component, Contact2DType, EventKeyboard, EventTouch, find, input, Input, instantiate, IPhysics2DContact, KeyCode, Prefab, Vec3 } from 'cc';
import { AudioMgr } from './Manager/AudioMgr';
import { BOUNDARY_X, BOUNDARY_Y, CollisionTAG } from './Global';
import { Enemy1 } from './Enemy/Enemy1';
import { GameManager } from './Manager/GameManager';
import { Enemy0 } from './Enemy/Enemy0';
import { Enemy2 } from './Enemy/Enemy2';
const { ccclass, property } = _decorator;

@ccclass('Player')
/**
 * Player 类表示游戏中的玩家角色。
 * 处理玩家移动、射击和与其他游戏对象交互的属性和方法。
 */
export class Player extends Component {
    @property(Prefab)
    bulletPrefab: Prefab = null; // 子弹预制体
    @property(Animation)
    anim: Animation = null; // 动画组件
    @property
    ShootRate: number = 2; // 射击频率

    private _HP: number = 3; // 生命值
    private collider: Collider2D = null; // 碰撞器组件
    private isInvincible: boolean = false; // 是否无敌
    private moveSpeed: number = 200; // 移动速度
    private moveDirection: Vec3 = new Vec3(0, 0, 0); // 移动方向
    private isKeyWPressed: boolean = false; // W键是否按下
    private isKeySPressed: boolean = false; // S键是否按下
    private isKeyAPressed: boolean = false; // A键是否按下
    private isKeyDPressed: boolean = false; // D键是否按下

    public get HP() {
        return this._HP;
    }

    /**
     * 初始化组件，设置事件监听和定时任务。
     */
    protected onLoad(): void {
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this); // 监听触摸移动事件
        input.on(Input.EventType.KEY_DOWN, this.onKeyChange(true), this); // 监听按键按下事件
        input.on(Input.EventType.KEY_UP, this.onKeyChange(false), this); // 监听按键松开事件
        this.schedule(this.shoot, this.ShootRate); // 设置射击定时任务

        this.collider = this.node.getComponent(Collider2D); // 获取碰撞器组件
        this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this); // 监听碰撞开始事件
    }

    /**
     * 每帧更新游戏逻辑。
     *
     * @param dt 时间间隔
     */
    protected update(dt: number): void {
        const moveStep = new Vec3();
        Vec3.multiplyScalar(moveStep, this.moveDirection, this.moveSpeed * dt); // 计算移动步长
        this.updateMoveDirection(); // 更新移动方向
        let targetPosition = Vec3.add(new Vec3(), this.node.position, moveStep); // 计算目标位置
        if (targetPosition.x >= -BOUNDARY_X && targetPosition.x <= BOUNDARY_X && targetPosition.y >= -BOUNDARY_Y && targetPosition.y <= BOUNDARY_Y) {
            this.node.setPosition(targetPosition); // 设置节点位置
        }
    }

    /**
     * 对象销毁时取消事件监听和定时任务。
     */
    protected onDestroy(): void {
        input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this); // 取消监听触摸移动事件
        input.off(Input.EventType.KEY_DOWN, this.onKeyChange(true), this); // 取消监听按键按下事件
        input.off(Input.EventType.KEY_UP, this.onKeyChange(false), this); // 取消监听按键松开事件
        this.unscheduleAllCallbacks(); // 取消所有定时任务

        this.collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this); // 取消监听碰撞开始事件
    }

    /**
     * 触摸移动事件处理函数。
     *
     * @param event 触摸移动事件对象
     */
    onTouchMove(event: EventTouch) {
        if (event) {
            const currentPlayerPosition = this.node.position;
            const deltaX = event.getDeltaX();
            const deltaY = event.getDeltaY();
            const targetPositionX = currentPlayerPosition.x + deltaX;
            if (targetPositionX <= -BOUNDARY_X || targetPositionX >= BOUNDARY_X) return;
            const targetPositionY = currentPlayerPosition.y + deltaY;
            if (targetPositionY <= -BOUNDARY_Y || targetPositionY >= BOUNDARY_Y) return;
            this.node.setPosition(targetPositionX, targetPositionY);
        }
    }

    /**
     * 键盘事件处理函数。
     *
     * @param isKeyDown 是否按下
     */
    onKeyChange(isKeyDown: boolean) {
        return (event: EventKeyboard) => {
            switch (event.keyCode) {
                case KeyCode.KEY_W:
                    this.isKeyWPressed = isKeyDown;
                    break;
                case KeyCode.KEY_S:
                    this.isKeySPressed = isKeyDown;
                    break;
                case KeyCode.KEY_A:
                    this.isKeyAPressed = isKeyDown;
                    break;
                case KeyCode.KEY_D:
                    this.isKeyDPressed = isKeyDown;
                    break;
            }
            this.updateMoveDirection();
        };
    }

    /**
     * 更新移动方向。
     */
    private updateMoveDirection() {
        this.moveDirection.set(0, 0, 0);
        if (this.isKeyWPressed) this.moveDirection.y = 1;
        if (this.isKeySPressed) this.moveDirection.y = -1;
        if (this.isKeyAPressed) this.moveDirection.x = -1;
        if (this.isKeyDPressed) this.moveDirection.x = 1;
    }

    /**
     * @param selfCollider the collider of the current object involved in the collision event (current collider) (当前对象的碰撞体) (当前碰撞体) (self collider) (自身碰撞体) (当前物体碰撞体) (当前物体自身的碰撞体) (当前物体自身的碰撞器) (当前物体自己的碰撞器) (当前物体自己的碰撞体) (当前物体自己的碰撞器组件) (当前物体的自己的碰撞器组件) (当前物体的自己的碰撞体组件) (当前物体的自身的碰撞器组件) (当前物体的自身的碰撞体组件) (当前物体的自身的自己的碰撞器组件) (当前物体的自身的自己的碰撞体组件) (current object's own collider component) (current object's own collider component of the current object involved in the collision event)
     */
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.tag == CollisionTAG.Bullet) return;
        if (otherCollider.tag == CollisionTAG.Enemy0) {
            this.underAttack();
            otherCollider.getComponent(Enemy0).underAttack();
        }
        if (otherCollider.tag == CollisionTAG.Enemy1) {
            this.underAttack();
            otherCollider.getComponent(Enemy1).underAttack();
        }
        if (otherCollider.tag == CollisionTAG.Enemy2) {
            this.underAttack();
            otherCollider.getComponent(Enemy2).underAttack();
        }
    }

    /**
     * 发射子弹。
     */
    shoot() {
        if (this.bulletPrefab) {
            const bullet = instantiate(this.bulletPrefab);
            bullet.setPosition(this.node.position);
            bullet.setParent(find('Canvas/Game/BulletParent'));
            AudioMgr.inst.playOneShot('Audio/Sound/shoot');
        }
    }

    /**
     * 玩家受到攻击。
     */
    public underAttack() {
        if (this.isInvincible) return;
        this.anim.play('Player_UnderAttack');
        this.isInvincible = true;
        setTimeout(() => this.isInvincible = false, 1000);
        this._HP -= 1;
        console.log('当前生命值：' + this.HP);
        if (this.HP <= 0) {
            console.log("玩家挂了");
            GameManager.inst.gameOver();
            this.unschedule(this.shoot);
        }
    }
}


