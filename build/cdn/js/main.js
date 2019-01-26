(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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






},{"./lib/accordion":2,"./lib/cookie":3,"./lib/datepicker":4,"./lib/drop-menu":9,"./lib/flexslider/index":11,"./lib/isMobile":12,"./lib/lazysizes.min":13,"./lib/methods":14,"./lib/prefix":15,"./lib/tabs":16,"./lib/validation":17,"./lib/validatorAndMask":18}],2:[function(require,module,exports){
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



},{}],3:[function(require,module,exports){
module.exports = function () {

    var functions = {
        createCookie: function (name,value,minutes) {
            if (minutes) {
                var date = new Date();
                date.setTime(date.getTime()+(minutes*24*60*60*1000));
                var expires = "; expires="+date.toGMTString();
            }
            else var expires = "";
            document.cookie = name+"="+value+expires+"; path=/";
        },
        readCookie: function (name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
            }
            return null;
        },
        getUrlParameter: function (sParam) {
            var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : sParameterName[1];
                }
            }
        }

    };
    return functions;

};



},{}],4:[function(require,module,exports){

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


},{"./jquery.datepick":7,"./jquery.datepick-tr":5,"./jquery.datepick.ext":6,"./jquery.plugin":8}],5:[function(require,module,exports){
/* http://keith-wood.name/datepick.html
   Turkish localisation for jQuery Datepicker.
   Written by Izzet Emre Erkan (kara@karalamalar.net). */
(function($) {
	$.datepick.regionalOptions['tr'] = {
		monthNames: ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran',
		'Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'],
		monthNamesShort: ['Oca','Şub','Mar','Nis','May','Haz',
		'Tem','Ağu','Eyl','Eki','Kas','Ara'],
		dayNames: ['Pazar','Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi'],
		dayNamesShort: ['Pz','Pt','Sa','Ça','Pe','Cu','Ct'],
		dayNamesMin: ['Pz','Pt','Sa','Ça','Pe','Cu','Ct'],
		dateFormat: 'dd.mm.yyyy', firstDay: 1,
		renderer: $.datepick.defaultRenderer,
		prevText: '&#x3c;Geri', prevStatus: 'Önceki ayı göster',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: 'ileri&#x3e', nextStatus: 'sonraki ayı göster',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: 'Bugün', currentStatus: '',
		todayText: 'Bugün', todayStatus: '',
		clearText: 'Temizle', clearStatus: 'Geçerli tarihi temizler',
		closeText: 'Kapat', closeStatus: 'Sadece göstergeyi kapat',
		yearStatus: 'Başka yıl', monthStatus: 'Başka ay',
		weekText: 'Hf', weekStatus: 'Ayın haftaları',
		dayStatus: 'D, M d Seçiniz', defaultStatus: 'Bir tarih seçiniz',
		isRTL: false
	};
	$.datepick.setDefaults($.datepick.regionalOptions['tr']);
})(jQuery);

},{}],6:[function(require,module,exports){
/* http://keith-wood.name/datepick.html
   Datepicker extensions for jQuery v5.0.0.
   Written by Keith Wood (kbwood{at}iinet.com.au) August 2009.
   Licensed under the MIT (https://github.com/jquery/jquery/blob/master/MIT-LICENSE.txt) licence. 
   Please attribute the author if you use it. */

(function($) { // Hide scope, no $ conflict

	var themeRollerRenderer = {
		picker: '<div{popup:start} id="ui-datepicker-div"{popup:end} class="ui-datepicker ui-widget ' +
		'ui-widget-content ui-helper-clearfix ui-corner-all{inline:start} ui-datepicker-inline{inline:end}">' +
		'<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all">' +
		'{link:prev}{link:today}{link:next}</div>{months}' +
		'{popup:start}<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix ' +
		'ui-corner-all">{button:clear}{button:close}</div>{popup:end}' +
		'<div class="ui-helper-clearfix"></div></div>',
		monthRow: '<div class="ui-datepicker-row-break">{months}</div>',
		month: '<div class="ui-datepicker-group">' +
		'<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all">{monthHeader:MM yyyy}</div>' +
		'<table class="ui-datepicker-calendar"><thead>{weekHeader}</thead><tbody>{weeks}</tbody></table></div>',
		weekHeader: '<tr>{days}</tr>',
		dayHeader: '<th>{day}</th>',
		week: '<tr>{days}</tr>',
		day: '<td>{day}</td>',
		monthSelector: '.ui-datepicker-group',
		daySelector: 'td',
		rtlClass: 'ui-datepicker-rtl',
		multiClass: 'ui-datepicker-multi',
		defaultClass: 'ui-state-default',
		selectedClass: 'ui-state-active',
		highlightedClass: 'ui-state-hover',
		todayClass: 'ui-state-highlight',
		otherMonthClass: 'ui-datepicker-other-month',
		weekendClass: 'ui-datepicker-week-end',
		commandClass: 'ui-datepicker-cmd',
		commandButtonClass: 'ui-state-default ui-corner-all',
		commandLinkClass: '',
		disabledClass: 'ui-datepicker-disabled'
	};

	$.extend($.datepick, {

		/** Template for generating a datepicker showing week of year. */
		weekOfYearRenderer: $.extend({}, $.datepick.defaultRenderer, {
			weekHeader: '<tr><th class="datepick-week">' +
			'<span title="{l10n:weekStatus}">{l10n:weekText}</span></th>{days}</tr>',
			week: '<tr><td class="datepick-week">{weekOfYear}</td>{days}</tr>'
		}),

		/** ThemeRoller template for generating a datepicker. */
		themeRollerRenderer: themeRollerRenderer,

		/** ThemeRoller template for generating a datepicker showing week of year. */
		themeRollerWeekOfYearRenderer: $.extend({}, themeRollerRenderer, {
			weekHeader: '<tr><th class="ui-state-hover"><span>{l10n:weekText}</span></th>{days}</tr>',
			week: '<tr><td class="ui-state-hover">{weekOfYear}</td>{days}</tr>'
		}),

		/** Don't allow weekends to be selected.
			@param date {Date} The current date.
			@return {object} Information about this date.
			@example onDate: $.datepick.noWeekends */
		noWeekends: function(date) {
			return {selectable: (date.getDay() || 7) < 6};
		},

		/** Change the first day of the week by clicking on the day header.
			@param picker {jQuery} The completed datepicker division.
			@param inst {object} The current instance settings.
			@example onShow: $.datepick.changeFirstDay */
		changeFirstDay: function(picker, inst) {
			var target = $(this);
			picker.find('th span').each(function() {
				var parent = $(this).parent();
				if (parent.is('.datepick-week') || parent.is('.ui-state-hover')) {
					return;
				}
				$('<a href="javascript:void(0)" class="' + this.className +
						'" title="Change first day of the week">' + $(this).text() + '</a>').
					click(function() {
						var dow = parseInt(this.className.replace(/^.*datepick-dow-(\d+).*$/, '$1'), 10);
						target.datepick('option', {firstDay: dow});
					}).
					replaceAll(this);
			});
		},

		/** Add a callback when hovering over dates.
			@param onHover {Datepick~onHover} The callback when hovering, it receives the current date and
						a flag indicating selectability as parameters on entry,
						and no parameters on exit, <code>this</code> refers to the target input or division.
			@example onShow: $.datepick.hoverCallback(handleHover) */
		hoverCallback: function(onHover) {
			return function(picker, inst) {
				var target = this;
				var renderer = inst.get('renderer');
				picker.find(renderer.daySelector + ' a, ' + renderer.daySelector + ' span').
					hover(function() {
						onHover.apply(target, [$.datepick.retrieveDate(target, this),
							this.nodeName.toLowerCase() === 'a']);
					},
					function() { onHover.apply(target, []); });
			};
		},

		/** Highlight the entire week when hovering over it.
			@param picker {jQuery} The completed datepicker division.
			@param inst {object} The current instance settings.
			@example onShow: $.datepick.highlightWeek */
		highlightWeek: function(picker, inst) {
			var target = this;
			var renderer = inst.get('renderer');
			picker.find(renderer.daySelector + ' a, ' + renderer.daySelector + ' span').
				hover(function() {
					$(this).parents('tr').find(renderer.daySelector + ' *').
						addClass(renderer.highlightedClass);
				},
				function() {
					$(this).parents('tr').find(renderer.daySelector + ' *').
						removeClass(renderer.highlightedClass);
				});
		},

		/** Show a status bar with messages.
			@param picker {jQuery} The completed datepicker division.
			@param inst {object} The current instance settings.
			@example onShow: $.datepick.showStatus */
		showStatus: function(picker, inst) {
			var renderer = inst.get('renderer');
			var isTR = (renderer.selectedClass === themeRollerRenderer.selectedClass);
			var defaultStatus = inst.get('defaultStatus') || '&nbsp;';
			var status = $('<div class="' + (!isTR ? 'datepick-status' :
				'ui-datepicker-status ui-widget-header ui-helper-clearfix ui-corner-all') + '">' +
				defaultStatus + '</div>').
				insertAfter(picker.find('.datepick-month-row:last,.ui-datepicker-row-break:last'));
			picker.find('*[title]').each(function() {
					var title = $(this).attr('title');
					$(this).removeAttr('title').hover(
						function() { status.text(title || defaultStatus); },
						function() { status.text(defaultStatus); });
				});
		},

		/** Allow easier navigation by month/year.
			@param picker {jQuery} The completed datepicker division.
			@param inst {object} The current instance settings.
			@example onShow: $.datepick.monthNavigation */
		monthNavigation: function(picker, inst) {
			var target = $(this);
			var renderer = inst.get('renderer');
			var isTR = (renderer.selectedClass === themeRollerRenderer.selectedClass);
			var minDate = inst.curMinDate();
			var maxDate = inst.get('maxDate');
			var monthNames = inst.get('monthNames');
			var monthNamesShort = inst.get('monthNamesShort');
			var month = inst.drawDate.getMonth();
			var year = inst.drawDate.getFullYear();
			var html = '<div class="' + (!isTR ? 'datepick-month-nav' : 'ui-datepicker-month-nav') + '"' +
				' style="display: none;">';
			for (var i = 0; i < monthNames.length; i++) {
				var inRange = ((!minDate || new Date(year, i + 1, 0).getTime() >= minDate.getTime()) &&
					(!maxDate || new Date(year, i, 1).getTime() <= maxDate.getTime()));
				html += '<div>' +
					(inRange ? '<a href="#" class="dp' + new Date(year, i, 1).getTime() + '"' : '<span') +
					' title="' + monthNames[i] + '">' + monthNamesShort[i] +
					(inRange ? '</a>' : '</span>') + '</div>';
			}
			for (var i = -6; i <= 6; i++) {
				if (i === 0) {
					continue;
				}
				var inRange =
					((!minDate || new Date(year + i, 12 - 1, 31).getTime() >= minDate.getTime()) &&
					(!maxDate || new Date(year + i, 1 - 1, 1).getTime() <= maxDate.getTime()));
				html += '<div>' + (inRange ? '<a href="#" class="dp' +
					new Date(year + i, month, 1).getTime() + '"' : '<span') +
					' title="' + (year + i) + '">' + (year + i) +
					(inRange ? '</a>' : '</span>') + '</div>';
			}
			html += '</div>';
			html = $(html).insertAfter(picker.find('div.datepick-nav,div.ui-datepicker-header:first'));
			html.find('a').click(function() {
					var date = $.datepick.retrieveDate(target[0], this);
					html.slideToggle(function() {
						target.datepick('showMonth', date.getFullYear(), date.getMonth() + 1);
					});
					return false;
				});
			picker.find('div.datepick-month-header,div.ui-datepicker-month-header').click(function() {
				html.slideToggle();
			}).css('cursor', 'pointer');
		},

		/** Select an entire week when clicking on a week number.
			Use in conjunction with <code>weekOfYearRenderer</code> or <code>themeRollerWeekOfYearRenderer</code>.
			@param picker {jQuery} The completed datepicker division.
			@param inst {object} The current instance settings.
			@example onShow: $.datepick.selectWeek */
		selectWeek: function(picker, inst) {
			var target = $(this);
			picker.find('td.datepick-week span,td.ui-state-hover span').each(function() {
				$('<a href="javascript:void(0)" class="' +
						this.className + '" title="Select the entire week">' +
						$(this).text() + '</a>').
					click(function() {
						var date = target.datepick('retrieveDate', this);
						var dates = [date];
						for (var i = 1; i < 7; i++) {
							dates.push(date = $.datepick.add($.datepick.newDate(date), 1, 'd'));
						}
						if (inst.get('rangeSelect')) {
							dates.splice(1, dates.length - 2);
						}
						target.datepick('setDate', dates).datepick('hide');
					}).
					replaceAll(this);
			});
		},

		/** Select an entire month when clicking on the week header.
			Use in conjunction with <code>weekOfYearRenderer</code> or <code>themeRollerWeekOfYearRenderer</code>.
			@param picker {jQuery} The completed datepicker division.
			@param inst {object} The current instance settings.
			@example onShow: $.datepick.selectMonth */
		selectMonth: function(picker, inst) {
			var target = $(this);
			picker.find('th.datepick-week span,th.ui-state-hover span').each(function() {
				$('<a href="javascript:void(0)" title="Select the entire month">' +
						$(this).text() + '</a>').
					click(function() {
						var date = target.datepick('retrieveDate', $(this).parents('table').
							find('td:not(.datepick-week):not(.ui-state-hover) ' +
								'*:not(.datepick-other-month):not(.ui-datepicker-other-month)')[0]);
						var dates = [date];
						var dim = $.datepick.daysInMonth(date);
						for (var i = 1; i < dim; i++) {
							dates.push(date = $.datepick.add($.datepick.newDate(date), 1, 'd'));
						}
						if (inst.get('rangeSelect')) {
							dates.splice(1, dates.length - 2);
						}
						target.datepick('setDate', dates).datepick('hide');
					}).
					replaceAll(this);
			});
		},

		/** Select a month only instead of a single day.
			@param picker {jQuery} The completed datepicker division.
			@param inst {object} The current instance settings.
			@example onShow: $.datepick.monthOnly */
		monthOnly: function(picker, inst) {
			var target = $(this);
			var selectMonth = $('<div style="text-align: center;"><button type="button">Select</button></div>').
				insertAfter(picker.find('.datepick-month-row:last,.ui-datepicker-row-break:last')).
				children().click(function() {
					var monthYear = picker.find('.datepick-month-year:first').val().split('/');
					target.datepick('setDate', $.datepick.newDate(
						parseInt(monthYear[1], 10), parseInt(monthYear[0], 10), 1)).
						datepick('hide');
				});
			picker.find('.datepick-month-row table,.ui-datepicker-row-break table').remove();
		}
	});

})(jQuery);

},{}],7:[function(require,module,exports){
/*! http://keith-wood.name/datepick.html
	Date picker for jQuery v5.1.1.
	Written by Keith Wood (wood.keith{at}optusnet.com.au) February 2010.
	Licensed under the MIT (http://keith-wood.name/licence.html) licence.
	Please attribute the author if you use it. */

(function($) { // Hide scope, no $ conflict
    'use strict';

    var pluginName = 'datepick';


    /** Create the datepicker plugin.
     <p>Sets an input field to popup a calendar for date entry,
     or a <code>div</code> or <code>span</code> to show an inline calendar.</p>
     <p>Expects HTML like:</p>
     <pre>&lt;input type="text"></pre>
     <p>or</p>
     <pre>&lt;div>&lt;/div></pre>
     <p>Provide inline configuration like:</p>
     <pre>&lt;input type="text" data-datepick="name: 'value',..."/></pre>
     @module Datepick
     @augments JQPlugin
     @example $(selector).datepick()
     $(selector).datepick({minDate: 0, maxDate: '+1m +1w'}) */
    $.JQPlugin.createPlugin({

        /** The name of the plugin.
         @default 'datepick' */
        name: pluginName,

        /** Default template for generating a datepicker.
         Insert anywhere: '{l10n:name}' to insert localised value for name,
         '{link:name}' to insert a link trigger for command name,
         '{button:name}' to insert a button trigger for command name,
         '{popup:start}...{popup:end}' to mark a section for inclusion in a popup datepicker only,
         '{inline:start}...{inline:end}' to mark a section for inclusion in an inline datepicker only.
         @property {string} picker Overall structure: '{months}' to insert calendar months.
         @property {string} monthRow One row of months: '{months}' to insert calendar months.
         @property {string} month A single month: '{monthHeader<em>:dateFormat</em>}' to insert the month header -
         <em>dateFormat</em> is optional and defaults to 'MM yyyy',
         '{weekHeader}' to insert a week header, '{weeks}' to insert the month's weeks.
         @property {string} weekHeader A week header: '{days}' to insert individual day names.
         @property {string} dayHeader Individual day header: '{day}' to insert day name.
         @property {string} week One week of the month: '{days}' to insert the week's days,
         '{weekOfYear}' to insert week of year.
         @property {string} day An individual day: '{day}' to insert day value.
         @property {string} monthSelector jQuery selector, relative to picker, for a single month.
         @property {string} daySelector jQuery selector, relative to picker, for individual days.
         @property {string} rtlClass Class for right-to-left (RTL) languages.
         @property {string} multiClass Class for multi-month datepickers.
         @property {string} defaultClass Class for selectable dates.
         @property {string} selectedClass Class for currently selected dates.
         @property {string} highlightedClass Class for highlighted dates.
         @property {string} todayClass Class for today.
         @property {string} otherMonthClass Class for days from other months.
         @property {string} weekendClass Class for days on weekends.
         @property {string} commandClass Class prefix for commands.
         @property {string} commandButtonClass Extra class(es) for commands that are buttons.
         @property {string} commandLinkClass Extra class(es) for commands that are links.
         @property {string} disabledClass Class for disabled commands. */
        defaultRenderer: {
            picker: '<div class="datepick">' +
            '<div class="datepick-nav">{link:prev}{link:today}{link:next}</div>{months}' +
            '{popup:start}<div class="datepick-ctrl">{link:clear}{link:close}</div>{popup:end}' +
            '<div class="datepick-clear-fix"></div></div>',
            monthRow: '<div class="datepick-month-row">{months}</div>',
            month: '<div class="datepick-month"><div class="datepick-month-header">{monthHeader}</div>' +
            '<table><thead>{weekHeader}</thead><tbody>{weeks}</tbody></table></div>',
            weekHeader: '<tr>{days}</tr>',
            dayHeader: '<th>{day}</th>',
            week: '<tr>{days}</tr>',
            day: '<td>{day}</td>',
            monthSelector: '.datepick-month',
            daySelector: 'td',
            rtlClass: 'datepick-rtl',
            multiClass: 'datepick-multi',
            defaultClass: '',
            selectedClass: 'datepick-selected',
            highlightedClass: 'datepick-highlight',
            todayClass: 'datepick-today',
            otherMonthClass: 'datepick-other-month',
            weekendClass: 'datepick-weekend',
            commandClass: 'datepick-cmd',
            commandButtonClass: '',
            commandLinkClass: '',
            disabledClass: 'datepick-disabled'
        },

        /** Command actions that may be added to a layout by name.
         <ul>
         <li>prev - Show the previous month (based on <code>monthsToStep</code> option) - <em>PageUp</em></li>
         <li>prevJump - Show the previous year (based on <code>monthsToJump</code> option) - <em>Ctrl+PageUp</em></li>
         <li>next - Show the next month (based on <code>monthsToStep</code> option) - <em>PageDown</em></li>
         <li>nextJump - Show the next year (based on <code>monthsToJump</code> option) - <em>Ctrl+PageDown</em></li>
         <li>current - Show the currently selected month or today's if none selected - <em>Ctrl+Home</em></li>
         <li>today - Show today's month - <em>Ctrl+Home</em></li>
         <li>clear - Erase the date and close the datepicker popup - <em>Ctrl+End</em></li>
         <li>close - Close the datepicker popup - <em>Esc</em></li>
         <li>prevWeek - Move the cursor to the previous week - <em>Ctrl+Up</em></li>
         <li>prevDay - Move the cursor to the previous day - <em>Ctrl+Left</em></li>
         <li>nextDay - Move the cursor to the next day - <em>Ctrl+Right</em></li>
         <li>nextWeek - Move the cursor to the next week - <em>Ctrl+Down</em></li>
         </ul>
         The command name is the key name and is used to add the command to a layout
         with '{button:name}' or '{link:name}'. Each has the following attributes:
         @property {string} text The field in the regional settings for the displayed text.
         @property {string} status The field in the regional settings for the status text.
         @property {object} keystroke The keystroke to trigger the action.
         @property {number} keystroke.keyCode The code for the keystroke.
         @property {boolean} keystroke.ctrlKey <code>true</code> if <em>Ctrl</em> is required,
         @property {boolean} keystroke.altKey <code>true</code> if <em>Alt</em> is required,
         @property {boolean} keystroke.shiftKey <code>true</code> if <em>Shift</em> is required.
         @property {DatepickCommandEnabled} enabled The function that indicates the command is enabled.
         @property {DatepickCommandDate} date The function to get the date associated with this action.
         @property {DatepickCommandAction} action The function that implements the action. */
        commands: {
            prev: {text: 'prevText', status: 'prevStatus', // Previous month
                keystroke: {keyCode: 33}, // Page up
                enabled: function(inst) {
                    var minDate = inst.curMinDate();
                    return (!minDate || plugin.add(plugin.day(
                        plugin._applyMonthsOffset(plugin.add(plugin.newDate(inst.drawDate),
                            1 - inst.options.monthsToStep, 'm'), inst), 1), -1, 'd').
                    getTime() >= minDate.getTime());
                },
                date: function(inst) {
                    return plugin.day(plugin._applyMonthsOffset(plugin.add(
                        plugin.newDate(inst.drawDate), -inst.options.monthsToStep, 'm'), inst), 1);
                },
                action: function(inst) {
                    plugin.changeMonth(this, -inst.options.monthsToStep);
                }
            },
            prevJump: {text: 'prevJumpText', status: 'prevJumpStatus', // Previous year
                keystroke: {keyCode: 33, ctrlKey: true}, // Ctrl + Page up
                enabled: function(inst) {
                    var minDate = inst.curMinDate();
                    return (!minDate || plugin.add(plugin.day(
                        plugin._applyMonthsOffset(plugin.add(plugin.newDate(inst.drawDate),
                            1 - inst.options.monthsToJump, 'm'), inst), 1), -1, 'd').
                    getTime() >= minDate.getTime());
                },
                date: function(inst) {
                    return plugin.day(plugin._applyMonthsOffset(plugin.add(
                        plugin.newDate(inst.drawDate), -inst.options.monthsToJump, 'm'), inst), 1);
                },
                action: function(inst) {
                    plugin.changeMonth(this, -inst.options.monthsToJump);
                }
            },
            next: {text: 'nextText', status: 'nextStatus', // Next month
                keystroke: {keyCode: 34}, // Page down
                enabled: function(inst) {
                    var maxDate = inst.get('maxDate');
                    return (!maxDate || plugin.day(plugin._applyMonthsOffset(plugin.add(
                        plugin.newDate(inst.drawDate), inst.options.monthsToStep, 'm'), inst), 1).
                    getTime() <= maxDate.getTime());
                },
                date: function(inst) {
                    return plugin.day(plugin._applyMonthsOffset(plugin.add(
                        plugin.newDate(inst.drawDate), inst.options.monthsToStep, 'm'), inst), 1);
                },
                action: function(inst) {
                    plugin.changeMonth(this, inst.options.monthsToStep);
                }
            },
            nextJump: {text: 'nextJumpText', status: 'nextJumpStatus', // Next year
                keystroke: {keyCode: 34, ctrlKey: true}, // Ctrl + Page down
                enabled: function(inst) {
                    var maxDate = inst.get('maxDate');
                    return (!maxDate || plugin.day(plugin._applyMonthsOffset(plugin.add(
                        plugin.newDate(inst.drawDate), inst.options.monthsToJump, 'm'), inst), 1).
                    getTime() <= maxDate.getTime());
                },
                date: function(inst) {
                    return plugin.day(plugin._applyMonthsOffset(plugin.add(
                        plugin.newDate(inst.drawDate), inst.options.monthsToJump, 'm'), inst), 1);
                },
                action: function(inst) {
                    plugin.changeMonth(this, inst.options.monthsToJump);
                }
            },
            current: {text: 'currentText', status: 'currentStatus', // Current month
                keystroke: {keyCode: 36, ctrlKey: true}, // Ctrl + Home
                enabled: function(inst) {
                    var minDate = inst.curMinDate();
                    var maxDate = inst.get('maxDate');
                    var curDate = inst.selectedDates[0] || plugin.today();
                    return (!minDate || curDate.getTime() >= minDate.getTime()) &&
                        (!maxDate || curDate.getTime() <= maxDate.getTime());
                },
                date: function(inst) {
                    return inst.selectedDates[0] || plugin.today();
                },
                action: function(inst) {
                    var curDate = inst.selectedDates[0] || plugin.today();
                    plugin.showMonth(this, curDate.getFullYear(), curDate.getMonth() + 1);
                }
            },
            today: {text: 'todayText', status: 'todayStatus', // Today's month
                keystroke: {keyCode: 36, ctrlKey: true}, // Ctrl + Home
                enabled: function(inst) {
                    var minDate = inst.curMinDate();
                    var maxDate = inst.get('maxDate');
                    return (!minDate || plugin.today().getTime() >= minDate.getTime()) &&
                        (!maxDate || plugin.today().getTime() <= maxDate.getTime());
                },
                date: function() { return plugin.today(); },
                action: function() { plugin.showMonth(this); }
            },
            clear: {text: 'clearText', status: 'clearStatus', // Clear the datepicker
                keystroke: {keyCode: 35, ctrlKey: true}, // Ctrl + End
                enabled: function() { return true; },
                date: function() { return null; },
                action: function() { plugin.clear(this); }
            },
            close: {text: 'closeText', status: 'closeStatus', // Close the datepicker
                keystroke: {keyCode: 27}, // Escape
                enabled: function() { return true; },
                date: function() { return null; },
                action: function() { plugin.hide(this); }
            },
            prevWeek: {text: 'prevWeekText', status: 'prevWeekStatus', // Previous week
                keystroke: {keyCode: 38, ctrlKey: true}, // Ctrl + Up
                enabled: function(inst) {
                    var minDate = inst.curMinDate();
                    return (!minDate || plugin.add(plugin.newDate(inst.drawDate), -7, 'd').
                    getTime() >= minDate.getTime());
                },
                date: function(inst) { return plugin.add(plugin.newDate(inst.drawDate), -7, 'd'); },
                action: function() { plugin.changeDay(this, -7); }
            },
            prevDay: {text: 'prevDayText', status: 'prevDayStatus', // Previous day
                keystroke: {keyCode: 37, ctrlKey: true}, // Ctrl + Left
                enabled: function(inst) {
                    var minDate = inst.curMinDate();
                    return (!minDate || plugin.add(plugin.newDate(inst.drawDate), -1, 'd').
                    getTime() >= minDate.getTime());
                },
                date: function(inst) { return plugin.add(plugin.newDate(inst.drawDate), -1, 'd'); },
                action: function() { plugin.changeDay(this, -1); }
            },
            nextDay: {text: 'nextDayText', status: 'nextDayStatus', // Next day
                keystroke: {keyCode: 39, ctrlKey: true}, // Ctrl + Right
                enabled: function(inst) {
                    var maxDate = inst.get('maxDate');
                    return (!maxDate || plugin.add(plugin.newDate(inst.drawDate), 1, 'd').
                    getTime() <= maxDate.getTime());
                },
                date: function(inst) { return plugin.add(plugin.newDate(inst.drawDate), 1, 'd'); },
                action: function() { plugin.changeDay(this, 1); }
            },
            nextWeek: {text: 'nextWeekText', status: 'nextWeekStatus', // Next week
                keystroke: {keyCode: 40, ctrlKey: true}, // Ctrl + Down
                enabled: function(inst) {
                    var maxDate = inst.get('maxDate');
                    return (!maxDate || plugin.add(plugin.newDate(inst.drawDate), 7, 'd').
                    getTime() <= maxDate.getTime());
                },
                date: function(inst) { return plugin.add(plugin.newDate(inst.drawDate), 7, 'd'); },
                action: function() { plugin.changeDay(this, 7); }
            }
        },

        /** Determine whether a {@linkcode module:Datepick~commands|command} is enabled.
         @callback DatepickCommandEnabled
         @global
         @param {object} inst The current instance settings.
         @return {boolean} <code>true</code> if this command is enabled, <code>false</code> if not.
         @example enabled: function(inst) {
  return !!inst.curMinDate();
} */

        /** Calculate the representative date for a {@linkcode module:Datepick~commands|command}.
         @callback DatepickCommandDate
         @global
         @param {object} inst The current instance settings.
         @return {Date} A date appropriate for this command.
         @example date: function(inst) {
  return inst.curMinDate();
} */

        /** Perform the action for a {@linkcode module:Datepick~commands|command}.
         @callback DatepickCommandAction
         @global
         @param {object} inst The current instance settings.
         @example action: function(inst) {
  $.datepick.setDate(inst.elem, inst.curMinDate());
} */

        /** Calculate the week of the year for a date.
         Use it with the {@linkcode module:Datepick~defaultOptions|calculateWeek} option.
         @callback DatepickCalculateWeek
         @global
         @param {Date} date The date to evaluate.
         @return {number} The week of the year.
         @example calculateWeek: function(date) {
  return Math.floor(($.datepick.dayOfYear(date) - 1) / 7) + 1;
} */

        /** Determine where the first month shows in a multi-month calendar.
         Use it with the {@linkcode module:Datepick~defaultOptions|monthsOffset} option.
         @callback DatepickMonthsOffset
         @global
         @param {Date} date The first date to be shown.
         @return {number} The offset within the calendar for the first month - first position is 0.
         @example monthsToShow: 3,
         monthsToStep: 3,
         monthsOffset: function(date) { // Always start on the quarter
  return date.getMonth() % 3;
} */

        /** Provide information about an individual date shown in the calendar.
         Use it with the {@linkcode module:Datepick~defaultOptions|onDate} option.
         @callback DatepickOnDate
         @global
         @param {Date} date The date to evaluate.
         @return {object} Information about that date, with the properties above.
         @property selectable {boolean} <code>true</code> if this date can be selected.
         @property dateClass {string} Class(es) to be applied to the date.
         @property content {string} The date cell content.
         @property tooltip {string} A popup tooltip for the date.
         @example onDate: function(date) {
  return {selectable: date.getDay() > 0 && date.getDay() &lt; 5,
    dateClass: date.getDay() == 4 ? 'last-day' : ''};
} */

        /** Update the datepicker display.
         Use it with the {@linkcode module:Datepick~defaultOptions|onShow} option.
         @callback DatepickOnShow
         @global
         @param {jQuery} picker The datepicker <code>div</code> to be shown.
         @param {object} inst The current instance settings.
         @example onShow: function(picker, inst) {
  picker.append('&lt;button type="button">Hi&lt;/button>').
    find('button:last').click(function() {
      alert('Hi!');
    });
} */

        /** React to navigating through the months/years.
         Use it with the {@linkcode module:Datepick~defaultOptions|onChangeMonthYear} option.
         @callback DatepickOnChangeMonthYear
         @global
         @param {number} year The new year.
         @param {number} month The new month (1 to 12).
         @example onChangeMonthYear: function(year, month) {
  alert('Now in ' + month + '/' + year);
} */

        /** Datepicker on select callback.
         Triggered when a date is selected.
         Use it with the {@linkcode module:Datepick~defaultOptions|onSelect} option.
         @callback DatepickOnSelect
         @global
         @param {Date[]} dates The selected date(s).
         @example onSelect: function(dates) {
  alert('Selected ' + dates);
} */

        /** Datepicker on close callback.
         Triggered when a popup calendar is closed.
         Use it with the {@linkcode module:Datepick~defaultOptions|onClose} option.
         @callback DatepickOnClose
         @global
         @param {Date[]} dates The selected date(s).
         @example onClose: function(dates) {
  alert('Selected ' + dates);
} */

        /** Default settings for the plugin.
         @property {string} [pickerClass=''] CSS class to add to this instance of the datepicker.
         @property {boolean} [showOnFocus=true] <code>true</code> for popup on focus, <code>false</code> for not.
         @property {string|Element|jQuery} [showTrigger=null] Element to be cloned for a trigger,
         <code>null</code> for none.
         @property {string} [showAnim='show'] Name of jQuery animation for popup, '' for no animation.
         @property {object} [showOptions=null] Options for enhanced animations.
         @property {string|number} [showSpeed='normal'] Duration of display/closure, named value or milliseconds.
         @property {string|Element|jQuery} [popupContainer=null] The element to which a popup calendar is added,
         <code>null</code> for body.
         @property {string} [alignment='bottom'] Alignment of popup - with nominated corner of input:
         'top' or 'bottom' aligns depending on language direction,
         'topLeft', 'topRight', 'bottomLeft', 'bottomRight'.
         @property {boolean} [fixedWeeks=false] <code>true</code> to always show 6 weeks,
         <code>false</code> to only show as many as are needed.
         @property {number} [firstDay=0] First day of the week, 0 = Sunday, 1 = Monday, etc.
         @property {DatepickCalculateWeek} [calculateWeek=this.iso8601Week] Calculate week of the year from a date,
         <code>null</code> for ISO8601.
         @property {number|number[]} [monthsToShow=1] How many months to show, cols or [rows, cols].
         @property {number|DatepickMonthsOffset} [monthsOffset=0] How many months to offset the primary month by;
         may be a function that takes the date and returns the offset.
         @property {number} [monthsToStep=1] How many months to move when prev/next clicked.
         @property {number} [monthsToJump=12] How many months to move when large prev/next clicked.
         @property {boolean} [useMouseWheel=true] <code>true</code> to use mousewheel if available,
         <code>false</code> to never use it.
         @property {boolean} [changeMonth=true] <code>true</code> to change month/year via drop-down,
         <code>false</code> for navigation only.
         @property {string} [yearRange='c-10:c+10'] Range of years to show in drop-down: 'any' for direct text entry
         or 'start:end', where start/end are '±nn' for relative to today
         or 'c±nn' for relative to the currently selected date
         or 'nnnn' for an absolute year.
         @property {string|number} [shortYearCutoff='+10'] Cutoff for two-digit year in the current century.
         If expressed as a string it is offset from the current year.
         If expressed as a number it is used directly.
         Use -1 to always use 1900 as the base year, or use 100 to disable the functionality.
         Any short year ('yy') entered is transformed into a full year in the current century
         if less than or equal to this cutoff value, and the previous century otherwise.
         @property {boolean} [showOtherMonths=false] <code>true</code> to show dates from other months,
         <code>false</code> to not show them.
         @property {boolean} [selectOtherMonths=false] <code>true</code> to allow selection of dates
         from other months too.
         @property {string|number|Date} [defaultDate=null] Date to show if no other selected.
         If expressed as a string it is parsed using the current
         {@linkcode module:Datepick~regionalOptions|dateFormat}.
         If expressed as a number it is offset that number of days from today.
         If expressed as a <code>Date</code> it is used directly.
         @property {boolean} [selectDefaultDate=false] <code>true</code> to pre-select the default date
         if no other is chosen.
         @property {string|number|Date} [minDate=null] The minimum selectable date.
         See the allowed values in <code>defaultDate</code> above.
         @property {string|number|Date} [maxDate=null] The maximum selectable date.
         See the allowed values in <code>defaultDate</code> above.
         @property {string} [dateFormat='mm/dd/yyyy'] Format for dates.
         See {@linkcode module:Datepick~formatDate|formatDate} for allowed formats.
         @property {boolean} [autoSize=false] <code>true</code> to size the input field according to
         the {@linkcode module:Datepick~regionalOptions|dateFormat}.
         @property {boolean} [rangeSelect=false] Allows for selecting a date range on one date picker.
         @property {string} [rangeSeparator=' - '] Text between two dates in a range when displayed.
         @property {number} [multiSelect=0] Maximum number of selectable dates for multiple independent dates,
         zero for single select. If specified,
         <code>multiSelect</code> takes precedence over <code>rangeSelect</code>.
         @property {string} [multiSeparator=','] Text between multiple dates.
         @property {DatepickOnDate} [onDate=null] Callback as each date is added to the display calendar.
         This allows you to customise the behaviour and presentation of each date.
         @property {DatepickOnShow} [onShow=null] Callback just before a datepicker is shown.
         This allows you to customise the datepicker before display.
         @property {DatepickOnChangeMonthYear} [onChangeMonthYear=null] Callback when a new month/year is selected.
         This allows you to perform other actions when the calendar changes.
         @property {DatepickOnSelect} [onSelect=null] Callback when a date is selected.
         @property {DatepickOnClose} [onClose=null] Callback when a datepicker is closed.
         @property {string|Element|jQuery} [altField=null] Alternate field to update in synch with the datepicker.
         @property {string} [altFormat=null] Date format for alternate field, defaults to
         {@linkcode module:Datepick~regionalOptions|dateFormat}.
         This allows you to display one (human-friendly) format,
         while automatically maintaining another (computer-friendly) format.
         @property {boolean} [constrainInput=true] <code>true</code> to constrain typed input to
         {@linkcode module:Datepick~regionalOptions|dateFormat} allowed characters.
         @property {boolean} [commandsAsDateFormat=false] <code>true</code> to apply
         {@linkcode module:Datepick~formatDate|formatDate} to the command texts.
         @property {object} [commands=this.commands] Command actions that may be added to a layout by name. */
        defaultOptions: {
            pickerClass: '',
            showOnFocus: true,
            showTrigger: null,
            showAnim: 'show',
            showOptions: {},
            showSpeed: 'normal',
            popupContainer: null,
            alignment: 'bottom',
            fixedWeeks: false,
            firstDay: 0,
            calculateWeek: null, // this.iso8601Week,
            monthsToShow: 1,
            monthsOffset: 0,
            monthsToStep: 1,
            monthsToJump: 12,
            useMouseWheel: true,
            changeMonth: true,
            yearRange: 'c-10:c+10',
            shortYearCutoff: '+10',
            showOtherMonths: false,
            selectOtherMonths: false,
            defaultDate: null,
            selectDefaultDate: false,
            minDate: null,
            maxDate: null,
            dateFormat: 'mm/dd/yyyy',
            autoSize: false,
            rangeSelect: false,
            rangeSeparator: ' - ',
            multiSelect: 0,
            multiSeparator: ',',
            onDate: null,
            onShow: null,
            onChangeMonthYear: null,
            onSelect: null,
            onClose: null,
            altField: null,
            altFormat: null,
            constrainInput: true,
            commandsAsDateFormat: false,
            commands: {} // this.commands
        },

        /** Localisations for the plugin.
         Entries are objects indexed by the language code ('' being the default US/English).
         Each object has the following attributes.
         @property {string[]} [monthNames=['January','February',...,'November','December']]
         The long names of the months.
         @property {string[]} [monthNamesShort=['Jan','Feb',...,'Nov','Dec']]
         The short names of the months.
         @property {string[]} [dayNames=['Sunday','Monday',...,'Friday','Saturday']]
         The long names of the days of the week.
         @property {string[]} [dayNamesShort=['Sun','Mon','Tue','Wed','Thu','Fri','Sat']]
         The short names of the days of the week.
         @property {string[]} [dayNamesMin=['Su','Mo','Tu','We','Th','Fr','Sa']]
         The minimal names of the days of the week.
         @property {string} [dateFormat='mm/dd/yyyy'] See options on {@linkcode module:Datepick~formatDate|formatDate}.
         @property {number} [firstDay=0] The first day of the week, Sun = 0, Mon = 1, etc.
         @property {string} [renderer=this.defaultRenderer] The rendering templates.
         @property {string} [prevText='&lt;Prev'] Text for the previous month command.
         @property {string} [prevStatus='Show the previous month'] Status text for the previous month command.
         @property {string} [prevJumpText='&lt;&lt;'] Text for the previous year command.
         @property {string} [prevJumpStatus='Show the previous year'] Status text for the previous year command.
         @property {string} [nextText='Next&gt;'] Text for the next month command.
         @property {string} [nextStatus='Show the next month'] Status text for the next month command.
         @property {string} [nextJumpText='&gt;&gt;'] Text for the next year command.
         @property {string} [nextJumpStatus='Show the next year'] Status text for the next year command.
         @property {string} [currentText='Current'] Text for the current month command.
         @property {string} [currentStatus='Show the current month'] Status text for the current month command.
         @property {string} [todayText='Today'] Text for the today's month command.
         @property {string} [todayStatus='Show today\'s month'] Status text for the today's month command.
         @property {string} [clearText='Clear'] Text for the clear command.
         @property {string} [clearStatus='Clear all the dates'] Status text for the clear command.
         @property {string} [closeText='Close'] Text for the close command.
         @property {string} [closeStatus='Close the datepicker'] Status text for the close command.
         @property {string} [yearStatus='Change the year'] Status text for year selection.
         @property {string} [earlierText='&#160;&#160;▲'] Text for earlier years.
         @property {string} [laterText='&#160;&#160;▼'] Text for later years.
         @property {string} [monthStatus='Change the month'] Status text for month selection.
         @property {string} [weekText='Wk'] Text for week of the year column header.
         @property {string} [weekStatus='Week of the year'] Status text for week of the year column header.
         @property {string} [dayStatus='Select DD,&#160;M&#160;d,&#160;yyyy'] Status text for selectable days.
         @property {string} [defaultStatus='Select a date'] Status text shown by default.
         @property {boolean} [isRTL=false] <code>true</code> if language is written right-to-left. */
        regionalOptions: { // Available regional settings, indexed by language/country code
            '': { // Default regional settings - English/US
                monthNames: ['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'],
                monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                dateFormat: 'mm/dd/yyyy',
                firstDay: 0,
                renderer: {}, // this.defaultRenderer
                prevText: '&lt;Prev',
                prevStatus: 'Show the previous month',
                prevJumpText: '&lt;&lt;',
                prevJumpStatus: 'Show the previous year',
                nextText: 'Next&gt;',
                nextStatus: 'Show the next month',
                nextJumpText: '&gt;&gt;',
                nextJumpStatus: 'Show the next year',
                currentText: 'Current',
                currentStatus: 'Show the current month',
                todayText: 'Today',
                todayStatus: 'Show today\'s month',
                clearText: 'Clear',
                clearStatus: 'Clear all the dates',
                closeText: 'Close',
                closeStatus: 'Close the datepicker',
                yearStatus: 'Change the year',
                earlierText: '&#160;&#160;▲',
                laterText: '&#160;&#160;▼',
                monthStatus: 'Change the month',
                weekText: 'Wk',
                weekStatus: 'Week of the year',
                dayStatus: 'Select DD, M d, yyyy',
                defaultStatus: 'Select a date',
                isRTL: false
            }
        },

        _disabled: [],

        _popupClass: pluginName + '-popup', // Marker for popup division
        _triggerClass: pluginName + '-trigger', // Marker for trigger element
        _disableClass: pluginName + '-disable', // Marker for disabled element
        _monthYearClass: pluginName + '-month-year', // Marker for month/year inputs
        _curMonthClass: pluginName + '-month-', // Marker for current month/year
        _anyYearClass: pluginName + '-any-year', // Marker for year direct input
        _curDoWClass: pluginName + '-dow-', // Marker for day of week

        _ticksTo1970: (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) +
            Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000),
        _msPerDay: 24 * 60 * 60 * 1000,

        /** The {@linkcode module:Datepick~formatDate|date format} for use with Atom (RFC 3339/ISO 8601): yyyy-mm-dd. */
        ATOM: 'yyyy-mm-dd',
        /** The {@linkcode module:Datepick~formatDate|date format} for use with cookies: D, dd M yyyy. */
        COOKIE: 'D, dd M yyyy',
        /** The {@linkcode module:Datepick~formatDate|date format} for full display: DD, MM d, yyyy. */
        FULL: 'DD, MM d, yyyy',
        /** The {@linkcode module:Datepick~formatDate|date format} for use with ISO 8601: yyyy-mm-dd. */
        ISO_8601: 'yyyy-mm-dd',
        /** The {@linkcode module:Datepick~formatDate|date format} for Julian dates: J. */
        JULIAN: 'J',
        /** The {@linkcode module:Datepick~formatDate|date format} for use with RFC 822: D, d M yy. */
        RFC_822: 'D, d M yy',
        /** The {@linkcode module:Datepick~formatDate|date format} for use with RFC 850: DD, dd-M-yy. */
        RFC_850: 'DD, dd-M-yy',
        /** The {@linkcode module:Datepick~formatDate|date format} for use with RFC 1036: D, d M yy. */
        RFC_1036: 'D, d M yy',
        /** The {@linkcode module:Datepick~formatDate|date format} for use with RFC 1123: D, d M yyyy. */
        RFC_1123: 'D, d M yyyy',
        /** The {@linkcode module:Datepick~formatDate|date format} for use with RFC 2822: D, d M yyyy. */
        RFC_2822: 'D, d M yyyy',
        /** The {@linkcode module:Datepick~formatDate|date format} for use with RSS (RFC 822): D, d M yy. */
        RSS: 'D, d M yy',
        /** The {@linkcode module:Datepick~formatDate|date format} for Windows ticks: !. */
        TICKS: '!',
        /** The {@linkcode module:Datepick~formatDate|date format} for Unix timestamp: @. */
        TIMESTAMP: '@',
        /** The {@linkcode module:Datepick~formatDate|date format} for use with W3C (ISO 8601): yyyy-mm-dd. */
        W3C: 'yyyy-mm-dd',

        /** Format a date object into a string value.
         The format can be combinations of the following:
         <ul>
         <li>d  - day of month (no leading zero)</li>
         <li>dd - day of month (two digit)</li>
         <li>o  - day of year (no leading zeros)</li>
         <li>oo - day of year (three digit)</li>
         <li>D  - day name short</li>
         <li>DD - day name long</li>
         <li>w  - week of year (no leading zero)</li>
         <li>ww - week of year (two digit)</li>
         <li>m  - month of year (no leading zero)</li>
         <li>mm - month of year (two digit)</li>
         <li>M  - month name short</li>
         <li>MM - month name long</li>
         <li>yy - year (two digit)</li>
         <li>yyyy - year (four digit)</li>
         <li>@  - Unix timestamp (s since 01/01/1970)</li>
         <li>!  - Windows ticks (100ns since 01/01/0001)</li>
         <li>'...' - literal text</li>
         <li>'' - single quote</li>
         </ul>
         @param {string} [format=defaultOptions.dateFormat] The desired format of the date.
         @param {Date} date The date value to format.
         @param {object} [settings] With these properties:
         @param {string[]} [settings.dayNames] Names of the days from Sunday.
         @param {string[]} [settings.dayNamesShort] Abbreviated names of the days from Sunday.
         @param {string[]} [settings.monthNames] Names of the months.
         @param {string[]} [settings.monthNamesShort] Abbreviated names of the months.
         @param {DatepickCalculateWeek} [settings.calculateWeek] Function that determines week of the year.
         @return {string} The date in the above format.
         @example var display = $.datepick.formatDate('yyyy-mm-dd', new Date(2014, 12-1, 25)) */
        formatDate: function(format, date, settings) {
            if (typeof format !== 'string') {
                settings = date;
                date = format;
                format = '';
            }
            if (!date) {
                return '';
            }
            format = format || this.defaultOptions.dateFormat;
            settings = settings || {};
            var dayNamesShort = settings.dayNamesShort || this.defaultOptions.dayNamesShort;
            var dayNames = settings.dayNames || this.defaultOptions.dayNames;
            var monthNamesShort = settings.monthNamesShort || this.defaultOptions.monthNamesShort;
            var monthNames = settings.monthNames || this.defaultOptions.monthNames;
            var calculateWeek = settings.calculateWeek || this.defaultOptions.calculateWeek;
            // Check whether a format character is doubled
            var doubled = function(match, step) {
                var matches = 1;
                while (iFormat + matches < format.length && format.charAt(iFormat + matches) === match) {
                    matches++;
                }
                iFormat += matches - 1;
                return Math.floor(matches / (step || 1)) > 1;
            };
            // Format a number, with leading zeroes if necessary
            var formatNumber = function(match, value, len, step) {
                var num = '' + value;
                if (doubled(match, step)) {
                    while (num.length < len) {
                        num = '0' + num;
                    }
                }
                return num;
            };
            // Format a name, short or long as requested
            var formatName = function(match, value, shortNames, longNames) {
                return (doubled(match) ? longNames[value] : shortNames[value]);
            };
            var output = '';
            var literal = false;
            for (var iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal) {
                    if (format.charAt(iFormat) === '\'' && !doubled('\'')) {
                        literal = false;
                    }
                    else {
                        output += format.charAt(iFormat);
                    }
                }
                else {
                    switch (format.charAt(iFormat)) {
                        case 'd':
                            output += formatNumber('d', date.getDate(), 2);
                            break;
                        case 'D':
                            output += formatName('D', date.getDay(), dayNamesShort, dayNames);
                            break;
                        case 'o':
                            output += formatNumber('o', this.dayOfYear(date), 3);
                            break;
                        case 'w':
                            output += formatNumber('w', calculateWeek(date), 2);
                            break;
                        case 'm':
                            output += formatNumber('m', date.getMonth() + 1, 2);
                            break;
                        case 'M':
                            output += formatName('M', date.getMonth(), monthNamesShort, monthNames);
                            break;
                        case 'y':
                            output += (doubled('y', 2) ? date.getFullYear() :
                                (date.getFullYear() % 100 < 10 ? '0' : '') + date.getFullYear() % 100);
                            break;
                        case '@':
                            output += Math.floor(date.getTime() / 1000);
                            break;
                        case '!':
                            output += date.getTime() * 10000 + this._ticksTo1970;
                            break;
                        case '\'':
                            if (doubled('\'')) {
                                output += '\'';
                            }
                            else {
                                literal = true;
                            }
                            break;
                        default:
                            output += format.charAt(iFormat);
                    }
                }
            }
            return output;
        },

        /** Parse a string value into a date object.
         See {@linkcode module:Datepick~formatDate|formatDate} for the possible formats, plus:
         <ul>
         <li>* - ignore rest of string</li>
         </ul>
         @param {string} format The expected format of the date ('' for default datepicker format).
         @param {string} value The date in the above format.
         @param {object} [settings] With these properties:
         @param {number} [settings.shortYearCutoff] The cutoff year for determining the century.
         @param {string[]} [settings.dayNames] The names of the days from Sunday.
         @param {string[]} [settings.dayNamesShort] The abbreviated names of the days from Sunday.
         @param {string[]} [settings.monthNames] The Names of the months.
         @param {string[]} [settings.monthNamesShort] The abbreviated names of the months.
         @return {Date} The extracted date value or <code>null</code> if value is blank.
         @throws Errors if the format and/or value are missing, if the value doesn't match the format,
         or if the date is invalid.
         @example var date = $.datepick.parseDate('dd/mm/yyyy', '25/12/2014') */
        parseDate: function(format, value, settings) {
            if (typeof value === 'undefined' || value === null) {
                throw 'Invalid arguments';
            }
            value = (typeof value === 'object' ? value.toString() : value + '');
            if (value === '') {
                return null;
            }
            format = format || this.defaultOptions.dateFormat;
            settings = settings || {};
            var shortYearCutoff = settings.shortYearCutoff || this.defaultOptions.shortYearCutoff;
            shortYearCutoff = (typeof shortYearCutoff !== 'string' ? shortYearCutoff :
                this.today().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
            var dayNamesShort = settings.dayNamesShort || this.defaultOptions.dayNamesShort;
            var dayNames = settings.dayNames || this.defaultOptions.dayNames;
            var monthNamesShort = settings.monthNamesShort || this.defaultOptions.monthNamesShort;
            var monthNames = settings.monthNames || this.defaultOptions.monthNames;
            var year = -1;
            var month = -1;
            var day = -1;
            var doy = -1;
            var shortYear = false;
            var literal = false;
            var date = null;
            // Check whether a format character is doubled
            var doubled = function(match, step) {
                var matches = 1;
                while (iFormat + matches < format.length && format.charAt(iFormat + matches) === match) {
                    matches++;
                }
                iFormat += matches - 1;
                return Math.floor(matches / (step || 1)) > 1;
            };
            // Extract a number from the string value
            var getNumber = function(match, step) {
                var isDoubled = doubled(match, step);
                var size = [2, 3, isDoubled ? 4 : 2, 11, 20]['oy@!'.indexOf(match) + 1];
                var digits = new RegExp('^-?\\d{1,' + size + '}');
                var num = value.substring(iValue).match(digits);
                if (!num) {
                    throw 'Missing number at position {0}'.replace(/\{0\}/, iValue);
                }
                iValue += num[0].length;
                return parseInt(num[0], 10);
            };
            // Extract a name from the string value and convert to an index
            var getName = function(match, shortNames, longNames, step) {
                var names = (doubled(match, step) ? longNames : shortNames);
                for (var i = 0; i < names.length; i++) {
                    if (value.substr(iValue, names[i].length).toLowerCase() === names[i].toLowerCase()) {
                        iValue += names[i].length;
                        return i + 1;
                    }
                }
                throw 'Unknown name at position {0}'.replace(/\{0\}/, iValue);
            };
            // Confirm that a literal character matches the string value
            var checkLiteral = function() {
                if (value.charAt(iValue) !== format.charAt(iFormat)) {
                    throw 'Unexpected literal at position {0}'.replace(/\{0\}/, iValue);
                }
                iValue++;
            };
            var iValue = 0;
            for (var iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal) {
                    if (format.charAt(iFormat) === '\'' && !doubled('\'')) {
                        literal = false;
                    }
                    else {
                        checkLiteral();
                    }
                }
                else {
                    switch (format.charAt(iFormat)) {
                        case 'd':
                            day = getNumber('d');
                            break;
                        case 'D':
                            getName('D', dayNamesShort, dayNames);
                            break;
                        case 'o':
                            doy = getNumber('o');
                            break;
                        case 'w':
                            getNumber('w');
                            break;
                        case 'm':
                            month = getNumber('m');
                            break;
                        case 'M':
                            month = getName('M', monthNamesShort, monthNames);
                            break;
                        case 'y':
                            var iSave = iFormat;
                            shortYear = !doubled('y', 2);
                            iFormat = iSave;
                            year = getNumber('y', 2);
                            break;
                        case '@':
                            date = this._normaliseDate(new Date(getNumber('@') * 1000));
                            year = date.getFullYear();
                            month = date.getMonth() + 1;
                            day = date.getDate();
                            break;
                        case '!':
                            date = this._normaliseDate(
                                new Date((getNumber('!') - this._ticksTo1970) / 10000));
                            year = date.getFullYear();
                            month = date.getMonth() + 1;
                            day = date.getDate();
                            break;
                        case '*':
                            iValue = value.length;
                            break;
                        case '\'':
                            if (doubled('\'')) {
                                checkLiteral();
                            }
                            else {
                                literal = true;
                            }
                            break;
                        default:
                            checkLiteral();
                    }
                }
            }
            if (iValue < value.length) {
                throw 'Additional text found at end';
            }
            if (year === -1) {
                year = this.today().getFullYear();
            }
            else if (year < 100 && shortYear) {
                year += (shortYearCutoff === -1 ? 1900 : this.today().getFullYear() -
                    this.today().getFullYear() % 100 - (year <= shortYearCutoff ? 0 : 100));
            }
            if (doy > -1) {
                month = 1;
                day = doy;
                for (var dim = this.daysInMonth(year, month); day > dim;
                     dim = this.daysInMonth(year, month)) {
                    month++;
                    day -= dim;
                }
            }
            date = this.newDate(year, month, day);
            if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
                throw 'Invalid date';
            }
            return date;
        },

        /** A date may be specified as an exact value or a relative one.
         @param {Date|number|string} dateSpec The date as a <code>Date</code>,
         or as a string in the current {@linkcode module:Datepick~regionalOptions|dateFormat},
         or as a numeric offset - in days from today,
         or as a string of amounts and periods, e.g. '+1m +2w',
         using 'd' for days, 'w' for weeks, 'm' for months, and 'y' for years.
         @param {Date} [defaultDate] The date to use if no other supplied, may be <code>null</code>.
         @param {Date} [currentDate] The current date as a possible basis for relative dates,
         if <code>null</code> today is used.
         @param {string} [dateFormat] The expected date format - see {@linkcode module:Datepick~formatDate|formatDate}.
         @param {object} [settings] With these properties:
         @param {number} [settings.shortYearCutoff] The cutoff year for determining the century.
         @param {string[]} [settings.dayNamesShort] Abbreviated names of the days from Sunday.
         @param {string[]} [settings.dayNames] Names of the days from Sunday.
         @param {string[]} [settings.monthNamesShort] Abbreviated names of the months.
         @param {string[]} [settings.monthNames] Names of the months.
         @return {Date} The decoded date.
         @example var date = $.datepick.determineDate('+1m +2w', new Date()) */
        determineDate: function(dateSpec, defaultDate, currentDate, dateFormat, settings) {
            if (currentDate && typeof currentDate !== 'object') {
                settings = dateFormat;
                dateFormat = currentDate;
                currentDate = null;
            }
            if (typeof dateFormat !== 'string') {
                settings = dateFormat;
                dateFormat = '';
            }
            var offsetString = function(offset) {
                try {
                    return plugin.parseDate(dateFormat, offset, settings);
                }
                catch (e) {
                    // Ignore
                }
                offset = offset.toLowerCase();
                var date = (offset.match(/^c/) && currentDate ? plugin.newDate(currentDate) : null) ||
                    plugin.today();
                var pattern = /([+-]?[0-9]+)\s*(d|w|m|y)?/g;
                var matches = null;
                while ((matches = pattern.exec(offset))) {
                    date = plugin.add(date, parseInt(matches[1], 10), matches[2] || 'd');
                }
                return date;
            };
            defaultDate = (defaultDate ? plugin.newDate(defaultDate) : null);
            dateSpec = (typeof dateSpec === 'undefined' ? defaultDate :
                (typeof dateSpec === 'string' ? offsetString(dateSpec) : (typeof dateSpec === 'number' ?
                    (isNaN(dateSpec) || dateSpec === Infinity || dateSpec === -Infinity ? defaultDate :
                        plugin.add(plugin.today(), dateSpec, 'd')) : plugin.newDate(dateSpec))));
            return dateSpec;
        },

        /** Find the number of days in a given month.
         @param {Date|number} year The date to get days for or the full year.
         @param {number} [month] The month (1 to 12), if the year is a number.
         @return {number} The number of days in this month.
         @example var days = $.datepick.daysInMonth(2014, 12)
         var days = $.datepick.daysInMonth(new Date(2014, 12-1, 25)) */
        daysInMonth: function(year, month) {
            month = (year.getFullYear ? year.getMonth() + 1 : month);
            year = (year.getFullYear ? year.getFullYear() : year);
            return this.newDate(year, month + 1, 0).getDate();
        },

        /** Calculate the day of the year for a date.
         @param {Date|number} year The date to get the day-of-year for or the full year.
         @param {number} [month] The month (1-12), if the year is a number.
         @param {number} [day] The day, if the year is a number.
         @return {number} The day of the year.
         @example var doy = $.datepick.dayOfYear(2014, 12, 25)
         var doy = $.datepick.dayOfYear(new Date(2014, 12-1, 25)) */
        dayOfYear: function(year, month, day) {
            var date = (year.getFullYear ? year : plugin.newDate(year, month, day));
            var newYear = plugin.newDate(date.getFullYear(), 1, 1);
            return Math.floor((date.getTime() - newYear.getTime()) / plugin._msPerDay) + 1;
        },

        /** Set as <code>calculateWeek</code> to determine the week of the year based on the ISO 8601 definition.
         @param {Date|number} year The date to get the week for or the full year.
         @param {number} [month] The month (1-12), if the year is a number.
         @param {number} [day] The day, if the year is a number.
         @return {number} The number of the week within the year that contains this date.
         @example var week = $.datepick.iso8601Week(2014, 12, 25)
         var week = $.datepick.iso8601Week(new Date(2014, 12-1, 25)) */
        iso8601Week: function(year, month, day) {
            var checkDate = (year.getFullYear ?
                new Date(year.getTime()) : plugin.newDate(year, month, day));
            // Find Thursday of this week starting on Monday
            checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
            var time = checkDate.getTime();
            checkDate.setMonth(0, 1); // Compare with Jan 1
            return Math.floor(Math.round((time - checkDate) / plugin._msPerDay) / 7) + 1;
        },

        /** Return today's date.
         @return {Date} Today.
         @example var today = $.datepick.today() */
        today: function() {
            return this._normaliseDate(new Date());
        },

        /** Return a new date.
         @param {Date|number} year The date to clone or the year.
         @param {number} [month] The month (1-12), if the year is a number.
         @param {number} [day] The day, if the year is a number.
         @return {Date} The date.
         @example $.datepick.newDate(oldDate)
         $.datepick.newDate(2014, 12, 25) */
        newDate: function(year, month, day) {
            return (!year ? null : (year.getFullYear ? this._normaliseDate(new Date(year.getTime())) :
                new Date(year, month - 1, day, 12)));
        },

        /** Standardise a date into a common format - time portion is 12 noon.
         @private
         @param {Date} date The date to standardise.
         @return {Date} The normalised date. */
        _normaliseDate: function(date) {
            if (date) {
                date.setHours(12, 0, 0, 0);
            }
            return date;
        },

        /** Set the year for a date.
         @param {Date} date The original date.
         @param {number} year The new year.
         @return {Date} The updated date.
         @example $.datepick.year(date, 2014) */
        year: function(date, year) {
            date.setFullYear(year);
            return this._normaliseDate(date);
        },

        /** Set the month for a date.
         @param {Date} date The original date.
         @param {number} month The new month (1-12).
         @return {Date} The updated date.
         @example $.datepick.month(date, 12) */
        month: function(date, month) {
            date.setMonth(month - 1);
            return this._normaliseDate(date);
        },

        /** Set the day for a date.
         @param {Date} date The original date.
         @param {number} day The new day of the month.
         @return {Date} The updated date.
         @example $.datepick.day(date, 25) */
        day: function(date, day) {
            date.setDate(day);
            return this._normaliseDate(date);
        },

        /** Add a number of periods to a date.
         @param {Date} date The original date.
         @param {number} amount The number of periods.
         @param {string} period The type of period 'd' for days, 'w' for weeks, 'm' for months, 'y' for years.
         @return {Date} The updated date.
         @example $.datepick.add(date, 10, 'd') */
        add: function(date, amount, period) {
            if (period === 'd' || period === 'w') {
                this._normaliseDate(date);
                date.setDate(date.getDate() + amount * (period === 'w' ? 7 : 1));
            }
            else {
                var year = date.getFullYear() + (period === 'y' ? amount : 0);
                var month = date.getMonth() + (period === 'm' ? amount : 0);
                date.setTime(plugin.newDate(year, month + 1,
                    Math.min(date.getDate(), this.daysInMonth(year, month + 1))).getTime());
            }
            return date;
        },

        /** Apply the months offset value to a date.
         @private
         @param {Date} date The original date.
         @param {object} inst The current instance settings.
         @return {Date} The updated date. */
        _applyMonthsOffset: function(date, inst) {
            var monthsOffset = inst.options.monthsOffset;
            if ($.isFunction(monthsOffset)) {
                monthsOffset = monthsOffset.apply(inst.elem[0], [date]);
            }
            return plugin.add(date, -monthsOffset, 'm');
        },

        _init: function() {
            this.defaultOptions.commands = this.commands;
            this.defaultOptions.calculateWeek = this.iso8601Week;
            this.regionalOptions[''].renderer = this.defaultRenderer;
            this._super();
        },

        _instSettings: function(elem) {
            return {selectedDates: [], drawDate: null, pickingRange: false,
                inline: ($.inArray(elem[0].nodeName.toLowerCase(), ['div', 'span']) > -1),
                get: function(name) { // Get a setting value, computing if necessary
                    if ($.inArray(name, ['defaultDate', 'minDate', 'maxDate']) > -1) { // Decode date settings
                        return plugin.determineDate(this.options[name], null,
                            this.selectedDates[0], this.options.dateFormat, this.getConfig());
                    }
                    return this.options[name];
                },
                curMinDate: function() {
                    return (this.pickingRange ? this.selectedDates[0] : this.get('minDate'));
                },
                getConfig: function() {
                    return {dayNamesShort: this.options.dayNamesShort, dayNames: this.options.dayNames,
                        monthNamesShort: this.options.monthNamesShort, monthNames: this.options.monthNames,
                        calculateWeek: this.options.calculateWeek,
                        shortYearCutoff: this.options.shortYearCutoff};
                }
            };
        },

        _postAttach: function(elem, inst) {
            if (inst.inline) {
                inst.drawDate = plugin._checkMinMax(plugin.newDate(inst.selectedDates[0] ||
                    inst.get('defaultDate') || plugin.today()), inst);
                inst.prevDate = plugin.newDate(inst.drawDate);
                this._update(elem[0]);
                if ($.fn.mousewheel) {
                    elem.mousewheel(this._doMouseWheel);
                }
            }
            else {
                this._attachments(elem, inst);
                elem.on('keydown.' + inst.name, this._keyDown).on('keypress.' + inst.name, this._keyPress).
                on('keyup.' + inst.name, this._keyUp);
                if (elem.attr('disabled')) {
                    this.disable(elem[0]);
                }
            }
        },

        _optionsChanged: function(elem, inst, options) {
            if (options.calendar && options.calendar !== inst.options.calendar) {
                var discardDate = function(name) {
                    return (typeof inst.options[name] === 'object' ? null : inst.options[name]);
                };
                options = $.extend({defaultDate: discardDate('defaultDate'),
                    minDate: discardDate('minDate'), maxDate: discardDate('maxDate')}, options);
                inst.selectedDates = [];
                inst.drawDate = null;
            }
            var dates = inst.selectedDates;
            $.extend(inst.options, options);
            this.setDate(elem[0], dates, null, false, true);
            inst.pickingRange = false;
            inst.drawDate = plugin.newDate(this._checkMinMax(
                (inst.options.defaultDate ? inst.get('defaultDate') : inst.drawDate) ||
                inst.get('defaultDate') || plugin.today(), inst));
            if (!inst.inline) {
                this._attachments(elem, inst);
            }
            if (inst.inline || inst.div) {
                this._update(elem[0]);
            }
        },

        /** Attach events and trigger, if necessary.
         @private
         @param {jQuery} elem The control to affect.
         @param {object} inst The current instance settings. */
        _attachments: function(elem, inst) {
            elem.off('focus.' + inst.name);
            if (inst.options.showOnFocus) {
                elem.on('focus.' + inst.name, this.show);
            }
            if (inst.trigger) {
                inst.trigger.remove();
            }
            var trigger = inst.options.showTrigger;
            inst.trigger = (!trigger ? $([]) :
                $(trigger).clone().removeAttr('id').addClass(this._triggerClass)
                    [inst.options.isRTL ? 'insertBefore' : 'insertAfter'](elem).
                click(function() {
                    if (!plugin.isDisabled(elem[0])) {
                        plugin[plugin.curInst === inst ? 'hide' : 'show'](elem[0]);
                    }
                }));
            this._autoSize(elem, inst);
            var dates = this._extractDates(inst, elem.val());
            if (dates) {
                this.setDate(elem[0], dates, null, true);
            }
            var defaultDate = inst.get('defaultDate');
            if (inst.options.selectDefaultDate && defaultDate && inst.selectedDates.length === 0) {
                this.setDate(elem[0], plugin.newDate(defaultDate || plugin.today()));
            }
        },

        /** Apply the maximum length for the date format.
         @private
         @param {jQuery} elem The control to affect.
         @param {object} inst The current instance settings. */
        _autoSize: function(elem, inst) {
            if (inst.options.autoSize && !inst.inline) {
                var date = plugin.newDate(2009, 10, 20); // Ensure double digits
                var dateFormat = inst.options.dateFormat;
                if (dateFormat.match(/[DM]/)) {
                    var findMax = function(names) {
                        var max = 0;
                        var maxI = 0;
                        for (var i = 0; i < names.length; i++) {
                            if (names[i].length > max) {
                                max = names[i].length;
                                maxI = i;
                            }
                        }
                        return maxI;
                    };
                    date.setMonth(findMax(inst.options[dateFormat.match(/MM/) ? // Longest month
                        'monthNames' : 'monthNamesShort']));
                    date.setDate(findMax(inst.options[dateFormat.match(/DD/) ? // Longest day
                        'dayNames' : 'dayNamesShort']) + 20 - date.getDay());
                }
                inst.elem.attr('size', plugin.formatDate(dateFormat, date, inst.getConfig()).length);
            }
        },

        _preDestroy: function(elem, inst) {
            if (inst.trigger) {
                inst.trigger.remove();
            }
            elem.empty().off('.' + inst.name);
            if (inst.inline && $.fn.mousewheel) {
                elem.unmousewheel();
            }
            if (!inst.inline && inst.options.autoSize) {
                elem.removeAttr('size');
            }
        },

        /** Apply multiple event functions.
         @param {function} fns The functions to apply.
         @example onShow: $.datepick.multipleEvents(fn1, fn2, ...) */
        multipleEvents: function() {
            var funcs = arguments;
            return function() {
                for (var i = 0; i < funcs.length; i++) {
                    funcs[i].apply(this, arguments);
                }
            };
        },

        /** Enable the control.
         @param {Element} elem The control to affect.
         @example $(selector).datepick('enable') */
        enable: function(elem) {
            elem = $(elem);
            if (!elem.hasClass(this._getMarker())) {
                return;
            }
            var inst = this._getInst(elem);
            if (inst.inline) {
                elem.children('.' + this._disableClass).remove().end().
                find('button,select').prop('disabled', false).end().
                find('a').attr('href', '#');
            }
            else {
                elem.prop('disabled', false);
                inst.trigger.filter('button.' + this._triggerClass).prop('disabled', false).end().
                filter('img.' + this._triggerClass).css({opacity: '1.0', cursor: ''});
            }
            this._disabled = $.map(this._disabled,
                function(value) { return (value === elem[0] ? null : value); }); // Delete entry
        },

        /** Disable the control.
         @param {Element} elem The control to affect.
         @example $(selector).datepick('disable') */
        disable: function(elem) {
            elem = $(elem);
            if (!elem.hasClass(this._getMarker())) {
                return;
            }
            var inst = this._getInst(elem);
            if (inst.inline) {
                var inline = elem.children(':last');
                var offset = inline.offset();
                var relOffset = {left: 0, top: 0};
                inline.parents().each(function() {
                    if ($(this).css('position') === 'relative') {
                        relOffset = $(this).offset();
                        return false;
                    }
                });
                var zIndex = elem.css('zIndex');
                zIndex = (zIndex === 'auto' ? 0 : parseInt(zIndex, 10)) + 1;
                elem.prepend('<div class="' + this._disableClass + '" style="' +
                    'width: ' + inline.outerWidth() + 'px; height: ' + inline.outerHeight() +
                    'px; left: ' + (offset.left - relOffset.left) + 'px; top: ' +
                    (offset.top - relOffset.top) + 'px; z-index: ' + zIndex + '"></div>').
                find('button,select').prop('disabled', true).end().
                find('a').removeAttr('href');
            }
            else {
                elem.prop('disabled', true);
                inst.trigger.filter('button.' + this._triggerClass).prop('disabled', true).end().
                filter('img.' + this._triggerClass).css({opacity: '0.5', cursor: 'default'});
            }
            this._disabled = $.map(this._disabled,
                function(value) { return (value === elem[0] ? null : value); }); // Delete entry
            this._disabled.push(elem[0]);
        },

        /** Is the first field in a jQuery collection disabled as a datepicker?
         @param {Element} elem The control to examine.
         @return {boolean} <code>true</code> if disabled, <code>false</code> if enabled.
         @example if ($(selector).datepick('isDisabled')) {...} */
        isDisabled: function(elem) {
            return (elem && $.inArray(elem, this._disabled) > -1);
        },

        /** Show a popup datepicker.
         @param {Element|Event} elem The control to use or a focus event (internal).
         @example $(selector).datepick('show') */
        show: function(elem) {
            elem = $(elem.target || elem);
            var inst = plugin._getInst(elem);
            if (plugin.curInst === inst) {
                return;
            }
            if (plugin.curInst) {
                plugin.hide(plugin.curInst, true);
            }
            if (!$.isEmptyObject(inst)) {
                // Retrieve existing date(s)
                inst.lastVal = null;
                inst.selectedDates = plugin._extractDates(inst, elem.val());
                inst.pickingRange = false;
                inst.drawDate = plugin._checkMinMax(plugin.newDate(inst.selectedDates[0] ||
                    inst.get('defaultDate') || plugin.today()), inst);
                inst.prevDate = plugin.newDate(inst.drawDate);
                plugin.curInst = inst;
                // Generate content
                plugin._update(elem[0], true);
                // Adjust position before showing
                var offset = plugin._checkOffset(inst);
                inst.div.css({left: offset.left, top: offset.top});
                // And display
                var showAnim = inst.options.showAnim;
                var showSpeed = inst.options.showSpeed;
                showSpeed = (showSpeed === 'normal' && $.ui &&
                parseInt($.ui.version.substring(2)) >= 8 ? '_default' : showSpeed);
                if ($.effects && ($.effects[showAnim] || ($.effects.effect && $.effects.effect[showAnim]))) {
                    var data = inst.div.data(); // Update old effects data
                    for (var key in data) {
                        if (key.match(/^ec\.storage\./)) {
                            data[key] = inst._mainDiv.css(key.replace(/ec\.storage\./, ''));
                        }
                    }
                    inst.div.data(data).show(showAnim, inst.options.showOptions, showSpeed);
                }
                else {
                    inst.div[showAnim || 'show'](showAnim ? showSpeed : 0);
                }
            }
        },

        /** Extract possible dates from a string.
         @private
         @param {object} inst The current instance settings.
         @param {string} text The text to extract from.
         @return {Date[]} The extracted dates. */
        _extractDates: function(inst, datesText) {
            if (datesText === inst.lastVal) {
                return;
            }
            inst.lastVal = datesText;
            datesText = datesText.split(inst.options.multiSelect ? inst.options.multiSeparator :
                (inst.options.rangeSelect ? inst.options.rangeSeparator : '\x00'));
            var dates = [];
            for (var i = 0; i < datesText.length; i++) {
                try {
                    var date = plugin.parseDate(inst.options.dateFormat, datesText[i], inst.getConfig());
                    if (date) {
                        var found = false;
                        for (var j = 0; j < dates.length; j++) {
                            if (dates[j].getTime() === date.getTime()) {
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            dates.push(date);
                        }
                    }
                }
                catch (e) {
                    // Ignore
                }
            }
            dates.splice(inst.options.multiSelect || (inst.options.rangeSelect ? 2 : 1), dates.length);
            if (inst.options.rangeSelect && dates.length === 1) {
                dates[1] = dates[0];
            }
            return dates;
        },

        /** Update the datepicker display.
         @private
         @param {Event|Element} elem A focus event or the control to use.
         @param {boolean} hidden <code>true</code> to initially hide the datepicker. */
        _update: function(elem, hidden) {
            elem = $(elem.target || elem);
            var inst = plugin._getInst(elem);
            if (!$.isEmptyObject(inst)) {
                if (inst.inline || plugin.curInst === inst) {
                    if ($.isFunction(inst.options.onChangeMonthYear) && (!inst.prevDate ||
                            inst.prevDate.getFullYear() !== inst.drawDate.getFullYear() ||
                            inst.prevDate.getMonth() !== inst.drawDate.getMonth())) {
                        inst.options.onChangeMonthYear.apply(elem[0],
                            [inst.drawDate.getFullYear(), inst.drawDate.getMonth() + 1]);
                    }
                }
                if (inst.inline) {
                    var index = $('a, :input', elem).index($(':focus', elem));
                    elem.html(this._generateContent(elem[0], inst));
                    var focus = elem.find('a, :input');
                    focus.eq(Math.max(Math.min(index, focus.length - 1), 0)).focus();
                }
                else if (plugin.curInst === inst) {
                    if (!inst.div) {
                        inst.div = $('<div></div>').addClass(this._popupClass).
                        css({display: (hidden ? 'none' : 'static'), position: 'absolute',
                            left: elem.offset().left, top: elem.offset().top + elem.outerHeight()}).
                        appendTo($(inst.options.popupContainer || 'body'));
                        if ($.fn.mousewheel) {
                            inst.div.mousewheel(this._doMouseWheel);
                        }
                    }
                    inst.div.html(this._generateContent(elem[0], inst));
                    elem.focus();
                }
            }
        },

        /** Update the input field and any alternate field with the current dates.
         @private
         @param {Element} elem The control to use.
         @param {boolean} keyUp <code>true</code> if coming from <code>keyUp</code> processing (internal). */
        _updateInput: function(elem, keyUp) {
            var inst = this._getInst(elem);
            if (!$.isEmptyObject(inst)) {
                var value = '';
                var altValue = '';
                var sep = (inst.options.multiSelect ? inst.options.multiSeparator :
                    inst.options.rangeSeparator);
                var altFormat = inst.options.altFormat || inst.options.dateFormat;
                for (var i = 0; i < inst.selectedDates.length; i++) {
                    value += (keyUp ? '' : (i > 0 ? sep : '') + plugin.formatDate(
                        inst.options.dateFormat, inst.selectedDates[i], inst.getConfig()));
                    altValue += (i > 0 ? sep : '') + plugin.formatDate(
                        altFormat, inst.selectedDates[i], inst.getConfig());
                }
                if (!inst.inline && !keyUp) {
                    $(elem).val(value);
                }
                $(inst.options.altField).val(altValue);
                if ($.isFunction(inst.options.onSelect) && !keyUp && !inst.inSelect) {
                    inst.inSelect = true; // Prevent endless loops
                    inst.options.onSelect.apply(elem, [inst.selectedDates]);
                    inst.inSelect = false;
                }
            }
        },

        /** Retrieve the size of left and top borders for an element.
         @private
         @param {jQuery} elem The element of interest.
         @return {number[]} The left and top borders. */
        _getBorders: function(elem) {
            var convert = function(value) {
                return {thin: 1, medium: 3, thick: 5}[value] || value;
            };
            return [parseFloat(convert(elem.css('border-left-width'))),
                parseFloat(convert(elem.css('border-top-width')))];
        },

        /** Check positioning to remain on the screen.
         @private
         @param {object} inst The current instance settings.
         @return {object} The updated offset for the datepicker. */
        _checkOffset: function(inst) {
            var base = (inst.elem.is(':hidden') && inst.trigger ? inst.trigger : inst.elem);
            var offset = base.offset();
            var browserWidth = $(window).width();
            var browserHeight = $(window).height();
            if (browserWidth === 0) {
                return offset;
            }
            var isFixed = false;
            $(inst.elem).parents().each(function() {
                isFixed = isFixed || ($(this).css('position') === 'fixed');
                return !isFixed;
            });
            var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
            var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
            var above = offset.top - (isFixed ? scrollY : 0) - inst.div.outerHeight();
            var below = offset.top - (isFixed ? scrollY : 0) + base.outerHeight();
            var alignL = offset.left - (isFixed ? scrollX : 0);
            var alignR = offset.left - (isFixed ? scrollX : 0) + base.outerWidth() - inst.div.outerWidth();
            var tooWide = (offset.left - scrollX + inst.div.outerWidth()) > browserWidth;
            var tooHigh = (offset.top - scrollY + inst.elem.outerHeight() +
                inst.div.outerHeight()) > browserHeight;
            inst.div.css('position', isFixed ? 'fixed' : 'absolute');
            var alignment = inst.options.alignment;
            if (alignment === 'topLeft') {
                offset = {left: alignL, top: above};
            }
            else if (alignment === 'topRight') {
                offset = {left: alignR, top: above};
            }
            else if (alignment === 'bottomLeft') {
                offset = {left: alignL, top: below};
            }
            else if (alignment === 'bottomRight') {
                offset = {left: alignR, top: below};
            }
            else if (alignment === 'top') {
                offset = {left: (inst.options.isRTL || tooWide ? alignR : alignL), top: above};
            }
            else { // bottom
                offset = {left: (inst.options.isRTL || tooWide ? alignR : alignL),
                    top: (tooHigh ? above : below)};
            }
            offset.left = Math.max((isFixed ? 0 : scrollX), offset.left);
            offset.top = Math.max((isFixed ? 0 : scrollY), offset.top);
            return offset;
        },

        /** Close date picker if clicked elsewhere.
         @private
         @param {MouseEvent} event The mouse click to check. */
        _checkExternalClick: function(event) {
            if (!plugin.curInst) {
                return;
            }
            var elem = $(event.target);
            if (elem.closest('.' + plugin._popupClass + ',.' + plugin._triggerClass).length === 0 &&
                !elem.hasClass(plugin._getMarker())) {
                plugin.hide(plugin.curInst);
            }
        },

        /** Hide a popup datepicker.
         @param {Element|object} elem The control to use or the current instance settings.
         @param {boolean} [immediate=false] <code>true</code> to close immediately without animation (internal).
         @example $(selector).datepick('hide') */
        hide: function(elem, immediate) {
            if (!elem) {
                return;
            }
            var inst = this._getInst(elem);
            if ($.isEmptyObject(inst)) {
                inst = elem;
            }
            if (inst && inst === plugin.curInst) {
                var showAnim = (immediate ? '' : inst.options.showAnim);
                var showSpeed = inst.options.showSpeed;
                showSpeed = (showSpeed === 'normal' && $.ui &&
                parseInt($.ui.version.substring(2)) >= 8 ? '_default' : showSpeed);
                var postProcess = function() {
                    if (!inst.div) {
                        return;
                    }
                    inst.div.remove();
                    inst.div = null;
                    plugin.curInst = null;
                    if ($.isFunction(inst.options.onClose)) {
                        inst.options.onClose.apply(elem, [inst.selectedDates]);
                    }
                };
                inst.div.stop();
                if ($.effects && ($.effects[showAnim] || ($.effects.effect && $.effects.effect[showAnim]))) {
                    inst.div.hide(showAnim, inst.options.showOptions, showSpeed, postProcess);
                }
                else {
                    var hideAnim = (showAnim === 'slideDown' ? 'slideUp' :
                        (showAnim === 'fadeIn' ? 'fadeOut' : 'hide'));
                    inst.div[hideAnim]((showAnim ? showSpeed : ''), postProcess);
                }
                if (!showAnim) {
                    postProcess();
                }
            }
        },

        /** Handle keystrokes in the datepicker.
         @private
         @param {KeyEvent} event The keystroke.
         @return {boolean} <code>true</code> if not handled, <code>false</code> if handled. */
        _keyDown: function(event) {
            var elem = (event.data && event.data.elem) || event.target;
            var inst = plugin._getInst(elem);
            var handled = false;
            var command = null;
            if (inst.inline || inst.div) {
                if (event.keyCode === 9) { // Tab - close
                    plugin.hide(elem);
                }
                else if (event.keyCode === 13) { // Enter - select
                    plugin.selectDate(elem,
                        $('a.' + inst.options.renderer.highlightedClass, inst.div)[0]);
                    handled = true;
                }
                else { // Command keystrokes
                    for (var key in inst.options.commands) {
                        if (inst.options.commands.hasOwnProperty(key)) {
                            command = inst.options.commands[key];
                            /* jshint -W018 */ // Dislikes !!
                            if (command.keystroke.keyCode === event.keyCode &&
                                !!command.keystroke.ctrlKey === !!(event.ctrlKey || event.metaKey) &&
                                !!command.keystroke.altKey === event.altKey &&
                                !!command.keystroke.shiftKey === event.shiftKey) {
                                /* jshint +W018 */
                                plugin.performAction(elem, key);
                                handled = true;
                                break;
                            }
                        }
                    }
                }
            }
            else { // Show on 'current' keystroke
                command = inst.options.commands.current;
                /* jshint -W018 */ // Dislikes !!
                if (command.keystroke.keyCode === event.keyCode &&
                    !!command.keystroke.ctrlKey === !!(event.ctrlKey || event.metaKey) &&
                    !!command.keystroke.altKey === event.altKey &&
                    !!command.keystroke.shiftKey === event.shiftKey) {
                    /* jshint +W018 */
                    plugin.show(elem);
                    handled = true;
                }
            }
            inst.ctrlKey = ((event.keyCode < 48 && event.keyCode !== 32) || event.ctrlKey || event.metaKey);
            if (handled) {
                event.preventDefault();
                event.stopPropagation();
            }
            return !handled;
        },

        /** Filter keystrokes in the datepicker.
         @private
         @param {KeyEvent} event The keystroke.
         @return {boolean} <code>true</code> if allowed, <code>false</code> if not allowed. */
        _keyPress: function(event) {
            var inst = plugin._getInst((event.data && event.data.elem) || event.target);
            if (!$.isEmptyObject(inst) && inst.options.constrainInput) {
                var ch = String.fromCharCode(event.keyCode || event.charCode);
                var allowedChars = plugin._allowedChars(inst);
                return (event.metaKey || inst.ctrlKey || ch < ' ' ||
                    !allowedChars || allowedChars.indexOf(ch) > -1);
            }
            return true;
        },

        /** Determine the set of characters allowed by the date format.
         @private
         @param {object} inst The current instance settings.
         @return {string} The set of allowed characters, or <code>null</code> if anything allowed. */
        _allowedChars: function(inst) {
            var allowedChars = (inst.options.multiSelect ? inst.options.multiSeparator :
                (inst.options.rangeSelect ? inst.options.rangeSeparator : ''));
            var literal = false;
            var hasNum = false;
            var dateFormat = inst.options.dateFormat;
            for (var i = 0; i < dateFormat.length; i++) {
                var ch = dateFormat.charAt(i);
                if (literal) {
                    if (ch === '\'' && dateFormat.charAt(i + 1) !== '\'') {
                        literal = false;
                    }
                    else {
                        allowedChars += ch;
                    }
                }
                else {
                    switch (ch) {
                        case 'd':
                        case 'm':
                        case 'o':
                        case 'w':
                            allowedChars += (hasNum ? '' : '0123456789');
                            hasNum = true;
                            break;
                        case 'y':
                        case '@':
                        case '!':
                            allowedChars += (hasNum ? '' : '0123456789') + '-';
                            hasNum = true;
                            break;
                        case 'J':
                            allowedChars += (hasNum ? '' : '0123456789') + '-.';
                            hasNum = true;
                            break;
                        case 'D':
                        case 'M':
                        case 'Y':
                            return null; // Accept anything
                        case '\'':
                            if (dateFormat.charAt(i + 1) === '\'') {
                                allowedChars += '\'';
                            }
                            else {
                                literal = true;
                            }
                            break;
                        default:
                            allowedChars += ch;
                    }
                }
            }
            return allowedChars;
        },

        /** Synchronise datepicker with the field.
         @private
         @param {KeyEvent} event The keystroke.
         @return {boolean} <code>true</code> if allowed, <code>false</code> if not allowed. */
        _keyUp: function(event) {
            var elem = (event.data && event.data.elem) || event.target;
            var inst = plugin._getInst(elem);
            if (!$.isEmptyObject(inst) && !inst.ctrlKey && inst.lastVal !== inst.elem.val()) {
                try {
                    var dates = plugin._extractDates(inst, inst.elem.val());
                    if (dates.length > 0) {
                        plugin.setDate(elem, dates, null, true);
                    }
                }
                catch (e) {
                    // Ignore
                }
            }
            return true;
        },

        /** Increment/decrement month/year on mouse wheel activity.
         @private
         @param {event} event The mouse wheel event.
         @param {number} delta The amount of change. */
        _doMouseWheel: function(event, delta) {
            var elem = (plugin.curInst && plugin.curInst.elem[0]) ||
                $(event.target).closest('.' + plugin._getMarker())[0];
            if (plugin.isDisabled(elem)) {
                return;
            }
            var inst = plugin._getInst(elem);
            if (inst.options.useMouseWheel) {
                delta = (delta < 0 ? -1 : +1);
                plugin.changeMonth(elem, -inst.options[event.ctrlKey ? 'monthsToJump' : 'monthsToStep'] * delta);
            }
            event.preventDefault();
        },

        /** Clear an input and close a popup datepicker.
         @param {Element} elem The control to use.
         @example $(selector).datepick('clear') */
        clear: function(elem) {
            var inst = this._getInst(elem);
            if (!$.isEmptyObject(inst)) {
                inst.selectedDates = [];
                this.hide(elem);
                var defaultDate = inst.get('defaultDate');
                if (inst.options.selectDefaultDate && defaultDate) {
                    this.setDate(elem, plugin.newDate(defaultDate || plugin.today()));
                }
                else {
                    this._updateInput(elem);
                }
            }
        },

        /** Retrieve the selected date(s) for a datepicker.
         @param {Element} elem The control to examine.
         @return {Date[]} The selected date(s).
         @example var dates = $(selector).datepick('getDate') */
        getDate: function(elem) {
            var inst = this._getInst(elem);
            return (!$.isEmptyObject(inst) ? inst.selectedDates : []);
        },

        /** Set the selected date(s) for a datepicker.
         @param {Element} elem The control to examine.
         @param {Date|number|string|array} dates The selected date(s), as a <code>Date</code>,
         or as a string in the current {@linkcode module:Datepick~regionalOptions|dateFormat}
         or as a numeric offset - in days from today,
         or as a string of amounts and periods, e.g. '+1m +2w',
         using 'd' for days, 'w' for weeks, 'm' for months, and 'y' for years,
         or as an array of these.
         @param {Date|number|string} [endDate] The ending date for a range.
         @param {boolean} [keyUp=false] <code>true</code> if coming from <code>keyUp</code> processing (internal).
         @param {boolean} [setOpt=false] <code>true</code> if coming from option processing (internal).
         @example $(selector).datepick('setDate', new Date(2014, 12-1, 25))
         $(selector).datepick('setDate', '12/25/2014', '01/01/2015')
         $(selector).datepick('setDate', [date1, date2, date3]) */
        setDate: function(elem, dates, endDate, keyUp, setOpt) {
            var inst = this._getInst(elem);
            if (!$.isEmptyObject(inst)) {
                if (!$.isArray(dates)) {
                    dates = [dates];
                    if (endDate) {
                        dates.push(endDate);
                    }
                }
                var minDate = inst.get('minDate');
                var maxDate = inst.get('maxDate');
                var curDate = inst.selectedDates[0];
                inst.selectedDates = [];
                for (var i = 0; i < dates.length; i++) {
                    var date = plugin.determineDate(
                        dates[i], null, curDate, inst.options.dateFormat, inst.getConfig());
                    if (date) {
                        if ((!minDate || date.getTime() >= minDate.getTime()) &&
                            (!maxDate || date.getTime() <= maxDate.getTime())) {
                            var found = false;
                            for (var j = 0; j < inst.selectedDates.length; j++) {
                                if (inst.selectedDates[j].getTime() === date.getTime()) {
                                    found = true;
                                    break;
                                }
                            }
                            if (!found) {
                                inst.selectedDates.push(date);
                            }
                        }
                    }
                }
                inst.selectedDates.splice(inst.options.multiSelect ||
                    (inst.options.rangeSelect ? 2 : 1), inst.selectedDates.length);
                if (inst.options.rangeSelect) {
                    switch (inst.selectedDates.length) {
                        case 1:
                            inst.selectedDates[1] = inst.selectedDates[0];
                            break;
                        case 2:
                            inst.selectedDates[1] =
                                (inst.selectedDates[0].getTime() > inst.selectedDates[1].getTime() ?
                                    inst.selectedDates[0] : inst.selectedDates[1]);
                            break;
                    }
                    inst.pickingRange = false;
                }
                inst.prevDate = (inst.drawDate ? plugin.newDate(inst.drawDate) : null);
                inst.drawDate = this._checkMinMax(plugin.newDate(inst.selectedDates[0] ||
                    inst.get('defaultDate') || plugin.today()), inst);
                if (!setOpt) {
                    this._update(elem);
                    this._updateInput(elem, keyUp);
                }
            }
        },

        /** Determine whether a date is selectable for this datepicker.
         @private
         @param {Element} elem The control to check.
         @param {Date|string|number} date The date to check.
         @return {boolean} <code>true</code> if selectable, <code>false</code> if not.
         @example var selectable = $(selector).datepick('isSelectable', date) */
        isSelectable: function(elem, date) {
            var inst = this._getInst(elem);
            if ($.isEmptyObject(inst)) {
                return false;
            }
            date = plugin.determineDate(date, inst.selectedDates[0] || this.today(), null,
                inst.options.dateFormat, inst.getConfig());
            return this._isSelectable(elem, date, inst.options.onDate,
                inst.get('minDate'), inst.get('maxDate'));
        },

        /** Internally determine whether a date is selectable for this datepicker.
         @private
         @param {Element} elem the control to check.
         @param {Date} date The date to check.
         @param {DatepickOnDate|boolean} onDate Any {@linkcode module:Datepick~defaultOptions|onDate} callback
         or <code>callback.selectable</code>.
         @param {Date} minDate The minimum allowed date.
         @param {Date} maxDate The maximum allowed date.
         @return {boolean} <code>true</code> if selectable, <code>false</code> if not. */
        _isSelectable: function(elem, date, onDate, minDate, maxDate) {
            var dateInfo = (typeof onDate === 'boolean' ? {selectable: onDate} :
                (!$.isFunction(onDate) ? {} : onDate.apply(elem, [date, true])));
            return (dateInfo.selectable !== false) &&
                (!minDate || date.getTime() >= minDate.getTime()) &&
                (!maxDate || date.getTime() <= maxDate.getTime());
        },

        /** Perform a {@linkcode module:Datepick~commands|named action} for a datepicker.
         @param {element} elem The control to affect.
         @param {string} action The name of the action.
         @example $(selector).datepick('performAction', 'prev') */
        performAction: function(elem, action) {
            var inst = this._getInst(elem);
            if (!$.isEmptyObject(inst) && !this.isDisabled(elem)) {
                var commands = inst.options.commands;
                if (commands[action] && commands[action].enabled.apply(elem, [inst])) {
                    commands[action].action.apply(elem, [inst]);
                }
            }
        },

        /** Set the currently shown month and day, defaulting to today.
         @param {Element} elem The control to affect.
         @param {number} [year] The year to show.
         @param {number} [month] The month to show (1-12).
         @param {number} [day] The day to show.
         @example $(selector).datepick('showMonth', 2014, 12, 25) */
        showMonth: function(elem, year, month, day) {
            var inst = this._getInst(elem);
            if (!$.isEmptyObject(inst) && (typeof day !== 'undefined' ||
                    (inst.drawDate.getFullYear() !== year || inst.drawDate.getMonth() + 1 !== month))) {
                inst.prevDate = plugin.newDate(inst.drawDate);
                var show = this._checkMinMax((typeof year !== 'undefined' ?
                    plugin.newDate(year, month, 1) : plugin.today()), inst);
                inst.drawDate = plugin.newDate(show.getFullYear(), show.getMonth() + 1,
                    (typeof day !== 'undefined' ? day : Math.min(inst.drawDate.getDate(),
                        plugin.daysInMonth(show.getFullYear(), show.getMonth() + 1))));
                this._update(elem);
            }
        },

        /** Adjust the currently shown month.
         @param {Element} elem The control to affect.
         @param {number} offset The number of months to change by.
         @example $(selector).datepick('changeMonth', 2)*/
        changeMonth: function(elem, offset) {
            var inst = this._getInst(elem);
            if (!$.isEmptyObject(inst)) {
                var date = plugin.add(plugin.newDate(inst.drawDate), offset, 'm');
                this.showMonth(elem, date.getFullYear(), date.getMonth() + 1);
            }
        },

        /** Adjust the currently shown day.
         @param {Element} elem The control to affect.
         @param {number} offset The number of days to change by.
         @example $(selector).datepick('changeDay', 7)*/
        changeDay: function(elem, offset) {
            var inst = this._getInst(elem);
            if (!$.isEmptyObject(inst)) {
                var date = plugin.add(plugin.newDate(inst.drawDate), offset, 'd');
                this.showMonth(elem, date.getFullYear(), date.getMonth() + 1, date.getDate());
            }
        },

        /** Restrict a date to the minimum/maximum specified.
         @private
         @param {Date} date The date to check.
         @param {object} inst The current instance settings. */
        _checkMinMax: function(date, inst) {
            var minDate = inst.get('minDate');
            var maxDate = inst.get('maxDate');
            date = (minDate && date.getTime() < minDate.getTime() ? plugin.newDate(minDate) : date);
            date = (maxDate && date.getTime() > maxDate.getTime() ? plugin.newDate(maxDate) : date);
            return date;
        },

        /** Retrieve the date associated with an entry in the datepicker.
         @param {Element} elem The control to examine.
         @param {Element} target The selected datepicker element.
         @return {Date} The corresponding date, or <code>null</code>.
         @example var date = $(selector).datepick('retrieveDate', $('div.datepick-popup a:contains(10)')[0]) */
        retrieveDate: function(elem, target) {
            var inst = this._getInst(elem);
            return ($.isEmptyObject(inst) ? null : this._normaliseDate(
                new Date(parseInt(target.className.replace(/^.*dp(-?\d+).*$/, '$1'), 10))));
        },

        /** Select a date for this datepicker.
         @param {Element} elem The control to examine.
         @param {Element} target The selected datepicker element.
         @example $(selector).datepick('selectDate', $('div.datepick-popup a:contains(10)')[0]) */
        selectDate: function(elem, target) {
            var inst = this._getInst(elem);
            if (!$.isEmptyObject(inst) && !this.isDisabled(elem)) {
                var date = this.retrieveDate(elem, target);
                if (inst.options.multiSelect) {
                    var found = false;
                    for (var i = 0; i < inst.selectedDates.length; i++) {
                        if (date.getTime() === inst.selectedDates[i].getTime()) {
                            inst.selectedDates.splice(i, 1);
                            found = true;
                            break;
                        }
                    }
                    if (!found && inst.selectedDates.length < inst.options.multiSelect) {
                        inst.selectedDates.push(date);
                    }
                }
                else if (inst.options.rangeSelect) {
                    if (inst.pickingRange) {
                        inst.selectedDates[1] = date;
                    }
                    else {
                        inst.selectedDates = [date, date];
                    }
                    inst.pickingRange = !inst.pickingRange;
                }
                else {
                    inst.selectedDates = [date];
                }
                inst.prevDate = inst.drawDate = plugin.newDate(date);
                this._updateInput(elem);
                if (inst.inline || inst.pickingRange || inst.selectedDates.length <
                    (inst.options.multiSelect || (inst.options.rangeSelect ? 2 : 1))) {
                    this._update(elem);
                }
                else {
                    this.hide(elem);
                }
            }
        },

        /** Generate the datepicker content for this control.
         @private
         @param {Element} elem The control to affect.
         @param {object} inst The current instance settings.
         @return {jQuery} The datepicker content */
        _generateContent: function(elem, inst) {
            var monthsToShow = inst.options.monthsToShow;
            monthsToShow = ($.isArray(monthsToShow) ? monthsToShow : [1, monthsToShow]);
            inst.drawDate = this._checkMinMax(
                inst.drawDate || inst.get('defaultDate') || plugin.today(), inst);
            var drawDate = plugin._applyMonthsOffset(plugin.newDate(inst.drawDate), inst);
            // Generate months
            var monthRows = '';
            for (var row = 0; row < monthsToShow[0]; row++) {
                var months = '';
                for (var col = 0; col < monthsToShow[1]; col++) {
                    months += this._generateMonth(elem, inst, drawDate.getFullYear(),
                        drawDate.getMonth() + 1, inst.options.renderer, (row === 0 && col === 0));
                    plugin.add(drawDate, 1, 'm');
                }
                monthRows += this._prepare(inst.options.renderer.monthRow, inst).replace(/\{months\}/, months);
            }
            var picker = this._prepare(inst.options.renderer.picker, inst).replace(/\{months\}/, monthRows).
            replace(/\{weekHeader\}/g, this._generateDayHeaders(inst, inst.options.renderer));
            // Add commands
            var addCommand = function(type, open, close, name, classes) {
                if (picker.indexOf('{' + type + ':' + name + '}') === -1) {
                    return;
                }
                var command = inst.options.commands[name];
                var date = (inst.options.commandsAsDateFormat ? command.date.apply(elem, [inst]) : null);
                picker = picker.replace(new RegExp('\\{' + type + ':' + name + '\\}', 'g'),
                    '<' + open + (command.status ? ' title="' + inst.options[command.status] + '"' : '') +
                    ' class="' + inst.options.renderer.commandClass + ' ' +
                    inst.options.renderer.commandClass + '-' + name + ' ' + classes +
                    (command.enabled(inst) ? '' : ' ' + inst.options.renderer.disabledClass) + '">' +
                    (date ? plugin.formatDate(inst.options[command.text], date, inst.getConfig()) :
                        inst.options[command.text]) + '</' + close + '>');
            };
            for (var key in inst.options.commands) {
                if (inst.options.commands.hasOwnProperty(key)) {
                    addCommand('button', 'button type="button"', 'button', key,
                        inst.options.renderer.commandButtonClass);
                    addCommand('link', 'a href="javascript:void(0)"', 'a', key,
                        inst.options.renderer.commandLinkClass);
                }
            }
            picker = $(picker);
            if (monthsToShow[1] > 1) {
                var count = 0;
                $(inst.options.renderer.monthSelector, picker).each(function() {
                    var nth = ++count % monthsToShow[1];
                    $(this).addClass(nth === 1 ? 'first' : (nth === 0 ? 'last' : ''));
                });
            }
            // Add datepicker behaviour
            var self = this;
            function removeHighlight() {
                /* jshint -W040 */
                (inst.inline ? $(this).closest('.' + self._getMarker()) : inst.div).
                find(inst.options.renderer.daySelector + ' a').
                removeClass(inst.options.renderer.highlightedClass);
                /* jshint +W040 */
            }
            picker.find(inst.options.renderer.daySelector + ' a').hover(
                function() {
                    removeHighlight.apply(this);
                    $(this).addClass(inst.options.renderer.highlightedClass);
                },
                removeHighlight).
            click(function() {
                self.selectDate(elem, this);
            }).end().
            find('select.' + this._monthYearClass + ':not(.' + this._anyYearClass + ')').
            change(function() {
                var monthYear = $(this).val().split('/');
                self.showMonth(elem, parseInt(monthYear[1], 10), parseInt(monthYear[0], 10));
            }).end().
            find('select.' + this._anyYearClass).click(function() {
                $(this).css('visibility', 'hidden').
                next('input').css({left: this.offsetLeft, top: this.offsetTop,
                    width: this.offsetWidth, height: this.offsetHeight}).show().focus();
            }).end().
            find('input.' + self._monthYearClass).change(function() {
                try {
                    var year = parseInt($(this).val(), 10);
                    year = (isNaN(year) ? inst.drawDate.getFullYear() : year);
                    self.showMonth(elem, year, inst.drawDate.getMonth() + 1, inst.drawDate.getDate());
                }
                catch (e) {
                    window.alert(e);
                }
            }).keydown(function(event) {
                if (event.keyCode === 13) { // Enter
                    $(event.elem).change();
                }
                else if (event.keyCode === 27) { // Escape
                    $(event.elem).hide().prev('select').css('visibility', 'visible');
                    inst.elem.focus();
                }
            });
            // Add keyboard handling
            var data = {elem: inst.elem[0]};
            picker.keydown(data, this._keyDown).keypress(data, this._keyPress).keyup(data, this._keyUp);
            // Add command behaviour
            picker.find('.' + inst.options.renderer.commandClass).click(function() {
                if (!$(this).hasClass(inst.options.renderer.disabledClass)) {
                    var action = this.className.replace(
                        new RegExp('^.*' + inst.options.renderer.commandClass + '-([^ ]+).*$'), '$1');
                    plugin.performAction(elem, action);
                }
            });
            // Add classes
            if (inst.options.isRTL) {
                picker.addClass(inst.options.renderer.rtlClass);
            }
            if (monthsToShow[0] * monthsToShow[1] > 1) {
                picker.addClass(inst.options.renderer.multiClass);
            }
            if (inst.options.pickerClass) {
                picker.addClass(inst.options.pickerClass);
            }
            // Resize
            $('body').append(picker);
            var width = 0;
            picker.find(inst.options.renderer.monthSelector).each(function() {
                width += $(this).outerWidth();
            });
            picker.width(width / monthsToShow[0]);
            // Pre-show customisation
            if ($.isFunction(inst.options.onShow)) {
                inst.options.onShow.apply(elem, [picker, inst]);
            }
            return picker;
        },

        /** Generate the content for a single month.
         @private
         @param {Element} elem The control to affect.
         @param {object} inst The current instance settings.
         @param {number} year The year to generate.
         @param {number} month The month to generate.
         @param {object} renderer The rendering templates.
         @param {boolean} first <code>true</code> if first of multiple months.
         @return {string} The month content. */
        _generateMonth: function(elem, inst, year, month, renderer, first) {
            var daysInMonth = plugin.daysInMonth(year, month);
            var monthsToShow = inst.options.monthsToShow;
            monthsToShow = ($.isArray(monthsToShow) ? monthsToShow : [1, monthsToShow]);
            var fixedWeeks = inst.options.fixedWeeks || (monthsToShow[0] * monthsToShow[1] > 1);
            var firstDay = inst.options.firstDay;
            var leadDays = (plugin.newDate(year, month, 1).getDay() - firstDay + 7) % 7;
            var numWeeks = (fixedWeeks ? 6 : Math.ceil((leadDays + daysInMonth) / 7));
            var selectOtherMonths = inst.options.selectOtherMonths && inst.options.showOtherMonths;
            var minDate = (inst.pickingRange ? inst.selectedDates[0] : inst.get('minDate'));
            var maxDate = inst.get('maxDate');
            var showWeeks = renderer.week.indexOf('{weekOfYear}') > -1;
            var today = plugin.today();
            var drawDate = plugin.newDate(year, month, 1);
            plugin.add(drawDate, -leadDays - (fixedWeeks && (drawDate.getDay() === firstDay) ? 7 : 0), 'd');
            var ts = drawDate.getTime();
            // Generate weeks
            var weeks = '';
            for (var week = 0; week < numWeeks; week++) {
                var weekOfYear = (!showWeeks ? '' : '<span class="dp' + ts + '">' +
                    ($.isFunction(inst.options.calculateWeek) ? inst.options.calculateWeek(drawDate) : 0) + '</span>');
                var days = '';
                for (var day = 0; day < 7; day++) {
                    var selected = false;
                    if (inst.options.rangeSelect && inst.selectedDates.length > 0) {
                        selected = (drawDate.getTime() >= inst.selectedDates[0] &&
                            drawDate.getTime() <= inst.selectedDates[1]);
                    }
                    else {
                        for (var i = 0; i < inst.selectedDates.length; i++) {
                            if (inst.selectedDates[i].getTime() === drawDate.getTime()) {
                                selected = true;
                                break;
                            }
                        }
                    }
                    var dateInfo = (!$.isFunction(inst.options.onDate) ? {} :
                        inst.options.onDate.apply(elem, [drawDate, drawDate.getMonth() + 1 === month]));
                    var selectable = (selectOtherMonths || drawDate.getMonth() + 1 === month) &&
                        this._isSelectable(elem, drawDate, dateInfo.selectable, minDate, maxDate);
                    days += this._prepare(renderer.day, inst).replace(/\{day\}/g,
                        (selectable ? '<a href="javascript:void(0)"' : '<span') +
                        ' class="dp' + ts + ' ' + (dateInfo.dateClass || '') +
                        (selected && (selectOtherMonths || drawDate.getMonth() + 1 === month) ?
                            ' ' + renderer.selectedClass : '') +
                        (selectable ? ' ' + renderer.defaultClass : '') +
                        ((drawDate.getDay() || 7) < 6 ? '' : ' ' + renderer.weekendClass) +
                        (drawDate.getMonth() + 1 === month ? '' : ' ' + renderer.otherMonthClass) +
                        (drawDate.getTime() === today.getTime() && (drawDate.getMonth() + 1) === month ?
                            ' ' + renderer.todayClass : '') +
                        (drawDate.getTime() === inst.drawDate.getTime() && (drawDate.getMonth() + 1) === month ?
                            ' ' + renderer.highlightedClass : '') + '"' +
                        (dateInfo.title || (inst.options.dayStatus && selectable) ? ' title="' +
                            (dateInfo.title || plugin.formatDate(
                                inst.options.dayStatus, drawDate, inst.getConfig())) + '"' : '') + '>' +
                        (inst.options.showOtherMonths || (drawDate.getMonth() + 1) === month ?
                            dateInfo.content || drawDate.getDate() : '&#160;') +
                        (selectable ? '</a>' : '</span>'));
                    plugin.add(drawDate, 1, 'd');
                    ts = drawDate.getTime();
                }
                weeks += this._prepare(renderer.week, inst).replace(/\{days\}/g, days).
                replace(/\{weekOfYear\}/g, weekOfYear);
            }
            var monthHeader = this._prepare(renderer.month, inst).match(/\{monthHeader(:[^\}]+)?\}/);
            monthHeader = (monthHeader[0].length <= 13 ? 'MM yyyy' :
                monthHeader[0].substring(13, monthHeader[0].length - 1));
            monthHeader = (first ? this._generateMonthSelection(
                inst, year, month, minDate, maxDate, monthHeader, renderer) :
                plugin.formatDate(monthHeader, plugin.newDate(year, month, 1), inst.getConfig()));
            var weekHeader = this._prepare(renderer.weekHeader, inst).
            replace(/\{days\}/g, this._generateDayHeaders(inst, renderer));
            return this._prepare(renderer.month, inst).replace(/\{monthHeader(:[^\}]+)?\}/g, monthHeader).
            replace(/\{weekHeader\}/g, weekHeader).replace(/\{weeks\}/g, weeks);
        },

        /** Generate the HTML for the day headers.
         @private
         @param {object} inst The current instance settings.
         @param {object} renderer The rendering templates.
         @return {string} A week's worth of day headers. */
        _generateDayHeaders: function(inst, renderer) {
            var header = '';
            for (var day = 0; day < 7; day++) {
                var dow = (day + inst.options.firstDay) % 7;
                header += this._prepare(renderer.dayHeader, inst).replace(/\{day\}/g,
                    '<span class="' + this._curDoWClass + dow + '" title="' +
                    inst.options.dayNames[dow] + '">' + inst.options.dayNamesMin[dow] + '</span>');
            }
            return header;
        },

        /** Generate selection controls for month.
         @private
         @param {object} inst The current instance settings.
         @param {number} year The year to generate.
         @param {number} month The month to generate.
         @param {Date} minDate The minimum date allowed.
         @param {Date} maxDate The maximum date allowed.
         @param {string} monthHeader The month/year format.
         @return {string} The month selection content. */
        _generateMonthSelection: function(inst, year, month, minDate, maxDate, monthHeader) {
            if (!inst.options.changeMonth) {
                return plugin.formatDate(
                    monthHeader, plugin.newDate(year, month, 1), inst.getConfig());
            }
            // Months
            var monthNames = inst.options['monthNames' + (monthHeader.match(/mm/i) ? '' : 'Short')];
            var html = monthHeader.replace(/m+/i, '\\x2E').replace(/y+/i, '\\x2F');
            var selector = '<select class="' + this._monthYearClass +
                '" title="' + inst.options.monthStatus + '">';
            for (var m = 1; m <= 12; m++) {
                if ((!minDate || plugin.newDate(year, m, plugin.daysInMonth(year, m)).
                    getTime() >= minDate.getTime()) &&
                    (!maxDate || plugin.newDate(year, m, 1).getTime() <= maxDate.getTime())) {
                    selector += '<option value="' + m + '/' + year + '"' +
                        (month === m ? ' selected="selected"' : '') + '>' +
                        monthNames[m - 1] + '</option>';
                }
            }
            selector += '</select>';
            html = html.replace(/\\x2E/, selector);
            // Years
            var yearRange = inst.options.yearRange;
            if (yearRange === 'any') {
                selector = '<select class="' + this._monthYearClass + ' ' + this._anyYearClass +
                    '" title="' + inst.options.yearStatus + '">' +
                    '<option>' + year + '</option></select>' +
                    '<input class="' + this._monthYearClass + ' ' + this._curMonthClass +
                    month + '" value="' + year + '">';
            }
            else {
                yearRange = yearRange.split(':');
                var todayYear = plugin.today().getFullYear();
                var start = (yearRange[0].match('c[+-].*') ? year + parseInt(yearRange[0].substring(1), 10) :
                    ((yearRange[0].match('[+-].*') ? todayYear : 0) + parseInt(yearRange[0], 10)));
                var end = (yearRange[1].match('c[+-].*') ? year + parseInt(yearRange[1].substring(1), 10) :
                    ((yearRange[1].match('[+-].*') ? todayYear : 0) + parseInt(yearRange[1], 10)));
                selector = '<select class="' + this._monthYearClass +
                    '" title="' + inst.options.yearStatus + '">';
                start = plugin.add(plugin.newDate(start + 1, 1, 1), -1, 'd');
                end = plugin.newDate(end, 1, 1);
                var addYear = function(y, yDisplay) {
                    if (y !== 0) {
                        selector += '<option value="' + month + '/' + y + '"' +
                            (year === y ? ' selected="selected"' : '') + '>' + (yDisplay || y) + '</option>';
                    }
                };
                var earlierLater = null;
                var y = null;
                if (start.getTime() < end.getTime()) {
                    start = (minDate && minDate.getTime() > start.getTime() ? minDate : start).getFullYear();
                    end = (maxDate && maxDate.getTime() < end.getTime() ? maxDate : end).getFullYear();
                    earlierLater = Math.floor((end - start) / 2);
                    if (!minDate || minDate.getFullYear() < start) {
                        addYear(start - earlierLater, inst.options.earlierText);
                    }
                    for (y = start; y <= end; y++) {
                        addYear(y);
                    }
                    if (!maxDate || maxDate.getFullYear() > end) {
                        addYear(end + earlierLater, inst.options.laterText);
                    }
                }
                else {
                    start = (maxDate && maxDate.getTime() < start.getTime() ? maxDate : start).getFullYear();
                    end = (minDate && minDate.getTime() > end.getTime() ? minDate : end).getFullYear();
                    earlierLater = Math.floor((start - end) / 2);
                    if (!maxDate || maxDate.getFullYear() > start) {
                        addYear(start + earlierLater, inst.options.earlierText);
                    }
                    for (y = start; y >= end; y--) {
                        addYear(y);
                    }
                    if (!minDate || minDate.getFullYear() < end) {
                        addYear(end - earlierLater, inst.options.laterText);
                    }
                }
                selector += '</select>';
            }
            html = html.replace(/\\x2F/, selector);
            return html;
        },

        /** Prepare a render template for use.
         Exclude popup/inline sections that are not applicable.
         Localise text of the form: {l10n:name}.
         @private
         @param {string} text The text to localise.
         @param {object} inst The current instance settings.
         @return {string} The localised text. */
        _prepare: function(text, inst) {
            var replaceSection = function(type, retain) {
                while (true) {
                    var start = text.indexOf('{' + type + ':start}');
                    if (start === -1) {
                        return;
                    }
                    var end = text.substring(start).indexOf('{' + type + ':end}');
                    if (end > -1) {
                        text = text.substring(0, start) +
                            (retain ? text.substr(start + type.length + 8, end - type.length - 8) : '') +
                            text.substring(start + end + type.length + 6);
                    }
                }
            };
            replaceSection('inline', inst.inline);
            replaceSection('popup', !inst.inline);
            var pattern = /\{l10n:([^\}]+)\}/;
            var matches = null;
            while ((matches = pattern.exec(text))) {
                text = text.replace(matches[0], inst.options[matches[1]]);
            }
            return text;
        }
    });

    var plugin = $.datepick; // Singleton instance

    $(function() {
        $(document).on('mousedown.' + pluginName, plugin._checkExternalClick).
        on('resize.' + pluginName, function() { plugin.hide(plugin.curInst); });
    });

})(jQuery);

},{}],8:[function(require,module,exports){
/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
	var initializing = false;

	// The base JQClass implementation (does nothing)
	window.JQClass = function(){};

	// Collection of derived classes
	JQClass.classes = {};
 
	// Create a new JQClass that inherits from this class
	JQClass.extend = function extender(prop) {
		var base = this.prototype;

		// Instantiate a base class (but only create the instance,
		// don't run the init constructor)
		initializing = true;
		var prototype = new this();
		initializing = false;

		// Copy the properties over onto the new prototype
		for (var name in prop) {
			// Check if we're overwriting an existing function
			prototype[name] = typeof prop[name] == 'function' &&
				typeof base[name] == 'function' ?
				(function(name, fn){
					return function() {
						var __super = this._super;

						// Add a new ._super() method that is the same method
						// but on the super-class
						this._super = function(args) {
							return base[name].apply(this, args || []);
						};

						var ret = fn.apply(this, arguments);				

						// The method only need to be bound temporarily, so we
						// remove it when we're done executing
						this._super = __super;

						return ret;
					};
				})(name, prop[name]) :
				prop[name];
		}

		// The dummy class constructor
		function JQClass() {
			// All construction is actually done in the init method
			if (!initializing && this._init) {
				this._init.apply(this, arguments);
			}
		}

		// Populate our constructed prototype object
		JQClass.prototype = prototype;

		// Enforce the constructor to be what we expect
		JQClass.prototype.constructor = JQClass;

		// And make this class extendable
		JQClass.extend = extender;

		return JQClass;
	};
})();

