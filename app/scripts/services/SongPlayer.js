(function() {
	function SongPlayer($rootScope, Fixtures) {
		
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

		/** 
		* @function stopSong
		* @desc Stops currently playing song and sets playing value to null
		* @param {Object} song
		**/		
		var stopSong = function(song) {
			currentBuzzObject.stop();
			SongPlayer.currentSong.playing = null;
		}

		var setSong = function(song) {
			if (currentBuzzObject) {
				stopSong(song);
			}

			currentBuzzObject = new buzz.sound(song.audioURL, {
				formats: ['mp3'],
				preload: true
			});

			currentBuzzObject.bind('timeupdate', function(){
				$rootScope.$apply(function() {
					SongPlayer.currentTime = currentBuzzObject.getTime();
				});
			});

			SongPlayer.currentSong = song;

			/** 
			* @desc Curent playback time (in seconds) of currently playing song
			* @type {Number}
			*/
			SongPlayer.currentTime = null;

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
			
			if (SongPlayer.currentSong !== song) {
				setSong(song);
				playSong(song);

			} else if (SongPlayer.currentSong === song) {
				if (currentBuzzObject.isPaused()) {
					playSong(song);
					
				}
			}
		};

		SongPlayer.pause = function(song) {
			song = song || SongPlayer.currentSong;
			currentBuzzObject.pause();
			song.playing = false;
		};

		/** 
		* @desc Method to define previous song index via current song and play
		* @type {Object}
		*/	
		SongPlayer.previous = function() {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex--;

			if(currentSongIndex < 0) {
				stopSong(song);
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}


		};

		/** 
		* @desc Method to define next song index via current song and play
		* @type {Object}
		*/

		SongPlayer.next = function() {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex++;

			if(currentSongIndex > currentAlbum.songs.length -1) {
				stopSong(song);
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
				}
 
		};

		/** 
		* @function setCurrentTime
		* @des Set current time (in seconds) of currently playing song
		* @param {Number} time
		*/

		SongPlayer.setCurrentTime = function(time){
			if (currentBuzzObject) {
				currentBuzzObject.setTime(time);
			}
		};

		/** 
		* @desc Volume object to store and update volume of currently playing song
		* @type {Object}
		*/

		SongPlayer.currentVolume = null;

		/** 
		* @function getVolume
		* @des If any song is playing, get the volume and assign to SongPlayer.currentVolume
		*/

		SongPlayer.getVolume = function(){
			if (currentBuzzObject) {
				SongPlayer.currentVolume = currentBuzzObject.getVolume();
			}
		}

		/** 
		* @function setVolume
		* @des Set current volume of currently playing or paused song if changed
		* @param {Number} volume
		*/

		SongPlayer.setVolume = function(newVolume){
			if (currentBuzzObject) {
				currentBuzzObject.setVolume(newVolume);
			}
		};




		return SongPlayer;
	
	}
	angular
		.module('blocJams')
		.factory('SongPlayer',[ '$rootScope', 'Fixtures', SongPlayer ]);
})();