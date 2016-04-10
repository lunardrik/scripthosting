(function($) {
    "use strict";
	
	var eventsShow = ['app.record.create.show', 'app.record.edit.show', 'app.record.index.edit.show'];
    kintone.events.on(eventsShow, function(e) {
		
		var record = e.record;
        //var count = record.receipts.value.length;
		
		
		console.debug(record);
		
        $(".gaia-ui-actionmenu").append( "<input type ='button' id='getDetail' value = 'Get Detail' />  " )
	    
		
		var recordId = getParameterByName("record");
		if (recordId != null && typeof(recordId) !== 'undefined') {
			getDetailTable(recordId, function(data) {
				var detail = data.record.Detail;
				
				for(var i = 0; i < detail.value.length; i++) {
					var rec = detail.value[i];
					record['Detail']['value'].push(rec);
				}
			});
		}
		
		var newrec = {"id":"4590","value":{"amount":{"type":"CALC","value":"23981"},"unitjp_vn":{"type":"CALC","value":"1980"},"Multi_line_text_0":{"type":"MULTI_LINE_TEXT","value":"sacdsdsd"},"unit":{"type":"NUMBER","value":"1"},"unitus_vn":{"type":"CALC","value":"22000"},"unitjp":{"type":"NUMBER","value":"11"},"Number":{"type":"NUMBER","value":"111"},"unitus":{"type":"NUMBER","value":"1"},"q_ty":{"type":"NUMBER","value":"1"}}};
		record['Detail']['value'].push(newrec);
		
		
		$( "#getDetail" ).bind( "click", function() {
			var recordId = getParameterByName("record");
			if (recordId != null && typeof(recordId) !== 'undefined') {
				getDetailTable(recordId);
			}
		});
  
		return e;
    });
	
	function getDetailTable(recordId, callback) {
		var apiUrl = "https://kintoneivsdemo.cybozu.com/k/v1/record.json?app=610&id={0}"
		
		$.ajax({
			type: "GET",
			dataType: "json",
			url: apiUrl.replace("{0}", recordId),
			success: typeof(callback) == 'undefined' ? defaultCallback : callback,
			beforeSend: setHeader
		});
	}
	
	function defaultCallback(data) {
		console.debug(data.record.Detail);
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

