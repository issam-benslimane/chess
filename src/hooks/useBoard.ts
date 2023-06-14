import { useEffect, useState } from "react";
import Board from "../core/board/board";
import { Move } from "../core/moves/Move";
import { PieceColor, Positions } from "../core/types";
import { socket } from "../socket";

export const useBoard = (color: PieceColor = "white") => {
  const [board, setBoard] = useState(() => Board.start(color));
  const [turn, setTurn] = useState<PieceColor>("white");

  useEffect(() => {
    socket.on("move_piece", movePiece);

    return () => {
      socket.off("move_piece", movePiece);
    };
  }, [board]);

  const switchTurn = () => {
    setTurn(turn === "white" ? "black" : "white");
  };

  const getLegalMoves = (origin: Positions) => {
    if (!board.pieceAt(origin)) return [];
    return new Move(board, origin).getLegalMoves();
  };

  const movePiece = (origin: Positions, target: Positions) => {
    const move = new Move(board, origin, target);
    const newBoard = move.movePiece();
    setBoard(newBoard);
    switchTurn();
  };

  return { board, turn, getLegalMoves, movePiece };
};
