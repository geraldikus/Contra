import { PlaneGeometry } from "pixi.js";
import Platform from "./Platform";

export default class PlatformFactory {
  #pixiApp;
  constructor(pixiApp) {
    this.#pixiApp = pixiApp;
  }

  createPlatform(x, y) {
    const platfom = new Platform();
    platfom.x = x;
    platfom.y = y;
    this.#pixiApp.stage.addChild(platfom);

    return platfom;
  }
}
