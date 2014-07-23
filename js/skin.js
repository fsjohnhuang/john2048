var $2048 = (function($2048){
	var skin = $2048.skin = {};
	skin.getCellSkin = function(boardVal){
		switch(String(boardVal)){
			case '0':
				return {
					score: 0
				};
			case '1':
				return {
					txt: 2,
					score: 2,
					style: {
						color: '#796F63',
						backgroundColor: '#EFE0C9'
					}
				};
			case '2':
				return {
					txt: 4,
					score: 4,
					style: {
						color: '#796F63',
						backgroundColor: '#EFE0C9'
					}
				};
			case '3':
				return {
					txt: 8,
					score: 8,
					style: {
						color: '#FFF2ED',
						backgroundColor: '#F8AD6F'
					}
				};
			case '4':
				return {
					txt: 16,
					score: 16,
					style: {
						color: '#FFF2ED',
						backgroundColor: '#F3935E'
					}
				};
			case '5':
				return {
					txt: 32,
					score: 32,
					style: {
						color: '#FFF2ED',
						backgroundColor: '#F67D5E'
					}

				};
			case '6':
				return {
					txt: 64,
					score: 64,
					style: {
						color: '#FFF2ED',
						backgroundColor: '#DC6234'
					}
				};
			case '7':
				return {
					txt: 128,
					score: 128,
					style: {
						fontSize: '50px',
						color: '#FFF2ED',
						backgroundColor: '#F0CC70'						
					}
				};
			case '8':
				return {
					txt: 256,
					score: 256,
					style: {
						fontSize: '50px',
						color: '#FFF2ED',
						backgroundColor: '#EFCA60'
					}
				};
			case '9':
				return {
					txt: 512,
					score: 512,
					style: {
						fontSize: '50px',
						color: '#FFF2ED',
						backgroundColor: '#F0C649'
					}
				};
			case '10':
				return {
					txt: 1024,
					score: 1024,
					style: {
						fontSize: '40px',
						color: '#FFF2ED',
						backgroundColor: '#EDC639'
					}
				};	
			case '11':
				return {
					txt: 2048,
					score: 2048,
					style: {
						fontSize: '40px',
						color: '#FFF2ED',
						backgroundColor: '#EEC203'
					}
				};	
			case '12':
				return {
					txt: 5096,
					score: 5096,
					style: {
						fontSize: '40px',
						color: '#FFF2ED',
						backgroundColor: '#EEC203'
					}
				};	
		}
	};

	skin.getTxt = function(cellSkin){
		return !cellSkin.txt ? '' : String(cellSkin.txt);
	};
	skin.decorateCell = function(dom, boardVal){
		var cellSkin = this.getCellSkin(boardVal);
		for (var p in cellSkin.style){
			dom.style[p] = cellSkin.style[p];
		}
		dom.innerHTML = this.getTxt(cellSkin);
	};

	return $2048;
}($2048 || {}));