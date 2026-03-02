import { describe, it, expect } from "vitest";

const CHARS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

function generatePassword(length, options) {
  let chars = "";
  if (options.uppercase) chars += CHARS.uppercase;
  if (options.lowercase) chars += CHARS.lowercase;
  if (options.numbers) chars += CHARS.numbers;
  if (options.symbols) chars += CHARS.symbols;

  if (!chars) return "";

  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

function getPasswordStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return "weak";
  if (score <= 4) return "medium";
  return "strong";
}

describe("generatePassword", () => {
  it("generates password with correct length", () => {
    const pw = generatePassword(16, {
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: false,
    });
    expect(pw).toHaveLength(16);
  });

  it("returns empty string when no options selected", () => {
    const pw = generatePassword(10, {
      uppercase: false,
      lowercase: false,
      numbers: false,
      symbols: false,
    });
    expect(pw).toBe("");
  });

  it("only uses selected character sets", () => {
    const pw = generatePassword(100, {
      uppercase: false,
      lowercase: false,
      numbers: true,
      symbols: false,
    });
    expect(pw).toMatch(/^[0-9]+$/);
  });

  it("includes symbols when selected", () => {
    const pw = generatePassword(200, {
      uppercase: false,
      lowercase: false,
      numbers: false,
      symbols: true,
    });
    expect(pw).toMatch(/^[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]+$/);
  });
});

describe("getPasswordStrength", () => {
  it("rates short simple passwords as weak", () => {
    expect(getPasswordStrength("abc")).toBe("weak");
    expect(getPasswordStrength("12345")).toBe("weak");
  });

  it("rates medium complexity passwords", () => {
    expect(getPasswordStrength("Abcdef12")).toBe("medium");
  });

  it("rates complex passwords as strong", () => {
    expect(getPasswordStrength("Abcdef12!@#$")).toBe("strong");
  });
});
