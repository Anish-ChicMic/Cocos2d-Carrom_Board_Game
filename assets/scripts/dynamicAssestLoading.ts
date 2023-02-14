import {
  _decorator,
  Component,
  Node,
  resources,
  SpriteFrame,
  instantiate,
  Sprite,
  assetManager,
  Texture2D,
  tween,
} from "cc";

import { loadedRes } from "./loadedRes";
const { ccclass, property } = _decorator;

@ccclass("dynamicAssestLoading")
export class dynamicAssestLoading extends Component {
  onLoad() {
    // Loading resource
    // resources.load("Avatars/1/spriteFrame", SpriteFrame, (err, sprite) => {
    //   if (!err) {
    //     console.log("Assest Loaded!");
    //     this.node
    //       .getChildByName("avtarSprite")
    //       .getComponent(Sprite).spriteFrame = sprite;
    //   } else {
    //     console.log("Error Occured");
    //     console.log(err);
    //   }
    // });


    

    // Loading directory
    let ref = this;
    resources.loadDir("Avatars", SpriteFrame, function (err, assets) {
      if (!err) {
        let length = assets.length;
        let i = 0;
        setInterval(function(){
          console.log("id")
          let a = "1"
          ref.node.getChildByName("avtarSprite").getComponent(Sprite).spriteFrame = assets[i%length];
          i++;
        }, 100);

        console.log(assets[0]);
      } 
      else {
        console.log("Error Occured!");
      }
    });

    // let newIs = loadedRes.getInstance();
    // let res = newIs.resourceLoad("Avatars");
    // res.then((res)=>{
    //   console.log("In main script: size of spArr is " + newIs.spritesArray.length)
    //   this.node.getChildByName("avtarSprite").getComponent(Sprite).spriteFrame = newIs.spritesArray[0];
    // }).catch(err=>console.log("Some error occured in catch!"));
    
    let loadBar = this.node.getChildByName("loadBar");
    tween(loadBar)
      .by(1, {angle: -360})
      .repeatForever()
      .start()
        

      
  }

  start() {}

  update(deltaTime: number) {}
}
