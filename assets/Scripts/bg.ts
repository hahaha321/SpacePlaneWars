import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('bg')
export class bg extends Component {
    @property(Node)
    bg01: Node = null;
    @property(Node)
    bg02: Node = null;
    @property
    moveSpeed: number = 0;

    update(deltaTime: number) {
        let bg01Pos = this.bg01.getPosition();
        this.bg01.setPosition(bg01Pos.x, bg01Pos.y - this.moveSpeed * deltaTime, bg01Pos.z);


        let bg02Pos = this.bg02.getPosition();
        this.bg02.setPosition(bg02Pos.x, bg02Pos.y - this.moveSpeed * deltaTime, bg02Pos.z);

        if (bg01Pos.y <= -1290) {
            this.bg01.setPosition(bg01Pos.x, bg02Pos.y + 1280, bg01Pos.z);
        }

        if (bg02Pos.y <= -1290) {
            this.bg02.setPosition(bg02Pos.x, bg01Pos.y + 1280, bg02Pos.z);
        }
        
    }
}


