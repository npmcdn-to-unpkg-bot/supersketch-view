$(document).ready(function() {
    // Set up hamburger
    var $hamburger = $(".hamburger");
    $hamburger.click(function(e) {
        e.preventDefault();
        if ($hamburger.hasClass("is-active")) {
            $hamburger.removeClass("is-active");
        } else {
            $hamburger.addClass("is-active");
        }
    });
    $hamburger.on("focusout", function(e) {
        e.preventDefault();
        $hamburger.removeClass("is-active");
    });
    // Set up modals
    $('.modal-trigger').leanModal();

});