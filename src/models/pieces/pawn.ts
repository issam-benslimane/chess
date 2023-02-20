import Piece from "./piece";

export default class Pawn extends Piece {
  direction: number = this.color === "white" ? 1 : -1;

  moves() {
    return [];
  }

  toFen(): string {
    return this.color === "white" ? "P" : "p";
  }
}
