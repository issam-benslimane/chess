import Piece from "./piece";

export default class Rook extends Piece {
  moves() {
    return [];
  }

  toFen(): string {
    return this.color === "white" ? "R" : "r";
  }
}
