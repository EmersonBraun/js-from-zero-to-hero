import { describe, it, expect } from "vitest";

const romanMap = [
  ["M", 1000],
  ["CM", 900],
  ["D", 500],
  ["CD", 400],
  ["C", 100],
  ["XC", 90],
  ["L", 50],
  ["XL", 40],
  ["X", 10],
  ["IX", 9],
  ["V", 5],
  ["IV", 4],
  ["I", 1],
];

function toRoman(integer) {
  let romanString = "";
  romanMap.forEach((roman) => {
    while (integer >= roman[1]) {
      romanString += roman[0];
      integer -= roman[1];
    }
  });
  return romanString;
}

function fromRoman(romanString) {
  let integer = 0;
  romanMap.forEach((roman) => {
    while (romanString.substring(0, roman[0].length) === roman[0]) {
      romanString = romanString.substring(roman[0].length);
      integer += roman[1];
    }
  });
  return integer;
}

describe("toRoman", () => {
  it("converts basic numbers", () => {
    expect(toRoman(1)).toBe("I");
    expect(toRoman(5)).toBe("V");
    expect(toRoman(10)).toBe("X");
    expect(toRoman(50)).toBe("L");
    expect(toRoman(100)).toBe("C");
    expect(toRoman(500)).toBe("D");
    expect(toRoman(1000)).toBe("M");
  });

  it("converts subtractive notation", () => {
    expect(toRoman(4)).toBe("IV");
    expect(toRoman(9)).toBe("IX");
    expect(toRoman(40)).toBe("XL");
    expect(toRoman(90)).toBe("XC");
    expect(toRoman(400)).toBe("CD");
    expect(toRoman(900)).toBe("CM");
  });

  it("converts complex numbers", () => {
    expect(toRoman(2022)).toBe("MMXXII");
    expect(toRoman(1994)).toBe("MCMXCIV");
    expect(toRoman(3999)).toBe("MMMCMXCIX");
    expect(toRoman(58)).toBe("LVIII");
  });
});

describe("fromRoman", () => {
  it("converts basic numerals", () => {
    expect(fromRoman("I")).toBe(1);
    expect(fromRoman("V")).toBe(5);
    expect(fromRoman("X")).toBe(10);
    expect(fromRoman("M")).toBe(1000);
  });

  it("converts subtractive notation", () => {
    expect(fromRoman("IV")).toBe(4);
    expect(fromRoman("IX")).toBe(9);
    expect(fromRoman("XL")).toBe(40);
    expect(fromRoman("CM")).toBe(900);
  });

  it("converts complex numerals", () => {
    expect(fromRoman("MMXXII")).toBe(2022);
    expect(fromRoman("MCMXCIV")).toBe(1994);
    expect(fromRoman("MMMCMXCIX")).toBe(3999);
  });

  it("roundtrips with toRoman", () => {
    for (let i = 1; i <= 100; i++) {
      expect(fromRoman(toRoman(i))).toBe(i);
    }
  });
});
