export default class DomVirtualJoystick {
  #root;
  #stick;
  #isActive = false;
  #pointerId = null;
  #radius = 75;
  #deadzone = 15;
  #onDirectionChange;

  #activeDirections = {
    left: false,
    right: false,
    up: false,
    down: false,
  };

  constructor(onDirectionChange) {
    this.#onDirectionChange = onDirectionChange;

    this.#root = document.createElement("div");
    this.#root.className = "virtual-joystick";

    const base = document.createElement("div");
    base.className = "virtual-joystick__base";
    this.#root.appendChild(base);

    this.#stick = document.createElement("div");
    this.#stick.className = "virtual-joystick__stick";
    base.appendChild(this.#stick);

    this.#setupEvents(base);
  }

  #setupEvents(base) {
    base.addEventListener("pointerdown", (event) => {
      this.#isActive = true;
      this.#pointerId = event.pointerId;
      base.setPointerCapture(event.pointerId);
      this.#updateStick(event);
    });

    base.addEventListener("pointermove", (event) => {
      if (this.#isActive && event.pointerId === this.#pointerId) {
        this.#updateStick(event);
      }
    });

    const onEnd = (event) => {
      if (event.pointerId !== this.#pointerId) {
        return;
      }
      base.releasePointerCapture(event.pointerId);
      this.#reset();
    };

    base.addEventListener("pointerup", onEnd);
    base.addEventListener("pointercancel", onEnd);
  }

  #updateStick(event) {
    const rect = this.#root.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    let dx = event.clientX - centerX;
    let dy = event.clientY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > this.#radius) {
      dx = (dx / distance) * this.#radius;
      dy = (dy / distance) * this.#radius;
    }

    this.#stick.style.transform = `translate(${dx}px, ${dy}px)`;

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
        newDirections.right = dx > 0;
        newDirections.left = dx < 0;
      }
      if (Math.abs(dy) > this.#deadzone) {
        newDirections.down = dy > 0;
        newDirections.up = dy < 0;
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
    this.#stick.style.transform = "translate(0px, 0px)";

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

  get element() {
    return this.#root;
  }

  destroy() {
    this.#root.remove();
  }
}
