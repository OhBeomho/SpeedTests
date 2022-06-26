$(document).ready(() => {
    $(".dropdown-title").each((index, accordionTitle) => {
        $(accordionTitle).click(() => {
            $(accordionTitle).toggleClass("active")

            let content = $(accordionTitle).next()
            let invisible = $(content).css("max-height") == "0px"
            $(content).css("max-height", invisible ? $(content).prop("scrollHeight") + "px" : "0px")
            $(content).css("margin-bottom", invisible ? "10px" : "0px")
        })
    })
})