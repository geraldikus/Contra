export default class DomTouchButton {
  #element;
  #isPressed = false;
  #onPressStart;
  #onPressEnd;

  constructor(label, className, onPressStart, onPressEnd) {
    this.#onPressStart = onPressStart;
    this.#onPressEnd = onPressEnd;

    this.#element = document.createElement("button");
    this.#element.type = "button";
    this.#element.className = `touch-btn ${className}`;
    this.#element.textContent = label;

    this.#setupEvents();
  }

  #setupEvents() {
    const onDown = (event) => {
      event.preventDefault();
      if (this.#isPressed) {
        return;
      }
      this.#isPressed = true;
      this.#element.classList.add("touch-btn--pressed");
      this.#onPressStart?.();
    };

    const onUp = () => {
      if (!this.#isPressed) {
        return;
      }
      this.#isPressed = false;
      this.#element.classList.remove("touch-btn--pressed");
      this.#onPressEnd?.();
    };

    this.#element.addEventListener("pointerdown", onDown);
    this.#element.addEventListener("pointerup", onUp);
    this.#element.addEventListener("pointercancel", onUp);
    this.#element.addEventListener("pointerleave", onUp);
  }

  get element() {
    return this.#element;
  }

  destroy() {
    this.#element.remove();
  }
}
