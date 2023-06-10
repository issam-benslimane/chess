import Board from "../board/board";
import Square from "../board/square";
import { getPositionFromDirections, isNotEmpty } from "../helpers";
import { Pawn } from "../pieces";
import Piece from "../pieces/piece";
import Position from "../position";
import { Direction } from "../types";

export function enPassant() {
  return (board: Board, square: Square) => {
    const moves: Position[] = [];
    const originPiece = square.piece as Pawn;
    const lastPlaced = board.lastPlaced;
    if (!originPiece.moved || !lastPlaced) return moves;
    const neighbors = getNeighbors(board, square);
    const direction = originPiece.direction;
    for (let neighbor of neighbors) {
      const piece = neighbor.piece;
      if (
        !piece ||
        !isPawn(piece) ||
        !originPiece.isEnemy(piece) ||
        lastPlaced.piece === piece
      )
        continue;
      const prevBoard = board.previousVersion as Board;
      const prevPos = getPositionFromDirections(
        neighbor.position,
        Array(2).fill(direction)
      );
      const s1 = board.squareAt(prevPos);
      const s2 = prevBoard.squareAt(prevPos);
      if (s2?.piece && isPawn(s2.piece) && !s2.piece.moved && !s1?.piece) {
        moves.push(neighbor.position[direction]());
      }
    }
    return moves;
  };
}

function getNeighbors(Board: Board, square: Square) {
  const left = Board.squareAt(square.position.left());
  const right = Board.squareAt(square.position.right());
  return [left, right].filter(isNotEmpty);
}

function isPawn(piece: Piece): piece is Pawn {
  return piece instanceof Pawn;
}