(function($) { // Ensure $, encapsulate

	/** Abstract base class for collection plugins v1.0.1.
		Written by Keith Wood (kbwood{at}iinet.com.au) December 2013.
		Licensed under the MIT (https://github.com/jquery/jquery/blob/master/MIT-LICENSE.txt) license.
		@module $.JQPlugin
		@abstract */
	JQClass.classes.JQPlugin = JQClass.extend({

		/** Name to identify this plugin.
			@example name: 'tabs' */
		name: 'plugin',

		/** Default options for instances of this plugin (default: {}).
			@example defaultOptions: {
 	selectedClass: 'selected',
 	triggers: 'click'
 } */
		defaultOptions: {},
		
		/** Options dependent on the locale.
			Indexed by language and (optional) country code, with '' denoting the default language (English/US).
			@example regionalOptions: {
	'': {
		greeting: 'Hi'
	}
 } */
		regionalOptions: {},
		
		/** Names of getter methods - those that can't be chained (default: []).
			@example _getters: ['activeTab'] */
		_getters: [],

		/** Retrieve a marker class for affected elements.
			@private
			@return {string} The marker class. */
		_getMarker: function() {
			return 'is-' + this.name;
		},
		
		/** Initialise the plugin.
			Create the jQuery bridge - plugin name <code>xyz</code>
			produces <code>$.xyz</code> and <code>$.fn.xyz</code>. */
		_init: function() {
			// Apply default localisations
			$.extend(this.defaultOptions, (this.regionalOptions && this.regionalOptions['']) || {});
			// Camel-case the name
			var jqName = camelCase(this.name);
			// Expose jQuery singleton manager
			$[jqName] = this;
			// Expose jQuery collection plugin
			$.fn[jqName] = function(options) {
				var otherArgs = Array.prototype.slice.call(arguments, 1);
				if ($[jqName]._isNotChained(options, otherArgs)) {
					return $[jqName][options].apply($[jqName], [this[0]].concat(otherArgs));
				}
				return this.each(function() {
					if (typeof options === 'string') {
						if (options[0] === '_' || !$[jqName][options]) {
							throw 'Unknown method: ' + options;
						}
						$[jqName][options].apply($[jqName], [this].concat(otherArgs));
					}
					else {
						$[jqName]._attach(this, options);
					}
				});
			};
		},

		/** Set default values for all subsequent instances.
			@param options {object} The new default options.
			@example $.plugin.setDefauls({name: value}) */
		setDefaults: function(options) {
			$.extend(this.defaultOptions, options || {});
		},
		
		/** Determine whether a method is a getter and doesn't permit chaining.
			@private
			@param name {string} The method name.
			@param otherArgs {any[]} Any other arguments for the method.
			@return {boolean} True if this method is a getter, false otherwise. */
		_isNotChained: function(name, otherArgs) {
			if (name === 'option' && (otherArgs.length === 0 ||
					(otherArgs.length === 1 && typeof otherArgs[0] === 'string'))) {
				return true;
			}
			return $.inArray(name, this._getters) > -1;
		},
		
		/** Initialise an element. Called internally only.
			Adds an instance object as data named for the plugin.
			@param elem {Element} The element to enhance.
			@param options {object} Overriding settings. */
		_attach: function(elem, options) {
			elem = $(elem);
			if (elem.hasClass(this._getMarker())) {
				return;
			}
			elem.addClass(this._getMarker());
			options = $.extend({}, this.defaultOptions, this._getMetadata(elem), options || {});
			var inst = $.extend({name: this.name, elem: elem, options: options},
				this._instSettings(elem, options));
			elem.data(this.name, inst); // Save instance against element
			this._postAttach(elem, inst);
			this.option(elem, options);
		},

		/** Retrieve additional instance settings.
			Override this in a sub-class to provide extra settings.
			@param elem {jQuery} The current jQuery element.
			@param options {object} The instance options.
			@return {object} Any extra instance values.
			@example _instSettings: function(elem, options) {
 	return {nav: elem.find(options.navSelector)};
 } */
		_instSettings: function(elem, options) {
			return {};
		},

		/** Plugin specific post initialisation.
			Override this in a sub-class to perform extra activities.
			@param elem {jQuery} The current jQuery element.
			@param inst {object} The instance settings.
			@example _postAttach: function(elem, inst) {
 	elem.on('click.' + this.name, function() {
 		...
 	});
 } */
		_postAttach: function(elem, inst) {
		},

		/** Retrieve metadata configuration from the element.
			Metadata is specified as an attribute:
			<code>data-&lt;plugin name>="&lt;setting name>: '&lt;value>', ..."</code>.
			Dates should be specified as strings in this format: 'new Date(y, m-1, d)'.
			@private
			@param elem {jQuery} The source element.
			@return {object} The inline configuration or {}. */
		_getMetadata: function(elem) {
			try {
				var data = elem.data(this.name.toLowerCase()) || '';
				data = data.replace(/'/g, '"');
				data = data.replace(/([a-zA-Z0-9]+):/g, function(match, group, i) { 
					var count = data.substring(0, i).match(/"/g); // Handle embedded ':'
					return (!count || count.length % 2 === 0 ? '"' + group + '":' : group + ':');
				});
				data = $.parseJSON('{' + data + '}');
				for (var name in data) { // Convert dates
					var value = data[name];
					if (typeof value === 'string' && value.match(/^new Date\((.*)\)$/)) {
						data[name] = eval(value);
					}
				}
				return data;
			}
			catch (e) {
				return {};
			}
		},

		/** Retrieve the instance data for element.
			@param elem {Element} The source element.
			@return {object} The instance data or {}. */
		_getInst: function(elem) {
			return $(elem).data(this.name) || {};
		},
		
		/** Retrieve or reconfigure the settings for a plugin.
			@param elem {Element} The source element.
			@param name {object|string} The collection of new option values or the name of a single option.
			@param [value] {any} The value for a single named option.
			@return {any|object} If retrieving a single value or all options.
			@example $(selector).plugin('option', 'name', value)
 $(selector).plugin('option', {name: value, ...})
 var value = $(selector).plugin('option', 'name')
 var options = $(selector).plugin('option') */
		option: function(elem, name, value) {
			elem = $(elem);
			var inst = elem.data(this.name);
			if  (!name || (typeof name === 'string' && value == null)) {
				var options = (inst || {}).options;
				return (options && name ? options[name] : options);
			}
			if (!elem.hasClass(this._getMarker())) {
				return;
			}
			var options = name || {};
			if (typeof name === 'string') {
				options = {};
				options[name] = value;
			}
			this._optionsChanged(elem, inst, options);
			$.extend(inst.options, options);
		},
		
		/** Plugin specific options processing.
			Old value available in <code>inst.options[name]</code>, new value in <code>options[name]</code>.
			Override this in a sub-class to perform extra activities.
			@param elem {jQuery} The current jQuery element.
			@param inst {object} The instance settings.
			@param options {object} The new options.
			@example _optionsChanged: function(elem, inst, options) {
 	if (options.name != inst.options.name) {
 		elem.removeClass(inst.options.name).addClass(options.name);
 	}
 } */
		_optionsChanged: function(elem, inst, options) {
		},
		
		/** Remove all trace of the plugin.
			Override <code>_preDestroy</code> for plugin-specific processing.
			@param elem {Element} The source element.
			@example $(selector).plugin('destroy') */
		destroy: function(elem) {
			elem = $(elem);
			if (!elem.hasClass(this._getMarker())) {
				return;
			}
			this._preDestroy(elem, this._getInst(elem));
			elem.removeData(this.name).removeClass(this._getMarker());
		},

		/** Plugin specific pre destruction.
			Override this in a sub-class to perform extra activities and undo everything that was
			done in the <code>_postAttach</code> or <code>_optionsChanged</code> functions.
			@param elem {jQuery} The current jQuery element.
			@param inst {object} The instance settings.
			@example _preDestroy: function(elem, inst) {
 	elem.off('.' + this.name);
 } */
		_preDestroy: function(elem, inst) {
		}
	});
	
	/** Convert names from hyphenated to camel-case.
		@private
		@param value {string} The original hyphenated name.
		@return {string} The camel-case version. */
	function camelCase(name) {
		return name.replace(/-([a-z])/g, function(match, group) {
			return group.toUpperCase();
		});
	}
	
	/** Expose the plugin base.
		@namespace "$.JQPlugin" */
	$.JQPlugin = {
	
		/** Create a new collection plugin.
			@memberof "$.JQPlugin"
			@param [superClass='JQPlugin'] {string} The name of the parent class to inherit from.
			@param overrides {object} The property/function overrides for the new class.
			@example $.JQPlugin.createPlugin({
 	name: 'tabs',
 	defaultOptions: {selectedClass: 'selected'},
 	_initSettings: function(elem, options) { return {...}; },
 	_postAttach: function(elem, inst) { ... }
 }); */
		createPlugin: function(superClass, overrides) {
			if (typeof superClass === 'object') {
				overrides = superClass;
				superClass = 'JQPlugin';
			}
			superClass = camelCase(superClass);
			var className = camelCase(overrides.name);
			JQClass.classes[className] = JQClass.classes[superClass].extend(overrides);
			new JQClass.classes[className]();
		}
	};

})(jQuery);
},{}],9:[function(require,module,exports){
//var hasCssFeature = require('./detect-css-feature');

module.exports = function (options) {

    var opened = false;
    var moved = false;

    var defaults = {
        animateClass : 'animate-start',
        showClass : 'show',
        activeClass : 'active'
    };


    /*$(document).on('click.filter-icon','[data-drop-target]',function (e) {
        //console.log(e);
        var $this = $(this);
        var data = $this.data();
        var hasTarget = data.dropTarget != 'undefined';
        if(hasTarget) functions.show($(data.dropTarget),$this);
    });*/


    var functions = {
        show : function(target,pointerTarget){
            if(!opened){
                target.addClass(defaults.animateClass);
                setTimeout(function(){
                    target.addClass(defaults.showClass);
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





},{}],10:[function(require,module,exports){
/*
 * jQuery FlexSlider v2.6.3
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */
(function ($) {

    var focused = true;

    //FlexSlider: Object Instance
    $.flexslider = function(el, options) {
        var slider = $(el);

        // making variables public
        slider.vars = $.extend({}, $.flexslider.defaults, options);

        var namespace = slider.vars.namespace,
            msGesture = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
            touch = (( "ontouchstart" in window ) || msGesture || window.DocumentTouch && document instanceof DocumentTouch) && slider.vars.touch,
        // depricating this idea, as devices are being released with both of these events
            eventType = "click touchend MSPointerUp keyup",
            watchedEvent = "",
            watchedEventClearTimer,
            vertical = slider.vars.direction === "vertical",
            reverse = slider.vars.reverse,
            carousel = (slider.vars.itemWidth > 0),
            fade = slider.vars.animation === "fade",
            asNav = slider.vars.asNavFor !== "",
            methods = {};

        // Store a reference to the slider object
        $.data(el, "flexslider", slider);

        // Private slider methods
        methods = {
            init: function() {
                slider.animating = false;
                // Get current slide and make sure it is a number
                slider.currentSlide = parseInt( ( slider.vars.startAt ? slider.vars.startAt : 0), 10 );
                if ( isNaN( slider.currentSlide ) ) { slider.currentSlide = 0; }
                slider.animatingTo = slider.currentSlide;
                slider.atEnd = (slider.currentSlide === 0 || slider.currentSlide === slider.last);
                slider.containerSelector = slider.vars.selector.substr(0,slider.vars.selector.search(' '));
                slider.slides = $(slider.vars.selector, slider);
                slider.container = $(slider.containerSelector, slider);
                slider.count = slider.slides.length;
                // SYNC:
                slider.syncExists = $(slider.vars.sync).length > 0;
                // SLIDE:
                if (slider.vars.animation === "slide") { slider.vars.animation = "swing"; }
                slider.prop = (vertical) ? "top" : "marginLeft";
                slider.args = {};
                // SLIDESHOW:
                slider.manualPause = false;
                slider.stopped = false;
                //PAUSE WHEN INVISIBLE
                slider.started = false;
                slider.startTimeout = null;
                // TOUCH/USECSS:
                slider.transitions = !slider.vars.video && !fade && slider.vars.useCSS && (function() {
                        var obj = document.createElement('div'),
                            props = ['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
                        for (var i in props) {
                            if ( obj.style[ props[i] ] !== undefined ) {
                                slider.pfx = props[i].replace('Perspective','').toLowerCase();
                                slider.prop = "-" + slider.pfx + "-transform";
                                return true;
                            }
                        }
                        return false;
                    }());
                slider.ensureAnimationEnd = '';
                // CONTROLSCONTAINER:
                if (slider.vars.controlsContainer !== "") slider.controlsContainer = $(slider.vars.controlsContainer).length > 0 && $(slider.vars.controlsContainer);
                // MANUAL:
                if (slider.vars.manualControls !== "") slider.manualControls = $(slider.vars.manualControls).length > 0 && $(slider.vars.manualControls);

                // CUSTOM DIRECTION NAV:
                if (slider.vars.customDirectionNav !== "") slider.customDirectionNav = $(slider.vars.customDirectionNav).length === 2 && $(slider.vars.customDirectionNav);

                // RANDOMIZE:
                if (slider.vars.randomize) {
                    slider.slides.sort(function() { return (Math.round(Math.random())-0.5); });
                    slider.container.empty().append(slider.slides);
                }

                slider.doMath();

                // INIT
                slider.setup("init");

                // CONTROLNAV:
                if (slider.vars.controlNav) { methods.controlNav.setup(); }

                // DIRECTIONNAV:
                if (slider.vars.directionNav) { methods.directionNav.setup(); }

                // KEYBOARD:
                if (slider.vars.keyboard && ($(slider.containerSelector).length === 1 || slider.vars.multipleKeyboard)) {
                    $(document).bind('keyup', function(event) {
                        var keycode = event.keyCode;
                        if (!slider.animating && (keycode === 39 || keycode === 37)) {
                            var target = (keycode === 39) ? slider.getTarget('next') :
                                (keycode === 37) ? slider.getTarget('prev') : false;
                            slider.flexAnimate(target, slider.vars.pauseOnAction);
                        }
                    });
                }
                // MOUSEWHEEL:
                if (slider.vars.mousewheel) {
                    slider.bind('mousewheel', function(event, delta, deltaX, deltaY) {
                        event.preventDefault();
                        var target = (delta < 0) ? slider.getTarget('next') : slider.getTarget('prev');
                        slider.flexAnimate(target, slider.vars.pauseOnAction);
                    });
                }

                // PAUSEPLAY
                if (slider.vars.pausePlay) { methods.pausePlay.setup(); }

                //PAUSE WHEN INVISIBLE
                if (slider.vars.slideshow && slider.vars.pauseInvisible) { methods.pauseInvisible.init(); }

                // SLIDSESHOW
                if (slider.vars.slideshow) {
                    if (slider.vars.pauseOnHover) {
                        slider.hover(function() {
                            if (!slider.manualPlay && !slider.manualPause) { slider.pause(); }
                        }, function() {
                            if (!slider.manualPause && !slider.manualPlay && !slider.stopped) { slider.play(); }
                        });
                    }
                    // initialize animation
                    //If we're visible, or we don't use PageVisibility API
                    if(!slider.vars.pauseInvisible || !methods.pauseInvisible.isHidden()) {
                        (slider.vars.initDelay > 0) ? slider.startTimeout = setTimeout(slider.play, slider.vars.initDelay) : slider.play();
                    }
                }

                // ASNAV:
                if (asNav) { methods.asNav.setup(); }

                // TOUCH
                if (touch && slider.vars.touch) { methods.touch(); }

                // FADE&&SMOOTHHEIGHT || SLIDE:
                if (!fade || (fade && slider.vars.smoothHeight)) { $(window).bind("resize orientationchange focus", methods.resize); }

                slider.find("img").attr("draggable", "false");

                // API: start() Callback
                setTimeout(function(){
                    slider.vars.start(slider);
                }, 200);
            },
            asNav: {
                setup: function() {
                    slider.asNav = true;
                    slider.animatingTo = Math.floor(slider.currentSlide/slider.move);
                    slider.currentItem = slider.currentSlide;
                    slider.slides.removeClass(namespace + "active-slide").eq(slider.currentItem).addClass(namespace + "active-slide");
                    if(!msGesture){
                        slider.slides.on(eventType, function(e){
                            e.preventDefault();
                            var $slide = $(this),
                                target = $slide.index();
                            var posFromLeft = $slide.offset().left - $(slider).scrollLeft(); // Find position of slide relative to left of slider container
                            if( posFromLeft <= 0 && $slide.hasClass( namespace + 'active-slide' ) ) {
                                slider.flexAnimate(slider.getTarget("prev"), true);
                            } else if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass(namespace + "active-slide")) {
                                slider.direction = (slider.currentItem < target) ? "next" : "prev";
                                slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
                            }
                        });
                    }else{
                        el._slider = slider;
                        slider.slides.each(function (){
                            var that = this;
                            that._gesture = new MSGesture();
                            that._gesture.target = that;
                            that.addEventListener("MSPointerDown", function (e){
                                e.preventDefault();
                                if(e.currentTarget._gesture) {
                                    e.currentTarget._gesture.addPointer(e.pointerId);
                                }
                            }, false);
                            that.addEventListener("MSGestureTap", function (e){
                                e.preventDefault();
                                var $slide = $(this),
                                    target = $slide.index();
                                if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass('active')) {
                                    slider.direction = (slider.currentItem < target) ? "next" : "prev";
                                    slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
                                }
                            });
                        });
                    }
                }
            },
            controlNav: {
                setup: function() {
                    if (!slider.manualControls) {
                        methods.controlNav.setupPaging();
                    } else { // MANUALCONTROLS:
                        methods.controlNav.setupManual();
                    }
                },
                setupPaging: function() {
                    var type = (slider.vars.controlNav === "thumbnails") ? 'control-thumbs' : 'control-paging',
                        j = 1,
                        item,
                        slide;

                    slider.controlNavScaffold = $('<ol class="'+ namespace + 'control-nav ' + namespace + type + '"></ol>');

                    if (slider.pagingCount > 1) {
                        for (var i = 0; i < slider.pagingCount; i++) {
                            slide = slider.slides.eq(i);
                            if ( undefined === slide.attr( 'data-thumb-alt' ) ) { slide.attr( 'data-thumb-alt', '' ); }
                            var altText = ( '' !== slide.attr( 'data-thumb-alt' ) ) ? altText = ' alt="' + slide.attr( 'data-thumb-alt' ) + '"' : '';
                            item = (slider.vars.controlNav === "thumbnails") ? '<img src="' + slide.attr( 'data-thumb' ) + '"' + altText + '/>' : '<a href="#">' + j + '</a>';
                            if ( 'thumbnails' === slider.vars.controlNav && true === slider.vars.thumbCaptions ) {
                                var captn = slide.attr( 'data-thumbcaption' );
                                if ( '' !== captn && undefined !== captn ) { item += '<span class="' + namespace + 'caption">' + captn + '</span>'; }
                            }
                            slider.controlNavScaffold.append('<li>' + item + '</li>');
                            j++;
                        }
                    }

                    // CONTROLSCONTAINER:
                    (slider.controlsContainer) ? $(slider.controlsContainer).append(slider.controlNavScaffold) : slider.append(slider.controlNavScaffold);
                    methods.controlNav.set();

                    methods.controlNav.active();

                    slider.controlNavScaffold.delegate('a, img', eventType, function(event) {
                        event.preventDefault();

                        if (watchedEvent === "" || watchedEvent === event.type) {
                            var $this = $(this),
                                target = slider.controlNav.index($this);

                            if (!$this.hasClass(namespace + 'active')) {
                                slider.direction = (target > slider.currentSlide) ? "next" : "prev";
                                slider.flexAnimate(target, slider.vars.pauseOnAction);
                            }
                        }

                        // setup flags to prevent event duplication
                        if (watchedEvent === "") {
                            watchedEvent = event.type;
                        }
                        methods.setToClearWatchedEvent();

                    });
                },
                setupManual: function() {
                    slider.controlNav = slider.manualControls;
                    methods.controlNav.active();

                    slider.controlNav.bind(eventType, function(event) {
                        event.preventDefault();

                        if (watchedEvent === "" || watchedEvent === event.type) {
                            var $this = $(this),
                                target = slider.controlNav.index($this);

                            if (!$this.hasClass(namespace + 'active')) {
                                (target > slider.currentSlide) ? slider.direction = "next" : slider.direction = "prev";
                                slider.flexAnimate(target, slider.vars.pauseOnAction);
                            }
                        }

                        // setup flags to prevent event duplication
                        if (watchedEvent === "") {
                            watchedEvent = event.type;
                        }
                        methods.setToClearWatchedEvent();
                    });
                },
                set: function() {
                    var selector = (slider.vars.controlNav === "thumbnails") ? 'img' : 'a';
                    slider.controlNav = $('.' + namespace + 'control-nav li ' + selector, (slider.controlsContainer) ? slider.controlsContainer : slider);
                },
                active: function() {
                    slider.controlNav.removeClass(namespace + "active").eq(slider.animatingTo).addClass(namespace + "active");
                },
                update: function(action, pos) {
                    if (slider.pagingCount > 1 && action === "add") {
                        slider.controlNavScaffold.append($('<li><a href="#">' + slider.count + '</a></li>'));
                    } else if (slider.pagingCount === 1) {
                        slider.controlNavScaffold.find('li').remove();
                    } else {
                        slider.controlNav.eq(pos).closest('li').remove();
                    }
                    methods.controlNav.set();
                    (slider.pagingCount > 1 && slider.pagingCount !== slider.controlNav.length) ? slider.update(pos, action) : methods.controlNav.active();
                }
            },
            directionNav: {
                setup: function() {
                    var directionNavScaffold = $('<ul class="' + namespace + 'direction-nav"><li class="' + namespace + 'nav-prev"><a class="' + namespace + 'prev" href="#">' + slider.vars.prevText + '</a></li><li class="' + namespace + 'nav-next"><a class="' + namespace + 'next" href="#">' + slider.vars.nextText + '</a></li></ul>');

                    // CUSTOM DIRECTION NAV:
                    if (slider.customDirectionNav) {
                        slider.directionNav = slider.customDirectionNav;
                        // CONTROLSCONTAINER:
                    } else if (slider.controlsContainer) {
                        $(slider.controlsContainer).append(directionNavScaffold);
                        slider.directionNav = $('.' + namespace + 'direction-nav li a', slider.controlsContainer);
                    } else {
                        slider.append(directionNavScaffold);
                        slider.directionNav = $('.' + namespace + 'direction-nav li a', slider);
                    }

                    methods.directionNav.update();

                    slider.directionNav.bind(eventType, function(event) {
                        event.preventDefault();
                        var target;

                        if (watchedEvent === "" || watchedEvent === event.type) {
                            target = ($(this).hasClass(namespace + 'next')) ? slider.getTarget('next') : slider.getTarget('prev');
                            slider.flexAnimate(target, slider.vars.pauseOnAction);
                        }

                        // setup flags to prevent event duplication
                        if (watchedEvent === "") {
                            watchedEvent = event.type;
                        }
                        methods.setToClearWatchedEvent();
                    });
                },
                update: function() {
                    var disabledClass = namespace + 'disabled';
                    if (slider.pagingCount === 1) {
                        slider.directionNav.addClass(disabledClass).attr('tabindex', '-1');
                    } else if (!slider.vars.animationLoop) {
                        if (slider.animatingTo === 0) {
                            slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "prev").addClass(disabledClass).attr('tabindex', '-1');
                        } else if (slider.animatingTo === slider.last) {
                            slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "next").addClass(disabledClass).attr('tabindex', '-1');
                        } else {
                            slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
                        }
                    } else {
                        slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
                    }
                }
            },
            pausePlay: {
                setup: function() {
                    var pausePlayScaffold = $('<div class="' + namespace + 'pauseplay"><a href="#"></a></div>');

                    // CONTROLSCONTAINER:
                    if (slider.controlsContainer) {
                        slider.controlsContainer.append(pausePlayScaffold);
                        slider.pausePlay = $('.' + namespace + 'pauseplay a', slider.controlsContainer);
                    } else {
                        slider.append(pausePlayScaffold);
                        slider.pausePlay = $('.' + namespace + 'pauseplay a', slider);
                    }

                    methods.pausePlay.update((slider.vars.slideshow) ? namespace + 'pause' : namespace + 'play');

                    slider.pausePlay.bind(eventType, function(event) {
                        event.preventDefault();

                        if (watchedEvent === "" || watchedEvent === event.type) {
                            if ($(this).hasClass(namespace + 'pause')) {
                                slider.manualPause = true;
                                slider.manualPlay = false;
                                slider.pause();
                            } else {
                                slider.manualPause = false;
                                slider.manualPlay = true;
                                slider.play();
                            }
                        }

                        // setup flags to prevent event duplication
                        if (watchedEvent === "") {
                            watchedEvent = event.type;
                        }
                        methods.setToClearWatchedEvent();
                    });
                },
                update: function(state) {
                    (state === "play") ? slider.pausePlay.removeClass(namespace + 'pause').addClass(namespace + 'play').html(slider.vars.playText) : slider.pausePlay.removeClass(namespace + 'play').addClass(namespace + 'pause').html(slider.vars.pauseText);
                }
            },
            touch: function() {
                var startX,
                    startY,
                    offset,
                    cwidth,
                    dx,
                    startT,
                    onTouchStart,
                    onTouchMove,
                    onTouchEnd,
                    scrolling = false,
                    localX = 0,
                    localY = 0,
                    accDx = 0;

                if(!msGesture){
                    onTouchStart = function(e) {
                        if (slider.animating) {
                            e.preventDefault();
                        } else if ( ( window.navigator.msPointerEnabled ) || e.touches.length === 1 ) {
                            slider.pause();
                            // CAROUSEL:
                            cwidth = (vertical) ? slider.h : slider. w;
                            startT = Number(new Date());
                            // CAROUSEL:

                            // Local vars for X and Y points.
                            localX = e.touches[0].pageX;
                            localY = e.touches[0].pageY;

                            offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
                                (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                                    (carousel && slider.currentSlide === slider.last) ? slider.limit :
                                        (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide :
                                            (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
                            startX = (vertical) ? localY : localX;
                            startY = (vertical) ? localX : localY;

                            el.addEventListener('touchmove', onTouchMove, false);
                            el.addEventListener('touchend', onTouchEnd, false);
                        }
                    };

                    onTouchMove = function(e) {
                        // Local vars for X and Y points.

                        localX = e.touches[0].pageX;
                        localY = e.touches[0].pageY;

                        dx = (vertical) ? startX - localY : startX - localX;
                        scrolling = (vertical) ? (Math.abs(dx) < Math.abs(localX - startY)) : (Math.abs(dx) < Math.abs(localY - startY));

                        var fxms = 500;

                        if ( ! scrolling || Number( new Date() ) - startT > fxms ) {
                            e.preventDefault();
                            if (!fade && slider.transitions) {
                                if (!slider.vars.animationLoop) {
                                    dx = dx/((slider.currentSlide === 0 && dx < 0 || slider.currentSlide === slider.last && dx > 0) ? (Math.abs(dx)/cwidth+2) : 1);
                                }
                                slider.setProps(offset + dx, "setTouch");
                            }
                        }
                    };

                    onTouchEnd = function(e) {
                        // finish the touch by undoing the touch session
                        el.removeEventListener('touchmove', onTouchMove, false);

                        if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
                            var updateDx = (reverse) ? -dx : dx,
                                target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

                            if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth/2)) {
                                slider.flexAnimate(target, slider.vars.pauseOnAction);
                            } else {
                                if (!fade) { slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true); }
                            }
                        }
                        el.removeEventListener('touchend', onTouchEnd, false);

                        startX = null;
                        startY = null;
                        dx = null;
                        offset = null;
                    };

                    el.addEventListener('touchstart', onTouchStart, false);
                }else{
                    el.style.msTouchAction = "none";
                    el._gesture = new MSGesture();
                    el._gesture.target = el;
                    el.addEventListener("MSPointerDown", onMSPointerDown, false);
                    el._slider = slider;
                    el.addEventListener("MSGestureChange", onMSGestureChange, false);
                    el.addEventListener("MSGestureEnd", onMSGestureEnd, false);

                    function onMSPointerDown(e){
                        e.stopPropagation();
                        if (slider.animating) {
                            e.preventDefault();
                        }else{
                            slider.pause();
                            el._gesture.addPointer(e.pointerId);
                            accDx = 0;
                            cwidth = (vertical) ? slider.h : slider. w;
                            startT = Number(new Date());
                            // CAROUSEL:

                            offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
                                (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                                    (carousel && slider.currentSlide === slider.last) ? slider.limit :
                                        (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide :
                                            (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
                        }
                    }

                    function onMSGestureChange(e) {
                        e.stopPropagation();
                        var slider = e.target._slider;
                        if(!slider){
                            return;
                        }
                        var transX = -e.translationX,
                            transY = -e.translationY;

                        //Accumulate translations.
                        accDx = accDx + ((vertical) ? transY : transX);
                        dx = accDx;
                        scrolling = (vertical) ? (Math.abs(accDx) < Math.abs(-transX)) : (Math.abs(accDx) < Math.abs(-transY));

                        if(e.detail === e.MSGESTURE_FLAG_INERTIA){
                            setImmediate(function (){
                                el._gesture.stop();
                            });

                            return;
                        }

                        if (!scrolling || Number(new Date()) - startT > 500) {
                            e.preventDefault();
                            if (!fade && slider.transitions) {
                                if (!slider.vars.animationLoop) {
                                    dx = accDx / ((slider.currentSlide === 0 && accDx < 0 || slider.currentSlide === slider.last && accDx > 0) ? (Math.abs(accDx) / cwidth + 2) : 1);
                                }
                                slider.setProps(offset + dx, "setTouch");
                            }
                        }
                    }

                    function onMSGestureEnd(e) {
                        e.stopPropagation();
                        var slider = e.target._slider;
                        if(!slider){
                            return;
                        }
                        if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
                            var updateDx = (reverse) ? -dx : dx,
                                target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

                            if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth/2)) {
                                slider.flexAnimate(target, slider.vars.pauseOnAction);
                            } else {
                                if (!fade) { slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true); }
                            }
                        }

                        startX = null;
                        startY = null;
                        dx = null;
                        offset = null;
                        accDx = 0;
                    }
                }
            },
            resize: function() {
                if (!slider.animating && slider.is(':visible')) {
                    if (!carousel) { slider.doMath(); }

                    if (fade) {
                        // SMOOTH HEIGHT:
                        methods.smoothHeight();
                    } else if (carousel) { //CAROUSEL:
                        slider.slides.width(slider.computedW);
                        slider.update(slider.pagingCount);
                        slider.setProps();
                    }
                    else if (vertical) { //VERTICAL:
                        slider.viewport.height(slider.h);
                        slider.setProps(slider.h, "setTotal");
                    } else {
                        // SMOOTH HEIGHT:
                        if (slider.vars.smoothHeight) { methods.smoothHeight(); }
                        slider.newSlides.width(slider.computedW);
                        slider.setProps(slider.computedW, "setTotal");
                    }
                }
            },
            smoothHeight: function(dur) {
                if (!vertical || fade) {
                    var $obj = (fade) ? slider : slider.viewport;
                    (dur) ? $obj.animate({"height": slider.slides.eq(slider.animatingTo).innerHeight()}, dur) : $obj.innerHeight(slider.slides.eq(slider.animatingTo).innerHeight());
                }
            },
            sync: function(action) {
                var $obj = $(slider.vars.sync).data("flexslider"),
                    target = slider.animatingTo;

                switch (action) {
                    case "animate": $obj.flexAnimate(target, slider.vars.pauseOnAction, false, true); break;
                    case "play": if (!$obj.playing && !$obj.asNav) { $obj.play(); } break;
                    case "pause": $obj.pause(); break;
                }
            },
            uniqueID: function($clone) {
                // Append _clone to current level and children elements with id attributes
                $clone.filter( '[id]' ).add($clone.find( '[id]' )).each(function() {
                    var $this = $(this);
                    $this.attr( 'id', $this.attr( 'id' ) + '_clone' );
                });
                return $clone;
            },
            pauseInvisible: {
                visProp: null,
                init: function() {
                    var visProp = methods.pauseInvisible.getHiddenProp();
                    if (visProp) {
                        var evtname = visProp.replace(/[H|h]idden/,'') + 'visibilitychange';
                        document.addEventListener(evtname, function() {
                            if (methods.pauseInvisible.isHidden()) {
                                if(slider.startTimeout) {
                                    clearTimeout(slider.startTimeout); //If clock is ticking, stop timer and prevent from starting while invisible
                                } else {
                                    slider.pause(); //Or just pause
                                }
                            }
                            else {
                                if(slider.started) {
                                    slider.play(); //Initiated before, just play
                                } else {
                                    if (slider.vars.initDelay > 0) {
                                        setTimeout(slider.play, slider.vars.initDelay);
                                    } else {
                                        slider.play(); //Didn't init before: simply init or wait for it
                                    }
                                }
                            }
                        });
                    }
                },
                isHidden: function() {
                    var prop = methods.pauseInvisible.getHiddenProp();
                    if (!prop) {
                        return false;
                    }
                    return document[prop];
                },
                getHiddenProp: function() {
                    var prefixes = ['webkit','moz','ms','o'];
                    // if 'hidden' is natively supported just return it
                    if ('hidden' in document) {
                        return 'hidden';
                    }
                    // otherwise loop over all the known prefixes until we find one
                    for ( var i = 0; i < prefixes.length; i++ ) {
                        if ((prefixes[i] + 'Hidden') in document) {
                            return prefixes[i] + 'Hidden';
                        }
                    }
                    // otherwise it's not supported
                    return null;
                }
            },
            setToClearWatchedEvent: function() {
                clearTimeout(watchedEventClearTimer);
                watchedEventClearTimer = setTimeout(function() {
                    watchedEvent = "";
                }, 3000);
            }
        };

        // public methods
        slider.flexAnimate = function(target, pause, override, withSync, fromNav) {
            if (!slider.vars.animationLoop && target !== slider.currentSlide) {
                slider.direction = (target > slider.currentSlide) ? "next" : "prev";
            }

            if (asNav && slider.pagingCount === 1) slider.direction = (slider.currentItem < target) ? "next" : "prev";

            if (!slider.animating && (slider.canAdvance(target, fromNav) || override) && slider.is(":visible")) {
                if (asNav && withSync) {
                    var master = $(slider.vars.asNavFor).data('flexslider');
                    slider.atEnd = target === 0 || target === slider.count - 1;
                    master.flexAnimate(target, true, false, true, fromNav);
                    slider.direction = (slider.currentItem < target) ? "next" : "prev";
                    master.direction = slider.direction;

                    if (Math.ceil((target + 1) / slider.visible) - 1 !== slider.currentSlide && target !== 0) {
                        slider.currentItem = target;
                        slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
                        target = Math.floor(target / slider.visible);
                    } else {
                        slider.currentItem = target;
                        slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
                        return false;
                    }
                }

                slider.animating = true;
                slider.animatingTo = target;

                // SLIDESHOW:
                if (pause) {
                    slider.pause();
                }

                // API: before() animation Callback
                slider.vars.before(slider);

                // SYNC:
                if (slider.syncExists && !fromNav) {
                    methods.sync("animate");
                }

                // CONTROLNAV
                if (slider.vars.controlNav) {
                    methods.controlNav.active();
                }

                // !CAROUSEL:
                // CANDIDATE: slide active class (for add/remove slide)
                if (!carousel) {
                    slider.slides.removeClass(namespace + 'active-slide').eq(target).addClass(namespace + 'active-slide');
                }

                // INFINITE LOOP:
                // CANDIDATE: atEnd
                slider.atEnd = target === 0 || target === slider.last;

                // DIRECTIONNAV:
                if (slider.vars.directionNav) {
                    methods.directionNav.update();
                }

                try {
                    if (slider[0].className === 'flexslider') {
                        var item = slider[0].children[0].children[0].children[target];
                        customd.fillSlider(item, target);
                    }
                } catch (err) {
                    // hatanin onemi yok. akisi engellemesin.
                }

                if (target === slider.last) {
                    // API: end() of cycle Callback
                    slider.vars.end(slider);
                    // SLIDESHOW && !INFINITE LOOP:
                    if (!slider.vars.animationLoop) { slider.pause(); }
                }

                // SLIDE:
                if (!fade) {
                    var dimension = (vertical) ? slider.slides.filter(':first').height() : slider.computedW,
                        margin, slideString, calcNext;

                    // INFINITE LOOP / REVERSE:
                    if (carousel) {
                        margin = slider.vars.itemMargin;
                        calcNext = ((slider.itemW + margin) * slider.move) * slider.animatingTo;
                        slideString = (calcNext > slider.limit && slider.visible !== 1) ? slider.limit : calcNext;
                    } else if (slider.currentSlide === 0 && target === slider.count - 1 && slider.vars.animationLoop && slider.direction !== "next") {
                        slideString = (reverse) ? (slider.count + slider.cloneOffset) * dimension : 0;
                    } else if (slider.currentSlide === slider.last && target === 0 && slider.vars.animationLoop && slider.direction !== "prev") {
                        margin = (vertical) ? slider.vars.itemMargin : 0;
                        slideString = (reverse) ? 0 : (slider.count + 1) * dimension;
                    } else {
                        margin = (vertical) ? slider.vars.itemMargin : 0;
                        slideString = (reverse) ? ((slider.count - 1) - target + slider.cloneOffset) * (dimension + margin) : (target + slider.cloneOffset) * (dimension + margin);
                    }
                    slider.setProps(slideString, "", slider.vars.animationSpeed);
                    if (slider.transitions) {
                        if (!slider.vars.animationLoop || !slider.atEnd) {
                            slider.animating = false;
                            slider.currentSlide = slider.animatingTo;
                        }

                        // Unbind previous transitionEnd events and re-bind new transitionEnd event
                        slider.container.unbind("webkitTransitionEnd transitionend");
                        slider.container.bind("webkitTransitionEnd transitionend", function() {
                            clearTimeout(slider.ensureAnimationEnd);
                            slider.wrapup(dimension);
                        });

                        // Insurance for the ever-so-fickle transitionEnd event
                        clearTimeout(slider.ensureAnimationEnd);
                        slider.ensureAnimationEnd = setTimeout(function() {
                            slider.wrapup(dimension);
                        }, slider.vars.animationSpeed + 100);

                    } else {
                        slider.container.animate(slider.args, slider.vars.animationSpeed, slider.vars.easing, function(){
                            slider.wrapup(dimension);
                        });
                    }
                } else { // FADE:
                    if (!touch) {
                        slider.slides.eq(slider.currentSlide).css({"zIndex": 1}).animate({"opacity": 0}, slider.vars.animationSpeed, slider.vars.easing);
                        slider.slides.eq(target).css({"zIndex": 2}).animate({"opacity": 1}, slider.vars.animationSpeed, slider.vars.easing, slider.wrapup);
                    } else {
                        slider.slides.eq(slider.currentSlide).css({ "opacity": 0, "zIndex": 1 });
                        slider.slides.eq(target).css({ "opacity": 1, "zIndex": 2 });
                        slider.wrapup(dimension);
                    }
                }
                // SMOOTH HEIGHT:
                if (slider.vars.smoothHeight) { methods.smoothHeight(slider.vars.animationSpeed); }
            }
        };
        slider.wrapup = function(dimension) {
            // SLIDE:
            if (!fade && !carousel) {
                if (slider.currentSlide === 0 && slider.animatingTo === slider.last && slider.vars.animationLoop) {
                    slider.setProps(dimension, "jumpEnd");
                } else if (slider.currentSlide === slider.last && slider.animatingTo === 0 && slider.vars.animationLoop) {
                    slider.setProps(dimension, "jumpStart");
                }
            }
            slider.animating = false;
            slider.currentSlide = slider.animatingTo;
            // API: after() animation Callback
            slider.vars.after(slider);
        };

        // SLIDESHOW:
        slider.animateSlides = function() {
            if (!slider.animating && focused ) { slider.flexAnimate(slider.getTarget("next")); }
        };
        // SLIDESHOW:
        slider.pause = function() {
            clearInterval(slider.animatedSlides);
            slider.animatedSlides = null;
            slider.playing = false;
            // PAUSEPLAY:
            if (slider.vars.pausePlay) { methods.pausePlay.update("play"); }
            // SYNC:
            if (slider.syncExists) { methods.sync("pause"); }
        };
        // SLIDESHOW:
        slider.play = function() {
            if (slider.playing) { clearInterval(slider.animatedSlides); }
            slider.animatedSlides = slider.animatedSlides || setInterval(slider.animateSlides, slider.vars.slideshowSpeed);
            slider.started = slider.playing = true;
            // PAUSEPLAY:
            if (slider.vars.pausePlay) { methods.pausePlay.update("pause"); }
            // SYNC:
            if (slider.syncExists) { methods.sync("play"); }
        };
        // STOP:
        slider.stop = function () {
            slider.pause();
            slider.stopped = true;
        };
        slider.canAdvance = function(target, fromNav) {
            // ASNAV:
            var last = (asNav) ? slider.pagingCount - 1 : slider.last;
            return (fromNav) ? true :
                (asNav && slider.currentItem === slider.count - 1 && target === 0 && slider.direction === "prev") ? true :
                    (asNav && slider.currentItem === 0 && target === slider.pagingCount - 1 && slider.direction !== "next") ? false :
                        (target === slider.currentSlide && !asNav) ? false :
                            (slider.vars.animationLoop) ? true :
                                (slider.atEnd && slider.currentSlide === 0 && target === last && slider.direction !== "next") ? false :
                                    (slider.atEnd && slider.currentSlide === last && target === 0 && slider.direction === "next") ? false :
                                        true;
        };
        slider.getTarget = function(dir) {
            slider.direction = dir;
            if (dir === "next") {
                return (slider.currentSlide === slider.last) ? 0 : slider.currentSlide + 1;
            } else {
                return (slider.currentSlide === 0) ? slider.last : slider.currentSlide - 1;
            }
        };

        // SLIDE:
        slider.setProps = function(pos, special, dur) {
            var target = (function() {
                var posCheck = (pos) ? pos : ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo,
                    posCalc = (function() {
                        if (carousel) {
                            return (special === "setTouch") ? pos :
                                (reverse && slider.animatingTo === slider.last) ? 0 :
                                    (reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                                        (slider.animatingTo === slider.last) ? slider.limit : posCheck;
                        } else {
                            switch (special) {
                                case "setTotal": return (reverse) ? ((slider.count - 1) - slider.currentSlide + slider.cloneOffset) * pos : (slider.currentSlide + slider.cloneOffset) * pos;
                                case "setTouch": return (reverse) ? pos : pos;
                                case "jumpEnd": return (reverse) ? pos : slider.count * pos;
                                case "jumpStart": return (reverse) ? slider.count * pos : pos;
                                default: return pos;
                            }
                        }
                    }());

                return (posCalc * -1) + "px";
            }());

            if (slider.transitions) {
                target = (vertical) ? "translate3d(0," + target + ",0)" : "translate3d(" + target + ",0,0)";
                dur = (dur !== undefined) ? (dur/1000) + "s" : "0s";
                slider.container.css("-" + slider.pfx + "-transition-duration", dur);
                slider.container.css("transition-duration", dur);
            }

            slider.args[slider.prop] = target;
            if (slider.transitions || dur === undefined) { slider.container.css(slider.args); }

            slider.container.css('transform',target);
        };

        slider.setup = function(type) {
            // SLIDE:
            if (!fade) {
                var sliderOffset, arr;

                if (type === "init") {
                    slider.viewport = $('<div class="' + namespace + 'viewport"></div>').css({"overflow": "hidden", "position": "relative"}).appendTo(slider).append(slider.container);
                    // INFINITE LOOP:
                    slider.cloneCount = 0;
                    slider.cloneOffset = 0;
                    // REVERSE:
                    if (reverse) {
                        arr = $.makeArray(slider.slides).reverse();
                        slider.slides = $(arr);
                        slider.container.empty().append(slider.slides);
                    }
                }
                // INFINITE LOOP && !CAROUSEL:
                if (slider.vars.animationLoop && !carousel) {
                    slider.cloneCount = 2;
                    slider.cloneOffset = 1;
                    // clear out old clones
                    if (type !== "init") { slider.container.find('.clone').remove(); }
                    slider.container.append(methods.uniqueID(slider.slides.first().clone().addClass('clone')).attr('aria-hidden', 'true'))
                        .prepend(methods.uniqueID(slider.slides.last().clone().addClass('clone')).attr('aria-hidden', 'true'));
                }
                slider.newSlides = $(slider.vars.selector, slider);

                sliderOffset = (reverse) ? slider.count - 1 - slider.currentSlide + slider.cloneOffset : slider.currentSlide + slider.cloneOffset;
                // VERTICAL:
                if (vertical && !carousel) {
                    slider.container.height((slider.count + slider.cloneCount) * 200 + "%").css("position", "absolute").width("100%");
                    setTimeout(function(){
                        slider.newSlides.css({"display": "block"});
                        slider.doMath();
                        var sHeight = slider.h + slider.vars.itemMargin;
                        slider.viewport.height((sHeight * slider.vars.minItems) - slider.vars.itemMargin);
                        slider.setProps(sliderOffset * sHeight, "init");
                    }, (type === "init") ? 100 : 0);
                } else {
                    slider.container.width((slider.count + slider.cloneCount) * 200 + "%");
                    slider.setProps(sliderOffset * slider.computedW, "init");
                    setTimeout(function(){
                        slider.doMath();
                        slider.newSlides.css({"width": slider.computedW, "marginRight" : slider.computedM, "float": "left", "display": "block"});
                        // SMOOTH HEIGHT:
                        if (slider.vars.smoothHeight) { methods.smoothHeight(); }
                    }, (type === "init") ? 100 : 0);
                }
            } else { // FADE:
                slider.slides.css({"width": "100%", "float": "left", "marginRight": "-100%", "position": "relative"});
                if (type === "init") {
                    if (!touch) {
                        //slider.slides.eq(slider.currentSlide).fadeIn(slider.vars.animationSpeed, slider.vars.easing);
                        if (slider.vars.fadeFirstSlide == false) {
                            slider.slides.css({ "opacity": 0, "display": "block", "zIndex": 1 }).eq(slider.currentSlide).css({"zIndex": 2}).css({"opacity": 1});
                        } else {
                            slider.slides.css({ "opacity": 0, "display": "block", "zIndex": 1 }).eq(slider.currentSlide).css({"zIndex": 2}).animate({"opacity": 1},slider.vars.animationSpeed,slider.vars.easing);
                        }
                    } else {
                        slider.slides.css({ "opacity": 0, "display": "block", "webkitTransition": "opacity " + slider.vars.animationSpeed / 1000 + "s ease", "zIndex": 1 }).eq(slider.currentSlide).css({ "opacity": 1, "zIndex": 2});
                    }
                }
                // SMOOTH HEIGHT:
                if (slider.vars.smoothHeight) { methods.smoothHeight(); }
            }
            // !CAROUSEL:
            // CANDIDATE: active slide
            if (!carousel) { slider.slides.removeClass(namespace + "active-slide").eq(slider.currentSlide).addClass(namespace + "active-slide"); }

            //FlexSlider: init() Callback
            slider.vars.init(slider);
        };

        slider.doMath = function() {
            var slide = slider.slides.first(),
                slideMargin = slider.vars.itemMargin,
                minItems = slider.vars.minItems,
                maxItems = slider.vars.maxItems;

            slider.w = (slider.viewport===undefined) ? slider.width() : slider.viewport.width();
            slider.h = slide.height();
            slider.boxPadding = slide.outerWidth() - slide.width();

            // CAROUSEL:
            if (carousel) {
                slider.itemT = slider.vars.itemWidth + slideMargin;
                slider.itemM = slideMargin;
                slider.minW = (minItems) ? minItems * slider.itemT : slider.w;
                slider.maxW = (maxItems) ? (maxItems * slider.itemT) - slideMargin : slider.w;
                slider.itemW = (slider.minW > slider.w) ? (slider.w - (slideMargin * (minItems - 1)))/minItems :
                    (slider.maxW < slider.w) ? (slider.w - (slideMargin * (maxItems - 1)))/maxItems :
                        (slider.vars.itemWidth > slider.w) ? slider.w : slider.vars.itemWidth;

                slider.visible = Math.floor(slider.w/(slider.itemW));
                slider.move = (slider.vars.move > 0 && slider.vars.move < slider.visible ) ? slider.vars.move : slider.visible;
                slider.pagingCount = Math.ceil(((slider.count - slider.visible)/slider.move) + 1);
                slider.last =  slider.pagingCount - 1;
                slider.limit = (slider.pagingCount === 1) ? 0 :
                    (slider.vars.itemWidth > slider.w) ? (slider.itemW * (slider.count - 1)) + (slideMargin * (slider.count - 1)) : ((slider.itemW + slideMargin) * slider.count) - slider.w - slideMargin;
            } else {
                slider.itemW = slider.w;
                slider.itemM = slideMargin;
                slider.pagingCount = slider.count;
                slider.last = slider.count - 1;
            }
            slider.computedW = slider.itemW - slider.boxPadding;
            slider.computedM = slider.itemM;
        };

        slider.update = function(pos, action) {
            slider.doMath();

            // update currentSlide and slider.animatingTo if necessary
            if (!carousel) {
                if (pos < slider.currentSlide) {
                    slider.currentSlide += 1;
                } else if (pos <= slider.currentSlide && pos !== 0) {
                    slider.currentSlide -= 1;
                }
                slider.animatingTo = slider.currentSlide;
            }

            // update controlNav
            if (slider.vars.controlNav && !slider.manualControls) {
                if ((action === "add" && !carousel) || slider.pagingCount > slider.controlNav.length) {
                    methods.controlNav.update("add");
                } else if ((action === "remove" && !carousel) || slider.pagingCount < slider.controlNav.length) {
                    if (carousel && slider.currentSlide > slider.last) {
                        slider.currentSlide -= 1;
                        slider.animatingTo -= 1;
                    }
                    methods.controlNav.update("remove", slider.last);
                }
            }
            // update directionNav
            if (slider.vars.directionNav) { methods.directionNav.update(); }

        };

        slider.addSlide = function(obj, pos) {
            var $obj = $(obj);

            slider.count += 1;
            slider.last = slider.count - 1;

            // append new slide
            if (vertical && reverse) {
                (pos !== undefined) ? slider.slides.eq(slider.count - pos).after($obj) : slider.container.prepend($obj);
            } else {
                (pos !== undefined) ? slider.slides.eq(pos).before($obj) : slider.container.append($obj);
            }

            // update currentSlide, animatingTo, controlNav, and directionNav
            slider.update(pos, "add");

            // update slider.slides
            slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
            // re-setup the slider to accomdate new slide
            slider.setup();

            //FlexSlider: added() Callback
            slider.vars.added(slider);
        };
        slider.removeSlide = function(obj) {
            var pos = (isNaN(obj)) ? slider.slides.index($(obj)) : obj;

            // update count
            slider.count -= 1;
            slider.last = slider.count - 1;

            // remove slide
            if (isNaN(obj)) {
                $(obj, slider.slides).remove();
            } else {
                (vertical && reverse) ? slider.slides.eq(slider.last).remove() : slider.slides.eq(obj).remove();
            }

            // update currentSlide, animatingTo, controlNav, and directionNav
            slider.doMath();
            slider.update(pos, "remove");

            // update slider.slides
            slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
            // re-setup the slider to accomdate new slide
            slider.setup();

            // FlexSlider: removed() Callback
            slider.vars.removed(slider);
        };

        //FlexSlider: Initialize
        methods.init();
    };

    // Ensure the slider isn't focussed if the window loses focus.
    $( window ).blur( function ( e ) {
        focused = false;
    }).focus( function ( e ) {
        focused = true;
    });

    //FlexSlider: Default Settings
    $.flexslider.defaults = {
        namespace: "flex-",             //{NEW} String: Prefix string attached to the class of every element generated by the plugin
        selector: ".slides > li",       //{NEW} Selector: Must match a simple pattern. '{container} > {slide}' -- Ignore pattern at your own peril
        animation: "fade",              //String: Select your animation type, "fade" or "slide"
        easing: "swing",                //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
        direction: "horizontal",        //String: Select the sliding direction, "horizontal" or "vertical"
        reverse: false,                 //{NEW} Boolean: Reverse the animation direction
        animationLoop: true,            //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
        smoothHeight: false,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
        startAt: 0,                     //Integer: The slide that the slider should start on. Array notation (0 = first slide)
        slideshow: true,                //Boolean: Animate slider automatically
        slideshowSpeed: 7000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
        animationSpeed: 600,            //Integer: Set the speed of animations, in milliseconds
        initDelay: 0,                   //{NEW} Integer: Set an initialization delay, in milliseconds
        randomize: false,               //Boolean: Randomize slide order
        fadeFirstSlide: true,           //Boolean: Fade in the first slide when animation type is "fade"
        thumbCaptions: false,           //Boolean: Whether or not to put captions on thumbnails when using the "thumbnails" controlNav.

        // Usability features
        pauseOnAction: true,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
        pauseOnHover: true,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
        pauseInvisible: true,   		//{NEW} Boolean: Pause the slideshow when tab is invisible, resume when visible. Provides better UX, lower CPU usage.
        useCSS: true,                   //{NEW} Boolean: Slider will use CSS3 transitions if available
        touch: true,                    //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
        video: false,                   //{NEW} Boolean: If using video in the slider, will prevent CSS3 3D Transforms to avoid graphical glitches

        // Primary Controls
        controlNav: true,               //Boolean: Create navigation for paging control of each slide? Note: Leave true for manualControls usage
        directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
        prevText: "Geri",           //String: Set the text for the "previous" directionNav item
        nextText: "İleri",               //String: Set the text for the "next" directionNav item

        // Secondary Navigation
        keyboard: true,                 //Boolean: Allow slider navigating via keyboard left/right keys
        multipleKeyboard: false,        //{NEW} Boolean: Allow keyboard navigation to affect multiple sliders. Default behavior cuts out keyboard navigation with more than one slider present.
        mousewheel: false,              //{UPDATED} Boolean: Requires jquery.mousewheel.js (https://github.com/brandonaaron/jquery-mousewheel) - Allows slider navigating via mousewheel
        pausePlay: false,               //Boolean: Create pause/play dynamic element
        pauseText: "Pause",             //String: Set the text for the "pause" pausePlay item
        playText: "Play",               //String: Set the text for the "play" pausePlay item

        // Special properties
        controlsContainer: "",          //{UPDATED} jQuery Object/Selector: Declare which container the navigation elements should be appended too. Default container is the FlexSlider element. Example use would be $(".flexslider-container"). Property is ignored if given element is not found.
        manualControls: "",             //{UPDATED} jQuery Object/Selector: Declare custom control navigation. Examples would be $(".flex-control-nav li") or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
        customDirectionNav: "",         //{NEW} jQuery Object/Selector: Custom prev / next button. Must be two jQuery elements. In order to make the events work they have to have the classes "prev" and "next" (plus namespace)
        sync: "",                       //{NEW} Selector: Mirror the actions performed on this slider with another slider. Use with care.
        asNavFor: "",                   //{NEW} Selector: Internal property exposed for turning the slider into a thumbnail navigation for another slider

        // Carousel Options
        itemWidth: 0,                   //{NEW} Integer: Box-model width of individual carousel items, including horizontal borders and padding.
        itemMargin: 0,                  //{NEW} Integer: Margin between carousel items.
        minItems: 2,                    //{NEW} Integer: Minimum number of carousel items that should be visible. Items will resize fluidly when below this.
        maxItems: 2,                    //{NEW} Integer: Maxmimum number of carousel items that should be visible. Items will resize fluidly when above this limit.
        move: 0,                        //{NEW} Integer: Number of carousel items that should move on animation. If 0, slider will move all visible items.
        allowOneSlide: true,           //{NEW} Boolean: Whether or not to allow a slider comprised of a single slide

        // Callback API
        start: function(){},            //Callback: function(slider) - Fires when the slider loads the first slide
        before: function(){},           //Callback: function(slider) - Fires asynchronously with each slider animation
        after: function(){},            //Callback: function(slider) - Fires after each slider animation completes
        end: function(){},              //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
        added: function(){},            //{NEW} Callback: function(slider) - Fires after a slide is added
        removed: function(){},           //{NEW} Callback: function(slider) - Fires after a slide is removed
        init: function() {}             //{NEW} Callback: function(slider) - Fires after the slider is initially setup
    };

    //FlexSlider: Plugin Function
    $.fn.flexslider = function(options) {
        if (options === undefined) { options = {}; }

        if (typeof options === "object") {
            return this.each(function() {
                var $this = $(this),
                    selector = (options.selector) ? options.selector : ".slides > li",
                    $slides = $this.find(selector);

                if ( ( $slides.length === 1 && options.allowOneSlide === false ) || $slides.length === 0 ) {
                    $slides.fadeIn(400);
                    if (options.start) { options.start($this); }
                } else if ($this.data('flexslider') === undefined) {
                    new $.flexslider(this, options);
                }
            });
        } else {
            // Helper strings to quickly perform functions on the slider
            var $slider = $(this).data('flexslider');
            switch (options) {
                case "play": $slider.play(); break;
                case "pause": $slider.pause(); break;
                case "stop": $slider.stop(); break;
                case "next": $slider.flexAnimate($slider.getTarget("next"), true); break;
                case "prev":
                case "previous": $slider.flexAnimate($slider.getTarget("prev"), true); break;
                default: if (typeof options === "number") { $slider.flexAnimate(options, true); }
            }
        }
    };
})(jQuery);

},{}],11:[function(require,module,exports){
/**
 * Created by mehmet.ham on 10/25/2016.
 */
require('./flexslider');
/*! modernizr 3.5.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-touchevents-setclasses !*/
!function(e,n,t){function o(e,n){return typeof e===n}function s(){var e,n,t,s,a,i,r;for(var l in c)if(c.hasOwnProperty(l)){if(e=[],n=c[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(s=o(n.fn,"function")?n.fn():n.fn,a=0;a<e.length;a++)i=e[a],r=i.split("."),1===r.length?Modernizr[r[0]]=s:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=s),f.push((s?"":"no-")+r.join("-"))}}function a(e){var n=u.className,t=Modernizr._config.classPrefix||"";if(p&&(n=n.baseVal),Modernizr._config.enableJSClass){var o=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(o,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),p?u.className.baseVal=n:u.className=n)}function i(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):p?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function r(){var e=n.body;return e||(e=i(p?"svg":"body"),e.fake=!0),e}function l(e,t,o,s){var a,l,f,c,d="modernizr",p=i("div"),h=r();if(parseInt(o,10))for(;o--;)f=i("div"),f.id=s?s[o]:d+(o+1),p.appendChild(f);return a=i("style"),a.type="text/css",a.id="s"+d,(h.fake?h:p).appendChild(a),h.appendChild(p),a.styleSheet?a.styleSheet.cssText=e:a.appendChild(n.createTextNode(e)),p.id=d,h.fake&&(h.style.background="",h.style.overflow="hidden",c=u.style.overflow,u.style.overflow="hidden",u.appendChild(h)),l=t(p,e),h.fake?(h.parentNode.removeChild(h),u.style.overflow=c,u.offsetHeight):p.parentNode.removeChild(p),!!l}var f=[],c=[],d={_version:"3.5.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){c.push({name:e,fn:n,options:t})},addAsyncTest:function(e){c.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=d,Modernizr=new Modernizr;var u=n.documentElement,p="svg"===u.nodeName.toLowerCase(),h=d._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];d._prefixes=h;var m=d.testStyles=l;Modernizr.addTest("touchevents",function(){var t;if("ontouchstart"in e||e.DocumentTouch&&n instanceof DocumentTouch)t=!0;else{var o=["@media (",h.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");m(o,function(e){t=9===e.offsetTop})}return t}),s(),a(f),delete d.addTest,delete d.addAsyncTest;for(var v=0;v<Modernizr._q.length;v++)Modernizr._q[v]();e.Modernizr=Modernizr}(window,document);


$('.section-flexslider').flexslider({
    animation: "fade",
    selector: ".slides > .content-type",
    slideshowSpeed: 4000,
    controlNav: true,
    drag:true,
    keyboard: true,
    touch: true,
    itemMargin: 0,
    directionNav: true,
    minItems: 1,
});

$('.multiple-filexslider').flexslider({
    animation: "swing",
    prevText: "<i class='font-back'></i>",
    nextText: "<i class='font-next'></i>",
    slideshowSpeed: 4000,
    controlNav: false,
    touch: true,
    itemMargin: false,
    itemWidth:306,
    directionNav: true,
    minItems: 3,
    maxItems: 20,
    startAt: 1
});
$('.other-filexslider').flexslider({
    animation: "swing",
    prevText: "<i class='font-back'></i>",
    nextText: "<i class='font-next'></i>",
    slideshowSpeed: 4000,
    controlNav: false,
    touch: true,
    itemMargin: 9,
    itemWidth:306,
    directionNav: true,
    maxItems: 3,
    startAt: 1
});

$('.thumb-flexslider').flexslider({
    animation: "slide",
    prevText: "",
    nextText: "",
    slideshowSpeed: 3000,
    controlNav: "thumbnails",
    touch: true,
    directionNav: true,
    start: function(){
        $('.flex-control-nav .flex-active').parent('li').addClass('flex-active').siblings().removeClass('flex‌​-active');
    },
    after: function(){
        $('.flex-control-nav li').removeClass('flex-active');
        $('.flex-control-nav .flex-active').parent('li').addClass('flex-active').siblings().removeClass('flex‌​-active');
    }
});

/*
if(device.any()){
    $('.flexslider').flexslider({
        animation: "swing",
        prevText: "",
        nextText: "",
        slideshowSpeed: 4000,
        controlNav: true,
        touch: true,
        itemWidth: 135,
        itemMargin: 17,
        directionNav: false,
        minItems:2,
    });

    $('.home-flexslider').flexslider({
        animation: "swing",
        prevText: "",
        nextText: "",
        slideshowSpeed: 4000,
        slideshow:false,
        controlNav: false,
        touch: true,
        itemMargin: 0,
        directionNav: false,
        itemWidth: 200,
        minItems:1,
        startAt: 1
    });
}
*/

},{"./flexslider":10}],12:[function(require,module,exports){
module.exports = function () {

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    return isMobile;

};



},{}],13:[function(require,module,exports){
/*! lazysizes - v4.0.2 */
!function(a,b){var c=b(a,a.document);a.lazySizes=c,"object"==typeof module&&module.exports&&(module.exports=c)}(window,function(a,b){"use strict";if(b.getElementsByClassName){var c,d,e=b.documentElement,f=a.Date,g=a.HTMLPictureElement,h="addEventListener",i="getAttribute",j=a[h],k=a.setTimeout,l=a.requestAnimationFrame||k,m=a.requestIdleCallback,n=/^picture$/i,o=["load","error","lazyincluded","_lazyloaded"],p={},q=Array.prototype.forEach,r=function(a,b){return p[b]||(p[b]=new RegExp("(\\s|^)"+b+"(\\s|$)")),p[b].test(a[i]("class")||"")&&p[b]},s=function(a,b){r(a,b)||a.setAttribute("class",(a[i]("class")||"").trim()+" "+b)},t=function(a,b){var c;(c=r(a,b))&&a.setAttribute("class",(a[i]("class")||"").replace(c," "))},u=function(a,b,c){var d=c?h:"removeEventListener";c&&u(a,b),o.forEach(function(c){a[d](c,b)})},v=function(a,d,e,f,g){var h=b.createEvent("CustomEvent");return e||(e={}),e.instance=c,h.initCustomEvent(d,!f,!g,e),a.dispatchEvent(h),h},w=function(b,c){var e;!g&&(e=a.picturefill||d.pf)?e({reevaluate:!0,elements:[b]}):c&&c.src&&(b.src=c.src)},x=function(a,b){return(getComputedStyle(a,null)||{})[b]},y=function(a,b,c){for(c=c||a.offsetWidth;c<d.minSize&&b&&!a._lazysizesWidth;)c=b.offsetWidth,b=b.parentNode;return c},z=function(){var a,c,d=[],e=[],f=d,g=function(){var b=f;for(f=d.length?e:d,a=!0,c=!1;b.length;)b.shift()();a=!1},h=function(d,e){a&&!e?d.apply(this,arguments):(f.push(d),c||(c=!0,(b.hidden?k:l)(g)))};return h._lsFlush=g,h}(),A=function(a,b){return b?function(){z(a)}:function(){var b=this,c=arguments;z(function(){a.apply(b,c)})}},B=function(a){var b,c=0,e=d.throttleDelay,g=d.ricTimeout,h=function(){b=!1,c=f.now(),a()},i=m&&g>49?function(){m(h,{timeout:g}),g!==d.ricTimeout&&(g=d.ricTimeout)}:A(function(){k(h)},!0);return function(a){var d;(a=a===!0)&&(g=33),b||(b=!0,d=e-(f.now()-c),0>d&&(d=0),a||9>d?i():k(i,d))}},C=function(a){var b,c,d=99,e=function(){b=null,a()},g=function(){var a=f.now()-c;d>a?k(g,d-a):(m||e)(e)};return function(){c=f.now(),b||(b=k(g,d))}};!function(){var b,c={lazyClass:"lazyload",loadedClass:"lazyloaded",loadingClass:"lazyloading",preloadClass:"lazypreload",errorClass:"lazyerror",autosizesClass:"lazyautosizes",srcAttr:"data-src",srcsetAttr:"data-srcset",sizesAttr:"data-sizes",minSize:40,customMedia:{},init:!0,expFactor:1.5,hFac:.8,loadMode:2,loadHidden:!0,ricTimeout:0,throttleDelay:125};d=a.lazySizesConfig||a.lazysizesConfig||{};for(b in c)b in d||(d[b]=c[b]);a.lazySizesConfig=d,k(function(){d.init&&F()})}();var D=function(){var g,l,m,o,p,y,D,F,G,H,I,J,K,L,M=/^img$/i,N=/^iframe$/i,O="onscroll"in a&&!/glebot/.test(navigator.userAgent),P=0,Q=0,R=0,S=-1,T=function(a){R--,a&&a.target&&u(a.target,T),(!a||0>R||!a.target)&&(R=0)},U=function(a,c){var d,f=a,g="hidden"==x(b.body,"visibility")||"hidden"!=x(a,"visibility");for(F-=c,I+=c,G-=c,H+=c;g&&(f=f.offsetParent)&&f!=b.body&&f!=e;)g=(x(f,"opacity")||1)>0,g&&"visible"!=x(f,"overflow")&&(d=f.getBoundingClientRect(),g=H>d.left&&G<d.right&&I>d.top-1&&F<d.bottom+1);return g},V=function(){var a,f,h,j,k,m,n,p,q,r=c.elements;if((o=d.loadMode)&&8>R&&(a=r.length)){f=0,S++,null==K&&("expand"in d||(d.expand=e.clientHeight>500&&e.clientWidth>500?500:370),J=d.expand,K=J*d.expFactor),K>Q&&1>R&&S>2&&o>2&&!b.hidden?(Q=K,S=0):Q=o>1&&S>1&&6>R?J:P;for(;a>f;f++)if(r[f]&&!r[f]._lazyRace)if(O)if((p=r[f][i]("data-expand"))&&(m=1*p)||(m=Q),q!==m&&(y=innerWidth+m*L,D=innerHeight+m,n=-1*m,q=m),h=r[f].getBoundingClientRect(),(I=h.bottom)>=n&&(F=h.top)<=D&&(H=h.right)>=n*L&&(G=h.left)<=y&&(I||H||G||F)&&(d.loadHidden||"hidden"!=x(r[f],"visibility"))&&(l&&3>R&&!p&&(3>o||4>S)||U(r[f],m))){if(ba(r[f]),k=!0,R>9)break}else!k&&l&&!j&&4>R&&4>S&&o>2&&(g[0]||d.preloadAfterLoad)&&(g[0]||!p&&(I||H||G||F||"auto"!=r[f][i](d.sizesAttr)))&&(j=g[0]||r[f]);else ba(r[f]);j&&!k&&ba(j)}},W=B(V),X=function(a){s(a.target,d.loadedClass),t(a.target,d.loadingClass),u(a.target,Z),v(a.target,"lazyloaded")},Y=A(X),Z=function(a){Y({target:a.target})},$=function(a,b){try{a.contentWindow.location.replace(b)}catch(c){a.src=b}},_=function(a){var b,c=a[i](d.srcsetAttr);(b=d.customMedia[a[i]("data-media")||a[i]("media")])&&a.setAttribute("media",b),c&&a.setAttribute("srcset",c)},aa=A(function(a,b,c,e,f){var g,h,j,l,o,p;(o=v(a,"lazybeforeunveil",b)).defaultPrevented||(e&&(c?s(a,d.autosizesClass):a.setAttribute("sizes",e)),h=a[i](d.srcsetAttr),g=a[i](d.srcAttr),f&&(j=a.parentNode,l=j&&n.test(j.nodeName||"")),p=b.firesLoad||"src"in a&&(h||g||l),o={target:a},p&&(u(a,T,!0),clearTimeout(m),m=k(T,2500),s(a,d.loadingClass),u(a,Z,!0)),l&&q.call(j.getElementsByTagName("source"),_),h?a.setAttribute("srcset",h):g&&!l&&(N.test(a.nodeName)?$(a,g):a.src=g),f&&(h||l)&&w(a,{src:g})),a._lazyRace&&delete a._lazyRace,t(a,d.lazyClass),z(function(){(!p||a.complete&&a.naturalWidth>1)&&(p?T(o):R--,X(o))},!0)}),ba=function(a){var b,c=M.test(a.nodeName),e=c&&(a[i](d.sizesAttr)||a[i]("sizes")),f="auto"==e;(!f&&l||!c||!a[i]("src")&&!a.srcset||a.complete||r(a,d.errorClass)||!r(a,d.lazyClass))&&(b=v(a,"lazyunveilread").detail,f&&E.updateElem(a,!0,a.offsetWidth),a._lazyRace=!0,R++,aa(a,b,f,e,c))},ca=function(){if(!l){if(f.now()-p<999)return void k(ca,999);var a=C(function(){d.loadMode=3,W()});l=!0,d.loadMode=3,W(),j("scroll",function(){3==d.loadMode&&(d.loadMode=2),a()},!0)}};return{_:function(){p=f.now(),c.elements=b.getElementsByClassName(d.lazyClass),g=b.getElementsByClassName(d.lazyClass+" "+d.preloadClass),L=d.hFac,j("scroll",W,!0),j("resize",W,!0),a.MutationObserver?new MutationObserver(W).observe(e,{childList:!0,subtree:!0,attributes:!0}):(e[h]("DOMNodeInserted",W,!0),e[h]("DOMAttrModified",W,!0),setInterval(W,999)),j("hashchange",W,!0),["focus","mouseover","click","load","transitionend","animationend","webkitAnimationEnd"].forEach(function(a){b[h](a,W,!0)}),/d$|^c/.test(b.readyState)?ca():(j("load",ca),b[h]("DOMContentLoaded",W),k(ca,2e4)),c.elements.length?(V(),z._lsFlush()):W()},checkElems:W,unveil:ba}}(),E=function(){var a,c=A(function(a,b,c,d){var e,f,g;if(a._lazysizesWidth=d,d+="px",a.setAttribute("sizes",d),n.test(b.nodeName||""))for(e=b.getElementsByTagName("source"),f=0,g=e.length;g>f;f++)e[f].setAttribute("sizes",d);c.detail.dataAttr||w(a,c.detail)}),e=function(a,b,d){var e,f=a.parentNode;f&&(d=y(a,f,d),e=v(a,"lazybeforesizes",{width:d,dataAttr:!!b}),e.defaultPrevented||(d=e.detail.width,d&&d!==a._lazysizesWidth&&c(a,f,e,d)))},f=function(){var b,c=a.length;if(c)for(b=0;c>b;b++)e(a[b])},g=C(f);return{_:function(){a=b.getElementsByClassName(d.autosizesClass),j("resize",g)},checkElems:g,updateElem:e}}(),F=function(){F.i||(F.i=!0,E._(),D._())};return c={cfg:d,autoSizer:E,loader:D,init:F,uP:w,aC:s,rC:t,hC:r,fire:v,gW:y,rAF:z}}});
},{}],14:[function(require,module,exports){
browserFeatures = {};
browserFeatures.touch = 'ontouchstart' in window;
browserFeatures.translate3d = has3DSupport();
browserFeatures.pressUp = pressUp();

function has3DSupport()
{
    var sTranslate3D = "translate3d(0px, 0px, 0px)";

    var eTemp = document.createElement("div");

    eTemp.style.cssText = "  -moz-transform:"    + sTranslate3D +
        "; -ms-transform:"     + sTranslate3D +
        "; -o-transform:"      + sTranslate3D +
        "; -webkit-transform:" + sTranslate3D +
        "; transform:"         + sTranslate3D;
    var rxTranslate = /translate3d\(0px, 0px, 0px\)/g;
    var asSupport = eTemp.style.cssText.match(rxTranslate);
    var bHasSupport = (asSupport !== null && asSupport.length == 1);

    return bHasSupport;
}

function pressUp(){
    if(isTouchDevice()){
        return 'touchend';
    } else {
        return 'click';
    }
}

function isTouchDevice() {
    return !!('ontouchstart' in window);
}


getCookie = function(name) {
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
};

Element.prototype.hasClassName = function(name) {
    return new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)").test(this.className);
};

Element.prototype.addClassName = function(name) {
    if (!this.hasClassName(name)) {
        this.className = this.className ? [this.className, name].join(' ') : name;
    }
};

Element.prototype.removeClassName = function(name) {
    if (this.hasClassName(name)) {
        var c = this.className;
        this.className = c.replace(new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)", "g"), "");
    }
};


// browser features global variable.
browserFeatures = {};
browserFeatures.hasTransition = dedectTransition();

function dedectTransition() {
    var b = document.body || document.documentElement,
        s = b.style,
        p = 'transition';

    if (typeof s[p] == 'string') { return true; }

    // Tests for vendor specific prop
    var v = ['Moz', 'webkit', 'Webkit', 'Khtml', 'O', 'ms'];
    p = p.charAt(0).toUpperCase() + p.substr(1);

    for (var i=0; i<v.length; i++) {
        if (typeof s[v[i] + p] == 'string') { return true; }
    }
    return false;
}


},{}],15:[function(require,module,exports){
(function ($) {
    "use strict";
    if (!$.browser) {
        $.browser = {};
        $.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
        $.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
        $.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
        $.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
        $.browser.device = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase());
    }

    var defaultOptions = {
            prefix: "",
            suffix: "",
            affixesStay: true,
            thousands: ",",
            decimal: ".",
            precision: 2,
            allowZero: false,
            allowNegative: false,
            doubleClickSelection: true,
            allowEmpty: false,
            bringCaretAtEndOnFocus: true
        },
        methods = {
            destroy: function () {
                $(this).unbind(".maskMoney");

                if ($.browser.msie) {
                    this.onpaste = null;
                }
                return this;
            },

            applyMask: function (value) {
                var $input = $(this);
                // data-* api
                var settings = $input.data("settings");
                return maskValue(value, settings);
            },

            mask: function (value) {
                return this.each(function () {
                    var $this = $(this);
                    if (typeof value === "number") {
                        $this.val(value);
                    }
                    return $this.trigger("mask");
                });
            },

            unmasked: function () {
                return this.map(function () {
                    var value = ($(this).val() || "0"),
                        isNegative = value.indexOf("-") !== -1,
                        decimalPart;
                    // get the last position of the array that is a number(coercion makes "" to be evaluated as false)
                    $(value.split(/\D/).reverse()).each(function (index, element) {
                        if (element) {
                            decimalPart = element;
                            return false;
                        }
                    });
                    value = value.replace(/\D/g, "");
                    value = value.replace(new RegExp(decimalPart + "$"), "." + decimalPart);
                    if (isNegative) {
                        value = "-" + value;
                    }
                    return parseFloat(value);
                });
            },

            unmaskedWithOptions: function () {
                return this.map(function () {
                    var value = ($(this).val() || "0"),
                        settings = $(this).data("settings") || defaultOptions,
                        regExp = new RegExp((settings.thousandsForUnmasked || settings.thousands), "g");
                    value = value.replace(regExp, "");
                    return parseFloat(value);
                });
            },

            init: function (parameters) {
                // the default options should not be shared with others
                parameters = $.extend($.extend({}, defaultOptions), parameters);

                return this.each(function () {
                    var $input = $(this), settings,
                        onFocusValue;

                    // data-* api
                    settings = $.extend({}, parameters);
                    settings = $.extend(settings, $input.data());

                    // Store settings for use with the applyMask method.
                    $input.data("settings", settings);


                    function getInputSelection() {
                        var el = $input.get(0),
                            start = 0,
                            end = 0,
                            normalizedValue,
                            range,
                            textInputRange,
                            len,
                            endRange;

                        if (typeof el.selectionStart === "number" && typeof el.selectionEnd === "number") {
                            start = el.selectionStart;
                            end = el.selectionEnd;
                        } else {
                            range = document.selection.createRange();

                            if (range && range.parentElement() === el) {
                                len = el.value.length;
                                normalizedValue = el.value.replace(/\r\n/g, "\n");

                                // Create a working TextRange that lives only in the input
                                textInputRange = el.createTextRange();
                                textInputRange.moveToBookmark(range.getBookmark());

                                // Check if the start and end of the selection are at the very end
                                // of the input, since moveStart/moveEnd doesn't return what we want
                                // in those cases
                                endRange = el.createTextRange();
                                endRange.collapse(false);

                                if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
                                    start = end = len;
                                } else {
                                    start = -textInputRange.moveStart("character", -len);
                                    start += normalizedValue.slice(0, start).split("\n").length - 1;

                                    if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
                                        end = len;
                                    } else {
                                        end = -textInputRange.moveEnd("character", -len);
                                        end += normalizedValue.slice(0, end).split("\n").length - 1;
                                    }
                                }
                            }
                        }

                        return {
                            start: start,
                            end: end
                        };
                    } // getInputSelection

                    function canInputMoreNumbers() {
                        var haventReachedMaxLength = !($input.val().length >= $input.attr("maxlength") && $input.attr("maxlength") >= 0),
                            selection = getInputSelection(),
                            start = selection.start,
                            end = selection.end,
                            haveNumberSelected = (selection.start !== selection.end && $input.val().substring(start, end).match(/\d/)) ? true : false,
                            startWithZero = ($input.val().substring(0, 1) === "0");
                        return haventReachedMaxLength || haveNumberSelected || startWithZero;
                    }

                    function setCursorPosition(pos) {
                        // Do not set the position if
                        // the we're formatting on blur.
                        // This is because we do not want
                        // to refocus on the control after
                        // the blur.
                        if (!!settings.formatOnBlur) {
                            return;
                        }

                        $input.each(function (index, elem) {
                            if (elem.setSelectionRange) {
                                elem.focus();
                                elem.setSelectionRange(pos, pos);
                            } else if (elem.createTextRange) {
                                var range = elem.createTextRange();
                                range.collapse(true);
                                range.moveEnd("character", pos);
                                range.moveStart("character", pos);
                                range.select();
                            }
                        });
                    }

                    function maskAndPosition(startPos) {
                        var originalLen = $input.val().length,
                            newLen;
                        $input.val(maskValue($input.val(), settings));
                        newLen = $input.val().length;
                        // If the we're using the reverse option,
                        // do not put the cursor at the end of
                        // the input. The reverse option allows
                        // the user to input text from left to right.
                        if (!settings.reverse) {
                            startPos = startPos - (originalLen - newLen);
                        }
                        setCursorPosition(startPos);
                    }

                    function mask() {
                        var value = $input.val();
                        if (settings.allowEmpty && value === "") {
                            return;
                        }
                        var isNumber = !isNaN(value);
                        var decimalPointIndex = isNumber? value.indexOf("."): value.indexOf(settings.decimal);
                        if (settings.precision > 0) {
                            if(decimalPointIndex < 0){
                                value += settings.decimal + new Array(settings.precision + 1).join(0);
                            }
                            else {
                                // If the following decimal part dosen't have enough length against the precision, it needs to be filled with zeros.
                                var integerPart = value.slice(0, decimalPointIndex),
                                    decimalPart = value.slice(decimalPointIndex + 1);
                                value = integerPart + settings.decimal + decimalPart +
                                    new Array((settings.precision + 1) - decimalPart.length).join(0);
                            }
                        } else if (decimalPointIndex > 0) {
                            // if the precision is 0, discard the decimal part
                            value = value.slice(0, decimalPointIndex);
                        }
                        $input.val(maskValue(value, settings));
                    }

                    function changeSign() {
                        var inputValue = $input.val();
                        if (settings.allowNegative) {
                            if (inputValue !== "" && inputValue.charAt(0) === "-") {
                                return inputValue.replace("-", "");
                            } else {
                                return "-" + inputValue;
                            }
                        } else {
                            return inputValue;
                        }
                    }

                    function preventDefault(e) {
                        if (e.preventDefault) { //standard browsers
                            e.preventDefault();
                        } else { // old internet explorer
                            e.returnValue = false;
                        }
                    }

                    function fixMobile() {
                        if ($.browser.device) {
                            $input.attr("type", "tel");
                        }
                    }

                    function keypressEvent(e) {
                        e = e || window.event;
                        var key = e.which || e.charCode || e.keyCode,
                            decimalKeyCode = settings.decimal.charCodeAt(0);
                        //added to handle an IE "special" event
                        if (key === undefined) {
                            return false;
                        }

                        // any key except the numbers 0-9. if we're using settings.reverse,
                        // allow the user to input the decimal key
                        if ((key < 48 || key > 57) && (key !== decimalKeyCode || !settings.reverse)) {
                            return handleAllKeysExceptNumericalDigits(key, e);
                        } else if (!canInputMoreNumbers()) {
                            return false;
                        } else {
                            if (key === decimalKeyCode && shouldPreventDecimalKey()) {
                                return false;
                            }
                            if (settings.formatOnBlur) {
                                return true;
                            }
                            preventDefault(e);
                            applyMask(e);
                            return false;
                        }
                    }

                    function shouldPreventDecimalKey() {
                        // If all text is selected, we can accept the decimal
                        // key because it will replace everything.
                        if (isAllTextSelected()) {
                            return false;
                        }

                        return alreadyContainsDecimal();
                    }

                    function isAllTextSelected() {
                        var length = $input.val().length;
                        var selection = getInputSelection();
                        // This should if all text is selected or if the
                        // input is empty.
                        return selection.start === 0 && selection.end === length;
                    }

                    function alreadyContainsDecimal() {
                        return $input.val().indexOf(settings.decimal) > -1;
                    }

                    function applyMask(e) {
                        e = e || window.event;
                        var key = e.which || e.charCode || e.keyCode,
                            keyPressedChar = "",
                            selection,
                            startPos,
                            endPos,
                            value;
                        if (key >= 48 && key <= 57) {
                            keyPressedChar = String.fromCharCode(key);
                        }
                        selection = getInputSelection();
                        startPos = selection.start;
                        endPos = selection.end;
                        value = $input.val();
                        $input.val(value.substring(0, startPos) + keyPressedChar + value.substring(endPos, value.length));
                        maskAndPosition(startPos + 1);
                    }

                    function handleAllKeysExceptNumericalDigits(key, e) {
                        // -(minus) key
                        if (key === 45) {
                            $input.val(changeSign());
                            return false;
                            // +(plus) key
                        } else if (key === 43) {
                            $input.val($input.val().replace("-", ""));
                            return false;
                            // enter key or tab key
                        } else if (key === 13 || key === 9) {
                            return true;
                        } else if ($.browser.mozilla && (key === 37 || key === 39) && e.charCode === 0) {
                            // needed for left arrow key or right arrow key with firefox
                            // the charCode part is to avoid allowing "%"(e.charCode 0, e.keyCode 37)
                            return true;
                        } else { // any other key with keycode less than 48 and greater than 57
                            preventDefault(e);
                            return true;
                        }
                    }

                    function keydownEvent(e) {
                        e = e || window.event;
                        var key = e.which || e.charCode || e.keyCode,
                            selection,
                            startPos,
                            endPos,
                            value,
                            lastNumber;
                        //needed to handle an IE "special" event
                        if (key === undefined) {
                            return false;
                        }

                        selection = getInputSelection();
                        startPos = selection.start;
                        endPos = selection.end;

                        if (key === 8 || key === 46 || key === 63272) { // backspace or delete key (with special case for safari)
                            preventDefault(e);

                            value = $input.val();

                            // not a selection
                            if (startPos === endPos) {
                                // backspace
                                if (key === 8) {
                                    if (settings.suffix === "") {
                                        startPos -= 1;
                                    } else {
                                        // needed to find the position of the last number to be erased
                                        lastNumber = value.split("").reverse().join("").search(/\d/);
                                        startPos = value.length - lastNumber - 1;
                                        endPos = startPos + 1;
                                    }
                                    //delete
                                } else {
                                    endPos += 1;
                                }
                            }

                            $input.val(value.substring(0, startPos) + value.substring(endPos, value.length));

                            maskAndPosition(startPos);
                            return false;
                        } else if (key === 9) { // tab key
                            return true;
                        } else { // any other key
                            return true;
                        }
                    }

                    function focusEvent() {
                        onFocusValue = $input.val();
                        mask();
                        var input = $input.get(0),
                            textRange;

                        if (!!settings.selectAllOnFocus) {
                            input.select();
                        } else if (input.createTextRange && settings.bringCaretAtEndOnFocus) {
                            textRange = input.createTextRange();
                            textRange.collapse(false); // set the cursor at the end of the input
                            textRange.select();
                        }
                    }

                    function cutPasteEvent() {
                        setTimeout(function () {
                            mask();
                        }, 0);
                    }

                    function getDefaultMask() {
                        var n = parseFloat("0") / Math.pow(10, settings.precision);
                        return (n.toFixed(settings.precision)).replace(new RegExp("\\.", "g"), settings.decimal);
                    }

                    function blurEvent(e) {
                        if ($.browser.msie) {
                            keypressEvent(e);
                        }

                        if (!!settings.formatOnBlur && $input.val() !== onFocusValue) {
                            applyMask(e);
                        }

                        if ($input.val() === "" && settings.allowEmpty) {
                            $input.val("");
                        } else if ($input.val() === "" || $input.val() === setSymbol(getDefaultMask(), settings)) {
                            if (!settings.allowZero) {
                                $input.val("");
                            } else if (!settings.affixesStay) {
                                $input.val(getDefaultMask());
                            } else {
                                $input.val(setSymbol(getDefaultMask(), settings));
                            }
                        } else {
                            if (!settings.affixesStay) {
                                var newValue = $input.val().replace(settings.prefix, "").replace(settings.suffix, "");
                                $input.val(newValue);
                            }
                        }
                        if ($input.val() !== onFocusValue) {
                            $input.change();
                        }
                    }

                    function clickEvent() {
                        var input = $input.get(0),
                            length;
                        if (!!settings.selectAllOnFocus) {
                            // selectAllOnFocus will be handled by
                            // the focus event. The focus event is
                            // also fired when the input is clicked.
                            return;
                        } else if (input.setSelectionRange && settings.bringCaretAtEndOnFocus) {
                            length = $input.val().length;
                            input.setSelectionRange(length, length);
                        } else {
                            $input.val($input.val());
                        }
                    }

                    function doubleClickEvent() {
                        var input = $input.get(0),
                            start,
                            length;
                        if (input.setSelectionRange && settings.bringCaretAtEndOnFocus) {
                            length = $input.val().length;
                            start = settings.doubleClickSelection ? 0 : length;
                            input.setSelectionRange(start, length);
                        } else {
                            $input.val($input.val());
                        }
                    }

                    fixMobile();
                    $input.unbind(".maskMoney");
                    $input.bind("keypress.maskMoney", keypressEvent);
                    $input.bind("keydown.maskMoney", keydownEvent);
                    $input.bind("blur.maskMoney", blurEvent);
                    $input.bind("focus.maskMoney", focusEvent);
                    $input.bind("click.maskMoney", clickEvent);
                    $input.bind("dblclick.maskMoney", doubleClickEvent);
                    $input.bind("cut.maskMoney", cutPasteEvent);
                    $input.bind("paste.maskMoney", cutPasteEvent);
                    $input.bind("mask.maskMoney", mask);
                });
            }
        };

    function setSymbol(value, settings) {
        var operator = "";
        if (value.indexOf("-") > -1) {
            value = value.replace("-", "");
            operator = "-";
        }
        if (value.indexOf(settings.prefix) > -1) {
            value = value.replace(settings.prefix, "");
        }
        if (value.indexOf(settings.suffix) > -1) {
            value = value.replace(settings.suffix, "");
        }
        return operator + settings.prefix + value + settings.suffix;
    }

    function maskValue(value, settings) {
        if (settings.allowEmpty && value === "") {
            return "";
        }
        if (!!settings.reverse) {
            return maskValueReverse(value, settings);
        }
        return maskValueStandard(value, settings);
    }

    function maskValueStandard(value, settings) {
        var negative = (value.indexOf("-") > -1 && settings.allowNegative) ? "-" : "",
            onlyNumbers = value.replace(/[^0-9]/g, ""),
            integerPart = onlyNumbers.slice(0, onlyNumbers.length - settings.precision),
            newValue,
            decimalPart,
            leadingZeros;

        newValue = buildIntegerPart(integerPart, negative, settings);

        if (settings.precision > 0) {
            if(!isNaN(value) && value.indexOf(".")){
                var precision = value.substr(value.indexOf(".") + 1);
                onlyNumbers += new Array((settings.precision + 1) - precision.length).join(0);
                integerPart = onlyNumbers.slice(0, onlyNumbers.length - settings.precision);
                newValue = buildIntegerPart(integerPart, negative, settings);
            }

            decimalPart = onlyNumbers.slice(onlyNumbers.length - settings.precision);
            leadingZeros = new Array((settings.precision + 1) - decimalPart.length).join(0);
            newValue += settings.decimal + leadingZeros + decimalPart;
        }
        return setSymbol(newValue, settings);
    }

    function maskValueReverse(value, settings) {
        var negative = (value.indexOf("-") > -1 && settings.allowNegative) ? "-" : "",
            valueWithoutSymbol = value.replace(settings.prefix, "").replace(settings.suffix, ""),
            integerPart = valueWithoutSymbol.split(settings.decimal)[0],
            newValue,
            decimalPart = "";

        if (integerPart === "") {
            integerPart = "0";
        }
        newValue = buildIntegerPart(integerPart, negative, settings);

        if (settings.precision > 0) {
            var arr = valueWithoutSymbol.split(settings.decimal);
            if (arr.length > 1) {
                decimalPart = arr[1];
            }
            newValue += settings.decimal + decimalPart;
            var rounded = Number.parseFloat((integerPart + "." + decimalPart)).toFixed(settings.precision);
            var roundedDecimalPart = rounded.toString().split(settings.decimal)[1];
            newValue = newValue.split(settings.decimal)[0] + "." + roundedDecimalPart;
        }

        return setSymbol(newValue, settings);
    }

    function buildIntegerPart(integerPart, negative, settings) {
        // remove initial zeros
        integerPart = integerPart.replace(/^0*/g, "");

        // put settings.thousands every 3 chars
        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, settings.thousands);
        if (integerPart === "") {
            integerPart = "0";
        }
        return negative + integerPart;
    }

    $.fn.maskMoney = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === "object" || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error("Method " + method + " does not exist on jQuery.maskMoney");
        }
    };
})(window.jQuery || window.Zepto);
},{}],16:[function(require,module,exports){
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



},{}],17:[function(require,module,exports){

module.exports = function () {
    (function($){
        $.fn.serializeObject = function(){

            var self = this,
                json = {},
                push_counters = {},
                patterns = {
                    "validate": /^[a-zA-Z][a-zA-Z0-9_]*(?:\[(?:\d*|[a-zA-Z0-9_]+)\])*$/,
                    "key":      /[a-zA-Z0-9_]+|(?=\[\])/g,
                    "push":     /^$/,
                    "fixed":    /^\d+$/,
                    "named":    /^[a-zA-Z0-9_]+$/
                };


            this.build = function(base, key, value){
                base[key] = value;
                return base;
            };

            this.push_counter = function(key){
                if(push_counters[key] === undefined){
                    push_counters[key] = 0;
                }
                return push_counters[key]++;
            };

            $.each($(this).serializeArray(), function(){

                // skip invalid keys
                if(!patterns.validate.test(this.name)){
                    return;
                }

                var k,
                    keys = this.name.match(patterns.key),
                    merge = this.value,
                    reverse_key = this.name;

                while((k = keys.pop()) !== undefined){

                    // adjust reverse_key
                    reverse_key = reverse_key.replace(new RegExp("\\[" + k + "\\]$"), '');

                    // push
                    if(k.match(patterns.push)){
                        merge = self.build([], self.push_counter(reverse_key), merge);
                    }

                    // fixed
                    else if(k.match(patterns.fixed)){
                        merge = self.build([], k, merge);
                    }

                    // named
                    else if(k.match(patterns.named)){
                        merge = self.build({}, k, merge);
                    }
                }

                json = $.extend(true, json, merge);
            });

            return json;
        };
    })(jQuery);

    var functions = {
        loginFormValidate: function () {

            $("form.loginForm").each(function() {
                var form = $(this);

                $(this).validate({
                ignore:[],
                rules: {
                    phone : {required : true},
                    password:{required : true},
                    firstName: {required: true,minlength: 2, alfabetic:true},
                    lastName:{required: true,minlength: 2, alfabetic:true},
                    emailAddress: {required: true,email: true,altar_email:true},

                    repeatPassword:{required : true, PasswordRepeat:true},
                    terms :{required: true},
                },
                messages: {
                    firstName: "Lütfen adınızı belirtiniz.",
                    lastName:"Lütfen soyadınızı belirtiniz.",
                    emailAddress: "Lütfen geçerli bir e-posta adresi giriniz.",
                    phone: "Lütfen numaranızı giriniz.",
                    password:"Lütfen bir şifre giriniz.",
                    repeatPassword:{
                        required: "Lütfen bir şifre giriniz."
                    },
                    terms : "Lütfen kullanım şartlarını ve gizlilik bildirimini kabul ediniz.",

                },
                submitHandler: function(form) {

                    var loginForm = $(form).serializeObject();
                    console.log(loginForm.loginType);
                    $.ajax({
                        type:'POST',
                        url: '#',
                        data: $.param(loginForm) + '&formType=' + loginForm.loginType,
                        beforeSend: function() {

                        },
                        success: function(response) {
                            if(response.success == true){

                            }
                            else{
                            }
                        },
                        failure: function() {

                        },
                        error: function() {

                        }
                    });
                    return false;
                }
             });
            });

            functions.addValidators();

        },
        passwordResetFormValidate: function () {
            $("#passwordResetForm").validate({
                ignore:[],
                rules: {
                    phone : {required : true},
                },
                messages: {
                    phone: "Lütfen numaranızı giriniz.",

                },
                submitHandler: function(form) {

                    var resetForm = $("#passwordResetForm").serializeObject();
                    $.ajax({
                        type:'POST',
                        url: '#',
                        data: $.param(resetForm),
                        beforeSend: function() {

                        },
                        success: function(response) {
                            if(response.success == true){

                            }
                            else{
                            }
                        },
                        failure: function() {

                        },
                        error: function() {

                        }
                    });
                    return false;
                }
            });

            functions.addValidators();
        },
        verificationFormValidate: function () {
            $("#verificationForm").validate({
                ignore:[],
                rules: {
                    phone : {required : true},
                },
                messages: {
                    phone: "Lütfen numaranızı giriniz.",

                },
                submitHandler: function(form) {

                    var verificationForm = $("#verificationForm").serializeObject();
                    $.ajax({
                        type:'POST',
                        url: '#',
                        data: $.param(verificationForm),
                        beforeSend: function() {

                        },
                        success: function(response) {
                            if(response.success == true){

                            }
                            else{
                            }
                        },
                        failure: function() {

                        },
                        error: function() {

                        }
                    });
                    return false;
                }
            });

            functions.addValidators();
        },
        changePasswordFormValidate: function () {
            $("#changePasswordForm").validate({
                ignore:[],
                rules: {
                    password:{required : true},
                    passwordRepeat:{required : true, repeatPassword:true},
                },
                messages: {
                    password: "Lütfen şifrenizi giriniz.",
                    passwordRepeat:{
                        required: "Lütfen şifrenizi giriniz."
                    },

                },
                submitHandler: function(form) {

                    var changePassForm = $("#changePasswordForm").serializeObject();
                    $.ajax({
                        type:'POST',
                        url: '#',
                        data: $.param(changePassForm),
                        beforeSend: function() {

                        },
                        success: function(response) {
                            if(response.success == true){
                                $(".passwordSuccess").trigger('click'); //Başarılı popup ı acılır.
                            }
                            else{
                            }
                        },
                        failure: function() {

                        },
                        error: function() {

                        }
                    });
                    return false;
                }
            });

            functions.addValidators();
        },
        registerFormValidate: function () {

            $("form.registerForm").each(function() {
                var form = $(this);

                $(this).validate({
                    ignore:[],
                    rules: {
                        firstName: {required: true,minlength: 2, alfabetic:true},
                        lastName:{required: true,minlength: 2, alfabetic:true},
                        password:{required : true},
                        terms :{required: true},
                    },
                    messages: {
                        firstName: "Lütfen adınızı belirtiniz.",
                        lastName:"Lütfen soyadınızı belirtiniz.",
                        password:"Lütfen bir şifre giriniz.",
                        terms : "",

                    },
                    submitHandler: function(form) {

                        var registerForm = $(form).serializeObject();
                        console.log(registerForm.registerType);
                        $.ajax({
                            type:'POST',
                            url: '#',
                            data: $.param(registerForm) + '&formType=' + registerForm.registerType,
                            beforeSend: function() {

                            },
                            success: function(response) {
                                if(response.success == true){

                                }
                                else{
                                }
                            },
                            failure: function() {

                            },
                            error: function() {

                            }
                        });
                        return false;
                    }
                });
            });

            functions.addValidators();

        },
        addValidators : function(){
            jQuery.validator.addMethod("checkMobilePhone", function(value, element , params) {

                var prmVal = $(params).val();
                if(value.length >0 && prmVal.length > 0 ){
                    if(/^\d+$/.test(value) && /^\d+$/.test(prmVal)){
                        if(value.length == 3 && value.substring(0,1) == "5" && prmVal.length == 7 ){

                            var myRegx = /^(.)\1*$/;
                            var deger = "1234567";
                            if(myRegx.test(prmVal) == false && prmVal != deger && prmVal.length == 7 ){
                                return true;
                            }
                        }
                    }
                }

                this.errorList.push({
                    message: "",
                    element: $(params)[0]
                });

                return false;

            }, "");

            jQuery.validator.addMethod("alfabetic", function(value, element , params) {

                var myRegxp = /^([a-zA-ZışüöçğİŞÜÇÖĞ ]+)$/;
                if(myRegxp.test(value)!=false || value == "")
                {
                    return true;
                }
                return false;

            }, "");

            jQuery.validator.addMethod("numbersOnly", function(value, element) {
                return this.optional(element) || /^[0-9]+$/i.test(value);
            }, "");

            jQuery.validator.addMethod("phoneControlNew", function(value, element , params) {
                //tum rakamlar ayni olamaz ve 1234567890 olamaz
                var myRegx = /^(.)\1*$/;
                var deger = "1234567890";
                //var lenlimit = $(".newContactForm").length > 0 ? 10 : 7;
                if(myRegx.test(value) == false && value != deger /*&& value.length == lenlimit*/ ){
                    return true;
                }
                return false;
            },"");

            jQuery.validator.addMethod("repeatPassword", function(value, element , params) {

                var _password = $("input[name=password]").val();
                var _passwordRepeat = $("input[name=passwordRepeat]").val();

                if(_password == _passwordRepeat){
                    return true;
                }
                else{
                    return false;
                }
            }, "Şifreler uyuşmuyor.");
            jQuery.validator.addMethod("altar_email", function(value, element , params) {
                var myRegxp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,6}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                var titles=["test", "deneme"];
                if(myRegxp.test(value)!=false || value == "")
                {
                    for(item_mail in titles){
                        indx = value.toLowerCase().indexOf(titles[item_mail].toLowerCase());
                        if(indx >-1){
                            return false;
                        }
                    }
                    return true;
                }
                return false;
            }, "");

        }

    };

    if ($("form").length > 0) {
        functions.loginFormValidate();
        functions.passwordResetFormValidate();
        functions.changePasswordFormValidate();
        functions.registerFormValidate();
        functions.verificationFormValidate();
    }
    return functions;

};





},{}],18:[function(require,module,exports){
/*$('.date').mask('00/00/0000');
$('.time').mask('00:00:00');
$('.date_time').mask('00/00/0000 00:00:00');
$('.cep').mask('00000-000');*/

/*
$('.phone_with_ddd').mask('(00) 0000-0000');
$('.phone_us').mask('(000) 000-0000');
$('.mixed').mask('AAA 000-S0S');
$('.cpf').mask('000.000.000-00', {reverse: true});
$('.cnpj').mask('00.000.000/0000-00', {reverse: true});
$('.money').mask('000.000.000.000.000,00', {reverse: true});
$('.money2').mask("#.##0,00", {reverse: true});
$('.ip_address').mask('0ZZ.0ZZ.0ZZ.0ZZ', {
    translation: {
        'Z': {
            pattern: /[0-9]/, optional: true
        }
    }
});
$('.ip_address').mask('099.099.099.099');
$('.percent').mask('##0,00%', {reverse: true});
$('.clear-if-not-match').mask("00/00/0000", {clearIfNotMatch: true});
$('.placeholder').mask("00/00/0000", {placeholder: "__/__/____"});
$('.fallback').mask("00r00r0000", {
    translation: {
        'r': {
            pattern: /[\/]/,
            fallback: '/'
        },
        placeholder: "__/__/____"
    }
});
$('.selectonfocus').mask("00/00/0000", {selectOnFocus: true});
*/

mask = function () {
    if($("form").length > 0){
        $('.phoneNumber').mask('(000) 000 00 00');
        $('.ibanNo').mask('TR00 0000 0000 0000 0000 0000 00');
        $('.cartNoMask').mask('0000 0000 0000 0000');
        $('.expiration').mask('00/00');
    }
};

mask();









},{}]},{},[1])