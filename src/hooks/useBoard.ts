import { useState } from "react";
import Board from "../core/board/board";
import { Move } from "../core/moves/Move";
import Position from "../core/position";
import { PieceColor } from "../core/types";

export const useBoard = (color: PieceColor = "white") => {
  const [board, setBoard] = useState(Board.start(color));

  const getLegalMoves = (origin: Position) => {
    if (!board.pieceAt(origin)) return [];
    return new Move(board, origin).getLegalMoves();
  };

  const movePiece = (origin: Position, target: Position) => {
    const move = new Move(board, origin, target);
    const newBoard = move.movePiece();
    setBoard(newBoard);
  };

  return { board, getLegalMoves, movePiece };
};
