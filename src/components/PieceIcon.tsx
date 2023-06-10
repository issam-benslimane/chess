import React from "react";
import Piece from "../core/pieces/piece";
import { PieceColor } from "../core/types";

type Props = {
  piece: Piece;
};

function getPieceUrl(fen: string, color: PieceColor) {
  const baseUrl = "https://www.chess.com/chess-themes/pieces/neo/150/";
  const remainingPath = color[0] + fen.toLowerCase();
  return baseUrl + remainingPath + ".png";
}

function getPieceFen(piece: Piece) {
  const fen: string = piece.constructor.fen;
  return piece.color === "white" ? fen.toUpperCase() : fen;
}

const PieceIcon = ({ piece }: Props) => {
  const pieceUrl = getPieceUrl(getPieceFen(piece), piece.color);
  return (
    <div
      className="piece"
      style={
        {
          backgroundImage: `url(${pieceUrl})`,
        } as React.CSSProperties
      }
    ></div>
  );
};

export default PieceIcon;
