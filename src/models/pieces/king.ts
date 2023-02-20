import Piece from "./piece";

export default class King extends Piece {
  moves() {
    return [];
  }

  toFen(): string {
    return this.color === "white" ? "K" : "k";
  }
}
