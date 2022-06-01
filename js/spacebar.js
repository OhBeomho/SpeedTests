const clickBox = $(".click-box"),
    timeInput = $(".time-input")
let clicks = 0, cps = 0, time = 0, highestCPS = 0
let started = false
let timer, timeout

function spacebarPressed() {
    if (!started) {
        if (timeInput.val() == "" || timeInput.val() > 180) {
            alert("Time value must be between 1 and 180.")
            return
        }

        startCheck()
        started = true
    }

    clicks++

    let fontSizeString = clickBox.css("font-size")
    let fontSize = Number(fontSizeString.substring(0, fontSizeString.length - 2))

    clickBox.css("font-size", fontSize >= 80 ? fontSize : fontSize + 1 + "px")
    clickBox.html(`<p>${clicks}</p>`)
}

function startCheck() {
    time = timeInput.val()
    clicks = 0
    cps = 0

    clickBox.html(`<p>${time}</p>`)
    clickBox.css("fontSize", 10 + "px")

    timeInput.prop("readonly", true)

    timer = setInterval(() => {
        timeInput.val(timeInput.val() - 1)
    }, 1000)
    timeout = setTimeout(() => {
        cps = clicks / time

        if (highestCPS == 0 || cps > highestCPS) {
            highestCPS = cps
            $(".cps-highest").html(`Highest Spacebar CPS: <strong>${cps}</strong>`)
        }

        alert("Time over!\nYour Spacebar CPS is " + cps)
        $(".cps").html(`Spacebar CPS (Clicks per Seconds): <strong>${cps}</strong>`)

        stop()
    }, timeInput.val() * 1000)
}

function stop() {
    timeInput.prop("readonly", false)
    clickBox.css("font-size", "medium")
    clearInterval(timer)
    timeInput.val(time)
    started = false
}

$(document).ready(() => {
    $(document).keyup((event) => {
        if (event.keyCode == 32) {
            spacebarPressed()
            event.preventDefault()
        }
    })
    $(".reset-highest").click(() => {
        highestCPS = 0
        $(".cps-highest").html("Highest Spacebar CPS: <strong>0</strong>")
        $(".reset-highest").blur()
    })
    $(".stop").click(() => {
        if (started) {
            clicks = 0
            cps = 0

            clearTimeout(timeout)
            stop()

            clickBox.html("<p>Press space to start</p>")
            $(".stop").blur()
        }
    })
})