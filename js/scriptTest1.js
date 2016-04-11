(function($) {
    "use strict";
	
	// the events that the function will be applied to
	var eventsShow = [
		'app.record.create.show', 
		'app.record.edit.show', 
		'app.record.index.edit.show'
	];
    
	kintone.events.on(eventsShow, function(e) {
		// bind click event to the lookup button
		$(".field-5204695 > div.value-5204695 > div.component-app-lookup-inputlookup > button.input-lookup-gaia").click(lookupQuotation);
		
		var record = e.record;
		
		// console.debug(record);
		
		// start lookup for the first time the record showed up if the value is not empty
		if (typeof(record.Lookup_0.value) != 'undefined' && record.Lookup_0.value != "")
		{
			record.Lookup_0.lookup = true;
		}
		
		// get app record id if available
		var recordId = getParameterByName("record");
		// get Detail table based on the recordId
		getDetailTableFromRecordId(record, recordId);
		
		return e;
    });
	
	function lookupQuotation() {
		var apiUrl = "/k/v1/records.json";
		var record = kintone.app.record.get();
		var lookupValue = record.record.Lookup_0.value;
		
		// if the lookup value is empty, return
		if (lookupValue == '' || typeof(lookupValue) == 'undefined') {
			return;
		}
		
		// search for the record based on Quotation_No
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
		
		// if there are no record found, retun
		if (result.records.length == 0) {
			return;
		}
		
		// get the first found recordId
		var recordId = result.records[0]["$id"].value;
		
		// get the Detail table based on the recordId
		getDetailTableFromRecordId(record.record, recordId);
		
		// flush the record value into the UI
		kintone.app.record.set(record);
	}
	
	function getDetailTableFromRecordId(record, recordId) {
		// if app record id is available (the record is forwarded from Quotation app)
		if (recordId != null && typeof(recordId) !== 'undefined') {
			// lookup the data with the record id
			var data = getDetailTableSync(recordId);
			var detail = data.record.Detail;
			
			// update data table rows
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
		// set header for api token
        xhr.setRequestHeader('X-Cybozu-API-Token', 'UoMwTXQuscujiQQM5gUIo86j938rAEDj6Y4MrwxI');
		// set header for authorization token
        xhr.setRequestHeader('X-Cybozu-Authorization', 'bnFuaHV0QGluZGl2aXN5cy5qcDpAN35+RWE9fg==');
    }
	
	// get the param value from querystring
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

