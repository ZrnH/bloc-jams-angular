(function() {
	function AlbumCtrl(album) {
		// this.albumData = angular.copy(albumPicasso);
		this.songs = [];
		for(var i=0; i< album.songs.length ; i++){
			this.songs.push(angular.copy(albumPicasso.songs[i]));
		}

	}

	angular
		.module('blocJams')
		.controller('AlbumCtrl', AlbumCtrl);
})();
