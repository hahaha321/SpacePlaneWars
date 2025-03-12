import { _decorator, Component, Label, Node } from 'cc';
import { GameManager } from '../Manager/GameManager';
const { ccclass, property } = _decorator;

@ccclass('GameUI')
export class GameUI extends Component {
    @property(Label)
    scoreLabel: Label = null;

    update(deltaTime: number) {
        this.scoreLabel.string = GameManager.inst.score.toString();
    }
}


