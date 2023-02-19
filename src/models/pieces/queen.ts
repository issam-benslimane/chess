import Piece from "./piece";

export default class Queen extends Piece {
  toFen(): string {
    return this.color === "white" ? "Q" : "q";
  }
}
