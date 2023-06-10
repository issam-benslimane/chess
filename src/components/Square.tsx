import React from "react";
import Piece from "../core/pieces/piece";
import Position from "../core/position";
import PieceIcon from "./PieceIcon";
import clsx from "clsx";

type Props = {
  piece: Piece | null;
  position: Position;
  isPossibleMove: boolean;
  hasChanged: boolean;
  onSquareClick: () => void;
};

const Square = ({
  piece,
  position,
  onSquareClick,
  isPossibleMove,
  hasChanged,
}: Props) => {
  const { x, y } = position;

  function handleClick() {
    onSquareClick();
  }

  return (
    <div
      className={clsx(
        "square",
        !hasChanged && (isOdd(x + y) ? "square--odd" : "square--even"),
        isPossibleMove && (piece ? "square--circle-lg" : "square--circle-sm"),
        hasChanged && "square--moved"
      )}
      onClick={handleClick}
    >
      {piece && <PieceIcon piece={piece} />}
    </div>
  );
};

function isOdd(n: number) {
  return n % 2 === 0;
}

export default Square;
