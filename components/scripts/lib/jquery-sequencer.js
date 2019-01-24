/**
 * jQuery-Sequencer
 * https://github.com/skruf/jQuery-sequencer
 *
 * Created by Thomas Låver
 * http://www.laaver.com
 *
 * Version: 2.0.0
 * Requires: jQuery 1.6+
 *
 */

(function($) {

    var frameCount=74;

    $.fn.sequencer = function(options, cb) {

        var self = this,
            paths = [],
            load = 0,
            sectionHeight,
            windowHeight,
            currentScroll,
            percentageScroll,
            index;

        if(options.path.substr(-1) === "/") {
            options.path = options.path.substr(0, options.path.length - 1)
        }

        for (var i = 0; i <= options.count; i++) {
            paths.push(options.path + "/" + i + "." + options.ext);
        }

        $("<div class='jquery-sequencer-preload'></div>").appendTo("body").css("display", "none");

        $(paths).each(function() {
            $("<img>").attr("src", this).load(function() {
                $(this).appendTo("div.jquery-sequencer-preload");
                load++;
                if (load === paths.length) {
                    cb();
                }
            });
        });

 /*       $(document).ready(function () {
            windowHeight = $(window).height()-80;
            $(".content-scroll-wrapper, .content-scroll-end").height(windowHeight);
            animation();
        });

        $(window).resize(function () {
            windowHeight = $(window).height()-80;
            $(".content-scroll-wrapper, .content-scroll-end").height(windowHeight);
            animation();
        });*/

        animation();

        $(window).scroll(function() {
            animation();
        });
        $(window).resize(function() {
            animation();
        });

        function animation() {
            sectionHeight = $(self).height();
            windowHeight = $(this).height();
            contentHeight = windowHeight *2 ;
            currentScroll = $(this).scrollTop();
            //$(".content-height").height(contentHeight);
            percentageScroll = 20 * currentScroll / windowHeight ;
            index = Math.round(percentageScroll / 100 * options.count);
            //console.log(index);
            if(index < options.count) {
                $("img.sequencer").attr("src", paths[index]);
                //$("img.sequencer").parent().css("position","absolute");
                //$("img.sequencer").parent().css("top",currentScroll);
            }
            else{

                //frameCount = 101;
                //$("img.sequencer").parent().style("");
                //$("img.sequencer").parent().css("position","static");
            }
        }



        return this;

    };


    function heightCalculator() {
        var contentHeight= $(window).height();
        var _length= $(".content-type").length;

        var calc =  contentHeight * _length;

        $(".content").height(calc);
    }

    $("div#animation").sequencer({
        count: 200,
        path: "./images",
        ext: "png"
    }, function() {
        $("div#preload").hide();
    })

}(jQuery));
