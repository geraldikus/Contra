import { Circle, Container, Graphics, Text, TextStyle } from "pixi.js";

export default class TouchButton {
  #container;
  #background;
  #label;
  #radius;
  #isPressed = false;
  #onPressStart;
  #onPressEnd;

  constructor(x, y, radius, label, onPressStart, onPressEnd) {
    this.#radius = radius;
    this.#onPressStart = onPressStart;
    this.#onPressEnd = onPressEnd;

    this.#container = new Container();
    this.#container.x = x;
    this.#container.y = y;

    this.#background = new Graphics();
    this.#drawBackground(false);
    this.#container.addChild(this.#background);

    const style = new TextStyle({
      fontFamily: "Arial",
      fontSize: 18,
      fill: 0xffffff,
      fontWeight: "bold",
    });
    this.#label = new Text({ text: label, style });
    this.#label.anchor.set(0.5);
    this.#container.addChild(this.#label);

    this.#container.eventMode = "static";
    this.#container.hitArea = new Circle(0, 0, radius);

    this.#setupEvents();
  }

  #drawBackground(pressed) {
    this.#background.clear();
    this.#background.circle(0, 0, this.#radius);
    this.#background.fill({
      color: pressed ? 0x555555 : 0x333333,
      alpha: 0.6,
    });
    this.#background.stroke({ color: 0xffffff, width: 2, alpha: 0.8 });
  }

  #setupEvents() {
    this.#container.on("pointerdown", () => {
      this.#isPressed = true;
      this.#drawBackground(true);
      this.#onPressStart?.();
    });

    this.#container.on("pointerup", () => {
      if (this.#isPressed) {
        this.#isPressed = false;
        this.#drawBackground(false);
        this.#onPressEnd?.();
      }
    });

    this.#container.on("pointerupoutside", () => {
      if (this.#isPressed) {
        this.#isPressed = false;
        this.#drawBackground(false);
        this.#onPressEnd?.();
      }
    });
  }

  get view() {
    return this.#container;
  }

  setPosition(x, y) {
    this.#container.x = x;
    this.#container.y = y;
  }

  destroy() {
    this.#container.destroy({ children: true });
  }
}
