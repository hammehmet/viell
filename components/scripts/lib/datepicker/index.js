
require('./jquery.plugin');
require('./jquery.datepick');
require('./jquery.datepick.ext');
require('./jquery.datepick-tr');

module.exports = function () {

    var functions = {
        dateInit: function () {

            $('#startPicker,#endPicker').datepick({
                onSelect: customRange,
                showTrigger: '<button type="button" class="trigger"><i class="font-takvim"></i></button>',
                dateFormat: 'DD, MM d'
            });

            function customRange(dates) {
                if (this.id == 'startPicker') {
                    $('#endPicker').datepick('option', 'minDate', dates[0] || null);
                }
                else {
                    $('#startPicker').datepick('option', 'maxDate', dates[0] || null);
                }
            }
        }
    };

    functions.dateInit();
    return functions;

};

