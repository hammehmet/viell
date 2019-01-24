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
