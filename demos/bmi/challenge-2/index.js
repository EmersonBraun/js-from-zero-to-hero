document.getElementById('clear').addEventListener('click', () => {
    document.querySelectorAll('.input').forEach(input => input.value = '')
    document.getElementById('bmi').innerHTML = ''
    document.getElementById('bmi-ideal').innerHTML = ''
    document.getElementById('bmi-type').innerHTML = ''
})
function fixValue(value) {
    return (value).toFixed(2)
}
function calculate() {
    const height = document.getElementById('height').value
    const weight = document.getElementById('weight').value
    if(!height || !weight) return
    const bmi = weight / height ** 2
    const cleanBMI = fixValue(bmi * 10000)
    document.getElementById('bmi').innerHTML = `BMI ${cleanBMI}`
    document.getElementById('bmi-ideal').innerHTML = calculateBMIIdeal(height, weight)
    document.getElementById('bmi-type').innerHTML = getBMIType(cleanBMI)
}

function getBMIType(value) {
    const wrap = (text, color) => `Type: <span style='color: ${color}'>${text}</span>`
    if(value < 16) return 'Severe Thinness'
    if(value > 16 && value <= 17) return wrap('Moderate Thinness','red')
    if(value > 17 && value <= 18.5) return wrap('Mild Thinness','red')
    if(value > 18.5 && value <= 25) return wrap('Normal','green')
    if(value > 25 && value <= 30) return wrap('Overweight','red')
    if(value > 30 && value <= 35) return wrap('Obese Class I','red')
    if(value > 35 && value <= 40) return wrap('Obese Class II','red')
    else 'Obese Class III'
}

function calculateBMIIdeal(height, weight) {
    const bmi = height ** 2 * 22.5
    const idealBMI = fixValue(bmi / 10000)
    console.log(idealBMI, weight)
    const diferenceOfBMI = idealBMI > weight ? `(-${Math.abs(fixValue(idealBMI - weight))}kg)`  : `(+${Math.abs(fixValue(idealBMI - weight))}kg)`
    return `Ideal weight: ${idealBMI} kg ${diferenceOfBMI}`
}
