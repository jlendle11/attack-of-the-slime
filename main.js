const slime = { x: 0, y: 0 }
const humans = { x: 4, y: 4 }
const cars = [
    { x: 3, y: 1},
    { x: 3, y: 2}
]
const restart = function() {
	window.location.reload();
}
//Tutorial for fade effect: "https://christopheraue.net/design"
fadeInPage()
function fadeInPage() {
    const fader = document.getElementById('fader')
    fader.classList.add('fade-out')
}

document.addEventListener('DOMContentLoaded', function() {
    let anchors = document.getElementsByTagName('a')
    for (let idx=0; idx<anchors.length; idx+=1) {
        if (anchors[idx].hostname !== window.location.hostname) {
            continue
        }
        anchors[idx].addEventListener('click', function(event) {
            var fader = document.getElementById('fader'),
                anchor = event.currentTarget;
            
            var listener = function() {
                window.location = anchor.href
                fader.removeEventListener('animationend', listener)
            };
            fader.addEventListener('animationend', listener)
            
            event.preventDefault();
            fader.classList.add('fade-in')
        })
    }
})

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
    const humanEx = document.querySelectorAll('.human')
    for (let i = 0; i < humanEx.length; i++) {
        humanEx[i].remove()
        return;
    }
    
    const humanEl = document.createElement('div')
    humanEl.className = 'human'
    humanEl.style.left = (humans.x * 100).toString() + 'px'
    humanEl.style.top = (humans.y * 100).toString() + 'px'
    document.querySelector('.game-board').appendChild(humanEl)
}

const isHuman = function(x, y) {
        if (humans.x == x && humans.y == y) {
            return true
        }
    return false
}

const isSlimeThere = function(x, y) {
    const cln = document.querySelectorAll('#clone')

    if (cln.x == x && cln.y == y) {
        return true
    }
    return false
}

const isMoveOnBoard = function(x, y) {
    if (x < 0 || y < 0 || x > 4 || y > 4) {
        return false
    }
    return true
}

const removeHuman = function(x, y) {
        if (humans.x == x && humans.y == y) {
            delete humans.x
            delete humans.y
        }
}

const carAtLoc = function(x, y) {
    for (let i = 0; i < cars.length; i++) {
        const car = cars[i]
        if ( car.x === x && car.y === y) {
            return true
        }
    }
    return false
}

const canMoveTo = function(x, y) {
    if (!isMoveOnBoard(x, y)) {
        return false
    }
    if (carAtLoc(x, y)) {
        return false
    }
    // if (isSlimeThere(x, y)) {
    //     return false
    // }
    return true
}

function moveSlime(x, y) {
    const slimeEl = document.querySelector('.slime')
    slimeEl.style.left = (x * 100).toString() + 'px'
    slimeEl.style.top = (y * 100).toString() + 'px'
    if (isHuman(x, y)) {
        removeHuman(x, y)
        createHuman()
        if (document.querySelectorAll('.slime').length == 23) {
            setTimeout(function() { alert('You have consumed the whole block. Next step, the world. Congats.')}, 100)
        } else if (document.querySelectorAll('.slime').length > 23) {
            setTimeout(function() { alert('You ate the human but also ate your own toxic self. You are dead.')}, 100)
            setTimeout(function(){ 
                const retry = confirm('Would you like to try again?')
                
                if (retry == true) {
                    restart()
                }
            }, 200)
        } else {
            setTimeout(function() { alert('You did not cover the whole area so the humans were able to defeat you.')}, 100)
            setTimeout(function(){ 
                const retry = confirm('Would you like to try again?')
                
                if (retry == true) {
                    restart()
                }
            }, 200)
        }
    }
    // if (isSlimeThere(x, y)) {
    //     alert('Game Over')
    // }
}


function moveLeft() {
    if (canMoveTo(slime.x - 1, slime.y)) {
        const trail = document.querySelector('.slime')
        const clone = trail.cloneNode(false)
        clone.id = 'clone'
        document.querySelector('.game-board').appendChild(clone)
        slime.x -= 1
        moveSlime(slime.x, slime.y)

    }
}

function moveUp() {
    if (canMoveTo(slime.x, slime.y - 1)) {
        const trail = document.querySelector('.slime')
        const clone = trail.cloneNode(false)
        clone.id = 'clone'
        document.querySelector('.game-board').appendChild(clone)
        slime.y -= 1
        moveSlime(slime.x, slime.y)
    }
}

function moveRight() {
    if (canMoveTo(slime.x + 1, slime.y)) {
        const trail = document.querySelector('.slime')
        const clone = trail.cloneNode(false)
        clone.id = 'clone'
        document.querySelector('.game-board').appendChild(clone)
        slime.x += 1
        moveSlime(slime.x, slime.y)
    }
}

function moveDown() {
    if (canMoveTo(slime.x, slime.y + 1)) {
        const trail = document.querySelector('.slime')
        const clone = trail.cloneNode(false)
        clone.id = 'clone'
        document.querySelector('.game-board').appendChild(clone)
        slime.y += 1
        moveSlime(slime.x, slime.y)
    }
}

document.body.addEventListener('keydown', function(evt) {
    const keyCode = evt.keyCode
    if ([37, 38, 39, 40].includes(keyCode)) {
        evt.preventDefault()
    }
    switch(keyCode) {
        case 37: 
            moveLeft()
            break
        case 38:
            moveUp()
            break
        case 39:
            moveRight()
            break
        case 40:
            moveDown()
            break
            
    }
})

const replay = function() {

}

function runGame() {
    createCars()
    createHuman()
}
runGame()


