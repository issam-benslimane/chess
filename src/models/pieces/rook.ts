import { vertical } from "../moves";
import Piece from "./piece";

export default class Rook extends Piece {
  moveTypes() {
    return vertical();
  }

  toFen(): string {
    return this.color === "white" ? "R" : "r";
  }
}
