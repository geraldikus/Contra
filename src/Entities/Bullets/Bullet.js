import { Container, Graphics } from "pixi.js";
import Entity from "../Entity";

export default class Bullet extends Entity {
  #angle;
  speed = 7; // was 10
  type;

  constructor(view, angle) {
    super(view);
    this.#angle = (angle * Math.PI) / 180;
  }

  update() {
    this.x += this.speed * Math.cos(this.#angle);
    this.y += this.speed * Math.sin(this.#angle);
  }
}
