(function($) {
    "use strict";
	
	var eventsShow = [
		'app.record.create.show', 
		'app.record.edit.show', 
		'app.record.index.edit.show'
	];
    
	kintone.events.on('app.record.create.show', function(e) {
		var record = e.record;
		
		// get app record id if available
		var recordId = getParameterByName("record");
		
		// if app record id is available (the record is forwarded from Quotation app)
		if (recordId != null && typeof(recordId) !== 'undefined') {
			// lookup the data with the record id
			var data = getDetailTableSync(recordId);
			var detail = data.record.Detail;
			
			updateDetailTable(detail);
		}
		
		return e;
    });
	
	kintone.events.on('app.record.index.edit.submit', function(e) {
		var record = e.record;
	});
	
	function getDetailTableSync(recordId) {
		var apiUrl = "https://kintoneivsdemo.cybozu.com/k/v1/record.json?app=610&id={0}"
		
		return	$.ajax({
					type: "GET",
					dataType: "json",
					url: apiUrl.replace("{0}", recordId),
					// success: typeof(callback) == 'undefined' ? defaultCallback : callback,
					beforeSend: setHeader,
					async: false
				}).responseJSON;
	}
	
	function updateDetailTable(detail) {
		// clear the current record table
		record.Detail.value.length = 0;
		
		// update the table with new data returned
		for(var i = 0; i < detail.value.length; i++) {
			var rec = detail.value[i];
			record.Detail.value.push(rec);
		}
	}
	
	function setHeader(xhr) {
        xhr.setRequestHeader('X-Cybozu-API-Token', 'UoMwTXQuscujiQQM5gUIo86j938rAEDj6Y4MrwxI');
        xhr.setRequestHeader('X-Cybozu-Authorization', 'bnFuaHV0QGluZGl2aXN5cy5qcDpAN35+RWE9fg==');
    }
	
	function getParameterByName(name, url) {
		if (!url) url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}
	
	
})(jQuery);

