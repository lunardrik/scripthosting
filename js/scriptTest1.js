(function($) {
    "use strict";
	
	var eventsShow = [
		'app.record.create.show', 
		'app.record.edit.show', 
		'app.record.index.edit.show'
	];
    
	kintone.events.on(eventsShow, function(e) {
		
		$(".field-5204695 > div.value-5204695 > div.component-app-lookup-inputlookup > button.input-lookup-gaia").click(lookupQuotation);
		
		var record = e.record;
		
		console.debug(record);
		
		// get app record id if available
		var recordId = getParameterByName("record");
		getDetailTableFromRecordId(record, recordId);
		
		return e;
    });
	
	function lookupQuotation() {
		var apiUrl = "/k/v1/records.json";
		var record = kintone.app.record.get();
		var lookupValue = record.record.Lookup_0.value;
				
		if (lookupValue == '' || typeof(lookupValue) == 'undefined') {
			return;
		}
		
		var result = $.ajax({
					type: "GET",
					dataType: "json",
					url: apiUrl,
					data: {
						"app" : 610,
						"query": "Quotation_No = \"" + lookupValue + "\""
					},
					beforeSend: setHeader,
					async: false
				}).responseJSON;
				
		if (result.records.length == 0) {
			return;
		}
		
		var recordId = result.records[0]["$id"].value;
		
		getDetailTableFromRecordId(record.record, recordId);
		
		kintone.app.record.set(record);
	}
	
	function getDetailTableFromRecordId(record, recordId) {
		// if app record id is available (the record is forwarded from Quotation app)
		if (recordId != null && typeof(recordId) !== 'undefined') {
			// lookup the data with the record id
			var data = getDetailTableSync(recordId);
			var detail = data.record.Detail;
			
			updateDetailTable(record, detail);
		}
	}
	
	function getDetailTableSync(recordId) {
		var apiUrl = "/k/v1/record.json"
		
		return	$.ajax({
					type: "GET",
					dataType: "json",
					url: apiUrl,
					data: {
						"app" : 610,
						"id": recordId
					},
					beforeSend: setHeader,
					async: false
				}).responseJSON;
	}
	
	function updateDetailTable(record, detail) {
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

