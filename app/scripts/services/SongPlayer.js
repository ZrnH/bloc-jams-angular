(function() {
	function SongPlayer(Fixtures) {
		
		var SongPlayer = {};

		var currentAlbum = Fixtures.getAlbum();

		/**
		* @desc Buzz object audio file
		* @type {Object} 
		*/
		var currentBuzzObject = null;
		/** 
		* @function setSong
		* @desc Stops currently playing song and load new audio file as currentBuzzObject
		* @param {Object} song
		**/

		var setSong = function(song) {
			if (currentBuzzObject) {
				currentBuzzObject.stop();
				SongPlayer.currentSong.playing = null;
			}

			currentBuzzObject = new buzz.sound(song.audioURL, {
				formats: ['mp3'],
				preload: true
			});

			SongPlayer.currentSong = song;

		};


		/** 
		* @function playSong
		* @desc plays currentBuzzObject and sets song.playing boolean to TRUE
		* @param {Object} song
		*/		
		
		var playSong = function(song) {
			currentBuzzObject.play();
			song.playing = true;
		};

		/** 
		* @function getSongIndex
		* @desc leverages fixtures file to query the indexOf song
		* @param {Object} song
		*/

		var getSongIndex = function(song) {
			return currentAlbum.songs.indexOf(song);
		};

		/** 
		* @desc Active song object from list of songs	
		* @type {Object}
		*/

		SongPlayer.currentSong = null;

		SongPlayer.play = function(song) {
			song = song || SongPlayer.currentSong;
/*			if(!song) {
				playSong(SongPlayer.currentSong)
			}*/
			
			if (SongPlayer.currentSong !== song) {
				setSong(song);
				playSong(song);
// check if current song matches clicked song, and if that song is paused. if paused, resume playing.	
			} else if (SongPlayer.currentSong === song) {
				if (currentBuzzObject.isPaused()) {
					playSong(song);
// update song.playing boolean for reference in album.html
					
				}
			}
		};

		SongPlayer.pause = function(song) {
			song = song || SongPlayer.currentSong;
			currentBuzzObject.pause();
			song.playing = false;
		};

		/** 
		* @desc Method to define previous song index via current song
		* @type {Object}
		*/	
		SongPlayer.previous = function() {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex--;

			if(currentSongIndex < 0) {
				currentBuzzObject.stop();
				SongPlayer.currentSong.playing = null;
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}


		};

		return SongPlayer;
	

	angular
		.module('blocJams')
		.factory('SongPlayer',['Fixtures', SongPlayer ]);
})();