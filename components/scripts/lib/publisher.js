module.exports = function () {

    var functions = {
        searchToggle: function () {

            $('.search-button').click(function(){
                $(this).parent().toggleClass('open');
            });
        },
        itemsToggle:function(){
            /*$(".publisher-dashboard .view").mouseleave(function () {
                $(".publisher-dashboard .items-menu.drop-menu").removeClass("show");
            });
            $('.publisher-dashboard .view').bind('touchmove', function(event)
            {
                $(".publisher-dashboard .items-menu.drop-menu").removeClass("show");
            });*/
            $(document).on('click', '[data-items-target]', function (e) {
                //$(this).parent().addClass("active");
                $(this).next().toggleClass('show');
                
            });


        },
        rangeSlider:function () {
            $( "#rangeBitAmaount" ).slider({
                range: true,
                min: 0,
                max: 1000,
                values: [ 140, 600 ],
                slide: function( event, ui ) {
                    $( "#bitAmaount" ).val( "$" + ui.values[ 0 ] + " - " + ui.values[ 1 ] );
                }
            });
            $( "#bitAmaount" ).val( "$" + $( "#rangeBitAmaount" ).slider( "values", 0 ) +
                " - " + $( "#rangeBitAmaount" ).slider( "values", 1 ) );

            $( "#rangePolyCount" ).slider({
                range: true,
                min: 0,
                max: 50,
                values: [ 20, 40 ],
                slide: function( event, ui ) {
                    $( "#polyCount" ).val(  ui.values[ 0 ] + " - " + ui.values[ 1 ]  +  "k+");
                }
            });
            $( "#polyCount" ).val($( "#rangePolyCount" ).slider( "values", 0 ) +
                " - " + $( "#rangePolyCount" ).slider( "values", 1 ) + "k+" );

            $( "#rangeFileSize" ).slider({
                range: true,
                min: 0,
                max: 100,
                values: [ 20, 40 ],
                slide: function( event, ui ) {
                    $( "#fileSize" ).val(  ui.values[ 0 ] + "mb - " + ui.values[ 1 ]  +  "mb");
                }
            });
            $( "#fileSize" ).val($( "#rangeFileSize" ).slider( "values", 0 ) +
                "mb - " + $( "#rangeFileSize" ).slider( "values", 1 ) + "mb" );
        },
        copyBoard:function () {
            /* Get the text field */
            var copyText = document.getElementById("copyText");
            /* Select the text field */
            copyText.select();
            /* Copy the text inside the text field */
            document.execCommand("copy");

        },
        moreDetailsToggle: function () {

            $('.items-more-details a').click(function(){
                $(".items.items-border").toggle();
            });
        },



    };
    functions.itemsToggle();
    functions.moreDetailsToggle();
    functions.rangeSlider();
    return functions;

};


