export function generateRandomDecimal(min: number, max: number, decimalPlaces: number): number {
  const factor = Math.pow(10, decimalPlaces);
  return ((Math.random() * (max - min) + min) * factor) | (0 / factor);
}
