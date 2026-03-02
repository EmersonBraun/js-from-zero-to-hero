export function transformDecimalToBinary(value) {
  let decimal = value;
  const result = [];
  const binaryBase = 2;
  while (decimal >= binaryBase) {
    result.push(parseInt(decimal % binaryBase));
    decimal = parseInt(decimal / binaryBase);
  }
  result.push(decimal);
  return result.reverse().join("").replace(/,/g, "");
}

export function transformBinaryToDecimal(value) {
  return parseInt(value, 2);
}

export function isBinary(value) {
  return /^[01]+$/.test(value);
}
