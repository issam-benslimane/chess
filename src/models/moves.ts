import Board from "./board/board";
import Square from "./board/square";
import { fromFen } from "./fen";
import Position from "./position";
import { Directions } from "./types";

const SIZE = 8;

const defaultOptions = { depth: SIZE, take: true };

function generateMoves(opt, directions: Directions[]) {
  return (board: Board, origin: Square) => {
    if (origin.piece == null) return [];
    const moves: Array<{ origin: Position; target: Position }> = [];
    let currentPosition = getPosition(origin.position, directions);
    for (let i = 0; i < opt.depth; i++) {
      const currentSquare = board.squareAt(currentPosition);
      if (currentSquare == null) break;
      const { piece, position } = currentSquare;
      if (piece == null) {
        moves.push({ origin: origin.position, target: position });
      } else {
        if (origin.piece.isEnemy(piece) && opt.take)
          moves.push({ origin: origin.position, target: position });
        break;
      }
      currentPosition = getPosition(position, directions);
    }
    return moves;
  };
}

export function up(opt) {
  opt = Object.assign({}, defaultOptions, opt);
  return generateMoves(opt, ["up"]);
}

export function down(opt) {
  opt = Object.assign({}, defaultOptions, opt);
  return generateMoves(opt, ["down"]);
}

export function left(opt) {
  opt = Object.assign({}, defaultOptions, opt);
  return generateMoves(opt, ["left"]);
}

export function right(opt) {
  opt = Object.assign({}, defaultOptions, opt);
  return generateMoves(opt, ["right"]);
}

export function topDiagonal(opt) {
  opt = Object.assign({}, defaultOptions, opt);
  const directions: Directions[][] = [
    ["up", "right"],
    ["up", "left"],
  ];
  return directions.map((d) => generateMoves(opt, d));
}

export function bottomDiagonal(opt) {
  opt = Object.assign({}, defaultOptions, opt);
  const directions: Directions[][] = [
    ["down", "right"],
    ["down", "left"],
  ];
  return directions.map((d) => generateMoves(opt, d));
}

export function horizontal(opt) {
  return [left(opt), right(opt)];
}

export function vertical(opt) {
  return [up(opt), down(opt)];
}

export function diagonal(opt) {
  return [topDiagonal(opt), bottomDiagonal(opt)];
}

export function knight(opt = { depth: 1 }) {
  opt = Object.assign({}, defaultOptions, opt);
  const directions: Directions[][] = [
    ["up", "up", "right"],
    ["up", "up", "left"],
    ["up", "right", "right"],
    ["up", "left", "left"],
    ["down", "down", "right"],
    ["down", "down", "left"],
    ["down", "right", "right"],
    ["down", "left", "right"],
  ];
  return directions.map((d) => generateMoves(opt, d));
}

function getPosition(position: Position, directions: Directions[]) {
  return directions.reduce((final, d) => final[d](), position);
}

const board = fromFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
