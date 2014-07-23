var $2048 = (function($2048){
	var rowNum = 4, colNum = 4;
	var board = [];
	var merged = [];
	var score = 0;
	var scoreDiv;

	var _uxEvtQueue;

	$2048.init = function(){
		scoreDiv = $.QS('#score');
		_uxEvtQueue = $.TinyQueue.create(2);

		$.TinyEvtProxy.on(['readUXEvt'], function(){
			var uxEvt = _uxEvtQueue.shift();
			uxEvt && $.TinyEvtProxy.emit(uxEvt);
		});

		$.TinyEvtProxy.on('start', function(){
			_uxEvtQueue.lock();

			board = $2048.support.resetRect(4,4,0);
			_initUI();
			var poses = $2048.algorithm.findRandomAvailablePos(board, 2);
			for (var i = 0, pos; pos = poses[i++];){
				board[pos.r][pos.c] = $2048.algorithm.genRandom([1,2]);
				$2048.skin.decorateCell($.QS('#' + $2048.support.genNumCellId(pos.r, pos.c)), board[pos.r][pos.c]);
			}
			$2048.fx.show(board, poses, _uxEvtQueue.unlock);
		});

		$.TinyEvtProxy.on('replay', function(){
			_uxEvtQueue.lock();

			scoreDiv.innerText = score = 0;
			board = $2048.support.resetRect(4,4,0);
			_repaint();
			var poses = $2048.algorithm.findRandomAvailablePos(board, 2);
			for (var i = 0, pos; pos = poses[i++];){
				board[pos.r][pos.c] = $2048.algorithm.genRandom([1,2]);
				$2048.skin.decorateCell($.QS('#' + $2048.support.genNumCellId(pos.r, pos.c)), board[pos.r][pos.c]);
			}
			$2048.fx.show(board, poses, _uxEvtQueue.unlock);
		});
		$.QS('.replay').addEventListener('click', function(e){
			_uxEvtQueue.push('replay');	
		});


		$.TinyEvtProxy.on('left', function(){
			_uxEvtQueue.lock();
			merged = $2048.support.resetRect(4,4,0);

			var tracks = $2048.algorithm.move('left', board, merged);
			if (tracks && tracks.length){
				$2048.fx.slide(board, tracks, function(){
					for (var i = 0; i < tracks.length; ++i){
						score += $2048.skin.getCellSkin(tracks[i].val).score;
						scoreDiv.innerText = score;
					}
					_repaint();
					var poses = $2048.algorithm.findRandomAvailablePos(board, 1);
					for (var i = 0, pos; pos = poses[i++];)
						board[pos.r][pos.c] = $2048.algorithm.genRandom([1,2]);
					$2048.fx.show(board, poses, function(){
						_uxEvtQueue.unlock();
						if (_isOver()){
							alert('Game Over');							
						};
					});
				});
			}
			else{
				_uxEvtQueue.unlock();
			}
		});

		$.TinyEvtProxy.on('right', function(){
			_uxEvtQueue.lock();
			merged = $2048.support.resetRect(4,4,0);

			var tracks = $2048.algorithm.move('right', board, merged);
			if (tracks && tracks.length){
				$2048.fx.slide(board, tracks, function(){
					for (var i = 0; i < tracks.length; ++i){
						score += $2048.skin.getCellSkin(tracks[i].val).score;
						scoreDiv.innerText = score;
					}
					_repaint();
					var poses = $2048.algorithm.findRandomAvailablePos(board, 1);
					for (var i = 0, pos; pos = poses[i++];)
						board[pos.r][pos.c] = $2048.algorithm.genRandom([1,2]);
					$2048.fx.show(board, poses, function(){
						_uxEvtQueue.unlock();
						if (_isOver()){
							alert('Game Over');							
						};
					});
				});	
			}
			else{
				_uxEvtQueue.unlock();
			}
		});

		$.TinyEvtProxy.on('up', function(){
			_uxEvtQueue.lock();
			merged = $2048.support.resetRect(4,4,0);

			var tracks = $2048.algorithm.move('up', board, merged);
			if (tracks && tracks.length){
				$2048.fx.slide(board, tracks, function(){
					for (var i = 0; i < tracks.length; ++i){
						score += $2048.skin.getCellSkin(tracks[i].val).score;
						scoreDiv.innerText = score;
					}
					_repaint();
					var poses = $2048.algorithm.findRandomAvailablePos(board, 1);
					for (var i = 0, pos; pos = poses[i++];)
						board[pos.r][pos.c] = $2048.algorithm.genRandom([1,2]);
					$2048.fx.show(board, poses, function(){
						if (_isOver()){
							alert('Game Over');							
						};
						_uxEvtQueue.unlock();
					});
				});	
			}
			else{
				_uxEvtQueue.unlock();
			}
		});

		$.TinyEvtProxy.on('down', function(){
			_uxEvtQueue.lock();
			merged = $2048.support.resetRect(4,4,0);

			var tracks = $2048.algorithm.move('down', board, merged);
			if (tracks && tracks.length){
				$2048.fx.slide(board, tracks, function(){
					for (var i = 0; i < tracks.length; ++i){
						score += $2048.skin.getCellSkin(tracks[i].val).score;
						scoreDiv.innerText = score;
					}
					_repaint();
					var poses = $2048.algorithm.findRandomAvailablePos(board, 1);
					for (var i = 0, pos; pos = poses[i++];)
						board[pos.r][pos.c] = $2048.algorithm.genRandom([1,2]);
					$2048.fx.show(board, poses, function(){
						_uxEvtQueue.unlock();
						if (_isOver()){
							alert('Game Over');							
						};
					});
				});
			}
			else{
				_uxEvtQueue.unlock();
			}
		});
	};
	$2048.start = function(){
		_uxEvtQueue.push('start');
		setInterval(function(){
			$.TinyEvtProxy.emit('readUXEvt');
		}, 300);
	};


	document.onkeydown = function(evt){
		switch (evt.keyCode){
			case 37:
				_uxEvtQueue.push('left');
				break;
			case 38:
				_uxEvtQueue.push('up');
				break;
			case 39:
				_uxEvtQueue.push('right');
				break;
			case 40:
				_uxEvtQueue.push('down');
				break;
		}
		console.log(evt.keyCode);
	};

	var _initUI = function(){
		var grid = $.QS('#grid');
		for (var i = 0; i < rowNum; ++i)
			for (var j = 0; j < colNum; ++j){
				// init grid cells
				var gridCell = $2048.support.createCell($2048.support.genGridCellId(i, j), 'grid-cell', $2048.support.calcGridCellOffset(i), $2048.support.calcGridCellOffset(j));
				grid.appendChild(gridCell);

				// init number cells
				var numCell = $2048.support.createCell($2048.support.genNumCellId(i, j),'empty-number-cell number-cell', $2048.support.calcNumCellOffset(i), $2048.support.calcNumCellOffset(j));
				grid.appendChild(numCell);
			}
	};

	
	var _repaint = function(){
		var numCells = $.QSA('.number-cell')
			, grid = $.QS('#grid');
		for (var i = numCells.length - 1; i >= 0; --i)
			grid.removeChild(numCells[i]);

		for (var i = 0; i < rowNum; ++i)
			for (var j = 0; j < colNum; ++j){
				// init number cells
				var numCell = $2048.support.createCell($2048.support.genNumCellId(i, j)
					,(board[i][j] ? '' : 'empty-number-cell ') + 'number-cell'
					, $2048.support[board[i][j] ? 'calcGridCellOffset' : 'calcNumCellOffset'](i)
					, $2048.support[board[i][j] ? 'calcGridCellOffset' : 'calcNumCellOffset'](j));
				numCell.innerText = $2048.skin.getTxt($2048.skin.getCellSkin(board[i][j])) || '';
				if (board[i][j])
					$2048.skin.decorateCell(numCell, board[i][j]);
				grid.appendChild(numCell);
			}
	};

	var _isOver = function(){
		var g = $2048.support.resetRect(4,4,0);
		for (var r = 0; r < rowNum; ++r)
			for (var c = 0; c < colNum; ++c){
				var currCell = board[r][c];
				if (!currCell) return false;

				if (r-1 >= 0){
					if (!board[r-1][c] || board[r-1][c] == currCell) return false;
				}
				if (r+1 < 4){
					if (!board[r+1][c] || board[r+1][c] === currCell) return false;
				}
				if (c-1 >= 0){
					if (!board[r][c-1] || board[r][c-1] === currCell) return false;
				}
				if (c+1 < 4){
					if (!board[r][c+1] || board[r][c+1] === currCell) return false;
				}
			}

		return true;
	};


	return $2048;
}($2048 || {}));