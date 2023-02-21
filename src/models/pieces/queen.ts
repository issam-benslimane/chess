import { diagonal, horizontal, vertical } from "../moves";
import Piece from "./piece";

export default class Queen extends Piece {
  moves() {
    return [vertical(), horizontal(), diagonal()];
  }

  toFen(): string {
    return this.color === "white" ? "Q" : "q";
  }
}
