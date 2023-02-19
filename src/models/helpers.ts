export function toChar(n: number) {
  return String.fromCharCode(96 + n);
}

export function getCharCode(char: string) {
  return char.charCodeAt(0) - 97;
}
