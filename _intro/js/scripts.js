function initPreview() {    
    "use strict";
	$(".spinner").fadeOut(500, function () {
        $("#main").animate({
            opacity: "1"
        }, 500);
    });
 var a = $(".swiper-wrapper .swiper-slide").length;
    var b = new Swiper("#vertical-slider", {
        speed: 1200,
        loop: false,
        preventLinks: true,
        grabCursor: true,
        mousewheelControl: true,
        mode: "vertical",
        pagination: ".pagination",
        paginationClickable: true,
        onSlideChangeEnd: function() {
            $("#vertical-slider .presSlidesActive").html(b.activeIndex + 1);
        }
    });
    $("#vertical-slider .presSlidesActive").html("1");
    $("#vertical-slider .presSlidesFrom").html(a);
    $(".ver a.arrow-left").on("click", function(a) {
        a.preventDefault();
        b.swipePrev();
    });
    $(".ver a.arrow-right").on("click", function(a) {
        a.preventDefault();
        b.swipeNext();
    });
 
}
$(function () {
	initPreview();
});