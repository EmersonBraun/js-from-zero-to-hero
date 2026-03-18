let on = true

const light = document.getElementById('light')
document.getElementById('light').addEventListener('click', (element) => toogleLight(element))

function toogleLight(element) {
    element.srcElement.src = !on ? 'images/light-on.png' : 'images/light-off.png'
    on = !on
}