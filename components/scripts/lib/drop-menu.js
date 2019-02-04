//var hasCssFeature = require('./detect-css-feature');

module.exports = function (options) {

    var opened = false;
    var moved = false;

    var defaults = {
        animateClass : 'animate-start',
        showClass : 'show',
        activeClass : 'active'
    };


    $(document).on('click','[data-drop-target]',function (e) {
        //console.log(e);
        var $this = $(this);
        var data = $this.data();
        var hasTarget = data.dropTarget != 'undefined';
        if(hasTarget) functions.show($(data.dropTarget),$this);
    });


    var functions = {
        show : function(target,pointerTarget){
            if(!opened){

                target.addClass(defaults.animateClass);
                setTimeout(function(){
                    target.addClass(defaults.showClass);
                    $(".notification-list .center").scrollTop(0);
                },0);

                $("body").append("<div class='drop-menu-show'></div>");

                var pTarget = pointerTarget || null;

                pointerTarget.parent().addClass(defaults.activeClass);

                $(document).on('click.drop-menu.close',function (e) {
                    if(!$(e.target).parents('.drop-menu').length > 0 && !$(e.target).hasClass('drop-menu')){
                        functions.hide(target,pTarget);
                    }
                    moved = false;
                });

                $(document).on('touchmove.drop-menu',function(e){
                    moved = true;
                });
                opened = true;






            }

        },
        hide : function(target,pointerTarget){

            if(!moved){
                if(browserFeatures.translate3d){
                    target.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
                        target.removeClass(defaults.animateClass);
                    });
                } else {
                    target.removeClass(defaults.animateClass);
                }
                target.removeClass(defaults.showClass);

                if(pointerTarget){
                    pointerTarget.parent().removeClass(defaults.activeClass);
                }
                opened = false;
                $(document).unbind('click.drop-menu.close');
                $(document).unbind('touchmove.drop-menu');
            }

        }
    };

    return functions;

};




