export function toChar(n: number) {
  return String.fromCharCode(97 + n);
}

export function getCharCode(char: string) {
  return char.charCodeAt(0) - 97;
}

export function isString(s: unknown): s is string {
  return typeof s === "string" || s instanceof String;
}

export function isMultiDimArray<T>(arr: unknown): arr is T[][] {
  return Array.isArray(arr) && arr[0] && arr[0][0];
}
