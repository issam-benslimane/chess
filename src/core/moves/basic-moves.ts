import Board from "../board/board";
import { SIZE } from "../constants";
import {
  getPositionFromDirections,
  isMultiDimArray,
  isString,
} from "../helpers";
import Position from "../position";
import { Direction, MoveOption } from "../types";

function generateMoves(
  directions: Direction | Direction[] | Direction[][],
  opt: Partial<MoveOption> = {}
) {
  const defaultOptions = { depth: SIZE, take: true, move: true };
  const finalOption: MoveOption = { ...defaultOptions, ...opt };
  if (isString(directions)) return generateMovesBase([directions], finalOption);
  else if (isMultiDimArray<Direction>(directions)) {
    return directions.map((d) => generateMovesBase(d, finalOption));
  } else return generateMovesBase(directions, finalOption);
}

function generateMovesBase(directions: Direction[], opt: MoveOption) {
  return (origin: Position, board: Board) => {
    const originCell = board.pieceAt(origin);
    if (!originCell) return [];
    const moves: Position[] = [];
    let currentPosition = getPositionFromDirections(origin, directions);
    for (let i = 0; i < opt.depth; i++) {
      if (!board.inBound(currentPosition)) break;
      const targetCell = board.pieceAt(currentPosition);
      if (targetCell == null) {
        if (opt.move) moves.push(currentPosition);
      } else {
        if (originCell.isEnemy(targetCell) && opt.take)
          moves.push(currentPosition);
        break;
      }
      currentPosition = getPositionFromDirections(currentPosition, directions);
    }

    return moves;
  };
}

export function up(opt?: Partial<MoveOption>) {
  return generateMoves("up", opt);
}

export function down(opt?: Partial<MoveOption>) {
  return generateMoves("down", opt);
}

export function left(opt?: Partial<MoveOption>) {
  return generateMoves("left", opt);
}

export function right(opt?: Partial<MoveOption>) {
  return generateMoves("right", opt);
}

export function topDiagonal(opt?: Partial<MoveOption>) {
  const directions: Direction[][] = [
    ["up", "right"],
    ["up", "left"],
  ];
  return generateMoves(directions, opt);
}

export function bottomDiagonal(opt?: Partial<MoveOption>) {
  const directions: Direction[][] = [
    ["down", "right"],
    ["down", "left"],
  ];
  return generateMoves(directions, opt);
}

export function horizontal(opt?: Partial<MoveOption>) {
  return [left(opt), right(opt)];
}

export function vertical(opt?: Partial<MoveOption>) {
  return [up(opt), down(opt)];
}

export function diagonal(opt?: Partial<MoveOption>) {
  return [topDiagonal(opt), bottomDiagonal(opt)];
}

export function custom(
  directions: Direction | Direction[] | Direction[][],
  opt?: Partial<MoveOption>
) {
  return generateMoves(directions, opt);
}
