import Piece from "./piece";

export default class Queen extends Piece {
  moves() {
    return [];
  }

  toFen(): string {
    return this.color === "white" ? "Q" : "q";
  }
}
