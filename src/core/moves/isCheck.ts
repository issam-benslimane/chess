import Board from "../board/board";
import { cloneBoard } from "../helpers";
import Piece from "../pieces/piece";
import Position from "../position";
import { Move } from "./Move";

export function isCheck(board: Board, origin: Position, target: Position) {
  const originPiece = board.pieceAt(origin) as Piece;
  const enemyColor = originPiece.enemyColor();
  const enemySquares = board.getNonEmptyCells(enemyColor);
  const clonedBoard = cloneBoard(board);
  const move = new Move(clonedBoard, origin);
  move.movePiece(target);
  const kingPosition = clonedBoard.kingPosition(originPiece.color);
  return enemySquares.some((piece) => {
    const moves = new Move(
      clonedBoard,
      board.getPiecePosition(piece)
    ).getPieceMoves();
    return isCausingCheck(moves, kingPosition);
  });
}

function isCausingCheck(moves: Position[], kingPosition: Position) {
  return moves.some((move) => move.equals(kingPosition));
}
