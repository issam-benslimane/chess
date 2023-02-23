import React from "react";
import Piece from "../models/pieces/piece";
import Position from "../models/position";
import { PieceColor } from "../models/types";

type Props = {
  piece: Piece;
  position: Position;
  handleClick: (pos: Position, color: PieceColor) => void;
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

const PieceIcon = ({ piece, position, handleClick }: Props) => {
  const pieceUrl = getPieceUrl(getPieceFen(piece), piece.color);
  return (
    <div
      className="piece"
      style={
        {
          backgroundImage: `url(${pieceUrl})`,
          "--x": position.x,
          "--y": position.y,
        } as React.CSSProperties
      }
      onClick={() => handleClick(position, piece.color)}
    ></div>
  );
};

export default PieceIcon;
