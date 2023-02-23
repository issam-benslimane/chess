import React, { useState } from "react";
import Board from "../models/board/board";
import Position from "../models/position";
import { PieceColor } from "../models/types";
import Backdrop from "./Backdrop";
import Pieces from "./Pieces";
import Square from "./Square";
const SCALE = 65;

type Props = {
  status: string;
  current: PieceColor;
  switchTurn: () => void;
  gameOver: () => void;
};

const ChessBoard = ({ status, current, switchTurn, gameOver }: Props) => {
  const [board, setBoard] = useState(Board.start());
  const [moves, setMoves] = useState<Position[] | null>(null);
  const [triggered, setTriggered] = useState<Position | null>(null);

  const handleClick = (pos: Position, color: PieceColor = current) => {
    if (current !== color) return reset();
    if (triggered) {
      const isPlaced = placePiece(triggered, pos);
      if (pos.equals(triggered) || isPlaced) return reset();
    }
    getLegalMoves(pos);
    setTriggered(pos);
  };

  const reset = () => {
    setMoves(null);
    setTriggered(null);
  };

  const getLegalMoves = (pos: Position) => {
    const legalMoves = board.legalMovesAt(pos);
    setMoves(legalMoves);
  };

  const placePiece = (origin: Position, target: Position) => {
    const newBoard = board.placePiece(origin, target);
    if (newBoard === board) return;
    setBoard(newBoard);
    if (newBoard.checkMate(getOpponent(current))) return gameOver();
    switchTurn();
    return true;
  };

  const getOpponent = (color: PieceColor) => {
    return color === "white" ? "black" : "white";
  };

  return (
    <Backdrop className="h-full w-full grid content-center" status={status}>
      <div
        className="board"
        style={{ "--scale": SCALE } as React.CSSProperties}
      >
        {board.squares.map((s, i) => (
          <Square key={i} moves={moves} handleClick={handleClick} {...s} />
        ))}
        <Pieces
          squares={board.getNonEmptySquares()}
          handleClick={handleClick}
        />
      </div>
    </Backdrop>
  );
};

export default ChessBoard;
