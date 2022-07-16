const clickBox = $(".click-box")
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
        time += 4
        clickBox.html(`<p>${time}</p>`)
    }, 1)
}

function endCheck() {
    clearInterval(timer)
    time = 0

    endTime = new Date().getTime()

    ms = endTime - startTime
    msArray.push(ms)
    clickBox.html(`<p>${ms}</p>`)

    if (lowestMS == 0 || ms < lowestMS) {
        lowestMS = ms
        $(".ms-lowest").html(`Lowest MS: <strong>${ms}</strong>`)
    }

    averageMS = 0
    msArray.forEach(i => averageMS += i)
    averageMS = Math.round(averageMS / msArray.length)

    $(".ms-average").html(`Average MS: <strong>${averageMS}</strong>`)
}

$(() => {
    $("body").keydown((event) => {
        if (event.keyCode == 32) {
            spacebarPressed()
        }
    })
    $(".reset-average").click(() => {
        averageMS = 0
        msArray.splice(0)
        $(".ms-average").html("Average MS: <strong>0</strong>")
        $(".reset-average").blur()
    })
    $(".reset-lowest").click(() => {
        lowestMS = 0
        $(".ms-lowest").html("Lowest MS: <strong>0</strong>")
        $(".reset-lowest").blur()
    })
})