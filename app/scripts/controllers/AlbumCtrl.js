(function() {
	function AlbumCtrl(Fixtures, SongPlayer) {
		this.albumData = Fixtures.getAlbum();
		this.SongPlayer = SongPlayer;
		//this.albumData = angular.copy(albumPicasso);
		}

	

	angular
		.module('blocJams')
		.controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]);

})();
