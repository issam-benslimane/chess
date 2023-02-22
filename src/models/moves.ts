import { generateMoves } from "./moves_generator";
import { Directions } from "./types";

export function up(opt = {}) {
  return generateMoves(opt, "up");
}

export function down(opt = {}) {
  return generateMoves(opt, "down");
}

export function left(opt = {}) {
  return generateMoves(opt, "left");
}

export function right(opt = {}) {
  return generateMoves(opt, "right");
}

export function topDiagonal(opt = {}) {
  const directions: Directions[][] = [
    ["up", "right"],
    ["up", "left"],
  ];
  return generateMoves(opt, directions);
}

export function bottomDiagonal(opt = {}) {
  const directions: Directions[][] = [
    ["down", "right"],
    ["down", "left"],
  ];
  return generateMoves(opt, directions);
}

export function horizontal(opt = {}) {
  return [left(opt), right(opt)];
}

export function vertical(opt = {}) {
  return [up(opt), down(opt)];
}

export function diagonal(opt = {}) {
  return [topDiagonal(opt), bottomDiagonal(opt)];
}

export function custom(
  opt = {},
  directions: Directions | Directions[] | Directions[][]
) {
  return generateMoves(opt, directions);
}

export function enPassant() {}
