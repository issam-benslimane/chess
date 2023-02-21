import Board from "./board/board";
import Square from "./board/square";
import Position from "./position";
import { Directions } from "./types";

const SIZE = 8;
const defaultOptions = { depth: SIZE, take: true };

export function generateMoves(opt, directions: Directions[]) {
  opt = Object.assign({}, defaultOptions, opt);
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

function getPosition(position: Position, directions: Directions[]) {
  return directions.reduce((final, d) => final[d](), position);
}
