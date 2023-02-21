import Board from "./board/board";
import Square from "./board/square";
import { isMultiDimArray, isString } from "./helpers";
import Position from "./position";
import { Directions } from "./types";

const SIZE = 8;
const defaultOptions = { depth: SIZE, take: true };

export function generateMoves(
  opt,
  directions: Directions | Directions[] | Directions[][]
) {
  if (isString(directions)) return movesGenerator(opt, [directions]);
  else if (isMultiDimArray<Directions>(directions)) {
    return directions.map((d) => movesGenerator(opt, d));
  } else return movesGenerator(opt, directions);
}

function movesGenerator(opt, directions: Directions[]) {
  opt = Object.assign({}, defaultOptions, opt);
  return (board: Board, square: Square) => {
    if (square.piece == null) return [];
    const moves: Position[] = [];
    let currentPosition = getPosition(square.position, directions);
    for (let i = 0; i < opt.depth; i++) {
      const currentSquare = board.squareAt(currentPosition);
      if (currentSquare == null) break;
      const { piece, position } = currentSquare;
      if (piece == null) {
        moves.push(position);
      } else {
        if (square.piece.isEnemy(piece) && opt.take) moves.push(position);
        break;
      }
      currentPosition = getPosition(position, directions);
    }

    return moves;
  };
}

function getPosition(position: Position, directions: Directions[]) {
  return directions.reduce((final, d) => final[d](), position);
}
