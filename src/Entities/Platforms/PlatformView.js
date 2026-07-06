import { Container, Graphics } from "pixi.js";

export default class PlatformView extends Container {
  #collisionBox = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  constructor(width, height) {
    super();

    const view = new Graphics();

    this.#collisionBox.width = width;
    this.#collisionBox.height = height;
  }

  get collisionBox() {
    this.#collisionBox.x = this.x;
    this.#collisionBox.y = this.y;

    return this.#collisionBox;
  }
}
