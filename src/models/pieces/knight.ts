import Piece from "./piece";

export default class Knight extends Piece {
  toFen(): string {
    return this.color === "white" ? "N" : "n";
  }
}
