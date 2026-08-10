import DomTouchButton from "./DomTouchButton.js";
import DomVirtualJoystick from "./DomVirtualJoystick.js";

export default class TouchControlsManager {
  #pixiApp;
  #keyboardProcessor;
  #bar;
  #leftColumn;
  #joystick;
  #jumpButton;
  #shootButton;
  #onResize;

  constructor(pixiApp, keyboardProcessor) {
    this.#pixiApp = pixiApp;
    this.#keyboardProcessor = keyboardProcessor;
    this.#bar = document.getElementById("touch-controls-bar");

    if (!this.#bar) {
      return;
    }

    this.#bar.hidden = true;
    this.#createControls();

    this.#onResize = () => this.#syncBarWidth();
    window.addEventListener("resize", this.#onResize);
    this.#syncBarWidth();
  }

  #createControls() {
    this.#leftColumn = document.createElement("div");
    this.#leftColumn.className = "touch-controls-left";
    this.#bar.appendChild(this.#leftColumn);

    this.#jumpButton = new DomTouchButton(
      "JUMP",
      "touch-btn--jump",
      () => this.#keyboardProcessor.pressButton("KeyS"),
      () => this.#keyboardProcessor.releaseButton("KeyS"),
    );
    this.#leftColumn.appendChild(this.#jumpButton.element);

    this.#shootButton = new DomTouchButton(
      "SHOOT",
      "touch-btn--shoot",
      () => this.#keyboardProcessor.pressButton("KeyA"),
      () => this.#keyboardProcessor.releaseButton("KeyA"),
    );
    this.#leftColumn.appendChild(this.#shootButton.element);

    const rightColumn = document.createElement("div");
    rightColumn.className = "touch-controls-right";
    this.#bar.appendChild(rightColumn);

    this.#joystick = new DomVirtualJoystick((directions) =>
      this.#onJoystickChange(directions),
    );
    rightColumn.appendChild(this.#joystick.element);
  }

  #onJoystickChange(directions) {
    this.#syncDirection("ArrowLeft", directions.left);
    this.#syncDirection("ArrowRight", directions.right);
    this.#syncDirection("ArrowUp", directions.up);
    this.#syncDirection("ArrowDown", directions.down);
  }

  #syncDirection(keyName, isPressed) {
    const wasPressed = this.#keyboardProcessor.isButtonPressed(keyName);

    if (isPressed && !wasPressed) {
      this.#keyboardProcessor.pressButton(keyName);
    } else if (!isPressed && wasPressed) {
      this.#keyboardProcessor.releaseButton(keyName);
    }
  }

  #syncBarWidth() {
    if (!this.#bar) {
      return;
    }

    const canvas = this.#pixiApp.canvas;
    const width = canvas.offsetWidth || canvas.clientWidth;
    if (width > 0) {
      this.#bar.style.width = `${width}px`;
    }
  }

  show() {
    if (this.#bar) {
      this.#bar.hidden = false;
      this.#syncBarWidth();
      window.dispatchEvent(new Event("resize"));
    }
  }

  hide() {
    if (this.#bar) {
      this.#bar.hidden = true;
    }
    this.#releaseAllInputs();
  }

  #releaseAllInputs() {
    this.#keyboardProcessor.releaseButton("KeyS");
    this.#keyboardProcessor.releaseButton("KeyA");
    this.#keyboardProcessor.releaseButton("ArrowLeft");
    this.#keyboardProcessor.releaseButton("ArrowRight");
    this.#keyboardProcessor.releaseButton("ArrowUp");
    this.#keyboardProcessor.releaseButton("ArrowDown");
  }

  destroy() {
    window.removeEventListener("resize", this.#onResize);
    this.#releaseAllInputs();
    this.#joystick?.destroy();
    this.#jumpButton?.destroy();
    this.#shootButton?.destroy();
    this.#bar?.replaceChildren();
  }
}
