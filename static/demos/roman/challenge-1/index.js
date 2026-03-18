var romanMap = [
    ['M', 1000],
    ['CM', 900],
    ['D', 500],
    ['CD', 400],
    ['C', 100],
    ['XC', 90],
    ['L', 50],
    ['XL', 40],
    ['X', 10],
    ['IX', 9],
    ['V', 5],
    ['IV', 4],
    ['I', 1]
];


function toRoman(integer) {
    let romanString = '';
    romanMap.forEach((roman) => {
        while (integer >= roman[1]) {
            romanString += roman[0];
            integer -= roman[1];
        }
    });
    return romanString;
}

function fromRoman(romanString) {
    var integer = 0;
    romanMap.forEach((roman) => {
        while (romanString.substring(0, roman[0].length) === roman[0]) {
            romanString = romanString.substring(roman[0].length);
            integer += roman[1];
        }
    });
    return integer;
}

function printToRoman() {
    const value = document.getElementById('input').value
    console.log(value)
    if(isNaN(+value)) {
        return
    } else {
        document.getElementById('output').innerHTML = toRoman(value)
    }
}

function printFromRoman() {
    const value = document.getElementById('input').value
    console.log(value)
    if(!isNaN(+value)) {
        document.getElementById('output').innerHTML = ''
    } else {
        document.getElementById('output').innerHTML = fromRoman(value)
    }
}

function clear() {
    const value = document.getElementById('input').value
    console.log(value)
    if(value.length === 0) {
        document.getElementById('output').innerHTML = ''
    }
}
const romanYear = toRoman(2022)
console.assert(romanYear === 'MMXXII')
console.log(fromRoman(romanYear) === 2022)