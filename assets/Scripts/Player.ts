import { _decorator, Component, EventTouch, input, Input, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
    @property(Prefab)
    bulletPrefab: Prefab = null;
    protected onLoad(): void {
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.schedule(this.shoot, 1);
    }

    protected onDestroy(): void {
        input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
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

    shoot() {
        if (this.bulletPrefab) {
            const bullet = instantiate(this.bulletPrefab);
            bullet.setPosition(this.node.position);
            this.node.parent?.addChild(bullet);
        }
    }
}


