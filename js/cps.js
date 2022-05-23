const clickBox = $(".click-box"),
    timeInput = $(".time-input"),
    cpsResult = $(".cps"),
    clicksResult = $(".clicks")
let clicks = 0, cps = 0, time = 0
let clicking = false

function boxClicked() {
    if (clickBox.html().trim() == "<p>Click here to start</p>") {
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

    clicksResult.html(`Clicked <strong>${clicks}</strong> times`)
}

function startCheck() {
    clicking = true
    time = timeInput.val()
    clicks = 0
    cps = 0

    clickBox.html(`<p>${time}</p>`)
    clickBox.css("fontSize", 10 + "px")

    let timer = setInterval(() => {
        timeInput.val(timeInput.val() - 1)
    }, 1000)
    setTimeout(() => {
        clicking = false
        cps = clicks / time

        alert("Time over!\nYour CPS is " + cps)
        clickBox.html("<p>Click here to start</p>")
        cpsResult.html(`CPS (Clicks per Seconds): <strong>${cps}</strong>`)

        timeInput.val(time)
        clearInterval(timer)
        clickBox.css("font-size", "medium")
    }, timeInput.val() * 1000)
}

$(document).ready(() => {
    clickBox.click(() => { boxClicked() })
})