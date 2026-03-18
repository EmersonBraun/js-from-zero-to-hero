import {describe, it, expect} from 'vitest';

// Exercise solutions from the Introduction module
describe('Introduction Module Exercises', () => {
  const hello = () => 'Hello, World!';
  const add = (a: number, b: number) => a + b;
  const greet = (name: string) => `Hello, ${name}!`;
  const isPositive = (num: number) => num > 0;
  const getLength = (str: string) => str.length;
  const multiply = (a: number, b: number) => a * b;
  const isEven = (num: number) => num % 2 === 0;
  const shout = (str: string) => str.toUpperCase();

  it('hello returns Hello, World!', () => {
    expect(hello()).toBe('Hello, World!');
  });

  it('add sums two numbers', () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 1)).toBe(0);
  });

  it('greet creates greeting', () => {
    expect(greet('Alice')).toBe('Hello, Alice!');
  });

  it('isPositive checks positivity', () => {
    expect(isPositive(5)).toBe(true);
    expect(isPositive(-3)).toBe(false);
    expect(isPositive(0)).toBe(false);
  });

  it('getLength returns string length', () => {
    expect(getLength('hello')).toBe(5);
    expect(getLength('')).toBe(0);
  });

  it('multiply returns product', () => {
    expect(multiply(3, 4)).toBe(12);
    expect(multiply(0, 100)).toBe(0);
  });

  it('isEven checks evenness', () => {
    expect(isEven(4)).toBe(true);
    expect(isEven(7)).toBe(false);
    expect(isEven(0)).toBe(true);
  });

  it('shout converts to uppercase', () => {
    expect(shout('hello')).toBe('HELLO');
  });
});

// Exercise solutions from the Operators & Conditionals module
describe('Operators & Conditionals Module Exercises', () => {
  const absoluteValue = (num: number) => (num < 0 ? -num : num);
  const getGrade = (score: number) => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  };
  const fizzBuzz = (num: number) => {
    if (num % 3 === 0 && num % 5 === 0) return 'FizzBuzz';
    if (num % 3 === 0) return 'Fizz';
    if (num % 5 === 0) return 'Buzz';
    return String(num);
  };
  const maxOfThree = (a: number, b: number, c: number) => {
    if (a >= b && a >= c) return a;
    if (b >= a && b >= c) return b;
    return c;
  };
  const canVote = (age: number, isCitizen: boolean) => age >= 18 && isCitizen;
  const clamp = (num: number, min: number, max: number) => {
    if (num < min) return min;
    if (num > max) return max;
    return num;
  };

  it('absoluteValue works', () => {
    expect(absoluteValue(-5)).toBe(5);
    expect(absoluteValue(3)).toBe(3);
    expect(absoluteValue(0)).toBe(0);
  });

  it('getGrade returns correct grades', () => {
    expect(getGrade(95)).toBe('A');
    expect(getGrade(85)).toBe('B');
    expect(getGrade(50)).toBe('F');
  });

  it('fizzBuzz works', () => {
    expect(fizzBuzz(15)).toBe('FizzBuzz');
    expect(fizzBuzz(9)).toBe('Fizz');
    expect(fizzBuzz(10)).toBe('Buzz');
    expect(fizzBuzz(7)).toBe('7');
  });

  it('maxOfThree finds largest', () => {
    expect(maxOfThree(1, 2, 3)).toBe(3);
    expect(maxOfThree(10, 5, 8)).toBe(10);
  });

  it('canVote checks eligibility', () => {
    expect(canVote(20, true)).toBe(true);
    expect(canVote(20, false)).toBe(false);
    expect(canVote(16, true)).toBe(false);
  });

  it('clamp restricts range', () => {
    expect(clamp(5, 1, 10)).toBe(5);
    expect(clamp(-3, 0, 100)).toBe(0);
    expect(clamp(150, 0, 100)).toBe(100);
  });
});

// Exercise solutions from the Loops module
describe('Loops Module Exercises', () => {
  const sumTo = (n: number) => {
    let sum = 0;
    for (let i = 1; i <= n; i++) sum += i;
    return sum;
  };
  const factorial = (n: number) => {
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
  };
  const reverseString = (str: string) => {
    let result = '';
    for (let i = str.length - 1; i >= 0; i--) result += str[i];
    return result;
  };
  const isPalindrome = (str: string) => {
    const lower = str.toLowerCase();
    for (let i = 0; i < Math.floor(lower.length / 2); i++) {
      if (lower[i] !== lower[lower.length - 1 - i]) return false;
    }
    return true;
  };

  it('sumTo sums from 1 to n', () => {
    expect(sumTo(5)).toBe(15);
    expect(sumTo(10)).toBe(55);
  });

  it('factorial calculates n!', () => {
    expect(factorial(5)).toBe(120);
    expect(factorial(0)).toBe(1);
  });

  it('reverseString reverses', () => {
    expect(reverseString('hello')).toBe('olleh');
  });

  it('isPalindrome detects palindromes', () => {
    expect(isPalindrome('racecar')).toBe(true);
    expect(isPalindrome('hello')).toBe(false);
    expect(isPalindrome('Madam')).toBe(true);
  });
});
