const slime = { x: 0, y: 0 }
const humans = { x: 4, y: 4 }
const cars = [
    { x: 3, y: 1},
    { x: 3, y: 2}
]

function createCars() {
    for (const car of cars) {
        const carEl = document.createElement('div')
        carEl.className = 'car'
        carEl.style.top = (car.y * 100).toString() + 'px'
        carEl.style.left = (car.x * 100).toString() + 'px'
        document.querySelector('.game-board').appendChild(carEl)
    }
}

function createHuman() {
    const humanEl = document.createElement('div')
    humanEl.className = 'human'
    humanEl.style.left = (humans.x * 100).toString() + 'px'
    humanEl.style.top = (humans.y * 100).toString() + 'px'
    document.querySelector('.game-board').appendChild(humanEl)
}



function runGame() {
    createCars()
    createHuman()
}
runGame()


