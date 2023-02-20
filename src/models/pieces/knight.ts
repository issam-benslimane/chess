import Piece from "./piece";

export default class Knight extends Piece {
  moves() {
    return [];
  }

  toFen(): string {
    return this.color === "white" ? "N" : "n";
  }
}
