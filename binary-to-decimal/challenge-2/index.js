import {
  transformDecimalToBinary,
  transformBinaryToDecimal,
  isBinary,
} from "./converter.js";

const input = document.getElementById("input");
const output = document.getElementById("output");

function change() {
  const value = input.value;
  if (!value) {
    output.innerHTML = "";
    return;
  }

  if (isBinary(value)) {
    output.innerHTML = transformBinaryToDecimal(value);
  } else if (!isNaN(+value)) {
    output.innerHTML = transformDecimalToBinary(value);
  } else {
    output.innerHTML =
      '<span style="color: red">Please insert a valid number</span>';
  }
}

input.addEventListener("keyup", change);
