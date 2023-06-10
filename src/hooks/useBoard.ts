import { useState } from "react";
import Board from "../core/board/board";
import { Move } from "../core/moves/Move";
import Position from "../core/position";
import { cloneBoard } from "../core/helpers";

export const useBoard = () => {
  const [board, setBoard] = useState(
    Board.fen("r1b4r/p2pBpNp/n1k2n2/1p1NP2P/6P1/3P4/P1P1K2R/q5b1")
  );

  const getLegalMoves = (origin: Position) => {
    if (!board.pieceAt(origin)) return [];
    return new Move(board, origin).getLegalMoves();
  };

  const movePiece = (origin: Position, target: Position) => {
    const boardCopy = cloneBoard(board);
    const move = new Move(boardCopy, origin, target);
    move.movePiece();
    setBoard(boardCopy);
  };

  return { board, getLegalMoves, movePiece };
};
