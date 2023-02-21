import { fromFen } from "./fen";
import { isMultiDimArray, isString } from "./helpers";
import { generateMoves } from "./moves_generator";
import { Directions } from "./types";

function legalMoves(
  opt,
  directions: Directions | Directions[] | Directions[][]
) {
  if (isString(directions)) return generateMoves(opt, [directions]);
  else if (isMultiDimArray<Directions>(directions)) {
    return directions.map((d) => generateMoves(opt, d));
  } else return generateMoves(opt, directions);
}

export function up(opt = {}) {
  return legalMoves(opt, "up");
}

export function down(opt = {}) {
  return legalMoves(opt, "down");
}

export function left(opt = {}) {
  return legalMoves(opt, "left");
}

export function right(opt = {}) {
  return legalMoves(opt, "right");
}

export function topDiagonal(opt = {}) {
  const directions: Directions[][] = [
    ["up", "right"],
    ["up", "left"],
  ];
  return legalMoves(opt, directions);
}

export function bottomDiagonal(opt = {}) {
  const directions: Directions[][] = [
    ["down", "right"],
    ["down", "left"],
  ];
  return legalMoves(opt, directions);
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

export function custom(opt = {}, directions) {
  return legalMoves(opt, directions);
}

const board = fromFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
