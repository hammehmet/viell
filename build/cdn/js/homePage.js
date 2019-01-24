(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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



},{}]},{},[1])