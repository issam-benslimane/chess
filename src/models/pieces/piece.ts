export default abstract class Piece {
  color: string;
  moved: false;
  constructor(color: string) {
    this.color = color;
    this.moved = false;
  }

  isEnemy(piece: Piece) {
    return this.color !== piece.color;
  }

  abstract toFen(): string;
  abstract moves();
}
