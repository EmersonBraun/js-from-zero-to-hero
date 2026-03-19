document.getElementById('clear').addEventListener('click', () => {
    document.querySelectorAll('.input').forEach(input => input.value = '')
    document.getElementById('bmi').innerHTML = ''
    document.getElementById('bmi-type').innerHTML = ''
})

function calculate() {
    const height = document.getElementById('height').value
    const weight = document.getElementById('weight').value
    if(!height || !weight) return
    const bmi = weight / height ** 2
    const cleanBMI = (bmi * 10000).toFixed(2)
    document.getElementById('bmi').innerHTML = `${cleanBMI} BMI`
    document.getElementById('bmi-type').innerHTML = getBMIType(cleanBMI)
}

function getBMIType(value) {
    if(value < 16) return 'Severe Thinness'
    if(value > 16 && value <= 17) return 'Moderate Thinness'
    if(value > 17 && value <= 18.5) return 'Mild Thinness'
    if(value > 18.5 && value <= 25) return 'Normal'
    if(value > 25 && value <= 30) return 'Overweight'
    if(value > 30 && value <= 35) return 'Obese Class I'
    if(value > 35 && value <= 40) return 'Obese Class II'
    else 'Obese Class III'
}
