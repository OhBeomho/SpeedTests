$(document).ready(() => {
    $(".atitle").each((index, accordionTitle) => {
        $(accordionTitle).click(() => {
            $(accordionTitle).toggleClass("active")

            let content = $(accordionTitle).next()
            $(content).css("max-height", $(content).css("max-height") == "0px" ? $(content).prop("scrollHeight") + "px" : "0px")
        })
    })
})