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

  constructor() {
    super();

    this.#bounds.width = 20;
    this.#bounds.height = 90;
    this.#collisionBox.width = this.#bounds.width;
    this.#collisionBox.height = this.#bounds.height;

    const images = [];
    images.push(this.#getStayImage());
    images.push(this.#getStayUpImage());
    images.push(this.#getRunImage());
    images.push(this.#getRunUpImage());
    images.push(this.#getRunDownImage());
    images.push(this.#getLayImage());
    images.push(this.#getJumpImage());
    images.push(this.#getFallImage());

    for (let i = 0; i < images.length; i++) {
      this.addChild(images[i]);
      images[i].x = 100 * i;
    }
    this.pivot.x = 10;
    this.x = 10;
  }

  get collisionBox() {
    this.#collisionBox.x = this.x;
    this.#collisionBox.y = this.y;
    return this.#collisionBox;
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
      .rect(0, 0, 20, 90)
      .rect(0, 30, 70, 5);
    view.skew.x = -0.1;
    view.stroke();
    return view;
  }

  #getRunUpImage() {
    const view = new Graphics();
    view
      .setStrokeStyle({ width: 1, color: 0xffff00 })
      .rect(0, 0, 20, 90)
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
      .rect(0, 0, 20, 90)
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
      .rect(0, 0, 20, 90)
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
      .rect(90, 0, 40, 5)
      .stroke();
    view.x -= 10;
    view.y += 25;
    return view;
  }

  #getFallImage() {
    const view = new Graphics();
    view
      .setStrokeStyle({ width: 1, color: 0xffff00 })
      .rect(0, 0, 20, 90)
      .rect(10, 20, 5, 60);
    view.skew.x = -0.1;
    view.stroke();
    return view;
  }
}
