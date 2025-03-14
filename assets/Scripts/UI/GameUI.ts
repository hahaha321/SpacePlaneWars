import { _decorator, Component, Label, Node } from 'cc';
import { GameManager } from '../Manager/GameManager';
import { PlayerLevelManager } from '../Manager/PlayerLevelManager';
import { Player } from '../Player';
const { ccclass, property } = _decorator;

@ccclass('GameUI')
export class GameUI extends Component {
    @property(Label)
    scoreLabel: Label = null;
    @property(Label)
    ExpLabel: Label = null;
    @property(Label)
    LevelLabel: Label | null = null;
    @property(Label)
    HPLabel: Label | null = null;
    @property(Player)
    player: Player = null;

    protected start(): void {
        this.updateDisplay();
    }

    update(deltaTime: number) {
        this.scoreLabel.string = '得分' + GameManager.inst.score.toString();
        this.updateDisplay();
    }

    private updateDisplay() {
        if (this.LevelLabel && this.ExpLabel) {
            const level = PlayerLevelManager.inst.getLevel();
            const currentExp = PlayerLevelManager.inst.getCurrentExp();
            this.LevelLabel.string = `等级: ${level}`;
            this.ExpLabel.string = `经验值: ${currentExp}`;
        }
        if (this.HPLabel) {
            this.HPLabel.string = `生命值: ${this.player.HP}`;
        }
    }
}


