import { _decorator, Component, Node, Collider2D, Contact2DType, RigidBody, RigidBody2D, Vec3, Vec2, find, AudioSource } from 'cc';
import { SoundManager } from './audioManager/audioManagerSingleton';
import { crmCoinPrefabScript } from './crmCoinPrefabScript';
import { gamePlayScript } from './gamePlayScript';
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


    score: number = 0;
    hole1Collider: Collider2D = null;
    hole2Collider: Collider2D = null;
    hole3Collider: Collider2D = null;
    hole4Collider: Collider2D = null;
    isRed = false;
    // pucksArr;

    start() {

        this.hole1Collider = this.hole1.getComponent(Collider2D);
        this.hole2Collider = this.hole2.getComponent(Collider2D);
        this.hole3Collider = this.hole3.getComponent(Collider2D);
        this.hole4Collider = this.hole4.getComponent(Collider2D);

        this.checkCollision();
    }

    update(deltaTime: number) {
        console.log("score: " + this.score);

    }

    colliderCollision(holeCollider: Collider2D): number {
        if (holeCollider) {

            holeCollider.on(Contact2DType.BEGIN_CONTACT, (self: Collider2D, other: Collider2D) => {
                let audioSrc = this.node.getComponent(AudioSource);
                let ins = SoundManager.getInstance();
                ins.init(audioSrc);
                ins.playMusic(false);
                // console.log("Game play: ", gamePlayScript.singleTonIns)
                if (other.node.name === "strikerCoin") {
                    console.log("It is a striker");
                    this.score -= 10;
                    other.node.getComponent(RigidBody2D).linearVelocity = new Vec2(0, 0);
                    // other.node.getComponent(RigidBody).enabled = false;
                    other.node.setPosition(50, 100);

                    // let canv = find('canvas');

                    return 0;
                }
                else {
                    console.log(other.node.getComponent(crmCoinPrefabScript).coinPuckType);
                    let puckNode = other.node.getComponent(RigidBody2D);
                    let puckType = other.node.getComponent(crmCoinPrefabScript).coinPuckType;

                    switch (puckType) {
                        case 1: {
                            this.score += 10;
                            puckNode.linearVelocity = new Vec2(0, 0);
                            setTimeout(() => {
                                other.node.destroy();
                            }, 1000);

                            // this.pucksArr.push(other.node);

                            if (this.isRed) this.score += 50;
                            this.isRed = true;
                            // rePosOfStk(); // reposition of striker
                            return 10;

                        }
                        case 2: {
                            this.score += 20;
                            puckNode.linearVelocity = new Vec2(0, 0);
                            setTimeout(() => {
                                other.node.destroy();
                            }, 1000);

                            // rePosOfStk(); 
                            if (this.isRed) this.score += 50;
                            this.isRed = true;
                            return 20;
                        }
                        case 3: {
                            console.log("You pot a red puck! Now put one more ....");
                            this.isRed = true;
                        }
                        default: {
                            console.log("You didn't pot any puck!");
                            return 0;
                        }
                    }

                }

            });

            return 0;

        }
    }


    checkCollision(): number {
        let scoreTaken = 0;
        if (this.hole1Collider) {
            let rst = this.colliderCollision(this.hole1Collider);
            // scoreTaken = scoreTaken | rst;

        }

        if (this.hole2Collider) {
            let rst = this.colliderCollision(this.hole2Collider)
            // scoreTaken = scoreTaken | rst;
        }


        if (this.hole3Collider) {
            let rst = this.colliderCollision(this.hole3Collider);
            // scoreTaken = scoreTaken | rst;
        }

        if (this.hole4Collider) {
            let rst = this.colliderCollision(this.hole4Collider);
            // scoreTaken = scoreTaken | rst;
        }

        return scoreTaken;

    }
}

