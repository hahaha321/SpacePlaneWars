import { _decorator, Component, Node, Vec3 } from 'cc';
import { PlayerLevelManager } from '../Manager/PlayerLevelManager';
import { GameManager } from '../Manager/GameManager';
import { EnemyBase } from './EnemyBase';
const { ccclass, property } = _decorator;

@ccclass('Enemy1')
export class Enemy1 extends EnemyBase {
    @property
    enemy1MoveSpeed: number = 300;
    @property
    expReward: number = 10; // 怪物被击败后给予的经验值
    @property
    private playerLevelToEnableDodge: number = 5; // 玩家需要达到的等级以启用躲避功能
    // 检测子弹的范围
    @property
    private detectionRange: number = 100;

    protected update(dt: number): void {
        const currentPos = this.node.getPosition();
        this.node.setPosition(currentPos.x, currentPos.y - this.enemy1MoveSpeed * dt)

        if (currentPos.y < -1000) {
            this.node.destroy();
        }

        // 检查玩家等级，如果达到指定等级，则启用躲避功能
        if (PlayerLevelManager.inst.getLevel() >= this.playerLevelToEnableDodge) {
            this.dodgeBullets(dt);
        }
    }

    // 封装躲避逻辑
    private dodgeBullets(deltaTime: number) {
        // 检测附近的子弹
        const bullets = this.detectNearbyBullets();
        if (bullets.length > 0) {
            // 计算躲避方向
            const dodgeDirection = this.calculateDodgeDirection(bullets);
            // 移动敌人
            this.moveEnemy(dodgeDirection, deltaTime);
        }
    }

    underAttack() {
        super.underAttack();
        GameManager.inst.addScore(1);
        PlayerLevelManager.inst.addExp(this.expReward);
    }

     // 检测敌机附近的子弹，并返回一个节点类型的数组
     private detectNearbyBullets(): Node[] {
        if (!GameManager.inst.bulletParentNode) {
            return [];
        }
        const nearbyBullets: Node[] = [];
        const allBullets = GameManager.inst.bulletParentNode.children;
        for (let bullet of allBullets) {
            const distance = Vec3.distance(this.node.position, bullet.position);
            if (distance <= this.detectionRange) {
                nearbyBullets.push(bullet);
            }
        }
        return nearbyBullets;
    }
    // 计算躲避方向
    private calculateDodgeDirection(bullets: Node[]): Vec3 {
        let dodgeDirection = new Vec3();
        for (let bullet of bullets) {
            const bulletToEnemy = Vec3.subtract(new Vec3(), this.node.position, bullet.position);
            bulletToEnemy.normalize();
            Vec3.add(dodgeDirection, dodgeDirection, bulletToEnemy);
        }
        dodgeDirection.normalize();
        return dodgeDirection;
    }
    // 移动敌机,躲避子弹
    private moveEnemy(dodgeDirection: Vec3, deltaTime: number) {
        if (dodgeDirection) {
            const moveVector = new Vec3(dodgeDirection.x * this.enemy1MoveSpeed * deltaTime, dodgeDirection.y * this.enemy1MoveSpeed * deltaTime, 0);
            const p = this.node.position;
            this.node.setPosition(p.x + moveVector.x, p.y + moveVector.y, p.z);
        }
    }

    stopMove() {
        this.enemy1MoveSpeed = 0;
    }
}


