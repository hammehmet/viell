(function ($) {
	'use strict';

	var defaults = {
		activeClass: 'text-input-placeholder_state_active',
		inputSelector: '.js-placeholder',
		textSelector: '.js-placeholder-text'
	};

	$.fn.placeholder = function (options) {
		options = $.extend({}, defaults, options);

		this
			.each(function () {
				var
					$this = $(this),
					val = $this.val();

				if (val.length || $this.is(':focus')) {
					$this
						.siblings(options.textSelector)
						.addClass(options.activeClass);
				}
			})
			.on({
				focus: function () {
					$(this)
						.siblings(options.textSelector)
						.addClass(options.activeClass);
				},
				blur: function () {
					var
						$this = $(this),
						val = $this.val();

					if (!val) {
						$this
							.siblings(options.textSelector)
							.removeClass(options.activeClass);
					} else {
						$this
							.siblings(options.textSelector)
							.addClass(options.activeClass);
					}
				}
			})
			.siblings(options.textSelector)
			.on('click', function () {
				$(this)
					.siblings(options.inputSelector)
					.trigger('focus');
			});
	};
});
