import React, { useState } from "react";
import { PieceColor } from "../core/types";
import Square from "./Square";
import { useBoard } from "../hooks/useBoard";
import Position from "../core/position";
const SCALE = 65;

type Props = {
  current: PieceColor;
  switchTurn: () => void;
};

const ChessBoard = ({ current, switchTurn }: Props) => {
  const { board, getLegalMoves, movePiece } = useBoard();
  const [triggered, setTriggered] = useState<Position | null>(null);
  const possibleMoves = triggered ? getLegalMoves(triggered) : [];

  const isPossibleMove = (position: Position) => {
    return possibleMoves.some((move) => move.equals(position));
  };

  const onSquareClick = (position: Position) => {
    if (triggered) {
      if (triggered.equals(position)) setTriggered(null);
      else if (isPossibleMove(position)) {
        movePiece(triggered, position);
      } else if (board.pieceAt(position)) {
        setTriggered(position);
      } else setTriggered(null);
    } else setTriggered(position);
  };

  return (
    <div className="board" style={{ "--scale": SCALE } as React.CSSProperties}>
      {board.cells.map((cell, i) => (
        <Square
          key={i}
          piece={cell}
          position={Position.parse(i)}
          onSquareClick={() => onSquareClick(Position.parse(i))}
          isPossibleMove={isPossibleMove(Position.parse(i))}
          hasChanged={[board.lastMoved?.from, board.lastMoved?.to].some(
            (position) => position && Position.parse(i).equals(position)
          )}
        />
      ))}
    </div>
  );
};

export default ChessBoard;
