import { getRes } from "../../assets/image";
import type { CanvasInfo, Coord } from "../values";

export function drawHealthBar(
  { context }: CanvasInfo,
  [x, y, w]: Coord,
  health: number,
  tempHealth: number,
) {
  context.save();
  context.imageSmoothingEnabled = false;
  context.drawImage(getRes("ui"), 259, 40, 9, 20, x - 18, y, 18, 40);
  context.drawImage(getRes("ui"), 284, 40, 23, 20, x, y, w, 40);
  context.drawImage(getRes("ui"), 323, 40, 9, 20, x + w, y, 18, 40);

  if (health > 0) {
    context.drawImage(getRes("ui"), 341, 40, 1, 14, x, y + 6, 2, 28);
    context.drawImage(
      getRes("ui"),
      350,
      40,
      7,
      14,
      x + 2,
      y + 6,
      w * health - 2,
      28
    );
    if (health === 1) {
      context.drawImage(getRes("ui"), 365, 40, 1, 14, x + w, y + 6, 2, 28);
    }
  }
  if (tempHealth > 0) {
    context.save();
    context.globalAlpha = 0.5;
    context.drawImage(
      getRes("ui"),
      350,
      40,
      7,
      14,
      x + w * health,
      y + 6,
      w * tempHealth - 2,
      28
    );
    if (health === 1) {
      context.drawImage(getRes("ui"), 365, 40, 1, 14, x + w, y + 6, 2, 28);
    }
    context.restore();
  }
  context.restore();
}

export type NineParameter = [Coord, Coord, Coord, Coord, Coord, Coord, Coord, Coord, Coord];
export function drawPanel(
  context: CanvasRenderingContext2D,
  [x, y, w, h]: Coord,
  { slices, scale }: {
    slices: NineParameter,
    scale: number,
  } = {
    slices: [
      [16, 40, 7, 7],    // top-left
      [49, 40, 7, 7],    // top-middle
      [107, 40, 7, 7],   // top-right
      [478, 24, 7, 7],   // middle-left
      [511, 24, 7, 7],   // center
      [569, 24, 7, 7],   // middle-right
      [478, 105, 7, 7],  // bottom-left
      [511, 105, 7, 7],  // bottom-middle
      [569, 105, 7, 7]   // bottom-right
    ],
    scale: 2
  }
) {
  context.save();
  context.imageSmoothingEnabled = false;
  const positions = [
    [x, y, slices[0][2] * scale, slices[0][3] * scale],  // top-left
    [x + slices[0][2] * scale, y, w - slices[0][2] * scale - slices[2][2] * scale, slices[1][3] * scale],  // top-middle
    [x + w - slices[2][2] * scale, y, slices[2][2] * scale, slices[2][3] * scale],  // top-right
    [x, y + slices[0][3] * scale, slices[3][2] * scale, h - slices[0][3] * scale - slices[6][3] * scale],  // middle-left
    [x + slices[3][2] * scale, y + slices[0][3] * scale, w - slices[3][2] * scale - slices[5][2] * scale, h - slices[1][3] * scale - slices[7][3] * scale],  // center
    [x + w - slices[5][2] * scale, y + slices[0][3] * scale, slices[5][2] * scale, h - slices[2][3] * scale - slices[8][3] * scale],  // middle-right
    [x, y + h - slices[6][3] * scale, slices[6][2] * scale, slices[6][3] * scale],  // bottom-left
    [x + slices[6][2] * scale, y + h - slices[7][3] * scale, w - slices[6][2] * scale - slices[8][2] * scale, slices[7][3] * scale],  // bottom-middle
    [x + w - slices[8][2] * scale, y + h - slices[8][3] * scale, slices[8][2] * scale, slices[8][3] * scale]  // bottom-right
  ];

  // 9개의 위치 값을 사용하여 각 조각을 그립니다.
  positions.forEach((pos, index) => {
    const [dx, dy, dw, dh] = pos;
    const [sx, sy, sw, sh] = slices[index];
    context.drawImage(getRes("ui"), sx, sy, sw, sh, dx, dy, dw, dh);
  });
  context.restore();
}

export function drawItemPanel(context: CanvasRenderingContext2D, [x, y, w, h]: Coord) {
  drawPanel(context, [x, y, w, h], {
    slices: [
      [30, 329, 6, 6], [48, 329, 6, 6], [64, 329, 6, 6],
      [30, 346, 6, 6], [48, 346, 6, 6], [64, 346, 6, 6],
      [30, 363, 6, 6], [48, 363, 6, 6], [64, 363, 6, 6]
    ],
    scale: 2
  });
}

export function drawExtendBar(
  context: CanvasRenderingContext2D,
  [x, y, w]: Coord,
  health: number,
  color: number
) {
  context.save();
  context.imageSmoothingEnabled = false;
  context.drawImage(getRes("ui"), 522, 223, 10, 18, x, y, 20, 36);
  for (let i = 0; i < w; i++) {
    if (i === 0) {
      context.drawImage(
        getRes("ui"),
        533,
        223,
        8,
        18,
        x + 20 + i * 16,
        y,
        16,
        36
      );
      if (health > i) {
        context.drawImage(
          getRes("ui"),
          592,
          183 + color * 20,
          8,
          18,
          x + 20 + i * 16,
          y,
          16,
          36
        );
      }
    } else {
      context.drawImage(
        getRes("ui"),
        542,
        223,
        8,
        18,
        x + 20 + i * 16,
        y,
        16,
        36
      );
      if (health > i) {
        context.drawImage(
          getRes("ui"),
          601,
          183 + color * 20,
          8,
          18,
          x + 20 + i * 16,
          y,
          16,
          36
        );
      }
    }
  }
  context.drawImage(
    getRes("ui"),
    567,
    182 + color * 20,
    16,
    20,
    x + 20 + w * 16,
    y - 2,
    32,
    40
  );
  context.restore();
}
