$(document).ready(function() {

	
	listenForMusicSearch();
	listenForMovieSearch();



});

var oldSongBox = $("#box1-return").html();

function listenForMusicSearch () {
	$("#musicForm").on("submit", function (e) {
		// Clean up previous entries:
		var $results = $(".results").empty();

		//check if user submitted anything	
		if ($("#song").val().length === 0){
			console.log("no value");
      		e.preventDefault();
     		// $(".blankWarning").show();
     		$(".overlay").css("display", "block");
      		$(".blankWarning").text("Please make sure to submit your favorite song").css("color","red");
    	}
    	
    	else {
			e.preventDefault();
			var songSubmission = $("#song").val();
			console.log(songSubmission);
			$("#song").val("");
			getSpotify(songSubmission);
		}  
	});
}

function getSpotify (song) {
	var url = "https://api.spotify.com/v1/search?q=" + song + "&type=track&limit=8";
	//console.log("This is the " + url);
	$.getJSON(url, function (data){
		
		var tracks = data.tracks.items;
		//console.log("this is", test);
		
		//Warning if input has not been recognized
		if (tracks.length === 0) {
			$(".overlay").css("display", "block");
			$(".blankWarning").text("Your submission wasn't recognized by Spotify. Please try again").css("color","red");
		}
    
    // for (var i = 0; i < tracks.length; i++) {
		// 	//console.log(tracks[i].name);
		// 	//console.log(tracks[i].artists[0].name);
		// 	//var listResults = "<p> <span>" + tracks[i].artists[0].name + " - " + tracks[i].name + "</span> <button>select</button></p>";
		// 	// var listResults = "<p><button class=\"btn\">" + tracks[i].artists[0].name + " - " + tracks[i].name + "</button></p>";
		
		// 	// $("ul").append(listResults);
		// }

       else {
       
       var source = $("#my-template").html(); 
       var template = Handlebars.compile(source);

       var html = template({spotifyData: tracks});
       // console.log(html);
       	$(".overlay").fadeIn(1000);
       $(".overlay").html(html);
		listenForSongSelection(tracks);
		}

	}); //end getJSON
}//end getSpotify function

function listenForSongSelection (tracks) {
	$("ul.results").on("click",".btn", function (e) {
		e.preventDefault();
		var selectedSong = $(this).attr('num');
		// console.log("selected " + selectedSong);
		pushSpotifyResult(selectedSong);
		// console.log("First check Also this is", $("#box1-old").html());
		// console.log("Third check this is", oldSongBox);
		$(".overlay").fadeOut(1000);
	}); 	
} // end of listenForSongSelection function



function pushSpotifyResult (selectedSong) {
	var url = "https://api.spotify.com/v1/tracks/" + selectedSong;
	console.log("check nu " + url);
	$.getJSON(url, function (data){

		 	var source = $("#new-song-box").html(); 
       		var template = Handlebars.compile(source);

       		var html = template({songData: data});
       		// var html2 = template({songTitles: data});
       		// console.log(data.album.images[2]); 
       // console.log(html);
       	$(".songBlock").fadeIn(1000);
       $(".songBlock").html(html);
       // console.log("Second check Also this is", $("#box1-old").html());
       // console.log("Fourth check this is", oldSongBox);
       musicPlay(data);
       changeChoice(data);

	}); // end getJSON

} // end of pushSpotifyResult function

function musicPlay (random) {
	$(".songBlock").on("click","#playMusic", function (e) {
		e.preventDefault();
       var audio = document.getElementById("audio");
       var musicButton = document.getElementById("playMusic");
       audio.play();
       musicButton.setAttribute("class","glyphicon glyphicon-pause btn-lg"); 
       musicPause();                 
	}); 	
} // end of musicPlay function

function musicPause (random) {
	$(".songBlock").on("click","#playMusic", function (e) {
		e.preventDefault();
       var audio = document.getElementById("audio");
       var musicButton = document.getElementById("playMusic");
       audio.pause();
       musicButton.setAttribute("class","glyphicon glyphicon-play-circle btn-lg"); 
       musicPlay();                 
	}); 	
} // end of musicPause function

