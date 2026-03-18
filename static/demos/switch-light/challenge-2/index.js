let broken = false
let on = true
let type = 'NORMAL'

const light = document.getElementById('light')
document.getElementById('light').addEventListener('mouseenter', (element) => changeLight(element, 'on'))
document.getElementById('light').addEventListener('mouseleave', (element) => changeLight(element, 'off'))
document.getElementById('light').addEventListener('click', (element) => {
    if (type === 'NORMAL') {
        changeLight(element, 'broken')
    } else {
        toogleLight(element)
    }
})

function toogleType() {
    type = type === 'NORMAL' ? 'SWITCH' : 'NORMAL'
    document.getElementById('btn').innerHTML = type
    broken = false
}

function changeLight(element, tipo) {
    if (broken === true || type === 'SWITCH') return
    element.srcElement.src = `images/light-${tipo}.png`
    if (tipo === 'broken') {
        broken = true
    }
}

function toogleLight(element) {
    element.srcElement.src = !on ? 'images/light-on.png' : 'images/light-off.png'
    on = !on
}