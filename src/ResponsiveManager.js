export default class ResponsiveManager {
  #pixiApp;
  #baseWidth = 1024;
  #baseHeight = 768;
  #portraitWarning;

  constructor(pixiApp) {
    this.#pixiApp = pixiApp;
    this.#portraitWarning = document.getElementById("portrait-warning");

    window.addEventListener("resize", () => this.resize());
    window.addEventListener("orientationchange", () => {
      setTimeout(() => this.resize(), 100);
    });

    this.resize();
  }

  resize() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Stage всегда 1:1 — игра рисуется в фиксированный буфер 1024×768.
    // Масштабирование stage ломает видимую область (обрезка или «зум-аут»).
    this.#pixiApp.stage.scale.set(1);

    if (this.#isHorizontal(windowWidth, windowHeight)) {
      this.#showHorizontalWarning();
      return;
    }

    this.#hidePortraitWarning();
    this.#applyLetterboxScale(windowWidth, windowHeight);
  }

  #isHorizontal(width, height) {
    const isMobile =
      window.matchMedia("(max-width: 768px)").matches ||
      /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    return isMobile && width > height;
  }

  #applyLetterboxScale(windowWidth, windowHeight) {
    const maxHeight = 768;
    const maxScale = maxHeight / this.#baseHeight;

    const touchBar = document.getElementById("touch-controls-bar");
    const barHeight =
      touchBar && !touchBar.hidden ? touchBar.offsetHeight : 0;
    const availableHeight = windowHeight - barHeight;

    const scaleX = windowWidth / this.#baseWidth;
    const scaleY = availableHeight / this.#baseHeight;
    const scale = Math.min(scaleX, scaleY, maxScale);

    const canvas = this.#pixiApp.canvas;
    const newWidth = this.#baseWidth * scale;
    const newHeight = this.#baseHeight * scale;

    // Внутренний буфер рендерера остаётся 1024×768; масштаб только через CSS.
    canvas.style.width = `${newWidth}px`;
    canvas.style.height = `${newHeight}px`;

    if (touchBar && !touchBar.hidden) {
      touchBar.style.width = `${newWidth}px`;
    }
  }

  #showHorizontalWarning() {
    this.#portraitWarning?.classList.add("visible");
  }

  #hidePortraitWarning() {
    this.#portraitWarning?.classList.remove("visible");
  }
}
