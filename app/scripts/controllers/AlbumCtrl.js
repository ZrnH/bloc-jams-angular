(function() {
	function AlbumCtrl(album) {
		this.albumData = Fixtures.getAlbum();
		//this.albumData = angular.copy(albumPicasso);
		}

	}

	angular
		.module('blocJams')
		.controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
})();
