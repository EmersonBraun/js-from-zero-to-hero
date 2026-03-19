document.getElementById('clear').addEventListener('click', () => {
    document.querySelectorAll('.input').forEach(input => input.value = '')
    document.getElementById('bmi').innerHTML = ''
})

function calculate() {
    const height = document.getElementById('height').value
    const weight = document.getElementById('weight').value
    if(!height || !weight) return
    const bmi = weight / height ** 2
    document.getElementById('bmi').innerHTML = `${(bmi * 10000).toFixed(2)} BMI`
}
