import { describe, it, expect } from "vitest";

function calculateBMI(weight, height) {
  if (!height || !weight) return null;
  return weight / height ** 2 * 10000;
}

function getBMIType(value) {
  if (value < 16) return "Severe Thinness";
  if (value > 16 && value <= 17) return "Moderate Thinness";
  if (value > 17 && value <= 18.5) return "Mild Thinness";
  if (value > 18.5 && value <= 25) return "Normal";
  if (value > 25 && value <= 30) return "Overweight";
  if (value > 30 && value <= 35) return "Obese Class I";
  if (value > 35 && value <= 40) return "Obese Class II";
  return "Obese Class III";
}

describe("calculateBMI", () => {
  it("returns null for missing values", () => {
    expect(calculateBMI(0, 170)).toBeNull();
    expect(calculateBMI(70, 0)).toBeNull();
  });

  it("calculates BMI correctly", () => {
    const bmi = calculateBMI(70, 175);
    expect(bmi).toBeCloseTo(22.86, 1);
  });

  it("calculates edge cases", () => {
    const bmi = calculateBMI(50, 160);
    expect(bmi).toBeCloseTo(19.53, 1);
  });
});

describe("getBMIType", () => {
  it("returns Severe Thinness for BMI < 16", () => {
    expect(getBMIType(15)).toBe("Severe Thinness");
  });

  it("returns Normal for BMI 18.5-25", () => {
    expect(getBMIType(22)).toBe("Normal");
  });

  it("returns Overweight for BMI 25-30", () => {
    expect(getBMIType(27)).toBe("Overweight");
  });

  it("returns Obese Class III for BMI > 40", () => {
    expect(getBMIType(45)).toBe("Obese Class III");
  });

  it("covers all categories", () => {
    expect(getBMIType(16.5)).toBe("Moderate Thinness");
    expect(getBMIType(18)).toBe("Mild Thinness");
    expect(getBMIType(33)).toBe("Obese Class I");
    expect(getBMIType(38)).toBe("Obese Class II");
  });
});