function changeChoice (random) {
	$(".songBlock").on("click","#changeMusicButton", function (e) {
		e.preventDefault();
		
		$("#box1-new").fadeOut(500);
		console.log("this is", $("#box1-old").html());

		$(".songBlock").html(oldSongBox);
		listenForMusicSearch();                
	}); 	
} // end of musicPause function

										 // *** HERE WE START THE MOVIE SEARCH ******
										 // *** HERE WE START THE MOVIE SEARCH ******
										 // *** HERE WE START THE MOVIE SEARCH ******

function listenForMovieSearch () {
	$("#movieForm").on("submit", function (e) {
		// Clean up previous entries:
		var $results = $(".results").empty();

		//check if user submitted anything	
		if ($("#movie").val().length === 0){
			console.log("no value");
      		e.preventDefault();
     		// $(".blankWarning").show();
     		$(".overlay").css("display", "block");
      		$(".blankWarning").text("Please make sure to submit your favorite movie").css("color","red");
    	}
    	
    	else {
			e.preventDefault();
			var movieSubmission = $("#movie").val();
			console.log(movieSubmission);
			$("#movie").val("");
			getOMDB(movieSubmission);
		}  
	});
}

function getOMDB (movie) {
	var url = "http://www.omdbapi.com/?s=" + movie;
	console.log("This is the " + url);
	$.getJSON(url, function (data){
		
		// var tracks = data.tracks.items;
		console.log("this is", data.Search);
		
		// Warning if input has not been recognized
		if (data.Response === "False") {
			$(".overlay").css("display", "block");
			$(".blankWarning").text("Your submission wasn't recognized by OMDB. Please try again").css("color","red");
		}

       else {
       
       var source = $("#movieResultList").html(); 
       var template = Handlebars.compile(source);

       var html = template({omdbData: data.Search});
       // console.log(html);
       	$(".overlay").fadeIn(1000);
       $(".overlay").html(html);
		listenForMovieSelection(data.Search);
		}

	}); //end getJSON
}//end getOMDB function

function listenForMovieSelection (tracks) {
	$("ul.results").on("click",".btn", function (e) {
		e.preventDefault();
		var selectedMovie = $(this).attr('num');
		// console.log("selected " + selectedMovie);
		pushOmdbResult(selectedMovie);
		$(".overlay").fadeOut(1000);
	}); 	
} // end of listenForMovieSelection function

function pushOmdbResult (selectedMovie) {
	var url = "http://www.omdbapi.com/?i=" + selectedMovie;
	console.log("check nu " + url);
	$.getJSON(url, function (data){

		 	var source = $("#new-movie-box").html(); 
       		var template = Handlebars.compile(source);

       		var html = template({movieData: data});
       		
       	$(".movieBlock").fadeIn(1000);
       $(".movieBlock").html(html);
       // trailerPlay(selectedMovie);
    
    //    musicPlay(data);
    //    changeChoice(data);

	}); // end getJSON

} // end of pushSpotifyResult function

//traileraddict doesn't allow JSON and only XML which doesn't allow client side ********************

// function trailerPlay (selectedMovie) {
	
// 	// first change the OMDB imdbID to the traileraddict imdbID (by removing the 'tt' at the start)
// 	var imdbcode = selectedMovie.split("");
// 	var newMovieCode = imdbcode.splice(0,2);
// 	var finalMovieCode = imdbcode.join("");
// 	console.log("newMoviecode2 " + finalMovieCode);

// 	var urlTrailer = "http://api.traileraddict.com/?imdb=" + finalMovieCode;
// 	console.log("check nu " + urlTrailer);
	
// 		$.ajax({
// 			url: urlTrailer,
// 			datatype: "xml",
// 			success: function (data) {
// 				// to find what data returns, first try:  console.log(data);

// 				// var img = $("<img>").attr("src", data.avatar_url);
// 				console.log(data);
// 				// $("body").append($("<img>").attr("src", data.avatar_url));
// 			}
// 		});

		//getJSON way *******************************************

	// $.getJSON(urlTrailer, function (data){
	// 		console.log(data.trailers);
	// 	 	var source = $("#trailer-box").html(); 
 //       		var template = Handlebars.compile(source);

 //       		var html = template({trailerData: data.trailers.trailer});
       		
 //       	// $(".movietrailer").fadeIn(1000);
 //       $(".movietrailer").html(html);


	// }); // end getJSON
// } // end of trailerPlay function


