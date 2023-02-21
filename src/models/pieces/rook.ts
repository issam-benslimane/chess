import { vertical } from "../moves";
import Piece from "./piece";

export default class Rook extends Piece {
  moves() {
    return [vertical()];
  }

  toFen(): string {
    return this.color === "white" ? "R" : "r";
  }
}
