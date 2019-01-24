// for general used methods

//require('./lib/jquery-sequencer');


$(document).ready(function () {

    var isCookie = cookie.readCookie("cookiePolicy");

    $(window).bind('scroll',function () {
        var videoHeight= $(".content-video").height()+150;
        var scrollHeight = $(this).scrollTop();
        if(scrollHeight > videoHeight){
            if(!isCookie){
                $(".cookie-policy").fadeIn();
                $(".footer").css("padding-bottom","110px");
                $(".zopim").css("bottom","94px")
            }
            else{
                $(".zopim").css("bottom","0px")
            }
        }
    });

    if(!isCookie){
        $(".cookie-policy").fadeIn();
        $(".footer").css("padding-bottom","110px");
        $(".zopim").css("bottom","94px")
    }
    else{
        $(".zopim").css("bottom","0px")
    }

    $("#cookieGoit").click(function () {
        $(".cookie-policy").remove();
        $(".footer").attr("style","");
        cookie.createCookie('cookiePolicy',true, 365);
        isCookie = cookie.readCookie("cookiePolicy");
        $(".zopim").css("bottom","0px")
    });


});


