import { _decorator, Component, Node, Slider, Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("strikerSliderScript")
export class strikerSliderScript extends Component {

    @property(Node)
    striker: Node | null = null;
    

    
    width = 190;
    initialPos = -95;
    onLoad() {
        // Setting initial position
        this.node.getComponent(Slider).progress = 0.5;
        let pos = this.striker.getPosition();
        this.striker.setPosition(0, pos.y, pos.z);

        // moving striker
        this.node.on('slide', this.moveStriker, this);
    }

    start() {}

    update(deltaTime: number) {}


    moveStriker() {

        let progress = this.node.getComponent(Slider).progress;
        progress = progress * this.width;
        let pos = this.striker.getPosition();
        this.striker.setPosition(new Vec3(this.initialPos + progress, pos.y, pos.z));
    }
}
