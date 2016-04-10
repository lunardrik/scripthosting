(function($) {
    "use strict";
	
	var eventsShow = ['app.record.create.show', 'app.record.edit.show', 'app.record.index.edit.show'];
    kintone.events.on(eventsShow, function(e) {
		
		var record = event.record;
        var count = record.receipts.value.length;
		
		
		console.debug(record);
		
        $(".gaia-ui-actionmenu").append( "<input type ='button' id='getDetail' value = 'Get Detail' />  " )
	     

		$( "#getDetail" ).bind( "click", function() {
			getDetailTable(2);
		});
  
    });
	
	function getDetailTable(recordId) {
		var apiUrl = "https://kintoneivsdemo.cybozu.com/k/v1/record.json?app=610&id={0}"
		
		$.ajax({
			type: "GET",
			dataType: "json",
			url: apiUrl.replace("{0}", recordId),
			success: function (data) {
				console.debug(data.record.Detail);
			},
			beforeSend: setHeader
		});
	}
	
	function setHeader(xhr) {
        xhr.setRequestHeader('X-Cybozu-API-Token', 'UoMwTXQuscujiQQM5gUIo86j938rAEDj6Y4MrwxI');
        xhr.setRequestHeader('X-Cybozu-Authorization', 'bnFuaHV0QGluZGl2aXN5cy5qcDpAN35+RWE9fg==');
      }
	
// function sendDataApi(){
                // var txtContent = "This message sent from kintone";
				// var a = kintone.app.getFieldElements('dien_thoai');
				  // var phoneNumbers = "";
				  // for (var i = 0; i < a.length; i++) {
				   // phoneNumbers += a[i].textContent + ",";
				  // }
				  // phoneNumbers = phoneNumbers.substr(0,phoneNumbers.length-1);
// alert(phoneNumbers);
			
                // $.ajax(
                // {
                    // type: "GET",
                    // url: "https://api7.esms.vn/MainService.svc/xml/SendMultipleSMS_v3?phone="+phoneNumbers
                            // +"&Content="
                    // +txtContent+"&apikey=902019D38A70013E343EE021461E66&secretkey=D49D7330332A6F8BEB6DD096234942"+ "&smstype=7",
                    // dataType: "TEXT",
                    // success: function (result) {
						
						// alert("Send successfully")
                      
                    // },
                    // error: function (error) {
						// alert("Errors")
                        
                    // }
                // });
            // }


})(jQuery);

