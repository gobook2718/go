$.ajax({
    headers:{
        token: "ajsdg"
    },
});

$.getJSON("http://localhost:8000/posts", function( resp ) {
    // Log each key in the response data
    $.each( resp, function( index, value ) {
        var imgUrl = '';
        var imgTag = '';
        if (resp[index].images.length > 0) { 
            for (var i = resp[index].images.length - 1; i >= 0; i--) {
                imgUrl = resp[index].images[i]['image'];
                imgTag = imgTag + '<img src="'+imgUrl+'" alt="thumbnail" class="rounded float-left" style="width: 200px"">'
            }
            
        }
        // else
        // {
        //     imgTag = '<img src="'+imgUrl+'" alt="thumbnail" class="img-thumbnail"style="width: 200px"">'
        // }
    	var row = '<div class="row"><div class="col-md-7 mb-4">'+
    	'<div class="view overlay z-depth-1-half">'+ imgTag+
    	// '<img src="'+imgUrl+'" alt="thumbnail" class="img-thumbnail"style="width: 200px"">'+ 
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
var images_file = [];
$('#post').click(function(){
    var formData = new FormData();
    formData.append('title',$('input[name=title]').val());
    formData.append('address',$('input[name=address]').val());
    formData.append('content',$('textarea[name=content]').val());
    formData.append('post_category',$('select[name=postCategory] option:selected').text());
    // var fl = $('input[name=image]')[0].files[0];
    // formData.append('image',$('input[name=image]')[0].files[0]);
    var cat = $('select[name=postCategory] option:selected').text();
	$.ajax({
        // method: 'POST',
		type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url         : 'http://localhost:8000/posts', // the url where we want to POST
        data        : formData, // our data object
        cache: false,
        contentType: false,
        processData: false,
        success: function(resultData){
          var id_post = resultData['id'];
          if (images_file.length > 0){
            var count_image_post = 0;
            for (var i = images_file.length - 1; i >= 0; i--) {
                var form_image = new FormData();
                form_image.append('posts',id_post);
                form_image.append('image',images_file[i]);
                $.ajax({
                    type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
                    url         : 'http://localhost:8000/images', // the url where we want to POST
                    data        : form_image, // our data object
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function(){
                        count_image_post = count_image_post + 1;
                    }
                });
            }
            images_file = [];
            $( "#closePost" ).trigger( "click" );
            location.reload();
            
          }
      }
	});
	event.preventDefault();
});
$("#imageupload").on('change', function () {
    var countFiles = $(this)[0].files.length;
    var imgPath = $(this)[0].value;
    var extn = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
    var image_holder = $("#preview-image");    
    image_holder.empty();
    images_file = [];
    if (extn == "gif" || extn == "png" || extn == "jpg" || extn == "jpeg") {
        if (typeof (FileReader) != "undefined") {
            for (var i = 0; i < countFiles; i++) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $("<img />", {
                        "src": e.target.result,
                        "class": "thumbimage"
                    }).appendTo(image_holder);
                }
                image_holder.show();
                images_file.push($(this)[0].files[i]);
                reader.readAsDataURL($(this)[0].files[i]);
            }
        } else {
            alert("It doesn't supports");
        }
    } else {
        alert("Select Only images");
    }
});

$('#login').click(function(){
    var fromdata = {
        "username": $('input[name=username]').val(),
        "password": $('input[name=password]').val()
    };
    console.log(fromdata);
    $.ajax({
        type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url         : 'http://127.0.0.1:8000/api/login', // the url where we want to POST
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