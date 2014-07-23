var $2048 = (function($2048){
	var alg = $2048.algorithm = {};
	alg.genRandom = function(pool){
		pool = pool.concat(pool);
		var i = parseInt(Math.random() * (pool.length - 1));

		return pool[i];
	};
	alg.findRandomAvailablePos = function(board, posNum){
		var availablePoses = [];
		var rowNum = board.length, colNum = board[0].length;
		for (var i = 0; i < rowNum; ++i)
			for (var j = 0; j < colNum; ++j)
				if (!board[i][j] || board[i][j] === 0)
					availablePoses.push({r: i, c: j});

		var ret = [];
		while(availablePoses.length && posNum--){
			var index = parseInt(Math.random() * (availablePoses.length - 1));
			ret.push(availablePoses.splice(index, 1)[0]);
		}

		return ret;
	};
	alg.singleMove = {};
	alg.singleMove.left = function(board, merged, r, c){
		if (c === 0) return void 0;

		var track;
		var currCell = board[r][c];
		if (!currCell) return void 0;
		for (var i = c - 1; i >= 0; --i){
			var cell = board[r][i];

			if (cell && (cell !== currCell || merged[r][i])) break;
			if (cell && cell === currCell && !merged[r][i])
				merged[r][i] = currCell + 1;
		}

		var endC = i + 1;
		if (endC === c) return void 0;

		board[r][endC] = merged[r][endC] || board[r][c];
		board[r][c] = 0;
		track = {fR: r, fC: c, tR: r, tC: endC, val: merged[r][endC]};
		return track;
	};
	alg.singleMove.right = function(board, merged, r, c){
		if (c === 3) return void 0;

		var track;
		var currCell = board[r][c];
		if (!currCell) return void 0;
		for (var i = c + 1; i < 4; ++i){
			var cell = board[r][i];

			if (cell && (cell !== currCell || merged[r][i])) break;
			if (cell && cell === currCell && !merged[r][i])
				merged[r][i] = currCell + 1;
		}

		var endC = i - 1;
		if (endC === c) return void 0;

		board[r][endC] = merged[r][endC] || board[r][c];
		board[r][c] = 0;
		track = {fR: r, fC: c, tR: r, tC: endC, val: merged[r][endC]};
		return track;
	};
	alg.singleMove.up = function(board, merged, r, c){
		if (r === 0) return void 0;

		var track;
		var currCell = board[r][c];
		if (!currCell) return void 0;
		for (var i = r - 1; i >= 0; --i){
			var cell = board[i][c];

			if (cell && (cell !== currCell || merged[i][c])) break;
			if (cell && cell === currCell && !merged[i][c])
				merged[i][c] = currCell + 1;
		}

		var endR = i + 1;
		if (endR === r) return void 0;

		board[endR][c] = merged[endR][c] || board[r][c];
		board[r][c] = 0;
		track = {fR: r, fC: c, tR: endR, tC: c, val: merged[endR][c]};
		return track;
	};
	alg.singleMove.down = function(board, merged, r, c){
		if (r === 3) return void 0;

		var track;
		var currCell = board[r][c];
		if (!currCell) return void 0;
		for (var i = r + 1; i < 4; ++i){
			var cell = board[i][c];

			if (cell && (cell !== currCell || merged[i][c])) break;
			if (cell && cell === currCell && !merged[i][c])
				merged[i][c] = currCell + 1;
		}

		var endR = i - 1;
		if (endR === r) return void 0;

		board[endR][c] = merged[endR][c] || board[r][c];
		board[r][c] = 0;
		track = {fR: r, fC: c, tR: endR, tC: c, val: merged[endR][c]};
		return track;
	};

	alg.move = function(dir, board, merged){
		var rowNum = board.length, colNum = board[0].length, tracks = [], track;
		switch (dir){
			case 'left':
			case 'up':
				for (var r = 0; r < rowNum; ++r)
					for (var c = 0; c < colNum; ++c){
						track = alg.singleMove[dir](board, merged, r, c);
						track && tracks.push(track);
					}
				break;
			case 'right':
				for (var r = 0; r < rowNum; ++r)
					for (var c = colNum - 1; c >= 0; --c){
						track = alg.singleMove.right(board, merged, r, c);
						track && tracks.push(track);
					}
				break;
			case 'down':
				for (var r = rowNum - 1; r >= 0; --r)
					for (var c = colNum - 1; c >= 0; --c){
						track = alg.singleMove.down(board, merged, r, c);
						track && tracks.push(track);
					}
				break;
		}

		return tracks;
	}


	return $2048;
}($2048 || {}));