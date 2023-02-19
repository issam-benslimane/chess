export default abstract class Piece {
  color: string;
  moved: false;
  constructor(color: string) {
    this.color = color;
    this.moved = false;
  }

  abstract toFen(): string;
}
