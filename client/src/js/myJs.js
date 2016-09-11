var apikey = "";

var register = function() {
	var clientName = $('#clientName').val();
	//ajax
	$.ajax({
		url:"/middleware/register",
		contentType:"application/json",
		type:"POST",
		data:JSON.stringify({
			clientName: clientName
		}),
		dataType: 'json',
		success:function(data){
			$("#registerResult").html("API Response: " + JSON.stringify(data));
			apikey = data.apikey;
		},
		error:function(e){
			$("#registerResult").html("API Response: " + JSON.stringify(e));
		}
	});
};

var makeRequest = function() {
	//ajax
	$.ajax({
		url:"/middleware/somerequest?apikey=" + apikey,
		type:"GET",
		success:function(data){
			$("#apiRequestResult").html("API Response: " + JSON.stringify(data));
		},
		error:function(e){
			$("#apiRequestResult").html("API Response: " + JSON.stringify(e));
		}
	});
};

