import { _decorator, Component, Node, SpriteFrame, Sprite, Vec2, Enum } from "cc";
import { PUCK_TYPE } from "./Constants";
const { ccclass, property } = _decorator;

@ccclass("crmCoinPrefabScript")
export class crmCoinPrefabScript extends Component {
    @property(SpriteFrame)
    redFrame: SpriteFrame = null!;

    @property(SpriteFrame)
    blackFrame: SpriteFrame = null!;

    @property(SpriteFrame)
    whiteFrame: SpriteFrame = null!;

    // @property({ type: Enum(PUCK_TYPE) })
    // coinPuckType: PUCK_TYPE = PUCK_TYPE.NONE;

    coinPuckType: PUCK_TYPE = PUCK_TYPE.NONE;

    onLoad() {}
    start() {}
    update(deltaTime: number) {}

    setPuck(puckType: PUCK_TYPE) {
        switch (puckType) {
            case PUCK_TYPE.BLACK: {
                this.coinPuckType = puckType;
                this.node.getComponent(Sprite).spriteFrame = this.blackFrame;
                break;
            }
            case PUCK_TYPE.WHITE: {
                this.coinPuckType = puckType;
                this.node.getComponent(Sprite).spriteFrame = this.whiteFrame;
                break;
            }
            case PUCK_TYPE.RED: {
                this.coinPuckType = puckType;
                this.node.getComponent(Sprite).spriteFrame = this.redFrame;
                break;
            }
        }
    }

    setPuckPosition(pos: Vec2) {
        this.node.setPosition(pos.x, pos.y);
    }
}
