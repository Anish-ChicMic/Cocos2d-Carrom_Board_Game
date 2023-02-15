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
        this.createPucks(9, PUCK_TYPE.BLACK);
        this.createPucks(9, PUCK_TYPE.WHITE);
        this.createPucks(1, PUCK_TYPE.RED);

        // let pucks = this.node.getChildByName("carromBoard").getChildByName("initialCoinsArrangement").children;
        let carromBoardNode = this.node.getChildByName("carromBoard");
        let pucks = carromBoardNode.children.slice(2, carromBoardNode.children.length);

        this.arrangePucks(pucks, -44, 40);
        console.log(this.node.getChildByName("carromBoard").getChildByName("initialCoinsArrangement").children.length);
    }

    start() { }

    update(deltaTime: number) { }

    createPucks(noOfpucksReq: number, puckType: PUCK_TYPE) {
        for (let no = 0; no < noOfpucksReq; no++) {
            let newCrmcoin = instantiate(this.carromCoinPrefab);
            newCrmcoin.getComponent(crmCoinPrefabScript).setPuck(puckType);
            newCrmcoin.getComponent(UITransform).setContentSize(new Size(20, 20));
            // this.node.getChildByName("carromBoard").getChildByName("initialCoinsArrangement").addChild(newCrmcoin);
            this.node.getChildByName("carromBoard").addChild(newCrmcoin);
        }
    }

    arrangePucks(pucks: object, originX: number, originY: number) {

        /*
        The pattern that we are creating here is like this: path: assets\scripts\puckPattern.png
        Eg.  (40,45)-->  _______________
                        |               |    This is (100 x 100) box
                        |               |
                        |               |
                        |               |
                        |_______________|
                        
                        
        */




        // The below are the cartesion co-ordinates from where our arrangement of pucks will start, or these are the cartesion coordinates of virtual box
        // in which our pattern will formed. These are the coordinates from upper right corner as shown in above example.
        let initialPosX = originX;
        let initialPosY = originY;
        let initialPosZ = 0;


        let sizeOfVirtualBox = 100; // size of virtual box or box that we are imagining in which our pattern will be formed as drawn in above example
        let widthOfPuckCoinNode = pucks[0].getComponent(UITransform).width;

        let puckIndex = 0; // very first puck is present at index 0 in pucks array
        let noOfPucksInRow = 3; // It defines no. of puck coins required in ith row, currently it tells that 3 puck coins are required at 0th or 1st row
        let isNoOfPucksWillIncrease = true; // It is just a flag, which we use to identify wheather we need to increament the noOfPucksInRow variable or decreament

        for (let row = 1; row <= 5; row++) {
            let gap = sizeOfVirtualBox - (noOfPucksInRow * widthOfPuckCoinNode); // It defines the gap we need to insert from ends in each row
            let x = initialPosX + (gap / 2); // So we will start inserting the puck coins after leaving the some space (i.e gap variable amount space) from left
            for (let col = 1; col <= noOfPucksInRow; col++) {
                pucks[puckIndex].setPosition(new Vec3(x, initialPosY, initialPosZ));
                x += 22; // Here 22 is the amount of spacing that we are maintaining between each coin horizontally
                puckIndex++;
            }
            initialPosY -= 20; // Here 20 is the amount of spacing that we are maintaining between each coin vertically (or also can be said as each row)

            if (noOfPucksInRow === 5) isNoOfPucksWillIncrease = false; // If we reach at mid row, it means now our number of pucks will decreament.

            if (isNoOfPucksWillIncrease) noOfPucksInRow++;
            else noOfPucksInRow--;
        }
    }
}
