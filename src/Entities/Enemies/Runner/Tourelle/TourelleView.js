import { Container, Graphics } from "pixi.js";

export default class TourelleView extends Container {
  #gunView;

  #collisionBox = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  constructor() {
    super();

    const view = new Graphics();
    view.setStrokeStyle({
      width: 2,
      color: 0xff0000,
    });
    view.circle(0, 0, 50);
    view.stroke();

    this.addChild(view);

    this.#gunView = new Graphics();
    this.#gunView.setStrokeStyle({
      width: 2,
      color: 0xff0000,
    });
    this.#gunView.rect(0, 0, 70, 10);
    this.#gunView.stroke();
    this.#gunView.pivot.x = 5;
    this.#gunView.pivot.y = 5;
    this.#gunView.x = 0;
    this.#gunView.y = 0;

    this.#collisionBox.width = 100;
    this.#collisionBox.height = 100;

    this.addChild(this.#gunView);
  }

  get gunRotation() {
    return this.#gunView.rotation;
  }

  set gunRotation(value) {
    this.#gunView.rotation = value;
  }

  get collisionBox() {
    this.#collisionBox.x = this.x - this.#collisionBox.width / 2;
    this.#collisionBox.y = this.y - this.#collisionBox.height / 2;

    return this.#collisionBox;
  }

  get hitBox() {
    return this.collisionBox;
  }
}
