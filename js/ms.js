const clickBox = $(".click-box"),
    lowest = $(".ms-lowest"),
    recent = $(".ms")
let ms = 0
let lowestMS = 0
let pressed = false
let startTime, endTime
let timer, time = 0

function spacebarPressed() {
    if (!pressed) {
        pressed = true
        startCheck()
    } else {
        pressed = false
        endCheck()
    }
}

function startCheck() {
    startTime = new Date().getTime()
    timer = setInterval(() => {
        clickBox.html(`<p>${++time}</p>`)
    }, 1)
}

function endCheck() {
    clearInterval(timer)
    time = 0
    clickBox.html("<p>Press the spacebar twice as fast as possible</p>")

    endTime = new Date().getTime()

    ms = endTime - startTime

    if (lowestMS == 0 || ms < lowestMS) {
        lowestMS = ms
        lowest.html(`Lowest MS: <strong>${ms}</strong>`)
    }

    recent.html(`Recent MS: <strong>${ms}</strong>`)
}

$(document).ready(() => {
    $("body").keydown((event) => {
        if (event.keyCode == 32) {
            spacebarPressed()
        }
    })
})