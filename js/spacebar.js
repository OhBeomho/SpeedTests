const clickBox = $(".click-box"),
    timeInput = $(".time-input")
let clicks = 0, hps = 0, time = 0, highestHPS = 0
let started = false
let timer, timeout
import {
    useStorage
} from "./storage.js"
const {
    getHighestHPS,
    setHighestHPS
} = useStorage()

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
    hps = 0

    clickBox.html(`<p>${time}</p>`)
    clickBox.css("fontSize", 10 + "px")

    timeInput.prop("readonly", true)

    timer = setInterval(() => {
        timeInput.val(timeInput.val() - 1)
    }, 1000)
    timeout = setTimeout(() => {
        hps = clicks / time

        if (highestHPS == 0 || hps > highestHPS) {
            highestHPS = hps
            setHighestHPS(hps)
            $(".hps-highest").html(`Highest Spacebar HPS: <strong>${hps}</strong>`)
        }

        alert("Time over!\nYour Spacebar CPS is " + hps)
        $(".hps").html(`Spacebar HPS (Hits per Seconds): <strong>${hps}</strong>`)

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

$(() => {
    highestHPS = getHighestHPS()
    $(".hps-highest").html(`Highest Spacebar HPS: <strong>${highestHPS}</strong>`)

    $(document).keyup((event) => {
        if (event.keyCode == 32) {
            spacebarPressed()
            event.preventDefault()
        }
    })
    $(".reset-highest").click(() => {
        highestHPS = 0
        $(".hps-highest").html("Highest Spacebar HPS: <strong>0</strong>")
        $(".reset-highest").blur()
    })
    $(".stop").click(() => {
        if (started) {
            clicks = 0
            hps = 0

            stop()

            clickBox.html("<p>Press space to start</p>")
            $(".stop").blur()
        }
    })
})