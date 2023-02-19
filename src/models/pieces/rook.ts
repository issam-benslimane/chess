import Piece from "./piece";

export default class Rook extends Piece {
  toFen(): string {
    return this.color === "white" ? "R" : "r";
  }
}
