import Piece from "./piece";

export default class Pawn extends Piece {
  toFen(): string {
    return this.color === "white" ? "P" : "p";
  }
}
