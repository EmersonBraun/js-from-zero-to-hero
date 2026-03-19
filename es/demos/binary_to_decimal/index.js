function transformDecimalToBinary(value) {
  let decimal = value;
  let result = [];
  const binaryBase = 2;
  while (decimal >= binaryBase) {
    result.push(parseInt(decimal % binaryBase));
    decimal = parseInt(decimal / binaryBase);
  }

  result.push(decimal);

  return result.reverse().join().replace(/,/g, "");
}

function transformBinaryToDecimal(value) {
  for (let i = 0; i < value.length; i++) {
    if (value.charAt(i) > 1) {
      alert("please insert a binary number");
    }
  }
  return parseInt(value, 2);
}

function decimalToBinary() {
  const decimal = document.getElementById("decimalToBinary").value;
  const binary = transformDecimalToBinary(decimal);
  document.getElementById("binary").innerHTML = binary || "";
}

function binaryToDecimal() {
  const value = document.getElementById("binaryToDecimal").value;

  const decimal = decimalToBinary(value);
  document.getElementById("decimal").innerHTML = parseInt(value, 2) || "";
}
