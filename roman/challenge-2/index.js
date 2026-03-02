import { toRoman, fromRoman } from "./converter.js";

const input = document.getElementById("input");
const output = document.getElementById("output");

function change() {
  const value = input.value;
  if (isNaN(+value)) {
    output.innerHTML = fromRoman(value);
  } else {
    output.innerHTML = toRoman(value);
  }
}

function clear() {
  if (input.value.length === 0) {
    output.innerHTML = "";
  }
}

input.addEventListener("keyup", change);
input.addEventListener("input", clear);
