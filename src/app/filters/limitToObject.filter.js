(function() {
	'use strict';


	angular
		.module('fuse')
		.filter('limitObjectTo', limitObjectTo)

	function limitObjectTo() {
		return function(obj, limit) {
			if(!obj)
				return[];

			var keys = Object.keys(obj);
			if (keys.length < 1) 
				return [];
			

			var ret = new Object,
				count = 0;
			angular.forEach(keys, function(key, arrayIndex) {
				if (count >= limit) {
					return false;
				}
				ret[key] = obj[key];
				count++;
			});
			return ret;
		};
	}


})();