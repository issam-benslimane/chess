import React from "react";
import Square from "../models/board/square";
import Position from "../models/position";
import { PieceColor } from "../models/types";
import PieceIcon from "./Piece";

type Props = {
  squares: Square[];
  handleClick: (pos: Position, color: PieceColor) => void;
};

const Pieces = ({ squares, handleClick }: Props) => {
  return (
    <div className="pieces">
      {squares.map((s, i) => (
        <PieceIcon
          key={i}
          piece={s.piece!}
          position={s.position}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
};

export default Pieces;
