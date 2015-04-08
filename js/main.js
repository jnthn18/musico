$(document).ready(function() {
	$("#playlist-dropdown").click(function() {
		if( $("#playlist-menu").css('display') == 'none'){
			$("#playlist-menu").velocity("slideDown", {duration: 300});
		} else {
			$("#playlist-menu").velocity("slideUp", {duration: 300});
		}
	});
	$("#playlist-menu li").click(function() {
		var listLength = $("#playlist-menu li").length - 1;
		var listID = $(this).index();

		if( listID === listLength ){
			alert("create playlist");
		} else if ( listID === listLength - 1){

		} else {
			var playlist = $("#playlist-menu li").eq(listID).html();
			if ( $("#playlist-title").html() !== playlist ){
				$("#playlist-title").velocity("transition.slideRightOut", {duration: 200});
				setTimeout(function() {
					$("#playlist-title").html(playlist).velocity("transition.slideLeftIn", {duration: 200});
				}, 210);
				$("#playlist-menu").velocity("slideUp", {duration: 300});				
			}

		}
	});
});