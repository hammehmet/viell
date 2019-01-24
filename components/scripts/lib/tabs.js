module.exports = function () {

    var functions = {
        tabs: function () {
            //Tab Menu
            $(document).ready(function () {
                $('.tabs-detay').find(".sub").eq(0).show();
                $('.tabs li').eq(0).find("a").addClass("current");

                $('.tabs li').click(function () {
                    $('.tabs-detay').find(".sub").hide();
                    $('.tabs li').find("a").removeClass("current");

                    $('.tabs-detay').find(".sub").eq($(this).index()).show();
                    $('.tabs li').eq($(this).index()).find("a").addClass("current");
                });
                //Tab Menu Bitiş
            });

            var activeTab = cookie.getUrlParameter('tabs');
            if(activeTab == "publisher"){
                setTimeout(function () {
                    $('.tabs li').eq(1).trigger('click')
                },100)
            }


        }
    };


    functions.tabs();

    return functions;

};


