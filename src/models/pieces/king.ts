import Piece from "./piece";

export default class King extends Piece {
  toFen(): string {
    return this.color === "white" ? "K" : "k";
  }
}
