module.exports = function () {

    var functions = {
        menuAccordion: function () {
            $('.accordion-header[accordion-show]').on('click', function () {

                var elem = $(this);

                if ($(elem).attr('accordion-show') === 'false') {
                    $('.accordion-header[accordion-show], .article[accordion-show]').attr('accordion-show', false);
                    $(elem).attr('accordion-show', true);
                    $(elem).siblings('.article[accordion-show]').attr('accordion-show', true);
                } else {
                    $('.accordion-header[accordion-show], .article[accordion-show]').attr('accordion-show', false);
                    $(elem).attr('accordion-show', false);
                    $(elem).siblings('.article[accordion-show]').attr('accordion-show', false);
                }



            });
        },
        sidebarSummaryAccordion :function () {
            $('.sidebar-summary .accordion-header[accordion-show]').on('click', function () {

                var elem = $(this);

                if ($(elem).attr('accordion-show') === 'false') {
                    $(elem).attr('accordion-show', true);
                    $(elem).siblings('.article[accordion-show]').attr('accordion-show', true);
                } else {
                    $(elem).attr('accordion-show', false);
                    $(elem).siblings('.article[accordion-show]').attr('accordion-show', false);
                }


            });
        }
    };


    functions.menuAccordion();

    return functions;

};


