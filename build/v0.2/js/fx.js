var $2048 = (function($2048){
	var fx = $2048.fx = {};
	fx.show = function(board, poses, callback){
		var domConfs = [];
		for (var i = 0, pos; pos = poses[i++];){
			var nc = $.QS('#' + $2048.support.genNumCellId(pos.r, pos.c));
			$2048.skin.decorateCell(nc, board[pos.r][pos.c]);
			nc.innerText = $2048.skin.getTxt($2048.skin.getCellSkin(board[pos.r][pos.c])) 
			domConfs.push({dom: nc
				, props: [{name: 'width', val: 100}, {name: 'height', val: 100}
				, {name: 'left', val: $2048.support.calcGridCellOffset(pos.c)}
				, {name: 'top', val:  $2048.support.calcGridCellOffset(pos.r)}
				, {name: 'fontSize', val: 80}]});
		}
		$.animate(domConfs, 200, callback);
	};
	fx.slide = function(board, tracks, callback){
		var domConfs = [];
		for (var i = 0, track; track = tracks[i++];){
			var nc = $.QS('#' + $2048.support.genNumCellId(track.fR, track.fC));
			domConfs.push({dom: nc
				, props: [{name: 'left', val: $2048.support.calcGridCellOffset(track.tC)}
				, {name: 'top', val: $2048.support.calcGridCellOffset(track.tR)}]});
		}
		$.animate(domConfs, 200, callback);
	}

	return $2048;
}($2048 || {}));