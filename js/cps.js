const clickBox = $(".click-box"),
    timeInput = $(".time-input")
let clicks = 0, cps = 0, time = 0, highestCPS = 0
let started = false
let timer, timeout
import {
    useStorage
} from "./storage.js"
const {
    getHighestCPS,
    setHighestCPS
} = useStorage()

function boxClicked() {
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
    timeInput.prop("readonly", true)

    timer = setInterval(() => {
        timeInput.val(timeInput.val() - 1)
    }, 1000)
    timeout = setTimeout(() => {
        cps = clicks / time

        if (highestCPS == 0 || cps > highestCPS) {
            highestCPS = cps
            setHighestCPS(cps);
            $(".cps-highest").html(`Highest CPS: <strong>${cps}</strong>`)
        }

        alert("Time over!\nYour CPS is " + cps)
        $(".cps").html(`CPS (Clicks per Seconds): <strong>${cps}</strong>`)
        stop()
    }, timeInput.val() * 1000)
}

function stop() {
    timeInput.prop("readonly", false)
    clickBox.css("font-size", "medium")
    clearInterval(timer)
    clearTimeout(timeout)
    timeInput.val(time)
    started = false
}

$(document).ready(() => {
    highestCPS = getHighestCPS();
    $(".cps-highest").html(`Highest CPS: <strong>${highestCPS}</strong>`);

    clickBox.click(boxClicked)
    $(".reset-highest").click(() => {
        highestCPS = 0
        $(".cps-highest").html("Highest CPS: <strong>0</strong>")
        $(".reset-highest").blur()
    })
    $(".stop").click(() => {
        if (started) {
            clicks = 0
            cps = 0

            stop()

            clickBox.html("<p>Click here to start</p>")
            $(".stop").blur()
        }
    })
})