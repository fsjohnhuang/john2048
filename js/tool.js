var $ = (function($){
	$.QSA = function(selector){
		return document.querySelectorAll(selector);
	};
	$.QS = function(selector){
		return document.querySelector(selector);
	};
	$.createEl = function(tag){
		return document.createElement(tag);
	};

	$.fmt = function(tpl/*,arg1,arg2*/){
        if (arguments.length < 2) return tpl;

        var args = [].slice.call(arguments, 1);
        return tpl.replace(/\{([^{}]+)\}/g, function(){
            var match = arguments[1];
            var newStr = args[0] && args[0][match] || args[parseInt(match)];
            
            return newStr;
        });
    };

    $.cssAnima = function(dom, prop, val, during, callback){
    	var currVal = parseInt(window.getComputedStyle(dom, null)[prop].replace('px', ''));
		var dVal = parseInt(val) - currVal;
		var step = dVal / during;
		for (var i = 1; i <= during; ++i){
			(function (during, val, callback){
				setTimeout(function(){
					dom.style[prop] = val + 'px';
					callback && callback();
				}, during);
			}(i, currVal += step, i === during && callback));
		}
    };
    /*
	 * @param {Array} doms [{dom: dom, props: [{name: propName, val: val}]}]
     */
    $.animate = function(doms, during, callback){
    	var domConfs = [];
    	for (var i = 0, dom; dom = doms[i++];)
    		for (var j = 0, prop; prop = dom.props[j++];){
    			var currVal = parseInt(window.getComputedStyle(dom.dom, null)[prop.name].replace('px', ''));
    			var dVal = parseInt(prop.val) - currVal;
    			var step = dVal / during;
	    		domConfs.push({dom: dom.dom, prop: prop.name, step: step, currVal: currVal});
    		}

    	for (var i = 1; i <= during; ++i){
			(function (during, domConfs, callback){
				setTimeout(function(){
					for (var i = 0, domConf; domConf = domConfs[i++];){
						domConf.dom.style[domConf.prop] = (domConf.currVal += domConf.step) + 'px';
					}
					callback && callback();
				}, during);
			}(i, domConfs, i === during && callback));
    	}
    };

    // tiny event proxy
    var tep = $.TinyEvtProxy = {
    	cbs: [],
    	allEvt: '__ALL-EVT__'
    };
    tep.on = function(evts, callback){
    	this.cbs.push({evts: [].concat(evts), cb: callback, datum: {}, emitedEvts: []});
    };
    tep.off = function(evts){
    	var cbs = this.cbs;
    	var evts = [].concat(evts);
    	var evtsStr = String(evts.sort());
    	if (evts.indexOf(this.allEvt) !== -1){
    		this.cbs = [];
    	}
    	else{
	    	for (var i = cbs.length - 1; i >= 0; --i){
	    		if (evtsStr === String(cbs[i].evts.sort())){
	    			cbs.splice(i, 1);
	    		}
	    	}
	    }
    };
    tep.emit = function(evt, data){
    	var cbs = this.cbs;
    	for (var i = 0, cb; cb = cbs[i++];){
            var index = cb.evts.indexOf(evt);
            if (index === -1) continue;

            cb.emitedEvts.push(cb.evts.splice(index, 1)[0]);
            cb.datum[evt] = data;
            if (!cb.evts.length){
                cb.cb(cb.datum);
                cb.evts = cb.emitedEvts;
                cb.emitedEvts = [];
            }
        }
    };

    // tiny event queue
    var tq = $.TinyQueue = {};
    tq.create = function(len){
    	var _queue = [], locked = 0;
    	return {
    		push: function(item){
    			if (_queue.length < len - 1){
    				_queue.push(item);
    			}
    		},
    		shift: function(){
    			if (!locked)
    				return _queue.shift();
    		},
    		lock: function(){
    			locked = 1;
    		},
    		unlock: function(){
    			locked = 0;
    		}
    	};
    };

    return $;
}($ || {}));