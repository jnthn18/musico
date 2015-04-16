$(document).ready(function() {
	
	var p1_songID = [1,2,3,4,5,6];
	var p1_favorite = [1,0,0,1,0,1];
	var p1_songservice = [1,2,3,2,3,3];
	var p1_artist = ["Red Hot Chili Peppers","Taylor Swift","Outkast","Red Hot Chili Peppers","Taylor Swift","Outkast"];
	var p1_song = ["Dani California","Shake It Off","ATLiens","Dani California","Shake It Off","ATLiens"];
	var playlist_1 = [p1_songID, p1_favorite, p1_songservice, p1_artist, p1_song];

	var p2_favorite = [0,1,1,0,1];
	var p2_songservice = [2,3,1,3,1,1];
	var playlist_2 = [p1_songID, p2_favorite, p2_songservice, p1_artist, p1_song];

	var list = [playlist_1, playlist_2];

	function switchPlaylist(p){
		var playlistLength = p[0].length;
		if(playlistLength == 0){
			$(".playlist").append("<div class='new-playlist'>Looks like this playlist is empty!</div>");
		}
		$(".playlist").css("display", "none").css("opacity", 0);
		for(var i = 0; i<playlistLength; i++){
			var songID = p[0][i];
			var favorite = p[1][i];
			if(favorite === 1){
				favorite = "fa-star";
			} else {
				favorite = "fa-star-o"
			}
			var songservice = p[2][i];
			if(songservice === 1){
				songservice = "fa-spotify";
			} else if(songservice === 2){
				songservice = "fa-soundcloud";
			} else {
				songservice = "fa-laptop";
			}
			var artist = p[3][i];
			var song = p[4][i];
			var songContainer = "<div class='music-container'><span class='song-id'>"+songID+"</span><div class='favorite'><i class='fa fa-2x "+favorite+"'></i></div><div class='song-service'><i class='fa fa-2x "+songservice+"'></i></div><div class='song-container'><div class='song'>"+song+"</div><div class='artist'>"+artist+"</div></div></div>";
			$(".playlist").append(songContainer);
		}
		$(".music-container").css("display", "none").css("opacity", 0);
		$(".playlist").velocity("transition.slideLeftIn", {duration: 0});
		$(".music-container").velocity("transition.slideLeftIn", {stagger: 120});
	}

 switchPlaylist(playlist_1);

	$("#playlist-dropdown").click(function() {
		if( $("#playlist-menu").css('display') == 'none'){
			$("#playlist-menu").velocity("slideDown", {duration: 300});
		} else {
			$("#playlist-menu").velocity("slideUp", {duration: 300});
		}
	});
	$(".frame").click(function() {
/*		if ( $("#playlist-menu").css("display") !== 'none'){
			$("#playlist-menu").velocity("slideUp", {duration: 300});
		}*/
	});
	function createPlaylist(l,n){
		var newIndex = l+1;
		var newList = "<li>"+n+"<span class='playlist-index'>"+newIndex+"</span>"+"</li>";
		var tmp = [[],[],[],[],[]];
		list.push(tmp);
		$("#playlist-menu li").eq(l).after(newList);
		$(".playlist-form").velocity("transition.slideDownOut", {duration: 300});
		$("#playlist-menu").velocity("transition.slideDownIn", {duration: 300, delay: 200});
	}
	$("#playlist-submit").click(function() {
		var lastList = $("#playlist-menu li").length - 3;
		var newList = $("#new-playlist").val();
		if (newList === "" || newList === " "){
			$("#new-playlist").velocity("callout.shake");
		} else {
			createPlaylist(lastList,newList);
		}
	});
	$("#playlist-menu").on("click", "li", function() {
		var listLength = $("#playlist-menu li").length - 1;
		var listID = $(this).index();
		if( listID === listLength ){
			var menuWidth = $("#playlist-menu").width();
			$("#playlist-menu").velocity("transition.slideDownOut", {duration: 300});
			$(".playlist-form").css("width", menuWidth).velocity("transition.slideDownIn");
			$(".playlist-form-wrapper").velocity("transition.slideDownIn", {duration: 300, delay: 200});
		} else if ( listID === listLength - 1){

		} else {
			var playlist = $("#playlist-menu li").eq(listID).html();
			$("#playlist-menu li").removeClass("selected");
			$("#playlist-menu li").eq(listID).addClass("selected");
			if ( $("#playlist-title").html() !== playlist ){
				$("#playlist-title").velocity("transition.slideRightOut", {duration: 200});
				$(".playlist").empty();
				switchPlaylist(list[listID]);
				setTimeout(function() {
					$("#playlist-title").html(playlist).velocity("transition.slideLeftIn", {duration: 200});
				}, 210);
				$("#playlist-menu").velocity("slideUp", {duration: 300});				
			} else {
				$("#playlist-menu").velocity("slideUp", {duration: 300});
			}
		}
	});
	$("#playlist-back").click(function() {
		$(".playlist-form").velocity("transition.slideDownOut", {duration: 300});
		$("#playlist-menu").velocity("transition.slideDownIn", {duration: 300, delay: 200});
	});
	$(".right-container li").click(function() {
		var artist = $(".artist", this).html();
		$(".add-music-artist").html(artist);
		$(".add-music").velocity("transition.slideUpIn", {duration: 250});
	});
	$(".add-music-back").click(function() {
		$(".add-music").velocity("transition.slideDownOut", {duration: 250});
	});
	$(".add-music-list li").click(function() {
		var song = $(".song-list", this).html();
		var songservice = 0;
		var songClass = "";
		var artist = $(".add-music-artist").html();
		var playList = $("#playlist-dropdown .playlist-index").html();
		if($("i", this).hasClass("fa-spotify") === true){
			songservice = 1;
			songClass = "fa-spotify";
		} else {
			songservice = 2;
			songClass = "fa-soundcloud";
		}
		var p = list[playList];
		var length = p[0].length + 1;
		if(length === 1){
			$(".new-playlist").velocity("slideUp", {duration:200});
		}
		p[0].push(length);
		p[1].push(0);
		p[2].push(songservice);
		p[3].push(artist);
		p[4].push(song);
		var songContainer = "<div class='music-container'><span class='song-id'>"+length+"</span><div class='favorite'><i class='fa fa-2x fa-star-o'></i></div><div class='song-service'><i class='fa fa-2x "+songClass+"'></i></div><div class='song-container'><div class='song'>"+song+"</div><div class='artist'>"+artist+"</div></div></div>";
		$(".playlist").append(songContainer);
		$(".add-music").velocity("transition.slideDownOut", {duration: 250});
		$("#search").val("");
	});
	$("#search").on("change paste keyup", function() {
		if($(".search-results").css("opacity") == 0){
	   $(".search-results").velocity("transition.slideDownIn", {duration: 200});
		}
		if($("#search").val().length == 0){
			$(".search-results").velocity("transition.slideDownOut", {duration: 200});
		}
	});
	$(".search-results").click(function() {
		$(".search-results").velocity("transition.slideDownOut", {duration: 200});
	});
});