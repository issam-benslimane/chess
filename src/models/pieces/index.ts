import Bishop from "./bishop";
import King from "./king";
import Knight from "./knight";
import Pawn from "./pawn";
import Piece from "./piece";
import Queen from "./queen";
import Rook from "./rook";

type Color = "black" | "white";

function createPieces(color: Color): Piece[] {
  return [Bishop, King, Knight, Pawn, Queen, Rook].map((P) => new P(color));
}

const pieces = [...createPieces("black"), ...createPieces("white")];

export default pieces;
