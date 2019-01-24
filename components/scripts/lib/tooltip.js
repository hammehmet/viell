module.exports = function (options) {

    $(document).on('click.tipsy.open', '[data-tooltip]', function (e) {
        var $this = $(this);
        var data = $this.data();
        functions.open(data.tooltip,$this);

    });


    var opened = false;


    var functions = {
        open: function (data,target) {
            if(!opened){
                var tooltipObj = "";
                if(target[0].dataset.hasOwnProperty('tooltipRed')){
                    tooltipObj =  $('<div class="tooltip red">' + data + '</div>');
                }else{
                    tooltipObj = $('<div class="tooltip"><i class="tooltipClose close">x</i>' + data + '</div>');
                }

                var targetWidth = target.outerWidth();
                var targetOffset = target.offset();

                tooltipObj.appendTo(target[0].parentElement.offsetParent.offsetParent);
                var tooltipWidth = tooltipObj.outerWidth();
                var tooltipHeight = tooltipObj.outerHeight();

                var xPos = targetOffset.left + targetWidth / 2 - tooltipWidth / 2;
                var yPos = targetOffset.top + 30;

                if(xPos<0){
                    xPos= 0;
                }
                tooltipObj.css('top',yPos).css('left',xPos).addClass('shows');

                $(document).on('click.tooltip.close',function (e) {
                    if(!$(e.target).parents('.tooltip').length > 0 && !$(e.target).hasClass('tooltip')){
                        functions.close(tooltipObj);
                    }
                });

                $(".tooltipClose").click(function (e) {
                    $(".tooltip").remove();
                    opened = false;
                });

                opened = true;
            }
        },
        close : function(target){
            target.remove();
            $(document).unbind('click.tooltip.close');
            opened = false;
        },
    };


    return functions;

};





