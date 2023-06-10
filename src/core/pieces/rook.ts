import { horizontal, vertical } from "../moves/basic-moves";
import Piece from "./piece";

export class Rook extends Piece {
  static fen = "r";

  moveTypes() {
    return [vertical(), horizontal()];
  }
}
