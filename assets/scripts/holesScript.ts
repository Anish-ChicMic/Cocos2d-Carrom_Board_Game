import { _decorator, Component, Node, Collider2D, Contact2DType, RigidBody, RigidBody2D, Vec3, Vec2 } from 'cc';
import { crmCoinPrefabScript } from './crmCoinPrefabScript';
const { ccclass, property } = _decorator;

@ccclass('holesScript')
export class holesScript extends Component {
    @property(Node)
    hole1: Node | null = null;

    @property(Node)
    hole2: Node | null = null;

    @property(Node)
    hole3: Node | null = null;

    @property(Node)
    hole4: Node | null = null;


    start() {
        let hole1Collider = this.hole1.getComponent(Collider2D);
        let hole2Collider = this.hole2.getComponent(Collider2D);
        let hole3Collider = this.hole3.getComponent(Collider2D);
        let hole4Collider = this.hole4.getComponent(Collider2D);

        // console.log(hole1Collider);
        this.checkCollision(hole1Collider, hole2Collider, hole3Collider, hole4Collider);
    }

    update(deltaTime: number) {

    }


    checkCollision(hole1Collider, hole2Collider, hole3Collider, hole4Collider) {
        let score = 0;

        if (hole1Collider) {
            hole1Collider.on(Contact2DType.BEGIN_CONTACT, (self: Collider2D, other: Collider2D) => {
                if (other.node.name === "strikerCoin") {
                    console.log("It is a striker");
                    score -= 10;
                    other.node.getComponent(RigidBody2D).linearVelocity = new Vec2(0, 0);
                    // other.node.getComponent(RigidBody).enabled = false;
                    other.node.setPosition(50, 100);
                }
                else {
                    console.log(other.node.getComponent(crmCoinPrefabScript).coinPuckType);
                    let puckType = other.node.getComponent(crmCoinPrefabScript).coinPuckType;
                    if (puckType === 1) score += 10;
                    else if (puckType === 2) score += 20;
                    else if (puckType === 3) score += 50;

                    other.node.getComponent(RigidBody2D).linearVelocity = new Vec2(0, 0);
                    setTimeout(() => {
                        other.node.destroy();
                    }, 5000);
                    // other.node.destroy();
                }
                console.log("collsion happend!")
                console.log("score; " + score);
            });
        }

        if (hole2Collider) {
            hole2Collider.on(Contact2DType.BEGIN_CONTACT, (self: Collider2D, other: Collider2D) => {
                if (other.node.name === "strikerCoin") {
                    console.log("It is a striker");
                    score -= 10;
                    // other.node.getComponent(RigidBody).enabled = false;
                    other.node.setPosition(50, 100);
                }
                else {
                    console.log(other.node.getComponent(crmCoinPrefabScript).coinPuckType);
                    let puckType = other.node.getComponent(crmCoinPrefabScript).coinPuckType;
                    if (puckType === 1) score += 10;
                    else if (puckType === 2) score += 20;
                    else if (puckType === 3) score += 50;

                    setTimeout(() => {
                        other.node.destroy();
                    }, 1);
                }
                console.log("collsion happend!")
                console.log("score; " + score);
            });
        }


        if (hole3Collider) {
            hole3Collider.on(Contact2DType.BEGIN_CONTACT, (self: Collider2D, other: Collider2D) => {
                if (other.node.name === "strikerCoin") {
                    console.log("It is a striker");
                    score -= 10;
                    // other.node.getComponent(RigidBody).enabled = false;
                    other.node.setPosition(50, 100);
                }
                else {
                    console.log(other.node.getComponent(crmCoinPrefabScript).coinPuckType);
                    let puckType = other.node.getComponent(crmCoinPrefabScript).coinPuckType;
                    if (puckType === 1) score += 10;
                    else if (puckType === 2) score += 20;
                    else if (puckType === 3) score += 50;

                    setTimeout(() => {
                        other.node.destroy();
                    }, 1);
                }
                console.log("collsion happend!")
                console.log("score; " + score);
            });
        }

        if (hole4Collider) {
            hole4Collider.on(Contact2DType.BEGIN_CONTACT, (self: Collider2D, other: Collider2D) => {
                if (other.node.name === "strikerCoin") {
                    console.log("It is a striker");
                    score -= 10;
                    // other.node.getComponent(RigidBody).enabled = false;
                    other.node.setPosition(50, 100);
                }
                else {
                    console.log(other.node.getComponent(crmCoinPrefabScript).coinPuckType);
                    let puckType = other.node.getComponent(crmCoinPrefabScript).coinPuckType;
                    if (puckType === 1) score += 10;
                    else if (puckType === 2) score += 20;
                    else if (puckType === 3) score += 50;

                    setTimeout(() => {
                        other.node.destroy();
                    }, 1);
                }
                console.log("collsion happend!")
                console.log("score; " + score);

            });
        }

    }
}

