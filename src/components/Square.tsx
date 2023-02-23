import clsx from "clsx";
import React from "react";
import Piece from "../models/pieces/piece";
import Position from "../models/position";

type Props = {
  piece: Piece | null;
  position: Position;
  moves: Position[] | null;
  handleClick: (pos: Position) => void;
};

const Square = ({ piece, position, moves, handleClick }: Props) => {
  const { x, y } = position;
  const baseClass = isOdd(x + y) ? "square square--odd" : "square square--even";
  const isTargeted = moves?.some((m) => m.equals(position));
  const circle = isTargeted
    ? piece
      ? "square--circle-lg"
      : "square--circle-sm"
    : null;

  return (
    <div
      className={clsx(baseClass, circle)}
      onClick={() => handleClick(position)}
    ></div>
  );
};

function isOdd(n: number) {
  return n % 2 === 0;
}

export default Square;
