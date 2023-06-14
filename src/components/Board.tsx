import React, { useState } from "react";
import { PieceColor } from "../core/types";
import Square from "./Square";
import { useBoard } from "../hooks/useBoard";
import Position from "../core/position";
import { useParams } from "react-router-dom";
import { socket } from "../socket";

type Props = {
  gameStarted: boolean;
  color?: PieceColor;
};

const ChessBoard = ({ gameStarted, color = "white" }: Props) => {
  const gameId = useParams().gameId as string;
  const { board, turn, getLegalMoves, movePiece } = useBoard(color);
  const [triggered, setTriggered] = useState<Position | null>(null);
  const possibleMoves = triggered ? getLegalMoves(triggered) : [];

  const isPossibleMove = (position: Position) => {
    return possibleMoves.some((move) => move.equals(position));
  };

  const onSquareClick = (position: Position) => {
    if (!gameStarted) return;
    const target = board.pieceAt(position);
    if (!triggered) {
      if (target && target.color === color && target.color === turn)
        setTriggered(position);
      return;
    }
    if (target && target.color !== turn && !isPossibleMove(position)) {
      setTriggered(null);
    } else if (triggered.equals(position)) setTriggered(null);
    else if (isPossibleMove(position)) {
      movePiece(triggered, position);
      socket.emit("move_piece", gameId, turn, triggered, position);
      setTriggered(null);
    } else if (target) {
      setTriggered(position);
    } else setTriggered(null);
  };

  return (
    <div className="board">
      {board.cells.map(({ piece, position }) => (
        <Square
          key={`${position.x}, ${position.y}`}
          piece={piece}
          position={position}
          onSquareClick={() => onSquareClick(position)}
          isPossibleMove={isPossibleMove(position)}
          hasChanged={[board.lastMoved?.from, board.lastMoved?.to].some(
            (current) => current && current.equals(position)
          )}
        />
      ))}
    </div>
  );
};

export default ChessBoard;
