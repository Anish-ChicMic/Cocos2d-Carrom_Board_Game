import { _decorator, Component, Node, Input, EventMouse, Vec3, UITransform, Vec2} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('strikerScript')
export class strikerScript extends Component {
    
    StartPos=new Vec3(0,0,0);
        
    
    start() {
        this.node.getChildByName("targetCircle").active = false;
        
        this.node.on(Input.EventType.TOUCH_START, (event)=>{
            console.log("touched::::");
            let touchStartPos = event.getUILocation();
            this.StartPos=touchStartPos;
            console.log("start: "+ touchStartPos);
            
        }, this)
        
        this.node.on(Input.EventType.TOUCH_MOVE, (event)=>{
            if(this.StartPos!=null){
                this.node.getChildByName("targetCircle").active = true;
                
                let movePos = event.getUILocation();
                let diffX = (movePos.x - this.StartPos.x);
                let diffY = (movePos.y - this.StartPos.y);
                
                let euldianDist = Math.sqrt((diffX*diffX) + (diffY*diffY))
                if(euldianDist*0.015<1.25){
                    this.node.getChildByName("targetCircle").setScale(euldianDist*0.015,euldianDist*0.015);
                }
                
                let angleTheta = (Math.atan2(diffY, diffX));
                this.node.getChildByName("targetCircle").angle = angleTheta * 180/Math.PI + 90;
            }

        }, this)

        this.node.on(Input.EventType.TOUCH_CANCEL, (event)=>{
            console.log("touched end:::");
            this.node.getChildByName("targetCircle").active = false;
        })

        

    }

    update(deltaTime: number) {
        
    }
}

