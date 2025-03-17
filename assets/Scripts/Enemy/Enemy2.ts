import { _decorator, Component, Node } from 'cc';
import { EnemyBase } from './EnemyBase';
const { ccclass, property } = _decorator;

@ccclass('Enemy2')
export class Enemy2 extends EnemyBase {
    @property
    protected hp: number = 2;
}
