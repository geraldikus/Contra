import { Container, Graphics, Text, TextStyle } from "pixi.js";

export default function createKeyBox(label, options = {}) {
  const {
    width = 36,
    height = 36,
    shape = "rect",
    fontSize = 18,
  } = options;

  const container = new Container();
  const background = new Graphics();

  if (shape === "circle") {
    const radius = width / 2;
    background.circle(radius, radius, radius);
  } else {
    background.roundRect(0, 0, width, height, 4);
  }

  background.fill({ color: 0x222222, alpha: 1 });
  background.stroke({ color: 0xffffff, width: 2, alpha: 0.85 });
  container.addChild(background);

  const style = new TextStyle({
    fontFamily: "Arial",
    fontSize,
    fill: 0xffffff,
    fontWeight: "bold",
  });
  const text = new Text({ text: label, style });
  text.anchor.set(0.5);

  if (shape === "circle") {
    text.x = width / 2;
    text.y = width / 2;
  } else {
    text.x = width / 2;
    text.y = height / 2;
  }

  container.addChild(text);
  container.boxWidth = shape === "circle" ? width : width;
  container.boxHeight = shape === "circle" ? width : height;
  return container;
}

export function createJoystickHint(size = 48) {
  const container = new Container();
  const radius = size / 2;

  const base = new Graphics();
  base.circle(radius, radius, radius);
  base.fill({ color: 0x333333, alpha: 0.65 });
  base.stroke({ color: 0xffffff, width: 2, alpha: 0.85 });
  container.addChild(base);

  const stick = new Graphics();
  stick.circle(radius, radius, radius * 0.35);
  stick.fill({ color: 0xffffff, alpha: 0.85 });
  container.addChild(stick);
  container.boxWidth = size;
  container.boxHeight = size;

  return container;
}

export function createDescriptionText(text) {
  return new Text({
    text,
    style: new TextStyle({
      fontFamily: "Arial",
      fontSize: 22,
      fill: 0xffffff,
      stroke: { color: 0x000000, width: 2 },
    }),
  });
}

export function createControlRow(
  keys,
  description,
  gap = 12,
  keyColumnWidth = null,
  singleKeyAlign = "center",
) {
  const row = new Container();
  let x = 0;

  if (keyColumnWidth != null) {
    if (keys.length === 1) {
      const key = keys[0];
      const keyWidth = key.boxWidth ?? key.width;
      key.x =
        singleKeyAlign === "left" ? 0 : (keyColumnWidth - keyWidth) / 2;
      row.addChild(key);
    } else {
      let keyX = 0;
      for (const key of keys) {
        key.x = keyX;
        row.addChild(key);
        keyX += (key.boxWidth ?? key.width) + gap;
      }
    }
    x = keyColumnWidth;
  } else {
    for (const key of keys) {
      key.x = x;
      row.addChild(key);
      x += (key.boxWidth ?? key.width) + gap;
    }
  }

  const label = createDescriptionText(description);
  label.x = x + gap;
  label.y =
    (keys[0]?.boxHeight ?? keys[0]?.height ?? 36) / 2 - label.height / 2;
  row.addChild(label);

  return row;
}
