import Piece from "./piece";

export default class Bishop extends Piece {
  toFen(): string {
    return this.color === "white" ? "B" : "b";
  }
}
