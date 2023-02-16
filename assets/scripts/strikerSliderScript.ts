import { _decorator, Component, Node, Slider, Vec3, Input, input, UITransform, Size, tween, find, misc} from "cc";
const { ccclass, property } = _decorator;

@ccclass("strikerSliderScript")
export class strikerSliderScript extends Component {

    @property(Node)
    strikerNode: Node | null = null;
    

    
    width = 190;
    initialPos = -95;
    onLoad() {
        // Setting initial position
        this.node.getComponent(Slider).progress = 0.5;
        let pos = this.strikerNode.getPosition();
        this.strikerNode.setPosition(0, pos.y, pos.z);
        tween(this.strikerNode.children[2])
                .by(20, {angle: 360})
                .repeatForever()
                .start()

        

        //
        this.node.on(Input.EventType.TOUCH_START, ()=>{
            this.strikerNode.children[0].getComponent(UITransform).setContentSize(new Size(40,40));
            this.strikerNode.children[2].active = false;
            console.log(this.strikerNode.children.length);
        }, this)
        
        
        
        // moving striker
        this.node.on('slide', this.moveStriker, this);
        
        
        this.node.on(Input.EventType.TOUCH_CANCEL, ()=>{
            this.strikerNode.children[0].getComponent(UITransform).setContentSize(new Size(80,80));
            this.strikerNode.children[2].active = true;
            tween(this.strikerNode.children[2])
                .by(20, {angle: 360})
                .repeatForever()
                .start()
            console.log("afdf")
        }, this)
        
        this.node.on(Input.EventType.TOUCH_END, ()=>{
            this.strikerNode.children[0].getComponent(UITransform).setContentSize(new Size(80,80));
            this.strikerNode.children[2].active = true;
            tween(this.strikerNode.children[2])
                .by(20, {angle: 360})
                .repeatForever()
                .start()
            console.log("sdfdsa ")
        }, this)

    }

    start() {}

    update(deltaTime: number) {}


    moveStriker() {
        let progress = this.node.getComponent(Slider).progress;
        progress = progress * this.width;
        let pos = this.strikerNode.getPosition();
        this.strikerNode.setPosition(new Vec3(this.initialPos + progress, pos.y, pos.z));
    }
}
