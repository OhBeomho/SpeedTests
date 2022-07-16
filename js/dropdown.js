$(() => {
    $(".dropdown-title").click(function () {
        $(this).toggleClass("active")

        let content = $(this).next()
        let invisible = $(content).css("max-height") == "0px"
        $(content).css("max-height", invisible ? $(content).prop("scrollHeight") + "px" : "0px")
        $(content).css("margin-bottom", invisible ? "10px" : "0px")
    })
})