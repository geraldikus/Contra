import { Circle, Container, Graphics } from "pixi.js";

export default class VirtualJoystick {
  #container;
  #base;
  #stick;
  #isActive = false;
  #pointerId = null;
  #radius = 60;
  #stickRadius = 25;
  #deadzone = 10;
  #onDirectionChange;

  #activeDirections = {
    left: false,
    right: false,
    up: false,
    down: false,
  };

  constructor(x, y, onDirectionChange) {
    this.#onDirectionChange = onDirectionChange;

    this.#container = new Container();
    this.#container.x = x;
    this.#container.y = y;

    this.#base = new Graphics();
    this.#base.circle(0, 0, this.#radius);
    this.#base.fill({ color: 0x333333, alpha: 0.5 });
    this.#base.stroke({ color: 0xffffff, width: 2, alpha: 0.6 });
    this.#container.addChild(this.#base);

    this.#stick = new Graphics();
    this.#stick.circle(0, 0, this.#stickRadius);
    this.#stick.fill({ color: 0xffffff, alpha: 0.8 });
    this.#container.addChild(this.#stick);

    this.#container.eventMode = "static";
    this.#container.hitArea = new Circle(0, 0, this.#radius);

    this.#setupEvents();
  }

  #setupEvents() {
    this.#container.on("pointerdown", (event) => {
      this.#isActive = true;
      this.#pointerId = event.pointerId;
      this.#updateStick(event.global);
    });

    this.#container.on("globalpointermove", (event) => {
      if (this.#isActive && event.pointerId === this.#pointerId) {
        this.#updateStick(event.global);
      }
    });

    this.#container.on("pointerup", (event) => {
      if (event.pointerId === this.#pointerId) {
        this.#reset();
      }
    });

    this.#container.on("pointerupoutside", (event) => {
      if (event.pointerId === this.#pointerId) {
        this.#reset();
      }
    });

    this.#container.on("pointercancel", (event) => {
      if (event.pointerId === this.#pointerId) {
        this.#reset();
      }
    });
  }

  #updateStick(globalPosition) {
    const localPos = this.#container.toLocal(globalPosition);

    let dx = localPos.x;
    let dy = localPos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > this.#radius) {
      dx = (dx / distance) * this.#radius;
      dy = (dy / distance) * this.#radius;
    }

    this.#stick.x = dx;
    this.#stick.y = dy;

    this.#updateDirections(dx, dy, distance);
  }

  #updateDirections(dx, dy, distance) {
    const newDirections = {
      left: false,
      right: false,
      up: false,
      down: false,
    };

    if (distance > this.#deadzone) {
      if (Math.abs(dx) > this.#deadzone) {
        if (dx > 0) {
          newDirections.right = true;
        } else {
          newDirections.left = true;
        }
      }

      if (Math.abs(dy) > this.#deadzone) {
        if (dy > 0) {
          newDirections.down = true;
        } else {
          newDirections.up = true;
        }
      }
    }

    if (this.#hasChanged(newDirections)) {
      this.#activeDirections = newDirections;
      this.#onDirectionChange?.(newDirections);
    }
  }

  #hasChanged(newDirections) {
    return (
      newDirections.left !== this.#activeDirections.left ||
      newDirections.right !== this.#activeDirections.right ||
      newDirections.up !== this.#activeDirections.up ||
      newDirections.down !== this.#activeDirections.down
    );
  }

  #reset() {
    this.#isActive = false;
    this.#pointerId = null;
    this.#stick.x = 0;
    this.#stick.y = 0;

    const resetDirections = {
      left: false,
      right: false,
      up: false,
      down: false,
    };

    if (this.#hasChanged(resetDirections)) {
      this.#activeDirections = resetDirections;
      this.#onDirectionChange?.(resetDirections);
    }
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
