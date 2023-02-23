import { diagonal } from "../moves";
import Piece from "./piece";

export class Bishop extends Piece {
  static fen = "b";

  moveTypes() {
    return diagonal();
  }
}
