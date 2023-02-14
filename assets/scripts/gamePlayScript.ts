import { _decorator, Component, Node, instantiate, Sprite, Prefab, UITransform, Vec2, Size, Script, Vec3 } from "cc";
import { PUCK_TYPE } from "./Constants";
import { crmCoinPrefabScript } from "./crmCoinPrefabScript";
import { loadedRes } from "./loadedRes";

const { ccclass, property } = _decorator;

@ccclass("gamePlayScript")
export class gamePlayScript extends Component {
    @property(Prefab)
    carromCoinPrefab: Prefab | null = null;

    onLoad() {
        this.createPucks(9, PUCK_TYPE.BLACK, new Vec2(20, 30));
        this.createPucks(9, PUCK_TYPE.WHITE, new Vec2(50, 50));
        this.createPucks(1, PUCK_TYPE.RED, new Vec2(80, 60));

        let pucks = this.node.getChildByName("carromBoard").getChildByName("initialCoinsArrangement").children;

        this.arrangePucks(pucks);
    }

    start() {}

    update(deltaTime: number) {}

    createPucks(noOfpucksReq: number, puckType: PUCK_TYPE, pos: Vec2) {
        for (let no = 0; no < noOfpucksReq; no++) {
            let newCrmcoin = instantiate(this.carromCoinPrefab);
            newCrmcoin.getComponent(crmCoinPrefabScript).setPuck(puckType);
            newCrmcoin.getComponent(crmCoinPrefabScript).setPuckPosition(pos);
            newCrmcoin.getComponent(UITransform).setContentSize(new Size(20, 20));
            this.node.getChildByName("carromBoard").getChildByName("initialCoinsArrangement").addChild(newCrmcoin);
        }
    }

    arrangePucks(pucks) {
        let puckLength = pucks.length;
        let block = this.node.getChildByName("carromBoard").getChildByName("initialCoinsArrangement");
        let initialPosY = block.getPosition().y + 50;
        let initialPosX = block.getPosition().x - 50;
        let initialPosZ = block.getPosition().z;

        let puckNo = pucks.length - 1;
        let noOfPucksInRow = 3;
        let isInc = true;
        for (let row = 1; row <= 5 && puckNo >= 0; row++) {
            let gap = 100 - noOfPucksInRow * 20;
            let x = initialPosX + gap / 2;
            let y = initialPosY;
            for (let col = 1; col <= noOfPucksInRow; col++) {
                pucks[puckNo].setPosition(new Vec3(x, y, initialPosZ));
                x += 22;
                puckNo--;
            }
            initialPosY -= 20;

            if (noOfPucksInRow >= 5) {
                isInc = false;
            }
            if (isInc) noOfPucksInRow++;
            else noOfPucksInRow--;
        }
    }
}
