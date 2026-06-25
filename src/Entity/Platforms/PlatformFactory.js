import { PlaneGeometry } from "pixi.js";
import Platform from "./Platform";
import Box from "./Box";

export default class PlatformFactory {
  #worldContainer;
  constructor(worldContainer) {
    this.#worldContainer = worldContainer;
  }

  createPlatform(x, y) {
    const platfom = new Platform();
    platfom.x = x;
    platfom.y = y;
    this.#worldContainer.addChild(platfom);

    return platfom;
  }

  createBox(x, y) {
    const box = new Box();
    box.x = x;
    box.y = y;
    this.#worldContainer.addChild(box);

    return box;
  }
}
