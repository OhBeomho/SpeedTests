const clickBox = $(".click-box"),
    lowest = $(".ms-lowest"),
    recent = $(".ms"),
    average = $(".ms-average"),
    resetLowest = $(".reset-lowest"),
    resetAverage = $(".reset-average")
let ms = 0, times = 0, msArray = []
let lowestMS = 0, averageMS = 0
let pressed = false
let startTime, endTime
let timer, time = 0

function spacebarPressed() {
    if (!pressed) {
        pressed = true
        startCheck()
    } else {
        pressed = false
        times++
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
    msArray.push(ms)

    if (lowestMS == 0 || ms < lowestMS) {
        lowestMS = ms
        lowest.html(`Lowest MS: <strong>${ms}</strong>`)
    }

    averageMS = 0
    msArray.forEach(i => averageMS += i)
    averageMS /= msArray.length

    recent.html(`Recent MS: <strong>${ms}</strong>`)
    average.html(`Average MS: <strong>${averageMS}</strong>`)
}

$(document).ready(() => {
    $("body").keydown((event) => {
        if (event.keyCode == 32) {
            spacebarPressed()
        }
    })
    resetAverage.click(() => {
        averageMS = 0
        msArray.splice(0)
        average.html("Average MS: <strong>0</strong>")
        resetAverage.blur()
    })
    resetLowest.click(() => {
        lowestMS = 0
        lowest.html("Lowest MS: <strong>0</strong>")
        resetLowest.blur()
    })
})