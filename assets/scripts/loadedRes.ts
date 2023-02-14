import {
  _decorator,
  Component,
  Node,
  resources,
  SpriteFrame,
  Sprite,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("loadedRes")
export class loadedRes extends Component {
  spritesArray: SpriteFrame[] = [];

  private static instance: loadedRes = null;
  private loadedRes() {}
  static getInstance(): loadedRes {
    if (!this.instance) {
      this.instance = new loadedRes();
      console.log("creating new instance!");
    }
    return loadedRes.instance;
  }
  /**
   * @description resourceLoading
   * @param folder name
   * @returns void
   */

  resourceLoad(folder: string) {
    return new Promise((resolve, reject) => {
      if (this.spritesArray.length > 0) {
        console.log("Resource Loading: Resources already exists!")
        resolve(this.spritesArray);
      }
      // resources.preloadDir(folder, SpriteFrame)
      else {
        console.log("Loading resources now!")


        resources.loadDir(folder, SpriteFrame, (err: Error, assets: SpriteFrame[]) => {
          if (err) {
            reject(err);
          } else {
              this.spritesArray = assets;
              console.log("spritesArray filled!")
              console.log("size of spArr: " + this.spritesArray.length)
              console.log("size of spArr: " + this.spritesArray[0])
          }

          resolve(this.spritesArray);
        });
      }
    });
  }


  start() {}

  update(deltaTime: number) {}
}
