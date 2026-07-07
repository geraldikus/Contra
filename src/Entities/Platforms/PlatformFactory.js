import { Graphics, PlaneGeometry } from "pixi.js";
import Platform from "./Platform";
import PlatformView from "./PlatformView.js";

export default class PlatformFactory {
  #platformWidth = 128;
  #platformHeight = 24;

  #worldContainer;
  constructor(worldContainer) {
    this.#worldContainer = worldContainer;
  }

  createPlatform(x, y) {
    const skin = new Graphics();
    skin
      .setStrokeStyle({ width: 1, color: 0x004220 })
      .rect(0, 0, this.#platformWidth, this.#platformHeight)
      .fill({ color: 0x00ff00 })
      .rect(
        0,
        this.#platformHeight,
        this.#platformWidth,
        this.#platformHeight * 20,
      )
      .fill({ color: 0x694216 })
      .stroke();

    const view = new PlatformView(this.#platformWidth, this.#platformHeight);
    view.addChild(skin);

    const platfom = new Platform(view);
    platfom.x = x;
    platfom.y = y;
    this.#worldContainer.background.addChild(view);

    return platfom;
  }

  createBox(x, y) {
    const skin = new Graphics();
    skin
      .setStrokeStyle({ width: 1, color: 0x004220 })
      .rect(0, 0, this.#platformWidth, this.#platformHeight)
      .fill(0x00ff00)
      .lineTo(this.#platformWidth, this.#platformHeight)
      .rect(
        0,
        this.#platformHeight,
        this.#platformWidth,
        this.#platformHeight * 20,
      )
      .fill({ color: 0x694216 })
      .stroke();

    const view = new PlatformView(this.#platformWidth, this.#platformHeight);
    view.addChild(skin);

    const platfom = new Platform(view);
    platfom.x = x;
    platfom.y = y;
    platfom.type = "box";
    this.#worldContainer.background.addChild(view);

    return platfom;
  }

  createStepBox(x, y) {
    const box = this.createBox(x, y);
    box.isStep = true;

    return box;
  }

  createWater(x, y) {
    const skin = new Graphics();
    skin
      .setStrokeStyle({ width: 1, color: 0x0000ff })
      .rect(0, -this.#platformHeight, this.#platformWidth, this.#platformHeight)
      .fill(0x0000ff)
      .lineTo(this.#platformWidth, this.#platformHeight)
      .stroke();

    const view = new PlatformView(this.#platformWidth, this.#platformHeight);
    view.addChild(skin);

    const platfom = new Platform(view);
    platfom.x = x;
    platfom.y = y;
    platfom.type = "box";
    this.#worldContainer.foreground.addChild(view);

    return platfom;
  }

  createBossWall(x, y) {
    const skin = new Graphics();
    skin
      .setStrokeStyle({ width: 1, color: 0x0000ff })
      .rect(0, 0, this.#platformWidth * 3, 600)
      .fill(0x0b1e0f2)
      .lineTo(this.#platformWidth * 3, 600)
      .stroke();

    const view = new PlatformView(this.#platformWidth * 3, 768);
    view.addChild(skin);

    const platfom = new Platform(view);
    platfom.x = x;
    platfom.y = y;
    platfom.type = "box";
    this.#worldContainer.background.addChild(view);

    return platfom;
  }

  createBridge(x, y) {
    const skin = new Graphics();
    skin
      .setStrokeStyle({ width: 1, color: 0x111111 })
      .rect(0, 0, this.#platformWidth, this.#platformHeight * 3)
      .fill({ color: 0xffffff })
      .stroke();

    const view = new PlatformView(this.#platformWidth, this.#platformHeight);
    view.addChild(skin);

    const platfom = new Platform(view);
    platfom.x = x;
    platfom.y = y;
    this.#worldContainer.background.addChild(view);

    return platfom;
  }
}
