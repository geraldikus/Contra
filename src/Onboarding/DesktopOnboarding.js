import { Container } from "pixi.js";
import createKeyBox, { createControlRow } from "./KeyBox.js";

export default function createDesktopOnboarding() {
  const container = new Container();
  const rowGap = 16;
  const keySize = 36;
  const keyGap = 12;
  const keyColumnWidth = keySize * 2 + keyGap;

  const rows = [
    createControlRow(
      [createKeyBox("←"), createKeyBox("→")],
      "— move",
      keyGap,
      keyColumnWidth,
    ),
    createControlRow(
      [createKeyBox("↑"), createKeyBox("↓")],
      "— aim",
      keyGap,
      keyColumnWidth,
    ),
    createControlRow([createKeyBox("S")], "— jump", keyGap, keyColumnWidth),
    createControlRow([createKeyBox("A")], "— shoot", keyGap, keyColumnWidth),
  ];

  let y = 0;
  const rowHeight = 36;

  for (const row of rows) {
    row.x = 0;
    row.y = y;
    container.addChild(row);
    y += rowHeight + rowGap;
  }

  return container;
}
