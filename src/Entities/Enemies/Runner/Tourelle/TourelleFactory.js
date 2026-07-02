import TourelleView from "./TourelleView.js";
import Tourelle from "./Tourelle.js";

export default class TourelleFactory {
  #worldContainer;
  #target;
  #boulleteFactory;

  constructor(worldContainer, target, boulleteFactory) {
    this.#worldContainer = worldContainer;
    this.#target = target;
    this.#boulleteFactory = boulleteFactory;
  }

  create(x, y) {
    const view = new TourelleView();
    this.#worldContainer.addChild(view);

    const tourelle = new Tourelle(view, this.#target, this.#boulleteFactory);
    tourelle.x = x;
    tourelle.y = y;

    return tourelle;
  }
}
