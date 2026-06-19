import { PlaneGeometry } from "pixi.js";
import Platform from "./Platform";
import Box from "./Box";

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

  createBox(x, y) {
    const box = new Box();
    box.x = x;
    box.y = y;
    this.#pixiApp.stage.addChild(box);

    return box;
  }
}
