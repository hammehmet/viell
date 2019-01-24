/****/
// Bu kod kaldırılacak. Yazılım kısmında direk include edilecek

$("#header").load("include/header.html");
$("#menu").load("include/menu.html");
//$("#footer").load("../../../include/footer.html");

var isMobile = require('./lib/isMobile');
device = isMobile();

var validateForm = require('./lib/validation');
formValidator = new validateForm();

require('./lib/validatorAndMask');

require('./lib/methods');

require('./lib/flexslider/index');

require('./lib/prefix');

require('./lib/lazysizes.min');

var cookies = require('./lib/cookie');
cookie = cookies();

var dropMenu = require('./lib/drop-menu');
dpmenu = new dropMenu();

 var accordion = require('./lib/accordion');
 accordion = new accordion();

var tabs = require('./lib/tabs');
tabs = new tabs();

var datepicker = require('./lib/datepicker');
date = new datepicker();


if ($('.placeholder-animation').length > 0) {
    $('.placeholder-animation').placeholder({
        activeClass: 'text-input-placeholder_pos_top'
    });
}



$('.radios-items-choose .items  label, .radios-items-choose .items  input[type=radio]').on('click', function () {
    $(".radios-items-choose .items").removeClass("active");
    $(this).closest(".items").addClass("active")
});

$(".isNumber").keypress(function (e) {
    //if the letter is not digit then display error and don't type anything
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        //display error message
        return false;
    }
});


$(".btnCopyCode").click(function (e) {
    $(".promotion-code-copy input").select();
    document.execCommand("copy");
});



$(document).ready(function () {
    //Tab Menu

    $('.tabs-detay').find(".sub").eq(0).show();
    $('.tabs li').eq(0).addClass("current");

    $('.tabs li').click(function () {
        $('.tabs-detay').find(".sub").hide();
        $('.tabs li').removeClass("current");

        $('.tabs-detay').find(".sub").eq($(this).index()).show();
        $('.tabs li').eq($(this).index()).addClass("current");

        $('.sub-tabs li').removeClass('current');

        var tabName = $('.tabs-detay .sub').eq($(this).index()).find("input[name=tabsValue]").val();
        if(tabName != undefined){
            $(tabName + ' .sub-tabs-detay').find(".tab-sub").eq(0).show();
            $(tabName + ' .sub-tabs li').eq(0).addClass("current");

            $(tabName +' .sub-tabs li').click(function () {
                $(tabName +' .sub-tabs-detay').find(".tab-sub").hide();
                $(tabName +' .sub-tabs li').removeClass("current");

                $(tabName +' .sub-tabs-detay').find(".tab-sub").eq($(this).index()).show();
                $(tabName +' .sub-tabs li').eq($(this).index()).addClass("current");
            });
        }

    });
//Tab Menu Bitiş

    $(".passwordIcon").click(function () {
        var type = $(this).parents(".items").find("input").attr("type");

        if(type == "password"){
            $(this).parents(".items").find("input").attr("type","text");
            $(this).removeClass("font-icon-eye").addClass("font-icon-eye-clicked");
        }else{
            $(this).parents(".items").find("input").attr("type","password");
            $(this).removeClass("font-icon-eye-clicked").addClass("font-icon-eye");

        }
    });

});





