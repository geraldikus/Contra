import { Graphics, PlaneGeometry, Sprite } from "pixi.js";
import Platform from "./Platform";
import PlatformView from "./PlatformView.js";
import BridgePlatform from "./BridgePlatform.js";

export default class PlatformFactory {
  #platformWidth = 128;
  #platformHeight = 24;

  #worldContainer;
  #assets;
  constructor(worldContainer, assets) {
    this.#worldContainer = worldContainer;
    this.#assets = assets;
  }

  createPlatform(x, y) {
    const skin = this.#getGroundPlatform();
    const view = new PlatformView(this.#platformWidth, this.#platformHeight);
    view.addChild(skin);

    const platfom = new Platform(view);
    platfom.x = x;
    platfom.y = y;
    this.#worldContainer.background.addChild(view);

    return platfom;
  }

  createBox(x, y) {
    const skin = this.#getGroundPlatform();
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

    const platfom = new BridgePlatform(view);
    platfom.x = x;
    platfom.y = y;
    this.#worldContainer.background.addChild(view);

    return platfom;
  }

  #getGroundPlatform() {
    const grass = new Sprite(this.#assets.getTexture("platform0000"));
    const ground = new Sprite(this.#assets.getTexture("ground0000"));
    ground.y = grass.height - 1;

    const ground2 = new Sprite(this.#assets.getTexture("ground0000"));
    ground2.y = grass.height * 2 - 2;

    const ground3 = new Sprite(this.#assets.getTexture("ground0000"));
    ground3.y = grass.height * 3 - 4;

    grass.addChild(ground);
    grass.addChild(ground2);
    grass.addChild(ground3);

    return grass;
  }
}
