import { diagonal, horizontal, vertical } from "../moves/basic-moves";
import Piece from "./piece";

export class King extends Piece {
  static fen = "k";

  moveTypes() {
    const depth = 1;
    return [horizontal({ depth }), vertical({ depth }), diagonal({ depth })];
  }
}
