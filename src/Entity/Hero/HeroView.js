import { Container, Graphics } from "pixi.js";

export default class HeroView extends Container {
  #bounds = {
    width: 0,
    height: 0,
  };

  #collisionBox = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  #stm = {
    currentState: "default",
    states: {},
  };

  #rootNode;

  constructor() {
    super();

    this.#createNodeStructure();
    this.#rootNode.pivot.x = 10;
    this.#rootNode.x = 10;
    this.#bounds.width = 20;
    this.#bounds.height = 90;
    this.#collisionBox.width = this.#bounds.width;
    this.#collisionBox.height = this.#bounds.height;

    this.#stm.states.stay = this.#getStayImage();
    this.#stm.states.stayUp = this.#getStayUpImage();
    this.#stm.states.run = this.#getRunImage();
    this.#stm.states.runUp = this.#getRunUpImage();
    this.#stm.states.runDown = this.#getRunDownImage();
    this.#stm.states.lay = this.#getLayImage();
    this.#stm.states.jump = this.#getJumpImage();
    this.#stm.states.fall = this.#getFallImage();

    for (let key in this.#stm.states) {
      this.#rootNode.addChild(this.#stm.states[key]);
    }

    // this.#rootNode.scale *= -1;
    // this.addChild(this.#rootNode);
  }

  get collisionBox() {
    this.#collisionBox.x = this.x;
    this.#collisionBox.y = this.y;
    return this.#collisionBox;
  }

  showStay() {
    this.#toState("stay");
  }

  showStayUp() {
    this.#toState("stayUp");
  }

  showRun() {
    this.#toState("run");
  }

  showRunUp() {
    this.#toState("runUp");
  }

  showRunDown() {
    this.#toState("runDown");
  }

  showLay() {
    this.#toState("lay");
  }

  showJump() {
    this.#toState("jump");
  }

  showFall() {
    this.#toState("fall");
  }

  flip(direction) {
    switch (direction) {
      case 1:
      case -1:
        this.#rootNode.scale.x = direction;
    }
  }

  #toState(key) {
    if (this.#stm.currentState == key) {
      return;
    }
    for (let key in this.#stm.states) {
      this.#stm.states[key].visible = false;
    }
    this.#stm.states[key].visible = true;
    this.#stm.currentState = key;
  }

  #createNodeStructure() {
    const rootNode = new Container();
    this.addChild(rootNode);
    this.#rootNode = rootNode;
  }

  #getStayImage() {
    const view = new Graphics();
    view
      .setStrokeStyle({ width: 1, color: 0xffff00 })
      .rect(0, 0, 20, 90)
      .rect(0, 30, 70, 5)
      .stroke();
    return view;
  }

  #getStayUpImage() {
    const view = new Graphics();
    view
      .setStrokeStyle({ width: 1, color: 0xffff00 })
      .rect(0, 0, 20, 90)
      .rect(8, -40, 5, 40)
      .stroke();
    return view;
  }

  #getRunImage() {
    const view = new Graphics();
    view
      .setStrokeStyle({ width: 1, color: 0xffff00 })
      .rect(1, 1, 20, 90)
      .rect(0, 30, 70, 5);
    view.skew.x = -0.1;
    view.stroke();
    return view;
  }

  #getRunUpImage() {
    const view = new Graphics();
    view
      .setStrokeStyle({ width: 1, color: 0xffff00 })
      .rect(1, 1, 20, 90)
      .lineTo(0, 30)
      .lineTo(30, -20)
      .lineTo(45, -15)
      .lineTo(0, 40);
    view.skew.x = -0.1;
    view.stroke();
    return view;
  }

  #getRunDownImage() {
    const view = new Graphics();
    view
      .setStrokeStyle({ width: 1, color: 0xffff00 })
      .rect(1, 1, 20, 90)
      .lineTo(0, 20)
      .lineTo(40, 60)
      .lineTo(35, 65)
      .lineTo(0, 30);
    view.skew.x = -0.1;
    view.stroke();
    return view;
  }

  #getLayImage() {
    const view = new Graphics();
    view
      .setStrokeStyle({ width: 1, color: 0xffff00 })
      .rect(0, 0, 90, 20)
      .rect(90, 0, 40, 5)
      .stroke();
    view.x -= 45;
    view.y += 70;
    return view;
  }

  #getJumpImage() {
    const view = new Graphics();
    view
      .setStrokeStyle({ width: 1, color: 0xffff00 })
      .rect(0, 0, 40, 40)
      .stroke();
    view.x -= 10;
    view.y += 25;
    return view;
  }

  #getFallImage() {
    const view = new Graphics();
    view
      .setStrokeStyle({ width: 1, color: 0xffff00 })
      .rect(1, 1, 20, 90)
      .rect(10, 20, 5, 60);
    view.skew.x = -0.1;
    view.stroke();
    return view;
  }
}
