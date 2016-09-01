$(document).ready(function() {
    // Set up hamburger
    var $hamburger = $(".hamburger");
    $hamburger.on("focusin", function(e) {
        $hamburger.addClass("is-active");
    });
    $hamburger.on("focusout", function(e) {
        $hamburger.removeClass("is-active");
    });

});