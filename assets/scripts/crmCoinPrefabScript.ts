import { _decorator, Component, Node, SpriteFrame, Sprite, Vec2, Enum, Collider2D, Contact2DType } from "cc";
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

    onLoad() { }
    start() {
        // let collider = this.getComponent(Collider2D);
        // if (collider) {
        //     collider.on(Contact2DType.BEGIN_CONTACT, (self: Collider2D, other: Collider2D) => {
        //         console.log("collsion happend!")
        //     });
        //     // console.log(other.)

        // }
    }
    update(deltaTime: number) { }

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
