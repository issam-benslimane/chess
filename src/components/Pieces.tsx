import React from "react";
import PieceIcon from "./PieceIcon";
import Piece from "../core/pieces/piece";

type Props = {
  pieces: Piece[];
};

const Pieces = ({ pieces }: Props) => {
  return (
    <div className="pieces">
      {pieces.map((piece, i) => (
        <PieceIcon key={i} piece={piece} position={s.position} />
      ))}
    </div>
  );
};

export default Pieces;
