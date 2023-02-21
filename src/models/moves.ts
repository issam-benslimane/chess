import { fromFen } from "./fen";
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

export function custom(opt = {}, directions) {
  return generateMoves(opt, directions);
}

export function enPassant() {}

const board = fromFen("r1b1k1nr/p2p1pNp/n2B4/1p1NP2P/6P1/3P4/P1P1K3/q5b1");

console.log(board.legalMovesAt("e2"));
