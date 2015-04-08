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
		// alert($(this).html() + " " + listID);
		if( listID === listLength ){
			alert("create playlist");
		} else if ( listID === listLength - 1){

		} else {
			alert($("#playlist-menu li").eq(listID).html());
		}
	});
});