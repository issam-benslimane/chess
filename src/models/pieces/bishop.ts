import Piece from "./piece";

export default class Bishop extends Piece {
  moves() {
    return [];
  }

  toFen(): string {
    return this.color === "white" ? "B" : "b";
  }
}
