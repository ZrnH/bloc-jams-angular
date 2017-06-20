(function() {
	function SongPlayer() {
		var SongPlayer = {};

		var currentSong = null;
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
				currentSong.playing = null;
			}

			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});

			currentSong = song;
		}

		SongPlayer.play = function(song) {
			if (currentSong !== song) {
				setSong(song);
// play current buzz object
			currentBuzzObject.play();
			song.playing = true
// check if current song matches clicked song, and if that song is paused. if paused, resume playing.	
			} else if (currentSong === song) {
				if (currentBuzzObject.isPaused()) {
					currentBuzzObject.play();
// update song.playing boolean for reference in album.html
					
				}
			}
		};

		SongPlayer.pause = function(song) {
			currentBuzzObject.pause();
			song.playing = false;
		};

		return SongPlayer;
	}

	angular
		.module('blocJams')
		.factory('SongPlayer', SongPlayer);
})();