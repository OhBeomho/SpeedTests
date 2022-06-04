$(document).ready(() => {
    $(".version").each((index, version) => {
        $(version).click(() => {
            $(version).toggleClass("active")

            let content = $(version).next()
            $(content).css("max-height", $(content).css("max-height") == "0px" ? $(content).prop("scrollHeight") + "px" : "0px")
        })
    })
})