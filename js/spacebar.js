const clickBox = $(".click-box"),
    timeInput = $(".time-input"),
    cpsResult = $(".cps"),
    clicksResult = $(".clicks"),
    hcpsResult = $(".cps-highest"),
    resetHighest = $(".reset-highest")
let clicks = 0, cps = 0, time = 0, highestCPS = 0

function spacebarPressed() {
    if (clickBox.html().trim() == "<p>Press space to start</p>") {
        if (timeInput.val() == "" || timeInput.val() > 180) {
            alert("Time value must be between 1 and 180.")
            return
        }

        startCheck()
    }

    clicks++

    let fontSizeString = clickBox.css("font-size")
    let fontSize = Number(fontSizeString.substring(0, fontSizeString.length - 2))

    clickBox.css("font-size", fontSize >= 80 ? fontSize : fontSize + 1 + "px")
    clickBox.html(`<p>${clicks}</p>`)

    clicksResult.html(`Pressed <strong>${clicks}</strong> times`)
}

function startCheck() {
    time = timeInput.val()
    clicks = 0
    cps = 0

    clickBox.html(`<p>${time}</p>`)
    clickBox.css("fontSize", 10 + "px")

    let timer = setInterval(() => {
        timeInput.val(timeInput.val() - 1)
    }, 1000)
    setTimeout(() => {
        cps = clicks / time

        if (highestCPS == 0 || cps > highestCPS) {
            highestCPS = cps
            hcpsResult.html(`Highest Spacebar CPS: <strong>${cps}</strong>`)
        }

        alert("Time over!\nYour Spacebar CPS is " + cps)
        clickBox.html("<p>Press space to start</p>")
        cpsResult.html(`Spacebar CPS (Clicks per Seconds): <strong>${cps}</strong>`)

        timeInput.val(time)
        clearInterval(timer)
        clickBox.css("font-size", "medium")
    }, timeInput.val() * 1000)
}

$(document).ready(() => {
    $("body").keyup((event) => {
        if (event.keyCode == 32) {
            spacebarPressed()
        }
    })
    resetHighest.click(() => {
        highestCPS = 0
        hcpsResult.html("Highest Spacebar CPS: <strong>0</strong>")
        resetHighest.blur()
    })
})