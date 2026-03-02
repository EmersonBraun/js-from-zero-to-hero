import { describe, it, expect } from "vitest";

function transformDecimalToBinary(value) {
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

function transformBinaryToDecimal(value) {
  return parseInt(value, 2);
}

function isBinary(value) {
  return /^[01]+$/.test(value);
}

describe("transformDecimalToBinary", () => {
  it("converts basic numbers", () => {
    expect(transformDecimalToBinary(0)).toBe("0");
    expect(transformDecimalToBinary(1)).toBe("1");
    expect(transformDecimalToBinary(2)).toBe("10");
    expect(transformDecimalToBinary(10)).toBe("1010");
  });

  it("converts larger numbers", () => {
    expect(transformDecimalToBinary(255)).toBe("11111111");
    expect(transformDecimalToBinary(128)).toBe("10000000");
    expect(transformDecimalToBinary(42)).toBe("101010");
  });
});

describe("transformBinaryToDecimal", () => {
  it("converts basic binary strings", () => {
    expect(transformBinaryToDecimal("0")).toBe(0);
    expect(transformBinaryToDecimal("1")).toBe(1);
    expect(transformBinaryToDecimal("10")).toBe(2);
    expect(transformBinaryToDecimal("1010")).toBe(10);
  });

  it("converts larger binary strings", () => {
    expect(transformBinaryToDecimal("11111111")).toBe(255);
    expect(transformBinaryToDecimal("10000000")).toBe(128);
    expect(transformBinaryToDecimal("101010")).toBe(42);
  });
});

describe("isBinary", () => {
  it("validates binary strings", () => {
    expect(isBinary("0101")).toBe(true);
    expect(isBinary("1100")).toBe(true);
    expect(isBinary("0")).toBe(true);
  });

  it("rejects non-binary strings", () => {
    expect(isBinary("123")).toBe(false);
    expect(isBinary("abc")).toBe(false);
    expect(isBinary("10102")).toBe(false);
  });
});

describe("roundtrip", () => {
  it("converts back and forth correctly", () => {
    for (let i = 0; i <= 50; i++) {
      const binary = transformDecimalToBinary(i);
      expect(transformBinaryToDecimal(binary)).toBe(i);
    }
  });
});
