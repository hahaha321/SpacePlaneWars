import { _decorator, Animation, Collider2D, Component, Contact2DType, EventKeyboard, EventTouch, find, input, Input, instantiate, IPhysics2DContact, KeyCode, Prefab, resources, Vec3 } from 'cc';
import { AudioMgr } from './Manager/AudioMgr';
import { BOUNDARY_X, BOUNDARY_Y, CollisionTAG, playerConfig } from './Global';
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
    private _bulletPrefab: Prefab = null; // 子弹预制体
    private _shootRate: number = 2; // 射击频率
    private _HP: number = 3; // 生命值
    private _collider: Collider2D = null; // 碰撞器组件
    private _anim: Animation = null; // 动画组件
    private isInvincible: boolean = false; // 是否无敌

    public get HP() {
        return this._HP;
    }

    protected start(): void {
        //#region 变量初始化
        this._shootRate = playerConfig.SHOOT_RATE;
        this._HP = playerConfig.HP;
        this._collider = this.node.getComponent(Collider2D); // 获取碰撞器组件
        this._anim = this.getComponent(Animation); // 获取动画组件
        //#endregion

        resources.load('Prefabs/Bullet', Prefab, (err: Error | null, prefab: Prefab) => {
            if (err) {
                console.error('预制体加载失败:', err);
                return;
            }
            this._bulletPrefab = prefab;
        });
            

        //#region  事件注册
        this._collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this); // 监听碰撞开始事件
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this); // 监听触摸移动事件
        //#endregion

        this.schedule(this.shoot, this._shootRate); // 设置射击定时任务
    }

    /**
     * 对象销毁时取消事件监听和定时任务。
     */
    protected onDestroy(): void {
        input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this); // 取消监听触摸移动事件
        this.unscheduleAllCallbacks(); // 取消所有定时任务

        this._collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this); // 取消监听碰撞开始事件
    }

    /**
     * 触摸移动事件处理函数。
     *
     * @param event 触摸移动事件对象
     */
    private onTouchMove(event: EventTouch) {
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
     * 碰撞开始事件处理函数。
     */
    private onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
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
    public shoot() {
        if (this._bulletPrefab) {
            const bullet = instantiate(this._bulletPrefab);
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
        this._anim.play('Player_UnderAttack');
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


