var $2048 = (function($2048){

	var GRID_CELL_ID_PREFIX = 'grid-cell-{0}-{1}';
	var NUMBER_CELL_ID_PREFIX = 'number-cell-{0}-{1}';

	var support = $2048.support = {};
	support.genGridCellId = function(r, c){
		return $.fmt(GRID_CELL_ID_PREFIX, r, c);
	};
	support.genNumCellId = function(r, c){
		return $.fmt(NUMBER_CELL_ID_PREFIX, r, c);
	};
	support.createCell = function(id, cls, top, left, cellSkin){
		var cell = $.createEl('div');
		cell.id = id;
		cell.className = cls;
		cell.style.top = top + 'px';
		cell.style.left= left + 'px';
		if (cellSkin){
			cell.innerHTML = $.skin.getTxt(cellSkin.txt);
			cellSkin.color && (cell.style.color = cellSkin.color);
			cellSkin.backgroundColor && (cell.style.backgroundColor = cellSkin.backgroundColor);
		}

		return cell;
	};
	support.calcGridCellOffset= function(i){
		return (i + 1) * 20 + i * 100;
	};
	support.calcNumCellOffset= function(i){
		return (i + 1) * 20 + i * 100 + 50;
	};

	support.resetRect = function(rowNum, colNum, defaultVal){
		var rect = [];
		for (var i = 0; i < rowNum; ++i){
			rect[i] = [];
			for (var j = 0; j < colNum; ++j){
				rect[i][j] = defaultVal;
			}
		}

		return rect;
	};

	return $2048;
}($2048 || {}));