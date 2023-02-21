import { diagonal } from "../moves";
import Piece from "./piece";

export default class Bishop extends Piece {
  moveTypes() {
    return diagonal();
  }

  toFen(): string {
    return this.color === "white" ? "B" : "b";
  }
}
