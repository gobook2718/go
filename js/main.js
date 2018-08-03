$.getJSON("http://localhost:8000/posts", function( resp ) {
    // Log each key in the response data
    $.each( resp, function( index, value ) {
    	var row = '<div class="row"><div class="col-md-7 mb-4">'+
    	'<div class="view overlay z-depth-1-half">'+
    	'<img src="'+resp[index].image+'" class="img-fluid">'+
    	'<div class="mask rgba-while-light"></div></div></div>'+'<div class="col-md-5 mb-4">'+
    	'<h2 class="post-title">'+resp[index].title+'</h2>'+
    	'<p class="post-content">'+resp[index].content+'</p>'+
    	'<a href="https://mdbootstrap.com/" class="btn btn-indigo">View more</a></div></div>';
    	$('#container-post').append(row);
    });
});
$.getJSON("http://localhost:8000/post-categories", function( resp ) {
    // Log each key in the response data
    $.each( resp, function( index, value ) {
    	var row_category = '<option value="'+resp[index].pk+'">'+resp[index].name+'</option>';
    	$('.mdb-select').append(row_category);
    });
});
$('#post').click(function(){
	var fromdata = {
		"title": $('input[name=title]').val(),
		"address": $('input[name=address]').val(),
		"content": $('textarea[name=content]').val()
	};
	console.log(fromdata);
	$.ajax({
		type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url         : 'http://localhost:8000/posts', // the url where we want to POST
        data        : fromdata, // our data object
        xhrFields: {
		    withCredentials: true
		},
        dataType    : 'json', // what type of data do we expect back from the server
        crossDomain: true,
        encode      : true
	}).done(function(data){
		console.log(data);
	});
	event.preventDefault();
});