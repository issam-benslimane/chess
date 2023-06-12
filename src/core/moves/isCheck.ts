import Board from "../board/board";
import Piece from "../pieces/piece";
import Position from "../position";
import { Move } from "./Move";

export function isCheck(board: Board, origin: Position, target: Position) {
  const originPiece = board.pieceAt(origin) as Piece;
  const enemyColor = originPiece.enemyColor();
  const move = new Move(board, origin);
  const newBoard = move.movePiece(target);
  const enemySquares = newBoard.getNonEmptyCells(enemyColor);
  const kingPosition = newBoard.kingPosition(originPiece.color);
  return enemySquares.some((piece) => {
    const moves = new Move(newBoard, piece.position).getPieceMoves();
    return isCausingCheck(moves, kingPosition);
  });
}

function isCausingCheck(moves: Position[], kingPosition: Position) {
  return moves.some((move) => move.equals(kingPosition));
}
