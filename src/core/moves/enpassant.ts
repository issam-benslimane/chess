import Board from "../board/board";
import { getPositionFromDirections } from "../helpers";
import { Pawn } from "../pieces";
import Piece from "../pieces/piece";
import Position from "../position";

export function enPassant() {
  return (origin: Position, board: Board) => {
    const originPiece = board.pieceAt(origin) as Pawn;
    const direction = originPiece.direction;
    const left = getPositionFromDirections(origin, ["left", direction]);
    const right = getPositionFromDirections(origin, ["right", direction]);
    return [left, right].filter((position) => {
      return isEnPassant(board, origin, position);
    });
  };
}

export function isEnPassant(board: Board, origin: Position, target: Position) {
  const originPiece = board.pieceAt(origin) as Piece;
  const targetCell = board.pieceAt(target);
  const neighborPosition = getPositionFromDirections(target, [
    originPiece.direction === "up" ? "down" : "up",
  ]);
  const neighborPiece = board.pieceAt(neighborPosition);
  const lastMoved = board.lastMoved;

  return (
    lastMoved &&
    !targetCell &&
    isPawn(originPiece) &&
    neighborPiece &&
    isPawn(neighborPiece) &&
    originPiece.isEnemy(neighborPiece) &&
    lastMoved.to.minus(neighborPosition).x === 0 &&
    Math.abs(lastMoved.from.minus(lastMoved.to).y) === 2
  );
}

function isPawn(piece: Piece): piece is Pawn {
  return piece instanceof Pawn;
}
