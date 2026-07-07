import RunnerView from "./RunnerView.js";
import TourelleView from "./Tourelle/TourelleView.js";
import Runner from "./Runner.js";
import Tourelle from "./Tourelle/Tourelle.js";

export default class EnemiesFactory {
  #worldContainer;
  #target;
  #boulleteFactory;
  #entities;

  constructor(worldContainer, target, boulleteFactory, entities) {
    this.#worldContainer = worldContainer;
    this.#target = target;
    this.#boulleteFactory = boulleteFactory;
    this.#entities = entities;
  }

  createRunner(x, y) {
    const view = new RunnerView();
    this.#worldContainer.addChild(view);
    const runner = new Runner(view, this.#target);
    runner.x = x;
    runner.y = y;

    this.#entities.push(runner);

    return runner;
  }

  createTourelle(x, y) {
    const view = new TourelleView();
    this.#worldContainer.addChild(view);

    const tourelle = new Tourelle(view, this.#target, this.#boulleteFactory);
    tourelle.x = x;
    tourelle.y = y;

    this.#entities.push(tourelle);

    return tourelle;
  }
}
