import Board from "../board/board";
import { getPositionFromDirections } from "../helpers";
import { King, Rook } from "../pieces";
import Position from "../position";

export function casling() {
  return (origin: Position, board: Board) => {
    const left = origin.left().left();
    const right = origin.right().right();
    return [left, right].filter((move) => isCastling(board, origin, move));
  };
}

export function getCastlingActions(
  board: Board,
  origin: Position,
  target: Position
) {
  if (isCastling(board, origin, target)) {
    const direction = target.minus(origin).x > 0 ? "right" : "left";
    function findRook() {
      let current = getPositionFromDirections(origin, [direction]);
      while (board.inBound(current)) {
        const cell = board.pieceAt(current);
        if (isRook(cell)) return current;
        current = getPositionFromDirections(current, [direction]);
      }
    }
    const rookPosition = findRook() as Position;
    return {
      from: rookPosition,
      to: getPositionFromDirections(origin, [direction]),
    };
  }
}

function isCastling(board: Board, origin: Position, target: Position) {
  const direction = target.minus(origin).x > 0 ? "right" : "left";
  const originPiece = board.pieceAt(origin);
  if (!isKing(originPiece) || originPiece.moved) return false;
  function findRook() {
    let current = getPositionFromDirections(origin, [direction]);
    while (board.inBound(current)) {
      const cell = board.pieceAt(current);
      if (cell) return isRook(cell) ? cell : undefined;
      current = getPositionFromDirections(current, [direction]);
    }
  }
  const rookPiece = findRook();
  if (!rookPiece || rookPiece.moved) return false;
  return true;
}

function isKing(piece: unknown): piece is King {
  return piece instanceof King;
}

function isRook(piece: unknown): piece is Rook {
  return piece instanceof Rook;
}
